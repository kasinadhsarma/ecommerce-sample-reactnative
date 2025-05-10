import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useCart } from '@/context/CartContext';
import ScreenContainer from '@/components/layout/ScreenContainer';
import CartItem from '@/components/cart/CartItem';
import Button from '@/components/common/Button';
import { ShoppingBag } from 'lucide-react-native';
import { router } from 'expo-router';

export default function CartScreen() {
  const { cartProducts, subtotal, totalItems, clearCart } = useCart();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const handleContinueShopping = () => {
    router.push('/');
  };

  if (cartProducts.length === 0) {
    return (
      <ScreenContainer scrollable={false}>
        <View style={styles.emptyContainer}>
          <ShoppingBag size={80} color="#D1D5DB" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>
            Add items to your cart and they will appear here
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
        <Text style={styles.title}>Shopping Cart</Text>
        <Text style={styles.itemCount}>
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </Text>
      </View>

      <FlatList
        data={cartProducts}
        renderItem={({ item }) => (
          <CartItem 
            product={item} 
            quantity={item.quantity} 
            color={item.color}
            size={item.size}
          />
        )}
        keyExtractor={(item) => `${item.id}-${item.color || ''}-${item.size || ''}`}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>Calculated at checkout</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Proceed to Checkout"
            onPress={handleCheckout}
            fullWidth
            style={styles.checkoutButton}
          />
          <Button
            title="Clear Cart"
            onPress={clearCart}
            type="outline"
            fullWidth
            style={styles.clearButton}
          />
        </View>
      </View>
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
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  summaryValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  totalLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
  totalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#3B82F6',
  },
  buttonContainer: {
    marginTop: 16,
    gap: 12,
  },
  checkoutButton: {
    marginBottom: 8,
  },
  clearButton: {},
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