package com.ecommerce.microservices.repository;
import com.ecommerce.microservices.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Products,Long> {
}
