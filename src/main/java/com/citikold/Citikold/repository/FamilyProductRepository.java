package com.citikold.Citikold.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.citikold.Citikold.dto.request.FamilyDTOReq;
import com.citikold.Citikold.dto.response.ListFamilyDTORes;
import com.citikold.Citikold.model.FamilyProduct;
import com.citikold.Citikold.model.Product;

@Repository
public interface FamilyProductRepository extends JpaRepository<FamilyProduct, Long> {

    @Query("SELECT f FROM FamilyProduct f WHERE LOWER(f.name) LIKE LOWER(:name%)")
    List<FamilyProduct> searchFamilyByName(@Param("name") String name);

    //QUERYS PARA TRAER EL ULTIMO CODE DEFAMILIA
    @Query("SELECT f FROM FamilyProduct f ORDER BY f.cod_family DESC")
    List<FamilyProduct> findAllOrderedByCodFamilyDesc();
    
    default FamilyProduct findFirstByOrderByCodFamilyDesc() {
        List<FamilyProduct> resultList = findAllOrderedByCodFamilyDesc();
        return resultList.isEmpty() ? null : resultList.get(0);
    }

    

    boolean existsByName(String name);

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM FamilyProduct f WHERE f.cod_family = :cod_family")
    boolean existsByCod_family(String cod_family);

    @Query("SELECT fp FROM FamilyProduct fp WHERE fp.active = :active")
    List<FamilyProduct> findByActive(@Param("active") boolean active);

    // @Query("SELECT p FROM Product p WHERE p.category.name LIKE %:categoryName%")
    // Optional<FamilyProduct> findByCod(String cod_family);

}
