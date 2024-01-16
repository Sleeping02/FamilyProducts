package com.citikold.Citikold.service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.DoubleAccumulator;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.citikold.Citikold.dto.request.BillDTOReq;

import com.citikold.Citikold.dto.response.ListBillDTORes;

import com.citikold.Citikold.exception.IdNotFoundException;
import com.citikold.Citikold.exception.InsufficientStockException;
import com.citikold.Citikold.exception.NameExistsException;
import com.citikold.Citikold.model.Bill;
import com.citikold.Citikold.model.DetailBill;

import com.citikold.Citikold.model.Product;
import com.citikold.Citikold.repository.BillRepository;
import com.citikold.Citikold.repository.DetailBillRepository;
import com.citikold.Citikold.repository.ProductRepository;
import com.citikold.Citikold.service.impl.IBillService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BillService implements IBillService {

  @Autowired
  private BillRepository billRepository;
  @Autowired
  private ModelMapper modelMapper;
  @Autowired
  private ProductService productService;
  @Autowired
  private DetailBillRepository detailBillRepository;
  @Autowired
  private ProductRepository productRepository;

  // @Autowired(required = true)
  // private ProductRepository producto;
  @Override
  @Transactional(readOnly = true)
  public Page<Bill> getAllBillsWithDetails(Pageable pageable) {
    return billRepository.findAllBillsWithDetails(pageable);

  }

  @Override
  @Transactional(readOnly = true)
  public Page<ListBillDTORes> getAllBill(Pageable pageable) {
    var billDB = billRepository.findAll(pageable);
    var billDTO = new ArrayList<ListBillDTORes>();

    for (Bill bill : billDB) {
      bill.getDetails().size();
      billDTO.add(modelMapper.map(bill, ListBillDTORes.class));
    }
    return new PageImpl<>(billDTO, pageable, billDB.getTotalElements());

  }

  //LISTAR POR RUC DEL CLIENTE
  @Override
  public List<Bill> searchBillByRucCustomer(int ruc_customer) {
    return billRepository.searchBillByRucCustomer(ruc_customer);
  }
  // private void processDetails(Bill bill, List<DetailBill> detailList) throws
  // InsufficientStockException {
  // for (DetailBill detail : detailList) {
  // processDetail(detail, bill);
  // bill.getDetails().add(detail);
  // }
  // }

  // private void processDetail(DetailBill detail, Bill bill) throws
  // InsufficientStockException {

  // Product product = productRepository.findById(detail.getProduct().getId())
  // .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado con
  // ID: " + detail.getProduct().getId()));
  // System.out.println("El producto traído es:" + product.getId() + "precio:" +
  // product.getPrice());

  // double sub = product.getPrice() * detail.getCantidad();
  // detail.setSub(sub);

  // // Verificar si hay suficiente stock
  // if (product.getStock() < detail.getCantidad()) {
  // throw new InsufficientStockException("La cantidad en stock es insuficiente
  // para la venta");
  // }

  // // Actualizar el stock del producto
  // productService.updateStock(product.getId(), detail.getCantidad());
  // }

  // GUARDAR FACTURA
  @Transactional
  @Override
  public void saveBill(BillDTOReq billDTOReq) throws NameExistsException, IdNotFoundException {
    if (billRepository.existsByNum_bill(billDTOReq.getNum_bill())) {
      throw new NameExistsException("Ya existe una factura con el número de factura proporcionado");
    }
    // Utilizar ModelMapper para mapear BillDTOReq a Bill
    Bill bill = modelMapper.map(billDTOReq, Bill.class);

    // Guardar la factura en la base de datos
    Bill billGuardado = billRepository.save(bill);

    DoubleAccumulator totalSub = new DoubleAccumulator(Double::sum, 0.0);

    // processDetails(billGuardado, billDTOReq.getDetails());

    // Asignar la factura a los detalles y guardar los nuevos detalles
    billDTOReq.getDetails().forEach(detailDTO -> {
      DetailBill detail = modelMapper.map(detailDTO, DetailBill.class);
      detail.setBill(billGuardado);

      Product product = productRepository.findById(detailDTO.getProduct().getId())
          .orElseThrow(
              () -> new EntityNotFoundException("Producto no encontrado con ID: " + detailDTO.getProduct().getId()));
      System.out.println("El producto traído es:" + product.getId() + "precio:" + product.getPrice());

      double sub = product.getPrice() * detailDTO.getCantidad();
      detail.setSub(sub);

      // Verificar si hay suficiente stock
      if (product.getStock() < detailDTO.getCantidad()) {
        throw new InsufficientStockException("La cantidad en stock es insuficiente para la venta");
      }

      // Actualizar el stock del producto
      productService.updateStock(product.getId(), detailDTO.getCantidad());

      totalSub.accumulate(sub);

      detailBillRepository.save(detail);
    });
    double subtotal = totalSub.get();
    billGuardado.setSubtotal(subtotal);
    double porcentajeIGV = billGuardado.getPerc_igv();
    double igv = calculateIGV(subtotal, porcentajeIGV);
    billGuardado.setIgv(igv);
    double total = calcularTotal(subtotal, igv);
    billGuardado.setTotal(total);
    Bill billGuardadoConSubtotal = billRepository.save(billGuardado);
  }

  // private double calculateSubtotal(BillDetailDTOReq detailBill,
  // ProductRepository productRepository) {
  // }

  private double calculateIGV(double subtotal, double porcentajeIGV) {
    return (subtotal * porcentajeIGV) / 100;
  }

  private double calcularTotal(double subtotal, double igv) {
    return subtotal + igv;
  }

  @Override
  public void updateBill(BillDTOReq billDTOReq) throws IdNotFoundException, NameExistsException {
    Bill existingBill = billRepository.findById(billDTOReq.getId())
        .orElseThrow(() -> new IdNotFoundException("El id " + billDTOReq.getId() + " no existe. Ingrese un nuevo id"));

    // Verificar si el nuevo número de factura ya existe, excluyendo la factura
    // actual
    if (existingBill.getNum_bill() != billDTOReq.getNum_bill() &&
        billRepository.existsByNum_bill(billDTOReq.getNum_bill())) {
      throw new NameExistsException("Ya existe una factura con el número proporcionado");
    }
    // Actualizar los campos de la factura con la información proporcionada en el
    // DTO
 existingBill.setNum_bill(billDTOReq.getNum_bill());
    existingBill.setRuc_customer(billDTOReq.getRuc_customer());
    existingBill.setRaz_customer(billDTOReq.getRaz_customer());
    existingBill.setPerc_igv(billDTOReq.getPerc_igv());
    
    // Puedes seguir actualizando otros campos según tus necesidades

    // Actualizar los detalles de la factura
    existingBill.getDetails().clear(); // Eliminar los detalles existentes

    DoubleAccumulator totalSub = new DoubleAccumulator(Double::sum, 0.0);

    billDTOReq.getDetails().forEach(detailDTO -> {
      DetailBill detail = modelMapper.map(detailDTO, DetailBill.class);
      detail.setBill(existingBill);

      Product product = productRepository.findById(detailDTO.getProduct().getId())
          .orElseThrow(
              () -> new EntityNotFoundException("Producto no encontrado con ID: " + detailDTO.getProduct().getId()));

      double sub = product.getPrice() * detailDTO.getCantidad();
      detail.setSub(sub);

      // Verificar si hay suficiente stock
      if (product.getStock() < detailDTO.getCantidad()) {
        throw new InsufficientStockException("La cantidad en stock es insuficiente para la venta");
      }

      // Actualizar el stock del producto
      productService.updateStock(product.getId(), detailDTO.getCantidad());

      totalSub.accumulate(sub);

      existingBill.getDetails().add(detail);
    });

    double subtotal = totalSub.get();
    existingBill.setSubtotal(subtotal);
    double porcentajeIGV = existingBill.getPerc_igv();
    double igv = calculateIGV(subtotal, porcentajeIGV);
    existingBill.setIgv(igv);
    double total = calcularTotal(subtotal, igv);
    existingBill.setTotal(total);

    // Guardar la factura actualizada en la base de datos
    billRepository.save(existingBill);

  }

  @Override
  public void deleteBill(Long id) {
    billRepository.deleteById(id);

  }



}
