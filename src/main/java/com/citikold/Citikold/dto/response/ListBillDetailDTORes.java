package com.citikold.Citikold.dto.response;

import com.citikold.Citikold.model.Bill;
import com.citikold.Citikold.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListBillDetailDTORes {
    private Long id;
    private Bill bill;
    private Product product;
    private int cantidad;
    private double sub;

}
