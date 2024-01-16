package com.citikold.Citikold.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.citikold.Citikold.dto.request.ProductDTOReq;
import com.citikold.Citikold.dto.response.ListProductDTORes;
import com.citikold.Citikold.exception.IdNotFoundException;
import com.citikold.Citikold.exception.InsufficientStockException;
import com.citikold.Citikold.exception.NameExistsException;
import com.citikold.Citikold.model.FamilyProduct;
import com.citikold.Citikold.model.Product;
import com.citikold.Citikold.repository.ProductRepository;
import com.citikold.Citikold.service.impl.IProductService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductService implements IProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;



    public synchronized String generarCodigo() {
        String codigoBase = "CP";
        
        // Obtén el último cod_Family de la base de datos
        Product ultimoProduct = productRepository.findFirstByOrderByCodProductDesc();

        long nuevoValor = 1;

        if (ultimoProduct != null) {
            // Si hay un último family, incrementa su valor
            nuevoValor = Long.parseLong(ultimoProduct.getCod_product().substring(2)) + 1;
        }

        // Formatea el nuevo valor con ceros a la izquierda
        String nuevoValorFormateado = String.format("%013d", nuevoValor);

        return codigoBase + nuevoValorFormateado;
    }

    public void configurarValorInicial() {
        if (productRepository.count() == 0) {
            Product productInicial = new Product();
            productInicial.setCod_product("CP0000000000001"); // Puedes ajustar esto según tus necesidades
            // Otros valores iniciales...
            productRepository.save(productInicial);
        }
    }

    //LISTAR PRODUCTOS
    @Override
    public Page<ListProductDTORes> getAllProducts(Pageable pageable) {
        var productsDB = productRepository.findAll(pageable);
        var productosDTO = new ArrayList<ListProductDTORes>();

        for (Product product : productsDB) {
            productosDTO.add(modelMapper.map(product, ListProductDTORes.class));
        }
        return new PageImpl<>(productosDTO, pageable, productsDB.getTotalElements());
    }


    //LISTAR POR ESTADO: ACTIVE
    @Override
    public List<Product> getProductsByActive(boolean active) {
        return productRepository.findByActive(active);
        
    }



    //GUARDAR PRODUCT
    @Override
    public void saveProduct(ProductDTOReq productDTOReq) throws NameExistsException, IdNotFoundException {
        // Verificar si la familia ya existe por código
        if (productRepository.existsByCod_product(productDTOReq.getCod_product())) {
            throw new NameExistsException("Ya existe una producto con el código proporcionado");
        }
        // Verificar si el nombre del producto ya existe
        if (productRepository.existsByName(productDTOReq.getName())) {
            throw new NameExistsException("Ya existe un producto con el nombre proporcionado");
        } else {
            // Utilizar ModelMapper para mapear FamilyDTOReq a FamilyProduct
            Product product = modelMapper.map(productDTOReq, Product.class);

            // familyProduct.setActive(true); // Valor predeterminado True
            product.setCreated_date(new Date()); // Fecha actual del sistema

            // Guardar la familia de productos en la base de datos
            productRepository.save(product);
        }
       
    }

    //ACTUALIZAR PRODUCTO
    @Override
    public void updateProduct(ProductDTOReq productDTOReq) throws IdNotFoundException, NameExistsException {
        var productDB = productRepository.findById(productDTOReq.getId())
                .orElseThrow(
                        () -> new IdNotFoundException("El id " + productDTOReq + " no existe. Ingrese un nuevo id"));

        // valida que el nombre del producto no exista y si existe que coincida con el
        // producto encontrado
        if (!productDTOReq.getName().equals(productDB.getName())
                && productRepository.existsByName(productDTOReq.getName())) {
            throw new NameExistsException(
                    "El nombre " + productDTOReq.getName() + " ya existe. Ingrese un nuevo nombre");
        }

        productRepository.save(modelMapper.map(productDTOReq, Product.class));
    }
    //BORRAR PRODUCTO
    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
        
    }

       public void updateStock(Long productId, int cantidad) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado con ID: " + productId));

        if (product.getStock() < cantidad) {
            throw new RuntimeException("La cantidad en stock es insuficiente para la venta");
        }

        product.setStock(product.getStock() - cantidad);
        productRepository.save(product);
    }


   

  


    // @Override
    // public void updateProductStock(ProductDTOReq productDTOReq, String productCode, int quantity) throws NameExistsException {
    //     if (productRepository.existsByCod_product(productDTOReq.getCod_product())) {
    //         throw new NameExistsException("Ya existe una producto con el código proporcionado");
    //     }
    //       Product product = modelMapper.map(productDTOReq, Product.class);
    //     int updatedStock = product.getStock() - quantity;

    //     if (updatedStock < 0) {
    //         throw new InsufficientStockException("Stock insuficiente para el producto con código: " + productCode);
    //     }

    //     product.setStock(updatedStock);
    //     productRepository.save(product);
    // }

   

}
