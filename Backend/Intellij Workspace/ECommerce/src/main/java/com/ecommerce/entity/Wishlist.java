package com.ecommerce.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "wishlist", uniqueConstraints = @UniqueConstraint(columnNames = {"uid", "productId"}))
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long wishlistId;

    @ManyToOne
    @JoinColumn(name = "productId")
    @JsonIgnoreProperties("wishlists")
    private Products product;
    @ManyToOne
    @JoinColumn(name = "uid")
    private User user;

    public Wishlist(){
    }

    public Wishlist(long wishlistId, Products product, User user) {
        this.wishlistId = wishlistId;
        this.product = product;
        this.user = user;
    }

    public long getWishlistId() {
        return wishlistId;
    }

    public void setWishlistId(long wishlistId) {
        this.wishlistId = wishlistId;
    }

    public Products getProduct() {
        return product;
    }

    public void setProduct(Products product) {
        this.product = product;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setProductId(long productId) {
        this.product = new Products();
        this.product.setProductId(productId);
    }

    public void setUserId(long userId) {
        this.user = new User();
        this.user.setUid(userId);
    }
}
