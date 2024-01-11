package com.citikold.Citikold.dto.response;

import java.util.List;

import com.citikold.Citikold.model.DetailBill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListBillDTORes {

    private Long id;
    private int num_bill;
    private int ruc_customer;
    private String raz_customer;
    private double perc_igv;
    private double igv;
    private double total;
    private double subtotal;
    private List<ListBillDTORes> details;

}
