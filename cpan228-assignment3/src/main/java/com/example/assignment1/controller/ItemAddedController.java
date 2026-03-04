package com.example.assignment1.controller;

import com.example.assignment1.data.ItemRepository;
import com.example.assignment1.model.Brand;
import com.example.assignment1.model.Item;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/list")
public class ItemAddedController {

    private final ItemRepository itemRepository;

    public ItemAddedController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    // Show all items (original list)
    @GetMapping
    public String itemAdded(Model model) {
        List<Item> items = itemRepository.findAll();
        model.addAttribute("items", items);
        return "list";
    }

    // Show items from Balenciaga created in 2022
    @GetMapping("/filter/brand-and-year")
    public String filterByBrandAndYear(Model model) {
        List<Item> items = itemRepository.findAll()
                .stream()
                .filter(item -> item.getBrand() == Brand.BALENCIAGA && item.getYearCreated() == 2022)
                .collect(Collectors.toList());
        model.addAttribute("items", items);
        return "list";
    }

    // Sort items by brand
    @GetMapping("/sort")
    public String sortByBrand(Model model) {
        List<Item> items = itemRepository.findAll()
                .stream()
                .sorted((item1, item2) -> item1.getBrand().compareTo(item2.getBrand()))
                .collect(Collectors.toList());
        model.addAttribute("items", items);
        return "list";
    }

    @GetMapping("/filter/year")
    public String filterByYear(Integer year, Model model) {
        List<Item> items;

        if (year == null) {
            items = itemRepository.findAll();
        } else {
            items = itemRepository.findAll()
                    .stream()
                    .filter(item -> item.getYearCreated() == year)
                    .collect(Collectors.toList());
        }

        model.addAttribute("items", items);
        return "list";
    }

    @GetMapping("/filter/brand")
    public String filterByBrand(String brand, Model model) {
        List<Item> items;

        if (brand == null || brand.isEmpty()) {
            items = itemRepository.findAll();
        } else {
            items = itemRepository.findAll()
                    .stream()
                    .filter(item -> item.getBrand().name().equalsIgnoreCase(brand))
                    .collect(Collectors.toList());
        }

        model.addAttribute("items", items);
        return "list";
    }

}
