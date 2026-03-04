package com.example.assignment1.controller;

import com.example.assignment1.data.ItemRepository;
import com.example.assignment1.model.Brand;
import com.example.assignment1.model.Item;
import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import java.util.Arrays;
import java.util.List;

@Controller
@Slf4j
@RequestMapping("/new_item")
public class ItemController {

    private final ItemRepository itemRepository;

    // @Autowired
    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @GetMapping
    public String showForm(Model model) {
        List<Brand> brands = Arrays.asList(Brand.values());
        model.addAttribute("brands", brands);
        model.addAttribute("item", new Item("", Brand.BALENCIAGA, 0.0, 2022));
        return "new_item";
    }

    @PostMapping
    public String postAdd(@ModelAttribute Item item) {
        itemRepository.save(item);
        return "redirect:/list";
    }
}
