package com.ecommerce.service;
import com.ecommerce.entity.OrderDetails;
import com.ecommerce.entity.Payment;
import com.ecommerce.entity.PaymentOrderMapping;
import com.ecommerce.entity.enumerate.OrderStatus;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.PaymentRepository;
import com.ecommerce.repository.paymentOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private paymentOrderRepository paymentOrderRepository;

    public OrderDetails saveOrder(OrderDetails orderDetails) {
        OrderDetails savedOrderDetails = orderRepository.save(orderDetails);

        Payment payment = new Payment();
        paymentRepository.save(payment);
        OrderDetails order = new OrderDetails();
        orderRepository.save(order);
        PaymentOrderMapping mapping = new PaymentOrderMapping();
        mapping.setPayment(payment);
        mapping.setOrder(order);
        paymentOrderRepository.save(mapping);

        return savedOrderDetails;
    }


    public Optional<OrderDetails> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }

    public Iterable<OrderDetails> getAllOrders() {
        return orderRepository.findAll();
    }

    public OrderDetails updateOrderStatus(Long orderId, OrderStatus newStatus) {
        return orderRepository.findById(orderId)
                .map(order -> {
                    order.setOrderStatus(newStatus);
                    return orderRepository.save(order);
                })
                .orElse(null);
    }

    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }
}
