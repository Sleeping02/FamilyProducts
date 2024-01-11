package com.citikold.Citikold.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import com.citikold.Citikold.dto.request.ProductDTOReq;
import com.citikold.Citikold.dto.response.ListProductDTORes;
import com.citikold.Citikold.exception.IdNotFoundException;
import com.citikold.Citikold.exception.NameExistsException;
import com.citikold.Citikold.model.Product;

public interface IProductService {

    Page<ListProductDTORes> getAllProducts(Pageable pageable);

    void saveProduct(ProductDTOReq productDTOReq) throws NameExistsException, IdNotFoundException;

    void updateProduct(ProductDTOReq productDTOReq) throws IdNotFoundException, NameExistsException;

    void deleteProduct(Long id);

    void updateStock(Long productId, int cantidad);

    // Product getProductById(Long productId);

}
