package com.ecommerce.service;
import com.ecommerce.entity.Products;
import com.ecommerce.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
@Service
public class ProductsService {
    @Autowired
    ProductsRepository productsRepository;

    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
    public List<Products> getAllProducts() {
        ResponseEntity<List<Products>> responseEntity = restTemplate().exchange("http://localhost:5225/api/products", HttpMethod.GET, null, new ParameterizedTypeReference<List<Products>>() {});
        return responseEntity.getBody();
    }

    public Products getProductById(Long id) {
        ResponseEntity<Products> responseEntity = restTemplate().getForEntity("http://localhost:5225/api/products/{id}", Products.class, id);
        return responseEntity.getBody();
    }
    public Products addProducts(Products products) {
        return productsRepository.save(products);
    }
    public void deleteProducts(Long id) {
        productsRepository.deleteById(id);
    }
    public Products updateProduct(long productId, Products product) {
        if (productsRepository.existsById(productId)) {
            product.setProductId(productId);
            return productsRepository.save(product);
        }
        return null;
    }

    public List<Products> getProductsByCategoryId(Integer categoryId) {
        return productsRepository.findByProductCategory_CategoryId(categoryId);
    }
}