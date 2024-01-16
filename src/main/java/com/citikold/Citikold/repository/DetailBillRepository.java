package com.citikold.Citikold.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.citikold.Citikold.model.Bill;
import com.citikold.Citikold.model.DetailBill;

public interface DetailBillRepository extends JpaRepository<DetailBill, Long> {

    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM Bill b WHERE b.num_bill = :num_bill")
    boolean existsByNum_bill(int num_bill);

    // @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM Bill b WHERE b.ruc_customer = :ruc_customer")
    // boolean existsByRuc_customer(int ruc_customer);

    // @Query("SELECT b.id AS idbill, dt FROM DetailBill dt JOIN Bill b ON b.id=dt.bill.id")
    // @Query(value = "SELECT b.id AS billId, d.* FROM Bill b JOIN DetailBill d ON b.id = d.bill_id", nativeQuery = true)
    @Query("SELECT db FROM DetailBill db")
    Page<DetailBill> findAllDetails(Pageable pageable);

    //  @Query("SELECT db FROM DetailBill db WHERE LOWER(b.ruc_customer) LIKE LOWER(:ruc_customer%)")
    // List<DetailBill> searchDetailByIdBill(@Param("bill_id") int bill_id);


    List<DetailBill> findByBillId(Long bill_id);
    @Modifying
    @Query(value = "DELETE FROM detailbill WHERE id = :id", nativeQuery = true)
    void deleteDetailById(@Param("id") Long id);

  // void deleteDetailById(Long id);

}
