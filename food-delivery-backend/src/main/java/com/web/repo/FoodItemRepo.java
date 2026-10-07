package com.web.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.web.model.FoodItem;

public interface FoodItemRepo extends JpaRepository<FoodItem, Long> {

}