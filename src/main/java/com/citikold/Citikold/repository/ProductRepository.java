package com.citikold.Citikold.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.citikold.Citikold.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

       boolean existsByName(String name);
    
    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Product p WHERE p.cod_product = :cod_product")
    boolean existsByCod_product(String cod_product);

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Product p WHERE p.cod_product = :cod_product")
    Optional<Product> findByProductCode(String cod_product);
    
}
