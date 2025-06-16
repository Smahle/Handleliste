package com.Handleliste.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    private String id;

    private String name;
    private String image;
    private double currentPrice;
    private int quantity;

    // Constructors
    public Product() {}

    public Product(String id, String name, String image, double currentPrice, int quantity) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.currentPrice = currentPrice;
        this.quantity = quantity;
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public double getCurrentPrice() { return currentPrice; }
    public void setCurrentPrice(double currentPrice) { this.currentPrice = currentPrice; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
