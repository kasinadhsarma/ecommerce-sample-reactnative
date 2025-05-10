import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Heart } from 'lucide-react-native';
import ScreenContainer from '@/components/layout/ScreenContainer';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/common/Button';
import { router } from 'expo-router';
import { Product } from '@/types/product';
import { useProducts } from '@/context/ProductContext';

export default function WishlistScreen() {
  // In a real app, this would be stored in a proper context or database
  // For this demo, we'll just use local state with some mock data
  const { products } = useProducts();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate some items in the wishlist for demo purposes
    setWishlistItems(products.filter((_, index) => index % 6 === 0).slice(0, 5));
  }, [products]);

  const handleContinueShopping = () => {
    router.push('/');
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
  };

  if (wishlistItems.length === 0) {
    return (
      <ScreenContainer scrollable={false}>
        <View style={styles.emptyContainer}>
          <Heart size={80} color="#D1D5DB" />
          <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
          <Text style={styles.emptyText}>
            Save items you love to your wishlist and they will appear here
          </Text>
          <Button
            title="Continue Shopping"
            onPress={handleContinueShopping}
            style={styles.continueButton}
          />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Wishlist</Text>
        <Text style={styles.itemCount}>
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
        </Text>
      </View>

      <FlatList
        data={wishlistItems}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <ProductCard product={item} compact />
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => handleRemoveFromWishlist(item.id)}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  itemCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  productList: {
    gap: 24,
    paddingBottom: 24,
  },
  productContainer: {
    width: '100%',
  },
  removeButton: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  removeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#EF4444',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  continueButton: {
    width: 200,
  },
});