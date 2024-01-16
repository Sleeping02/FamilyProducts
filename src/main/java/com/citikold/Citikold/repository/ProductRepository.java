package com.citikold.Citikold.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.citikold.Citikold.model.FamilyProduct;
import com.citikold.Citikold.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

       boolean existsByName(String name);
    
    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Product p WHERE p.cod_product = :cod_product")
    boolean existsByCod_product(String cod_product);

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Product p WHERE p.cod_product = :cod_product")
    Optional<Product> findByProductCode(String cod_product);

    @Query("SELECT p FROM Product p WHERE p.active = :active")
    List<Product> findByActive(@Param("active") boolean active);



       //QUERYS PARA TRAER EL ULTIMO CODE DE PRODUCTO
       @Query("SELECT p FROM Product p ORDER BY p.cod_product DESC")
       List<Product> findAllOrderedByCodProductDesc();
       
       default Product findFirstByOrderByCodProductDesc() {
           List<Product> resultList = findAllOrderedByCodProductDesc();
           return resultList.isEmpty() ? null : resultList.get(0);
       }
   

    
}
