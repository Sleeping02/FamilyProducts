package com.citikold.Citikold.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.citikold.Citikold.dto.request.FamilyDTOReq;
import com.citikold.Citikold.dto.response.ListFamilyDTORes;
import com.citikold.Citikold.exception.IdNotFoundException;
import com.citikold.Citikold.exception.NameExistsException;
import com.citikold.Citikold.model.FamilyProduct;
import com.citikold.Citikold.repository.FamilyProductRepository;
import com.citikold.Citikold.service.impl.IFamilyProductService;

@Service
public class FamilyProductService implements IFamilyProductService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private FamilyProductRepository familyProductRepository;

    //LISTAR FAMILIA
    @Override
    public Page<ListFamilyDTORes> getAllFamilys(Pageable pageable) {
        var familyDB = familyProductRepository.findAll(pageable);
        var familyDTO = new ArrayList<ListFamilyDTORes>();

        for (FamilyProduct familyProduct : familyDB) {
            familyDTO.add(modelMapper.map(familyProduct, ListFamilyDTORes.class));
        }
        return new PageImpl<>(familyDTO, pageable, familyDB.getTotalElements());
    }
    //LISTAR FAMILIA POR ACTIVE(ESTADO)
       @Override
    public List<FamilyProduct> getFamilyProductsByActive(boolean active) {
        return familyProductRepository.findByActive(active);
    }


    // GUARDAR FAMILIA
    @Override
    public void saveFamily(FamilyDTOReq familyDTOReq) throws NameExistsException, IdNotFoundException {
        // Verificar si la familia ya existe por código
        if (familyProductRepository.existsByCod_family(familyDTOReq.getCod_family())) {
            throw new NameExistsException("Ya existe una familia con el código proporcionado");
        }
        // Verificar si el nombre de la familia ya existe
        if (familyProductRepository.existsByName(familyDTOReq.getName())) {
            throw new NameExistsException("Ya existe una familia con el nombre proporcionado");
        } else {
            // Utilizar ModelMapper para mapear FamilyDTOReq a FamilyProduct
            FamilyProduct familyProduct = modelMapper.map(familyDTOReq, FamilyProduct.class);

            // familyProduct.setActive(true); // Valor predeterminado True
            familyProduct.setCreated_date(new Date()); // Fecha actual del sistema

            // Guardar la familia de productos en la base de datos
            familyProductRepository.save(familyProduct);
        }
    }

    // ACTUALIZAR FAMILIA
    @Override
    public void updateFamily(FamilyDTOReq familyDTOReq) throws IdNotFoundException, NameExistsException {
        var familyDB = familyProductRepository.findById(familyDTOReq.getId())
                .orElseThrow(
                        () -> new IdNotFoundException("El id " + familyDTOReq + " no existe. Ingrese un nuevo id"));

        // valida que el nombre del producto no exista y si existe que coincida con el
        // producto encontrado
        if (!familyDTOReq.getName().equals(familyDB.getName())
                && familyProductRepository.existsByName(familyDTOReq.getName())) {
            throw new NameExistsException(
                    "El nombre " + familyDTOReq.getName() + " ya existe. Ingrese un nuevo nombre");
        }

        familyProductRepository.save(modelMapper.map(familyDTOReq, FamilyProduct.class));
    }

    //BORRAR FAMILIA
    @Override
    public void deleteFamily(Long id) {
        familyProductRepository.deleteById(id);
    }

 
}
