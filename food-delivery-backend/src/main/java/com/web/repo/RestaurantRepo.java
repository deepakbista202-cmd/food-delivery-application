package com.web.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.model.Restaurant;

public interface RestaurantRepo extends JpaRepository<Restaurant, Long> {

}