package com.citikold.Citikold.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.citikold.Citikold.dto.request.FamilyDTOReq;
import com.citikold.Citikold.dto.response.ListFamilyDTORes;
import com.citikold.Citikold.exception.IdNotFoundException;
import com.citikold.Citikold.exception.NameExistsException;


public interface IFamilyProductService {
    Page<ListFamilyDTORes> getAllFamilys(Pageable pageable);

    void saveFamily(FamilyDTOReq familyDTOReq) throws NameExistsException, IdNotFoundException;

    void updateFamily(FamilyDTOReq familyDTOReq) throws IdNotFoundException, NameExistsException;
    void deleteFamily(Long id);
    
}
