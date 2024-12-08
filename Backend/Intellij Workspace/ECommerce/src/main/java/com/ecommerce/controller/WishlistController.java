package com.ecommerce.controller;
import com.ecommerce.entity.Wishlist;
import com.ecommerce.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    @Autowired
    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping
    public ResponseEntity<List<Wishlist>> getAllWishlistItems() {
        List<Wishlist> wishlistItems = wishlistService.getAllWishlistItems();
        return new ResponseEntity<>(wishlistItems, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Wishlist> addToWishlist(@RequestBody Wishlist wishlistItem) {
        Wishlist addedWishlistItem = wishlistService.addToWishlist(wishlistItem);
        return new ResponseEntity<>(addedWishlistItem, HttpStatus.CREATED);
    }

    @PutMapping("/{wishlistId}")
    public ResponseEntity<Wishlist> updateWishlistItem(
            @PathVariable long wishlistId,
            @RequestBody Wishlist updatedWishlistItem
    ) {
        Wishlist updatedItem = wishlistService.updateWishlistItem(wishlistId, updatedWishlistItem);
        return new ResponseEntity<>(updatedItem, HttpStatus.OK);
    }

    @DeleteMapping("/{wishlistId}")
    public ResponseEntity<Void> removeFromWishlist(@PathVariable long wishlistId) {
        wishlistService.removeFromWishlist(wishlistId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/addToWishlist")
    public ResponseEntity<String> addToWishlist(@RequestBody Map<String, Object> request) {
        Long uid = Long.parseLong(request.get("userId").toString());
        Long productId = Long.parseLong(request.get("productId").toString());

        try {
            wishlistService.addToWishlist(uid, productId);
            return ResponseEntity.ok("Product added to wishlist successfully");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found with provided id");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding to wishlist");
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Wishlist>> getWishlistByUserId(@PathVariable Long userId) {
        List<Wishlist> wishlistItems = wishlistService.findByUserId(userId);
        return ResponseEntity.ok(wishlistItems);
    }
}