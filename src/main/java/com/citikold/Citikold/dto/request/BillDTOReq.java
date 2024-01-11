package com.citikold.Citikold.dto.request;

import java.util.List;

import com.citikold.Citikold.model.DetailBill;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
    public class BillDTOReq {

        private Long id;
    @NotNull(message = "No puede estar vacio")
        private int num_bill;
        @NotNull(message = "No puede estar vacio")
        private int ruc_customer;
       
        private String raz_customer;
        @NotNull(message = "No puede estar vacio")
        private double perc_igv;

        
        private double igv;
        private double total;
        private double subtotal;
        private List<DetailBill> details;
    }
