package com.citikold.Citikold.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.citikold.Citikold.dto.request.ProductDTOReq;
import com.citikold.Citikold.dto.response.ListProductDTORes;
import com.citikold.Citikold.exception.IdNotFoundException;
import com.citikold.Citikold.exception.NameExistsException;
import com.citikold.Citikold.model.FamilyProduct;
import com.citikold.Citikold.model.Product;
import com.citikold.Citikold.service.impl.IProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    private IProductService productService;
    
    @GetMapping("/generate-code")
    public String generateFamilyProductCode() {
        return productService.generarCodigo();
    }


    @GetMapping()
    public ResponseEntity<Page<ListProductDTORes>> getAllProducts(Pageable pageable){
        return ResponseEntity.ok(productService.getAllProducts(pageable));
    }

     //LISTAR PRODUCTOS POR ESTADO(campo "active")
     @GetMapping("/byActive/{active}")
    public ResponseEntity<List<Product>> getProductsByActive(@PathVariable boolean active) {
        List<Product> products = productService.getProductsByActive(active);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    
     
    //CREAR PRODUCTO
    @PostMapping()
    public ResponseEntity<HttpStatus> saveProduct(@Valid @RequestBody ProductDTOReq productDTOReq) throws NameExistsException, IdNotFoundException {
        productDTOReq.setCod_product(productService.generarCodigo());
        productService.saveProduct(productDTOReq);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //ACTUALIZAR PRODUCTO
     @PutMapping()
    public ResponseEntity<HttpStatus> updateProduct(@Valid @RequestBody ProductDTOReq productDTOReq)
            throws IdNotFoundException,
            NameExistsException {
        productService.updateProduct(productDTOReq);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    //BORRAR PRODUCTO
      @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
}
