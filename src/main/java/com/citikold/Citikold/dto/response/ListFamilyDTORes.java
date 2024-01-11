package com.citikold.Citikold.dto.response;

import java.util.Date;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListFamilyDTORes {

    
        
    private Long id;

    private String cod_family;
    private String name;
    private boolean active;
    private Date created_date;
    
    
}
