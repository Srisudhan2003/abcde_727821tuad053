package com.ecommerce.entity;
import jakarta.persistence.*;

import java.math.BigInteger;

@Entity
    public class Payment {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String razorpayOrderId;
        private String secretKey;
        private String secretId;
        private String pgName;
        private BigInteger amount;

    @OneToOne(mappedBy = "payment", cascade = CascadeType.ALL)
    private PaymentOrderMapping paymentOrderMapping;


    public Payment(Long id, String razorpayOrderId, String secretKey, String secretId, String pgName, BigInteger amount, PaymentOrderMapping paymentOrderMapping) {
        this.id = id;
        this.razorpayOrderId = razorpayOrderId;
        this.secretKey = secretKey;
        this.secretId = secretId;
        this.pgName = pgName;
        this.amount = amount;
        this.paymentOrderMapping = paymentOrderMapping;
    }


    public Payment(String razorpayOrderId, String secretKey, String secretId, String pgName, BigInteger amount) {
        this.id = id;
        this.razorpayOrderId = razorpayOrderId;
        this.secretKey = secretKey;
        this.secretId = secretId;
        this.pgName = pgName;
        this.amount = amount;
        PaymentOrderMapping paymentOrderMapping = new PaymentOrderMapping();
        paymentOrderMapping.setPayment(this);  // Set the associated Payment

        // Set the PaymentOrderMapping in the Payment entity
        this.paymentOrderMapping = paymentOrderMapping;
    }

    public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getRazorpayOrderId() {
            return razorpayOrderId;
        }

        public void setRazorpayOrderId(String razorpayOrderId) {
            this.razorpayOrderId = razorpayOrderId;
        }

        public String getSecretKey() {
            return secretKey;
        }

        public void setSecretKey(String secretKey) {
            this.secretKey = secretKey;
        }

        public String getSecretId() {
            return secretId;
        }

        public void setSecretId(String secretId) {
            this.secretId = secretId;
        }

        public String getPgName() {
            return pgName;
        }

        public void setPgName(String pgName) {
            this.pgName = pgName;
        }

        public BigInteger getAmount() {
            return amount;
        }

        public void setAmount(BigInteger amount) {
            this.amount = amount;
        }


    public Payment(){

    }

}
