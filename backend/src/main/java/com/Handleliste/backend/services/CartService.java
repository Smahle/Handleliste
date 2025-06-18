package com.Handleliste.backend.services;

import com.Handleliste.backend.models.Cart;

import java.util.List;

public interface CartService {
    List<Cart> getAllCarts();
    Cart createCart(Cart cart);
    Cart updateCart(String id, Cart updatedCart);
    void deleteCart(String id);
    Cart getCartById(String id); // Optional: useful for GET by ID
}