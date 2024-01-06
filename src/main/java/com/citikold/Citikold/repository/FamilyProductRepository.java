package com.citikold.Citikold.repository;





import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.citikold.Citikold.model.FamilyProduct;

public interface FamilyProductRepository extends JpaRepository<FamilyProduct, Long>{


    boolean existsByName(String name);
    
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM FamilyProduct f WHERE f.cod_family = :cod_family")
    boolean existsByCod_family(String cod_family);


    // @Query("SELECT p FROM Product p WHERE p.category.name LIKE %:categoryName%")
    // Optional<FamilyProduct> findByCod(String cod_family);
 
}
