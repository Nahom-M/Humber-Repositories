package com.example.assignment1.service;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import com.example.assignment1.data.ItemRepository;
import com.example.assignment1.model.Brand;
import com.example.assignment1.model.Item;
import java.util.List;

@Service
public class Clr implements CommandLineRunner {
    private final ItemRepository itemRepository;

    public Clr(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Item item1 = new Item("Orange Sweater", Brand.BALENCIAGA, 1200.45, 2022);
        Item item2 = new Item("Backpack", Brand.LOUIS_VUITTON, 999.99, 2023);
        Item item3 = new Item("T-shirt", Brand.BALENCIAGA, 699.99, 2023);
        Item item4 = new Item("Backpack", Brand.PRADA, 599.99, 2024);
        itemRepository.saveAll(List.of(item1, item2, item3, item4));
    }
}
