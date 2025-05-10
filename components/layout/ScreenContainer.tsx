import React, { ReactNode } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, ViewStyle } from 'react-native';

type ScreenContainerProps = {
  children: ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  withPadding?: boolean;
};

const ScreenContainer = ({
  children,
  scrollable = true,
  style,
  contentContainerStyle,
  withPadding = true,
}: ScreenContainerProps) => {
  const containerStyle = [styles.container, style];
  
  const contentStyle = [
    withPadding && styles.content,
    contentContainerStyle,
  ];

  return (
    <SafeAreaView style={containerStyle}>
      {scrollable ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={contentStyle}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.wrapper, ...contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  wrapper: {
    flex: 1,
  },
});

export default ScreenContainer;