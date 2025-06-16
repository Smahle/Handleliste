package com.Handleliste.backend.repositories;

import com.Handleliste.backend.models.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, String> {
    // You get basic CRUD for free here
}
