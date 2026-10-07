package com.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.model.Restaurant;
import com.web.repo.RestaurantRepo;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepo repo;

    // Add restaurant
    public Restaurant addRestaurant(Restaurant restaurant) {
        return repo.save(restaurant);
    }

    // Get all restaurants
    public List<Restaurant> getAllRestaurants() {
        return repo.findAll();
    }

    // Get restaurant by ID
    public Restaurant getRestaurantById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // Update restaurant
    public Restaurant updateRestaurant(Long id, Restaurant restaurant) {

        Restaurant existing = repo.findById(id).orElse(null);

        if (existing != null) {
            existing.setName(restaurant.getName());
            existing.setLocation(restaurant.getLocation());
            existing.setPhone(restaurant.getPhone());
            existing.setCuisine(restaurant.getCuisine());

            return repo.save(existing);
        }

        return null;
    }

    // Delete restaurant
    public void deleteRestaurant(Long id) {
        repo.deleteById(id);
    }
}