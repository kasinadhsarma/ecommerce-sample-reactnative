import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product, ProductCategory } from '@/types/product';
import { mockProducts } from '@/data/mockData';

type ProductContextType = {
  products: Product[];
  featuredProducts: Product[];
  categories: { id: ProductCategory; name: string; image: string }[];
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: ProductCategory) => Product[];
  searchProducts: (query: string) => Product[];
  loading: boolean;
  error: string | null;
};

const ProductContext = createContext<ProductContextType>({
  products: [],
  featuredProducts: [],
  categories: [],
  getProductById: () => undefined,
  getProductsByCategory: () => [],
  searchProducts: () => [],
  loading: false,
  error: null,
});

export const useProducts = () => useContext(ProductContext);

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'electronics' as ProductCategory, name: 'Electronics', image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'clothing' as ProductCategory, name: 'Clothing', image: 'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'home' as ProductCategory, name: 'Home', image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'beauty' as ProductCategory, name: 'Beauty', image: 'https://images.pexels.com/photos/2253834/pexels-photo-2253834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'sports' as ProductCategory, name: 'Sports', image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'books' as ProductCategory, name: 'Books', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'toys' as ProductCategory, name: 'Toys', image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'jewelry' as ProductCategory, name: 'Jewelry', image: 'https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simulate API fetch delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setProducts(mockProducts);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: ProductCategory) => {
    return products.filter(product => product.category === category);
  };

  const searchProducts = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      product =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  // Get a subset of products that are featured
  const featuredProducts = products.filter((_, index) => index % 5 === 0).slice(0, 6);

  return (
    <ProductContext.Provider
      value={{
        products,
        featuredProducts,
        categories,
        getProductById,
        getProductsByCategory,
        searchProducts,
        loading,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};