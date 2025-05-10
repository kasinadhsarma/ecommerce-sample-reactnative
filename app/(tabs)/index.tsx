import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Animated } from 'react-native';
import { useProducts } from '@/context/ProductContext';
import ScreenContainer from '@/components/layout/ScreenContainer';
import ProductCard from '@/components/product/ProductCard';
import CategoryCard from '@/components/product/CategoryCard';
import SearchBar from '@/components/layout/SearchBar';
import Button from '@/components/common/Button';
import { ChevronRight } from 'lucide-react-native';
import { useCart } from '@/context/CartContext';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { products, featuredProducts, categories } = useProducts();
  const { addToCart } = useCart();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateYAnim]);

  const handleAddFeaturedToCart = (productId: string) => {
    addToCart(productId, 1);
  };

  const renderFeaturedItem = ({ item: product, index }: { item: any; index: number }) => (
    <Animated.View
      style={[
        styles.featuredItem,
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateYAnim }],
        },
      ]}
    >
      <TouchableOpacity 
        style={styles.featuredContent}
        onPress={() => router.push(`/product/${product.id}`)}
        activeOpacity={0.9}
      >
        <View style={styles.featuredTextContainer}>
          <Text style={styles.featuredItemTitle}>{product.name}</Text>
          <Text style={styles.featuredItemPrice}>
            ${(product.discountPrice || product.price).toFixed(2)}
          </Text>
          <Button 
            title="Add to Cart" 
            onPress={() => handleAddFeaturedToCart(product.id)}
            size="small"
            style={styles.featuredButton}
          />
        </View>
        <Image 
          source={{ uri: product.images[0] }}
          style={styles.featuredImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome to</Text>
        <Text style={styles.storeName}>ShopFlow</Text>
      </View>

      <SearchBar />
      
      <View style={styles.featuredContainer}>
        <FlatList
          data={featuredProducts.slice(0, 3)}
          renderItem={renderFeaturedItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
          pagingEnabled
        />
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <TouchableOpacity style={styles.viewAll}>
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight size={16} color="#3B82F6" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategoryCard id={item.id} name={item.name} image={item.image} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Products</Text>
        <TouchableOpacity style={styles.viewAll}>
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight size={16} color="#3B82F6" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={products.slice(0, 8)}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>New Arrivals</Text>
        <TouchableOpacity style={styles.viewAll}>
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight size={16} color="#3B82F6" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={products.slice(8, 16).reverse()}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  storeName: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1F2937',
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#3B82F6',
    marginRight: 4,
  },
  productList: {
    paddingRight: 16,
    gap: 12,
  },
  categoryList: {
    paddingRight: 16,
  },
  featuredContainer: {
    marginTop: 24,
    height: 180,
  },
  featuredList: {
    gap: 16,
  },
  featuredItem: {
    width: 320,
    height: 180,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    overflow: 'hidden',
  },
  featuredContent: {
    flexDirection: 'row',
    padding: 16,
    height: '100%',
  },
  featuredTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  featuredItemTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 8,
  },
  featuredItemPrice: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#3B82F6',
    marginBottom: 16,
  },
  featuredImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    alignSelf: 'center',
  },
  featuredButton: {
    width: 120,
  },
});