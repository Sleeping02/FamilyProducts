package com.citikold.Citikold.dto.request;

import com.citikold.Citikold.model.Bill;
import com.citikold.Citikold.model.Product;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillDetailDTOReq {

      private Long id;
      
    private Bill bill;
    
    private Product product;
    @NotNull
    private int cantidad;
    @NotNull
    private double sub;



    
}
