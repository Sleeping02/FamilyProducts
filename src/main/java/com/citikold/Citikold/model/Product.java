package com.citikold.Citikold.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name="Product")
@Table(name = "product")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 15, unique = true)
    private String cod_product;

    private String name;

    @ManyToOne
    @JoinColumn(name="id_family")
    private FamilyProduct familyProduct;

    private double price;
    private int stock;
    @Column(columnDefinition = "BOOLEAN DEFAULT true")
    private boolean active;
    @Column(updatable = false)
    private Date created_date;

}
