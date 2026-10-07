
package com.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.model.Customer;
import com.web.service.CustomerService;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {

    @Autowired
    private CustomerService service;

    // Add customer
    @PostMapping("/add")
    public Customer addCustomer(@RequestBody Customer customer) {
        return service.addCustomer(customer);
    }

    // Login customer
    @PostMapping("/login")
    public Customer login(@RequestBody Customer customer) {

        Customer loggedInCustomer =
                service.login(
                        customer.getEmail(),
                        customer.getPassword()
                );

        return loggedInCustomer;
    }

    // Get all customers
    @GetMapping("/all")
    public List<Customer> getAllCustomers() {
        return service.getAllCustomers();
    }

    // Get customer by ID
    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return service.getCustomerById(id);
    }

    // Update customer
    @PutMapping("/update/{id}")
    public Customer updateCustomer(
            @PathVariable Long id,
            @RequestBody Customer customer) {

        return service.updateCustomer(id, customer);
    }

    // Delete customer
    @DeleteMapping("/delete/{id}")
    public String deleteCustomer(@PathVariable Long id) {

        service.deleteCustomer(id);

        return "Customer deleted successfully";
    }

}
