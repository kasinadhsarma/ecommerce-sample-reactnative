import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Search, X } from 'lucide-react-native';

type SearchBarProps = {
  placeholder?: string;
  onSearch?: (query: string) => void;
  initialValue?: string;
  autoFocus?: boolean;
};

const SearchBar = ({ 
  placeholder = 'Search for products...', 
  onSearch,
  initialValue = '',
  autoFocus = false
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleSubmit = () => {
    if (onSearch) {
      onSearch(query);
    } else {
      // Navigate to search results if no onSearch handler
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchIconContainer}>
        <Search size={20} color="#6B7280" />
      </View>
      
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        clearButtonMode="never"
        autoFocus={autoFocus}
      />
      
      {query.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <X size={18} color="#6B7280" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIconContainer: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    paddingVertical: 8,
    color: '#1F2937',
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;