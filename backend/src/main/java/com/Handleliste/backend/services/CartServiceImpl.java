package com.Handleliste.backend.services;

import com.Handleliste.backend.models.Cart;
import com.Handleliste.backend.repositories.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    @Override
    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public Cart updateCart(String id, Cart updatedCart) {
        Cart existingCart = cartRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cart not found"));

        // Update fields on existingCart with values from updatedCart
        existingCart.setName(updatedCart.getName());
        existingCart.setOwner(updatedCart.getOwner());
        existingCart.setProducts(updatedCart.getProducts());
        existingCart.setReceipts(updatedCart.getReceipts());

        return cartRepository.save(existingCart);
    }

    @Override
    public void deleteCart(String id) {
        cartRepository.deleteById(id);
    }

    @Override
    public Cart getCartById(String id) {
        return cartRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cart not found"));
    }
}
