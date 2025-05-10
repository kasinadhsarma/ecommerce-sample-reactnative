import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSearchParams } from 'expo-router';
import ScreenContainer from '@/components/layout/ScreenContainer';
import SearchBar from '@/components/layout/SearchBar';
import ProductCard from '@/components/product/ProductCard';
import { useProducts } from '@/context/ProductContext';
import { Search as SearchIcon } from 'lucide-react-native';

export default function SearchScreen() {
  const { searchProducts, categories } = useProducts();
  const params = useSearchParams();
  const initialQuery = params.q as string || '';
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      const results = searchProducts(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      {query ? (
        <>
          <SearchIcon size={60} color="#D1D5DB" />
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptyText}>
            We couldn't find any products matching "{query}"
          </Text>
        </>
      ) : (
        <>
          <SearchIcon size={60} color="#D1D5DB" />
          <Text style={styles.emptyTitle}>Search for products</Text>
          <Text style={styles.emptyText}>
            Find products by name, category, or description
          </Text>
        </>
      )}
    </View>
  );

  return (
    <ScreenContainer scrollable={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
      </View>
      
      <SearchBar 
        onSearch={handleSearch} 
        initialValue={query}
        autoFocus={!query}
      />
      
      {searchResults.length > 0 ? (
        <>
          <Text style={styles.resultsCount}>
            {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
          </Text>
          
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <ProductCard product={item} compact />
              </View>
            )}
            keyExtractor={(item) => item.id}
            numColumns={1}
            contentContainerStyle={styles.productList}
          />
        </>
      ) : (
        renderEmptyState()
      )}
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
  resultsCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 16,
  },
  productList: {
    paddingBottom: 100,
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
    maxWidth: 280,
  },
});