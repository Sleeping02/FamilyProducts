package com.citikold.Citikold.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citikold.Citikold.dto.request.BillDetailDTOReq;
import com.citikold.Citikold.dto.response.ListBillDetailDTORes;
import com.citikold.Citikold.exception.IdNotFoundException;
import com.citikold.Citikold.exception.NameExistsException;
import com.citikold.Citikold.model.DetailBill;
import com.citikold.Citikold.service.impl.IBillDetailService;


import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/bill-detail")
public class BillDetailController {
    @Autowired
    private IBillDetailService billDetailService;

     @GetMapping()
    public ResponseEntity<Page<ListBillDetailDTORes>> getAllBillDetails(Pageable pageable){
        return ResponseEntity.ok(billDetailService.getAllBillDetail(pageable));
    }

    @GetMapping("/bybill/{billId}")
    public ResponseEntity<List<DetailBill>> getDetailsByBillId(@PathVariable Long billId) {
        List<DetailBill> detailBills = billDetailService.findByBillId(billId);
        return new ResponseEntity<>(detailBills, HttpStatus.OK);
    }
    
    // @GetMapping
    // public Page<DetailBill> getfindAllDetails(Pageable pageable) {
    //     return billDetailService.findAllDetails(pageable);
    // }

       
       //CREAR DETALLE FACTURA
    @PostMapping()
    public ResponseEntity<HttpStatus> saveBillDetail(@Valid @RequestBody BillDetailDTOReq billDetailDTOReq) throws NameExistsException, IdNotFoundException {
        billDetailService.saveBillDetail(billDetailDTOReq);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

     //ACTUALIZAR PRODUCTO
     @PutMapping()
    public ResponseEntity<HttpStatus> updateBillDetail(@Valid @RequestBody BillDetailDTOReq billDetailDTOReq)
            throws IdNotFoundException,
            NameExistsException {
        billDetailService.updateBillDetail(billDetailDTOReq);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    //BORRAR PRODUCTO
      @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteBillDetail(@PathVariable Long id){
        billDetailService.deleteDetailById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
   
}
