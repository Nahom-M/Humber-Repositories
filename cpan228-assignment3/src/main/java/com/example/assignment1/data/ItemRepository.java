package com.example.assignment1.data;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.assignment1.model.Brand;
import com.example.assignment1.model.Item;
import java.util.Optional;
import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Optional<Item> findItemByName(String name);

    Optional<Item> findItemById(Long id); // Corrected: should take an ID, not a Brand

    List<Item> findByBrandAndYearCreated(Brand brand, int year);
}
