import { useEffect, useState } from 'react';
import { LogBox } from 'react-native';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

/**
 * Hook to ensure all necessary framework components are ready
 * This includes dismissing warnings that aren't relevant for the app
 */
export const useFrameworkReady = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ignore specific warnings that are not relevant or are from third-party libraries
    LogBox.ignoreLogs([
      'Constants.platform.ios.model has been deprecated',
      'ViewPropTypes will be removed from React Native',
      'Sending `onAnimatedValueUpdate` with no listeners registered',
      'Animated: `useNativeDriver`'
    ]);

    // Mark framework as ready
    setIsReady(true);
    
    return () => {
      // Cleanup function if needed
    };
  }, []);

  return isReady;
};
