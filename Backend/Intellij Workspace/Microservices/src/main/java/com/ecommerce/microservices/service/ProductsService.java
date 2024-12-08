package com.ecommerce.microservices.service;
import com.ecommerce.microservices.entity.Products;
import com.ecommerce.microservices.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class ProductsService {
    @Autowired
    ProductsRepository productsRepository;
    public List<Products> getAllProducts(){
        return productsRepository.findAll();
    }
    public Optional<Products> getProductsById(Long id) {
        return productsRepository.findById(id);
    }

}