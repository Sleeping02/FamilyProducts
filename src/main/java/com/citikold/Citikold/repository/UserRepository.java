package com.citikold.Citikold.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.citikold.Citikold.model.User;

public interface UserRepository extends JpaRepository <User, Long> {
    
}
