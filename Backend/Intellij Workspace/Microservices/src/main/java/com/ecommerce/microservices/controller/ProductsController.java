package com.ecommerce.microservices.controller;
import com.ecommerce.microservices.entity.Products;
import com.ecommerce.microservices.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductsController {
    @Autowired
    ProductsService productsService;

    @GetMapping
    public ResponseEntity<List<Products>> getAllProducts(){
        List<Products> getProducts = productsService.getAllProducts();
        return new ResponseEntity<>(getProducts, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Products> getProductById(@PathVariable long id){
        Optional<Products> product = productsService.getProductsById(id);
        return product.map(value -> new ResponseEntity<>(value,HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}