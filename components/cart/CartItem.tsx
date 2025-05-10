import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

type CartItemProps = {
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
};

const CartItem = ({ product, quantity, color, size }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.imageContainer}
        onPress={() => router.push(`/product/${product.id}`)}
      >
        <Image 
          source={{ uri: product.images[0] }} 
          style={styles.image} 
          resizeMode="cover"
        />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push(`/product/${product.id}`)}>
            <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
            <Trash2 size={18} color="#6B7280" />
          </TouchableOpacity>
        </View>
        
        {(color || size) && (
          <View style={styles.options}>
            {color && <Text style={styles.option}>Color: {color}</Text>}
            {size && <Text style={styles.option}>Size: {size}</Text>}
          </View>
        )}
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            ${(product.discountPrice || product.price).toFixed(2)}
          </Text>
          
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={handleDecrease}
            >
              <Minus size={16} color="#6B7280" />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={handleIncrease}
            >
              <Plus size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
    marginBottom: 4,
  },
  removeButton: {
    padding: 4,
  },
  options: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  option: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginRight: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    width: 32,
    textAlign: 'center',
  },
});

export default CartItem;