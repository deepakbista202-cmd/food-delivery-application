package com.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.web.model.Restaurant;
import com.web.service.RestaurantService;

@RestController
@RequestMapping("/restaurant")
@CrossOrigin
public class RestaurantController {

    @Autowired
    private RestaurantService service;

    // Add restaurant
    @PostMapping("/add")
    public Restaurant addRestaurant(@RequestBody Restaurant restaurant) {
        return service.addRestaurant(restaurant);
    }

    // Get all restaurants
    @GetMapping("/all")
    public List<Restaurant> getAllRestaurants() {
        return service.getAllRestaurants();
    }

    // Get restaurant by ID
    @GetMapping("/{id}")
    public Restaurant getRestaurantById(@PathVariable Long id) {
        return service.getRestaurantById(id);
    }

    // Update restaurant
    @PutMapping("/update/{id}")
    public Restaurant updateRestaurant(
            @PathVariable Long id,
            @RequestBody Restaurant restaurant) {

        return service.updateRestaurant(id, restaurant);
    }

    // Delete restaurant
    @DeleteMapping("/delete/{id}")
    public String deleteRestaurant(@PathVariable Long id) {

        service.deleteRestaurant(id);

        return "Restaurant deleted successfully";
    }
}