package com.citikold.Citikold.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import com.citikold.Citikold.dto.request.BillDetailDTOReq;

import com.citikold.Citikold.dto.response.ListBillDetailDTORes;
import com.citikold.Citikold.exception.IdNotFoundException;
import com.citikold.Citikold.exception.NameExistsException;
import com.citikold.Citikold.model.DetailBill;

public interface IBillDetailService {

    Page<ListBillDetailDTORes> getAllBillDetail(Pageable pageable);
    Page<DetailBill> findAllDetails(Pageable pageable);
    List<DetailBill> findByBillId(Long bill_id);

    
    void saveBillDetail(BillDetailDTOReq billDetailDTOReq) throws NameExistsException, IdNotFoundException;

    void updateBillDetail(BillDetailDTOReq billDetailDTOReq) throws IdNotFoundException, NameExistsException;

    void deleteBillDetail(Long id);

    void deleteDetailById(@Param("id") Long id);
    
    
    

}
