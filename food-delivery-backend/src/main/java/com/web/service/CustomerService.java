
package com.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.model.Customer;
import com.web.repo.CustomerRepo;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepo repo;

    // Add customer
    public Customer addCustomer(Customer customer) {
        return repo.save(customer);
    }

    // Get all customers
    public List<Customer> getAllCustomers() {
        return repo.findAll();
    }

    // Get customer by ID
    public Customer getCustomerById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // Login customer
    public Customer login(String email, String password) {

        Customer customer = repo.findByEmail(email);

        if (customer != null &&
            customer.getPassword().equals(password)) {

            return customer;
        }

        return null;
    }

    // Update customer
    public Customer updateCustomer(Long id, Customer customer) {

        Customer existing = repo.findById(id).orElse(null);

        if (existing != null) {

            existing.setName(customer.getName());
            existing.setEmail(customer.getEmail());
            existing.setPhone(customer.getPhone());
            existing.setAddress(customer.getAddress());

            return repo.save(existing);
        }

        return null;
    }

    // Delete customer
    public void deleteCustomer(Long id) {
        repo.deleteById(id);
    }
}

