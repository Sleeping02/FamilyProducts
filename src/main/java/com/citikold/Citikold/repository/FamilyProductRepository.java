package com.citikold.Citikold.repository;





import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.citikold.Citikold.model.FamilyProduct;
import com.citikold.Citikold.model.Product;

public interface FamilyProductRepository extends JpaRepository<FamilyProduct, Long>{


    boolean existsByName(String name);
    
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM FamilyProduct f WHERE f.cod_family = :cod_family")
    boolean existsByCod_family(String cod_family);


    @Query("SELECT fp FROM FamilyProduct fp WHERE fp.active = :active")
    List<FamilyProduct> findByActive(@Param("active") boolean active);

    // @Query("SELECT p FROM Product p WHERE p.category.name LIKE %:categoryName%")
    // Optional<FamilyProduct> findByCod(String cod_family);
 
}
