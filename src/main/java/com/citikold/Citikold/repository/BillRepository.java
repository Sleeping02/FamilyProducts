package com.citikold.Citikold.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.citikold.Citikold.model.Bill;
import com.citikold.Citikold.model.FamilyProduct;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
        @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM Bill b WHERE b.num_bill = :num_bill")
    boolean existsByNum_bill(int num_bill);

    @Query("SELECT b FROM Bill b")
    Page<Bill> findAllBillsWithDetails(Pageable pageable);


    //LISTAR POR RUC DE CLIENTE
    @Query("SELECT b FROM Bill b WHERE CONCAT(b.ruc_customer, '') LIKE CONCAT(:ruc_customer, '%')")
    List<Bill> searchBillByRucCustomer(@Param("ruc_customer") int ruc_customer);
    
   
    
}