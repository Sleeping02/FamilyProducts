package com.citikold.Citikold.dto.request;


import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FamilyActiveDTOReq {

    private Long id;
 

    private boolean active;

    @AssertTrue(message = "Debe ser 'true' o 'false'")
    private boolean isValidActive() {
        
        return active || !active;  // Devuelve true si active es true o false
    }

   
  
    
    
}
