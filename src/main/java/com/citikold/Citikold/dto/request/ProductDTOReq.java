package com.citikold.Citikold.dto.request;

import com.citikold.Citikold.model.FamilyProduct;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTOReq {

    private Long id;
    @NotNull(message = "No puede estar vacio")
    private String cod_product;
    @NotNull(message = "No puede estar vacio")
    private String name;

    @NotNull(message = "No puede estar vacio")
    private FamilyProduct familyProduct;
    @NotNull(message = "No puede estar vacio")
    private double price;
    @NotNull(message = "No puede estar vacio")
    private int stock;
    
    private boolean active=true;


       @AssertTrue(message = "Debe ser 'true' o 'false'")
    private boolean isValidActive() {
       
        return active || !active;  // Devuelve true si active es true o false
    }
}
