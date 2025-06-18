package com.Handleliste.backend.controller;

import com.Handleliste.backend.models.Cart;
import com.Handleliste.backend.services.CartService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carts")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public List<Cart> getAllCarts() {
        return cartService.getAllCarts();
    }

    @PostMapping
    public Cart createCart(@RequestBody Cart cart) {
        return cartService.createCart(cart);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCart(@PathVariable String id, @RequestBody Cart updatedCart) {
        try {
            Cart existingCart = cartService.getCartById(id);
            if (existingCart == null) {
                return ResponseEntity.notFound().build();
            }

            // Update fields - adapt as needed
            existingCart.setName(updatedCart.getName());
            existingCart.setOwner(updatedCart.getOwner());
            existingCart.setProducts(updatedCart.getProducts());
            existingCart.setReceipts(updatedCart.getReceipts());

            Cart savedCart = cartService.updateCart(id, existingCart);

            return ResponseEntity.ok(savedCart);
        } catch (Exception e) {
            e.printStackTrace(); // Log to console, better to use a logger
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteCart(@PathVariable String id) {
        cartService.deleteCart(id);
    }
}
