import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ProductCategory } from '@/types/product';

type CategoryCardProps = {
  id: ProductCategory;
  name: string;
  image: string;
};

const CategoryCard = ({ id, name, image }: CategoryCardProps) => {
  const handlePress = () => {
    router.push(`/category/${id}`);
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Image 
        source={{ uri: image }} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default CategoryCard;