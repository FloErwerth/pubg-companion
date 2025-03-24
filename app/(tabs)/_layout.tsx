import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { useIsRegisteredPlayer } from '~/store/player';
import { CircleUserRound, LucideBarChart } from 'lucide-react-native';
import { colors } from '~/theme';

const screenOptions = {
  tabBarStyle: { borderTopLeftRadius: 6, borderTopRightRadius: 6 },
  headerShown: false,
} as const;

export default function TabsLayout() {
  const { isRegisteredPlayer } = useIsRegisteredPlayer();

  if (!isRegisteredPlayer) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Tabs screenOptions={screenOptions} initialRouteName="index">
      <Tabs.Screen
        name="index"
        options={{
          tabBarInactiveTintColor: colors.grey,
          tabBarActiveTintColor: colors.black,
          tabBarIcon: (props) => {
            return <LucideBarChart size="26" color={props.focused ? colors.black : colors.grey} />;
          },
          title: 'Stats',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarInactiveTintColor: colors.grey,
          tabBarActiveTintColor: colors.black,
          tabBarIcon: (props) => {
            return (
              <CircleUserRound
                className="text-foreground"
                color={props.focused ? colors.black : colors.grey}
              />
            );
          },
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
