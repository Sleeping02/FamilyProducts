package com.citikold.Citikold.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citikold.Citikold.dto.request.FamilyActiveDTOReq;
import com.citikold.Citikold.dto.request.FamilyDTOReq;
import com.citikold.Citikold.dto.response.ListFamilyDTORes;
import com.citikold.Citikold.exception.IdNotFoundException;
import com.citikold.Citikold.exception.NameExistsException;
import com.citikold.Citikold.model.FamilyProduct;
import com.citikold.Citikold.service.impl.IFamilyProductService;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/v1/family")
public class FamilyProductsController {
    @Autowired
    private IFamilyProductService iFamilyProductService;

    @GetMapping("/generate-code")
    public String generateFamilyProductCode() {
        return iFamilyProductService.generarCodigo();
    }

    //LISTAR TODAS LAS FAMILIAS
     @GetMapping()
    public ResponseEntity<Page<ListFamilyDTORes>> getAllFamilys(Pageable pageable){
        return ResponseEntity.ok(iFamilyProductService.getAllFamilys(pageable));
    }

    //LISTAR FAMILIAS POR ESTADO(campo "active")
     @GetMapping("/byActive/{active}")
    public ResponseEntity<List<FamilyProduct>> getFamilyProductsByActive(@PathVariable boolean active) {
        List<FamilyProduct> familyProducts = iFamilyProductService.getFamilyProductsByActive(active);
        return new ResponseEntity<>(familyProducts, HttpStatus.OK);
    }
     
    //Listar Familias por su nombre

    @GetMapping("/search")
    public ResponseEntity<List<FamilyProduct>> searchFamilyByName(@RequestParam String name) {
        List<FamilyProduct> familyProducts = iFamilyProductService.searchFamilyByName(name);
        return new ResponseEntity<>(familyProducts, HttpStatus.OK);
    }
    

    
      @PostMapping()
    public ResponseEntity<HttpStatus> saveFamily(@Valid @RequestBody FamilyDTOReq familyDTOReq) throws NameExistsException, IdNotFoundException {
        familyDTOReq.setCod_family(iFamilyProductService.generarCodigo());
        
        iFamilyProductService.saveFamily(familyDTOReq);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    //ACTUALIZAR FAMILIAPRODUCTOS
    @PutMapping()
    public ResponseEntity<HttpStatus> updateFamily(@Valid @RequestBody FamilyDTOReq familyDTOReq)
            throws IdNotFoundException,
            NameExistsException {
        iFamilyProductService.updateFamily(familyDTOReq);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //ACTUALIZAR FAMILIAPRODUCTOS
    @PatchMapping()
    public ResponseEntity<HttpStatus> updateFamilyActive(@Valid @RequestBody FamilyActiveDTOReq familyActiveDTOReq)
            throws IdNotFoundException,
            NameExistsException {
        iFamilyProductService.updateFamilyActive(familyActiveDTOReq);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


      @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteFamily(@PathVariable Long id) {
        iFamilyProductService.deleteFamily(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
