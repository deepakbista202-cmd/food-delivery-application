
package com.web.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.model.Customer;

public interface CustomerRepo extends JpaRepository<Customer, Long> {

    Customer findByEmail(String email);

}

