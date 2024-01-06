package com.citikold.Citikold.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "familyproduct")
@Entity(name = "FamilyProduct")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class FamilyProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 15, unique = true)
    private String cod_family;
    private String name;
    @Column(columnDefinition = "BOOLEAN DEFAULT true")
    private boolean active;
    @Column(updatable = false)
    private Date created_date;

}
