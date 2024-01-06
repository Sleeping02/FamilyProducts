package com.citikold.Citikold.dto.request;


import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FamilyDTOReq {

    private Long id;
    @NotNull(message = "No puede estar vacio")
    private String cod_family;
     @NotNull(message = "No puede estar vacio")
    private String name;

    private boolean active=true;

    @AssertTrue(message = "Debe ser 'true' o 'false'")
    private boolean isValidActive() {
        
        return active || !active;  // Devuelve true si active es true o false
    }

   
  
    
    
}
