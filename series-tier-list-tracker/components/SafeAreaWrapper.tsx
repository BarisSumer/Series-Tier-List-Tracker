import React from 'react';
import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeAreaWrapperProps extends ViewProps {
  children: React.ReactNode;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
}

export default function SafeAreaWrapper({ children, edges = ['top', 'bottom'], ...props }: SafeAreaWrapperProps) {
  const insets = useSafeAreaInsets();

  const edgeStyles = {
    top: edges.includes('top') ? { paddingTop: insets.top } : {},
    bottom: edges.includes('bottom') ? { paddingBottom: insets.bottom } : {},
    left: edges.includes('left') ? { paddingLeft: insets.left } : {},
    right: edges.includes('right') ? { paddingRight: insets.right } : {}
  };

  return (
    <View style={[edgeStyles.top, edgeStyles.bottom, edgeStyles.left, edgeStyles.right]} {...props}>
      {children}
    </View>
  );
}
