import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useProducts } from '@/context/ProductContext';
import ScreenContainer from '@/components/layout/ScreenContainer';
import ProductCard from '@/components/product/ProductCard';
import { ChevronLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { ProductCategory } from '@/types/product';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const { getProductsByCategory, categories } = useProducts();
  
  const categoryId = id as ProductCategory;
  const products = getProductsByCategory(categoryId);
  
  // Find category information
  const categoryInfo = categories.find(cat => cat.id === categoryId);
  
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>{categoryInfo?.name || categoryId}</Text>
        <View style={styles.placeholder} />
      </View>
      
      {products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <ProductCard product={item} compact />
            </View>
          )}
          keyExtractor={(item) => item.id}
          numColumns={1}
          contentContainerStyle={styles.productList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No products found</Text>
          <Text style={styles.emptyText}>
            There are no products in this category yet.
          </Text>
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  productList: {
    paddingBottom: 24,
  },
  productContainer: {
    marginBottom: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});