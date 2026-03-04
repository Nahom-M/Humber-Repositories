package com.example.assignment1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING) // Store enum as string in DB
    private Brand brand;

    private double price;
    private int yearCreated;

    @Column(nullable = false, updatable = false)
    private Date createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date(System.currentTimeMillis());
    }

    public Item(String name, Brand brand, double price, int yearCreated) {
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.yearCreated = yearCreated;
        this.createdAt = new Date(System.currentTimeMillis());
    }
}
