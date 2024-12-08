package com.ecommerce.entity;

import jakarta.persistence.*;

@Entity
public class PaymentOrderMapping
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderDetails order;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public OrderDetails getOrder() {
        return order;
    }

    public void setOrder(OrderDetails order) {
        this.order = order;
    }

    public PaymentOrderMapping(Long id, Payment payment, OrderDetails order) {
        this.id = id;
        this.payment = payment;
        this.order = order;
    }
    public PaymentOrderMapping(){

    }
}
