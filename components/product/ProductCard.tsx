import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Star, ShoppingCart } from 'lucide-react-native';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import Button from '@/components/common/Button';

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

const ProductCard = ({ product, compact = false }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = () => {
    addToCart(product.id, 1);
  };

  return (
    <TouchableOpacity 
      style={[styles.card, compact && styles.compactCard]} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.images[0] }} 
          style={styles.image} 
          resizeMode="cover"
        />
        {product.discountPrice && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.category}>{product.category.toUpperCase()}</Text>
        <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={16} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.rating}>{product.rating}</Text>
          <Text style={styles.reviews}>({product.reviewCount})</Text>
        </View>
        
        <View style={styles.priceRow}>
          <View>
            {product.discountPrice ? (
              <View style={styles.priceContainer}>
                <Text style={styles.discountedPrice}>${product.discountPrice.toFixed(2)}</Text>
                <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
              </View>
            ) : (
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            )}
          </View>
          
          {!compact && (
            <TouchableOpacity 
              style={styles.cartButton}
              onPress={handleAddToCart}
            >
              <ShoppingCart size={18} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
        
        {compact && (
          <Button 
            title="Add to Cart" 
            onPress={handleAddToCart}
            size="small"
            fullWidth
            icon={<ShoppingCart size={16} color="#FFFFFF" />}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  compactCard: {
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 170,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F97316',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    fontSize: 10,
  },
  content: {
    padding: 12,
  },
  category: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 6,
    height: 40,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#1F2937',
    marginLeft: 4,
  },
  reviews: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  discountedPrice: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  originalPrice: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  cartButton: {
    backgroundColor: '#3B82F6',
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductCard;