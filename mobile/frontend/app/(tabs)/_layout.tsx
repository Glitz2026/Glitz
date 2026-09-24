import { Tabs } from "expo-router";
import { Platform, View } from "react-native";

import { IconCalendar, IconGrid, IconHome } from "@/src/components/icons";
import { IconAI, IconOrdina } from "@/src/components/tab-icons";
import { useTheme } from "@/src/theme";

export default function TabsLayout() {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.brandPrimary,
        tabBarInactiveTintColor: colors.muted,
        sceneStyle: { backgroundColor: colors.surface },
        tabBarStyle: {
          backgroundColor: colors.surfaceSecondary,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          ...(Platform.OS === "web" ? { height: 64 } : {}),
        },
        tabBarItemStyle: { alignSelf: "center" },
        tabBarLabelStyle: { fontSize: 10, fontWeight: "700", letterSpacing: 1 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color }) => <IconHome color={color as string} size={22} /> }} />
      <Tabs.Screen name="eventi" options={{ title: "Eventi", tabBarIcon: ({ color }) => <IconCalendar color={color as string} size={22} /> }} />
      <Tabs.Screen
        name="ai"
        options={{
          title: "A.I.",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 46,
                height: 46,
                marginTop: -14,
                borderRadius: 999,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? colors.brandPrimary : colors.brandTertiary,
                borderWidth: 1.5,
                borderColor: colors.borderStrong,
                shadowColor: colors.brandPrimary,
                shadowOpacity: 0.6,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 0 },
              }}
            >
              <IconAI color={focused ? colors.onBrandPrimary : colors.brandPrimary} size={24} />
            </View>
          ),
        }}
      />
      <Tabs.Screen name="ordina" options={{ title: "Ordina", tabBarIcon: ({ color }) => <IconOrdina color={color as string} size={22} /> }} />
      <Tabs.Screen name="altro" options={{ title: "Altro", tabBarIcon: ({ color }) => <IconGrid color={color as string} size={22} /> }} />
    </Tabs>
  );
}
