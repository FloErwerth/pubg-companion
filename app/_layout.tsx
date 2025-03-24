import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import i18n from '~/translation';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from 'react-query';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const initI18n = i18n;

const client = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    'Space-Grotesk': require('assets/fonts/SpaceGrotesk-Medium.ttf'),
    'Space-Grotesk-SemiBold': require('assets/fonts/SpaceGrotesk-SemiBold.ttf'),
    'Space-Grotesk-Bold': require('assets/fonts/SpaceGrotesk-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={client}>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <StatusBar />
            <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="onboarding" />
            </Stack>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
