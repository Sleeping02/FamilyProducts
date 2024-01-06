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
    private ListBillDTORes bill;
    private ListProductDTORes product;
    private int cantidad;
    private double subtotal;

}
