import { Tabs } from "expo-router";
import { Platform } from "react-native";

import { IconAI, IconAiuto, IconAmici, IconOrdina, IconSerata } from "@/src/components/tab-icons";
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
      <Tabs.Screen
        name="index"
        options={{ title: "Serata", tabBarIcon: ({ color }) => <IconSerata color={color} size={22} /> }}
      />
      <Tabs.Screen
        name="ordina"
        options={{ title: "Ordina", tabBarIcon: ({ color }) => <IconOrdina color={color} size={22} /> }}
      />
      <Tabs.Screen
        name="ai"
        options={{ title: "A.I.", tabBarIcon: ({ color }) => <IconAI color={color} size={24} /> }}
      />
      <Tabs.Screen
        name="amici"
        options={{ title: "Amici", tabBarIcon: ({ color }) => <IconAmici color={color} size={22} /> }}
      />
      <Tabs.Screen
        name="aiuto"
        options={{ title: "Aiuto", tabBarIcon: ({ color }) => <IconAiuto color={color} size={22} /> }}
      />
    </Tabs>
  );
}
