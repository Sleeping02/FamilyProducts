package com.citikold.Citikold.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.citikold.Citikold.model.Bill;

public interface BillRepository extends JpaRepository<Bill, Long> {
        @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM Bill b WHERE b.num_bill = :num_bill")
    boolean existsByNum_bill(int num_bill);

    @Query("SELECT b as FACTURA, dt  FROM Bill b JOIN DetailBill dt ON b.id = dt.bill.id ORDER BY b.id")
    Page<Bill> findAllBillsWithDetails(Pageable pageable);

   
    
}
