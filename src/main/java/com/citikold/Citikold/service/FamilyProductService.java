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

import com.citikold.Citikold.dto.request.FamilyActiveDTOReq;
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


    public synchronized String generarCodigo() {
        String codigoBase = "CF";
        
        // Obtén el último cod_Family de la base de datos
        FamilyProduct ultimoFamily = familyProductRepository.findFirstByOrderByCodFamilyDesc();

        long nuevoValor = 1;

        if (ultimoFamily != null) {
            // Si hay un último family, incrementa su valor
            nuevoValor = Long.parseLong(ultimoFamily.getCod_family().substring(2)) + 1;
        }

        // Formatea el nuevo valor con ceros a la izquierda
        String nuevoValorFormateado = String.format("%013d", nuevoValor);

        return codigoBase + nuevoValorFormateado;
    }

    public void configurarValorInicial() {
        if (familyProductRepository.count() == 0) {
            FamilyProduct familyInicial = new FamilyProduct();
            familyInicial.setCod_family("CF0000000000001"); // Puedes ajustar esto según tus necesidades
            // Otros valores iniciales...
            familyProductRepository.save(familyInicial);
        }
    }

    // LISTAR FAMILIA
    @Override
    public Page<ListFamilyDTORes> getAllFamilys(Pageable pageable) {
        var familyDB = familyProductRepository.findAll(pageable);
        var familyDTO = new ArrayList<ListFamilyDTORes>();

        for (FamilyProduct familyProduct : familyDB) {
            familyDTO.add(modelMapper.map(familyProduct, ListFamilyDTORes.class));
        }
        return new PageImpl<>(familyDTO, pageable, familyDB.getTotalElements());
    }

    // LISTAR FAMILIA POR ACTIVE(ESTADO)
    @Override
    public List<FamilyProduct> getFamilyProductsByActive(boolean active) {
        return familyProductRepository.findByActive(active);
    }
    //METODO PARA BUSCAR POR NOMBRE
    @Override
    public List<FamilyProduct> searchFamilyByName(String name) {
        return familyProductRepository.searchFamilyByName(name);
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

        // if (!familyDB.isActive()) {
        //     throw new IllegalStateException("No se puede actualizar una familia con estado inactivo.");
        // }
        // valida que el nombre del producto no exista y si existe que coincida con el
        // producto encontrado
        if (!familyDTOReq.getName().equals(familyDB.getName())
                && familyProductRepository.existsByName(familyDTOReq.getName())) {
            throw new NameExistsException(
                    "El nombre " + familyDTOReq.getName() + " ya existe. Ingrese un nuevo nombre");
        }

        familyProductRepository.save(modelMapper.map(familyDTOReq, FamilyProduct.class));
    }

    //ACTUALIZAR ESTADO DE FAMILIA
    @Override
    public void updateFamilyActive(FamilyActiveDTOReq familyActiveDTOReq) throws IdNotFoundException, NameExistsException {
         var familyDB = familyProductRepository.findById(familyActiveDTOReq.getId())
                .orElseThrow(
                        () -> new IdNotFoundException("El id " + familyActiveDTOReq + " no existe. Ingrese un nuevo id"));
         familyDB.setActive(familyActiveDTOReq.isActive());
         familyProductRepository.save(familyDB);         
    }


    // BORRAR FAMILIA
    @Override
    public void deleteFamily(Long id) {
        familyProductRepository.deleteById(id);
    }



    
}
