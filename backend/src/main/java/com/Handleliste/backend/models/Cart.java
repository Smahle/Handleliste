package com.Handleliste.backend.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "carts")
public class Cart {


    @Id
    private String id;

    private String name;

    private String owner;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Product> products;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Receipt> receipts;

    // Constructors
    public Cart() {}

    public Cart(String id, String name, String owner, List<Product> products, List<Receipt> receipts) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.products = products;
        this.receipts = receipts;
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getOwner() { return owner; }
    public void setOwner(String owner) { this.owner = owner; }
    public List<Product> getProducts() { return products; }
    public void setProducts(List<Product> products) { this.products = products; }
    public List<Receipt> getReceipts() { return receipts; }
    public void setReceipts(List<Receipt> receipts) { this.receipts = receipts; }
}
