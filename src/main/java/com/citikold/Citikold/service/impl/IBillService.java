package com.citikold.Citikold.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import com.citikold.Citikold.dto.request.BillDTOReq;
import com.citikold.Citikold.dto.response.ListBillDTORes;
import com.citikold.Citikold.exception.IdNotFoundException;
import com.citikold.Citikold.exception.NameExistsException;
import com.citikold.Citikold.model.Bill;

public interface IBillService {
     Page<ListBillDTORes> getAllBill(Pageable pageable);
     Page<Bill> getAllBillsWithDetails(Pageable pageable);

    void saveBill(BillDTOReq billDTOReq) throws NameExistsException, IdNotFoundException;

    void updateBill(BillDTOReq billDTOReq) throws IdNotFoundException, NameExistsException;
    void deleteBill(Long id);
    List<Bill> searchBillByRucCustomer(int ruc_customer);
    
}
