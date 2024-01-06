package com.citikold.Citikold.service;

import java.math.BigDecimal;
import java.util.ArrayList;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.citikold.Citikold.dto.request.BillDTOReq;
import com.citikold.Citikold.dto.request.BillDetailDTOReq;
import com.citikold.Citikold.dto.response.ListBillDTORes;
import com.citikold.Citikold.dto.response.ListBillDetailDTORes;
import com.citikold.Citikold.dto.response.ListProductDTORes;
import com.citikold.Citikold.exception.IdNotFoundException;
import com.citikold.Citikold.exception.NameExistsException;
import com.citikold.Citikold.model.Bill;
import com.citikold.Citikold.model.DetailBill;
import com.citikold.Citikold.model.Product;
import com.citikold.Citikold.repository.BillRepository;
import com.citikold.Citikold.repository.DetailBillRepository;
import com.citikold.Citikold.repository.ProductRepository;
import com.citikold.Citikold.service.impl.IBillDetailService;
import com.citikold.Citikold.service.impl.IProductService;

@Service
public class BillDetailService implements IBillDetailService {
    @Autowired
    private DetailBillRepository detailBillRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private BillRepository billRepository;

    @Autowired
    private IProductService productService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    @Transactional(readOnly = true)
    public Page<ListBillDetailDTORes> getAllBillDetail(Pageable pageable) {
        var billDetailDB = detailBillRepository.findAll(pageable);
        var billDetailDTO = new ArrayList<ListBillDetailDTORes>();

        for (DetailBill detailBill : billDetailDB) {
            
            billDetailDTO.add(modelMapper.map(detailBill, ListBillDetailDTORes.class));
        }
        return new PageImpl<>(billDetailDTO, pageable, billDetailDB.getTotalElements());
    }
    //método actual que uso para listar los detalles
    @Transactional
    @Override
    public Page<DetailBill> findAllDetails(Pageable pageable) {
        return detailBillRepository.findAllDetails(pageable);
    }

    @Override
    public void saveBillDetail(BillDetailDTOReq billDetailDTOReq) throws NameExistsException, IdNotFoundException {
        Bill bill = billRepository.findById(billDetailDTOReq.getBill().getId())
                .orElseThrow(() -> new IdNotFoundException("La factura con id " + billDetailDTOReq.getBill().getId()
                        + " no existe. Ingrese un id válido."));

        // Utilizar ModelMapper para mapear DetailBillDTOReq a DetailBill
        DetailBill detailBill = modelMapper.map(billDetailDTOReq, DetailBill.class);
        detailBill.setBill(bill);
        
        // Guardar el detalle de factura en la base de datos
        detailBillRepository.save(detailBill);
    }

    
    
 



   

   

    @Override
    public void updateBillDetail(BillDetailDTOReq billDetailDTOReq) throws IdNotFoundException, NameExistsException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateBillDetail'");
    }

    @Transactional
    @Override
    public void deleteBillDetail(Long id) {
        detailBillRepository.deleteById(id);
    }
    @Transactional
    @Override
    public void deleteDetailById(Long id) {
        
        detailBillRepository.deleteDetailById(id);;
        
    }

    


}
