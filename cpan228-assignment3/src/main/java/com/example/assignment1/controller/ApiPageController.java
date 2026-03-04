package com.example.assignment1.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.ui.Model;

@Controller
public class ApiPageController {

    @GetMapping("/show-data")
    public String showData(Model model) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8081/info"; // REST API URL (App B)

        String data = restTemplate.getForObject(url, String.class);

        model.addAttribute("apiData", data);
        return "data-page"; // maps to data-page.html
    }
}
