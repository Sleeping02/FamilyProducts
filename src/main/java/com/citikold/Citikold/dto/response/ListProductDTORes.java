package com.citikold.Citikold.dto.response;

import java.util.Date;

import com.citikold.Citikold.model.FamilyProduct;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListProductDTORes {

     private Long id;

    private String cod_product;

    private String name;

    private FamilyProduct familyProduct;

    private double price;
    private int stock;
    private boolean active;
    private Date created_date;
    
}
