package com.citikold.Citikold.controller;

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

import com.citikold.Citikold.dto.request.BillDTOReq;
import com.citikold.Citikold.exception.IdNotFoundException;
import com.citikold.Citikold.exception.NameExistsException;
import com.citikold.Citikold.model.Bill;
import com.citikold.Citikold.service.impl.IBillService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/bill")
public class BillController {
    @Autowired
    private IBillService billService;

    //  @GetMapping()
    // public ResponseEntity<Page<ListBillDTORes>> getAllBills(Pageable pageable){
    //     return ResponseEntity.ok(billService.getAllBill(pageable));
    // }

       @GetMapping
    public Page<Bill> getAllBillsWithDetails(Pageable pageable) {
        return billService.getAllBillsWithDetails(pageable);
    }

       //CREAR FACTURA
    @PostMapping()
    public ResponseEntity<HttpStatus> saveBill(@Valid @RequestBody BillDTOReq billDTOReq) throws NameExistsException, IdNotFoundException {
        billService.saveBill(billDTOReq);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //ACTUALIZAR PRODUCTO
     @PutMapping()
    public ResponseEntity<HttpStatus> updateBill(@Valid @RequestBody BillDTOReq billDTOReq)
            throws IdNotFoundException,
            NameExistsException {
        billService.updateBill(billDTOReq);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    //BORRAR PRODUCTO
      @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteBill(@PathVariable Long id) {
        billService.deleteBill(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    
    
}
