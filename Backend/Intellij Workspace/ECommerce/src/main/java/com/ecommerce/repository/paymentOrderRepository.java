package com.ecommerce.repository;

import com.ecommerce.entity.PaymentOrderMapping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface paymentOrderRepository extends JpaRepository<PaymentOrderMapping,Long> {
}
