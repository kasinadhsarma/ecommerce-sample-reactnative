import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronRight, Package, CreditCard, Heart, LogOut, User, Settings, CircleHelp as HelpCircle } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import ScreenContainer from '@/components/layout/ScreenContainer';
import Button from '@/components/common/Button';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, isAuthenticated, logout, login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    // For demo purposes, we'll just log in with dummy credentials
    await login('user@example.com', 'password');
    setIsLoggingIn(false);
  };

  const handleLogout = () => {
    logout();
  };

  const MenuOption = ({ icon, title, onPress }: { icon: React.ReactNode; title: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.menuOption} onPress={onPress}>
      <View style={styles.menuOptionContent}>
        <View style={styles.menuIconContainer}>{icon}</View>
        <Text style={styles.menuOptionText}>{title}</Text>
      </View>
      <ChevronRight size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  if (!isAuthenticated) {
    return (
      <ScreenContainer scrollable={false}>
        <View style={styles.unauthenticatedContainer}>
          <User size={80} color="#D1D5DB" />
          <Text style={styles.unauthenticatedTitle}>Sign in to your account</Text>
          <Text style={styles.unauthenticatedText}>
            Sign in to view your profile, orders, and wishlist
          </Text>
          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={isLoggingIn}
            style={styles.signInButton}
          />
          <Button
            title="Create Account"
            onPress={() => {}}
            type="outline"
            style={styles.createAccountButton}
          />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: user?.avatar || 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>My Account</Text>
      </View>

      <View style={styles.menuContainer}>
        <MenuOption
          icon={<Package size={22} color="#3B82F6" />}
          title="Orders"
          onPress={() => {}}
        />
        <MenuOption
          icon={<CreditCard size={22} color="#3B82F6" />}
          title="Payment Methods"
          onPress={() => {}}
        />
        <MenuOption
          icon={<Heart size={22} color="#3B82F6" />}
          title="Wishlist"
          onPress={() => router.push('/wishlist')}
        />
      </View>

      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>Settings</Text>
      </View>

      <View style={styles.menuContainer}>
        <MenuOption
          icon={<Settings size={22} color="#3B82F6" />}
          title="App Settings"
          onPress={() => {}}
        />
        <MenuOption
          icon={<HelpCircle size={22} color="#3B82F6" />}
          title="Help & Support"
          onPress={() => {}}
        />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={22} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
  email: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  editButton: {
    marginTop: 16,
    alignSelf: 'flex-end',
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#3B82F6',
  },
  sectionTitle: {
    marginBottom: 8,
  },
  sectionTitleText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#4B5563',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 32,
    marginRight: 12,
  },
  menuOptionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#EF4444',
    marginLeft: 12,
  },
  unauthenticatedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  unauthenticatedTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  unauthenticatedText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  signInButton: {
    width: 200,
    marginBottom: 12,
  },
  createAccountButton: {
    width: 200,
  },
});