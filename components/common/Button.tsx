import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  ViewStyle, 
  TextStyle 
} from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const Button = ({
  title,
  onPress,
  type = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) => {
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle[] = [styles.button];
    
    // Button type styles
    if (type === 'primary') {
      buttonStyle.push(styles.primaryButton);
    } else if (type === 'outline') {
      buttonStyle.push(styles.outlineButton);
    } else if (type === 'ghost') {
      buttonStyle.push(styles.ghostButton);
    }
    
    // Button size styles
    if (size === 'small') {
      buttonStyle.push(styles.smallButton);
    } else if (size === 'large') {
      buttonStyle.push(styles.largeButton);
    }
    
    // Full width style
    if (fullWidth) {
      buttonStyle.push(styles.fullWidth);
    }
    
    // Disabled style
    if (disabled) {
      buttonStyle.push(styles.disabledButton);
    }
    
    return buttonStyle;
  };
  
  const getTextStyle = () => {
    let textStyleArray: TextStyle[] = [styles.buttonText];
    
    if (type === 'primary') {
      textStyleArray.push(styles.primaryText);
    } else if (type === 'outline') {
      textStyleArray.push(styles.outlineText);
    } else if (type === 'ghost') {
      textStyleArray.push(styles.ghostText);
    }
    
    if (size === 'small') {
      textStyleArray.push(styles.smallText);
    } else if (size === 'large') {
      textStyleArray.push(styles.largeText);
    }
    
    if (disabled) {
      textStyleArray.push(styles.disabledText);
    }
    
    return textStyleArray;
  };
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[...getButtonStyle(), style]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={type === 'primary' ? '#FFFFFF' : '#3B82F6'} 
          size="small" 
        />
      ) : (
        <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    borderWidth: 0,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  ghostButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  smallButton: {
    height: 32,
    paddingHorizontal: 12,
  },
  largeButton: {
    height: 52,
    paddingHorizontal: 24,
  },
  fullWidth: {
    width: '100%',
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
    borderColor: '#E5E7EB',
    opacity: 0.7,
  },
  buttonText: {
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#3B82F6',
  },
  ghostText: {
    color: '#3B82F6',
  },
  smallText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    color: '#9CA3AF',
  },
});

export default Button;