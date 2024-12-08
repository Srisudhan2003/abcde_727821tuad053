package com.ecommerce.service;
import com.ecommerce.entity.Products;
import com.ecommerce.entity.Wishlist;
import com.ecommerce.repository.WishlistRepository;
import jakarta.ws.rs.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;

    @Autowired
    public WishlistService(WishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    public List<Wishlist> getAllWishlistItems() {
        return wishlistRepository.findAll();
    }

    public Wishlist addToWishlist(Wishlist wishlistItem) {
        return wishlistRepository.save(wishlistItem);
    }

    public Wishlist updateWishlistItem(long wishlistId, Wishlist updatedWishlistItem) {
        Wishlist existingWishlistItem = wishlistRepository.findById(wishlistId)
                .orElseThrow(() -> new NotFoundException("Wishlist item not found with id: " + wishlistId));

        // Update the fields you want to allow modification
        existingWishlistItem.setProduct(updatedWishlistItem.getProduct());
        existingWishlistItem.setUser(updatedWishlistItem.getUser());

        // Save the updated wishlist item
        return wishlistRepository.save(existingWishlistItem);
    }

    public void addToWishlist(Long userId, Long productId) {
        Wishlist wishlistItem = new Wishlist();
        wishlistItem.setProductId(productId);
        wishlistItem.setUserId(userId);

        wishlistRepository.save(wishlistItem);
    }
    public void removeFromWishlist(long wishlistId) {
        wishlistRepository.deleteById(wishlistId);
    }

    public List<Wishlist> findByUserId(Long userId) {
        return wishlistRepository.findByUserId(userId);
    }

}