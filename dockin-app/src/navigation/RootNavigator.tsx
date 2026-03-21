import React, { useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { theme } from "@/src/theme/theme";
import { useAuthStore } from "@/src/store/authStore";
import { OnboardingScreen } from "@/src/screens/auth/OnboardingScreen";
import { LoginScreen } from "@/src/screens/auth/LoginScreen";
import { SignupScreen } from "@/src/screens/auth/SignupScreen";
import { LiveTranslationScreen } from "@/src/screens/worklogs/LiveTranslationScreen";
import { ChatRoomListScreen } from "@/src/screens/chat/ChatRoomListScreen";
import { AdminHomeScreen } from "@/src/screens/home/AdminHomeScreen";
import { WorkerHomeScreen } from "@/src/screens/home/WorkerHomeScreen";
import { WorkLogListScreen } from "@/src/screens/worklogs/WorkLogListScreen";
import { AdminSafetyInspectionScreen } from "@/src/screens/safety/AdminSafetyInspectionScreen";
import { SafetyEducationScreen } from "@/src/screens/safety/SafetyEducationScreen";
import { WorkLogDetailScreen } from "@/src/screens/worklogs/WorkLogDetailScreen";
import { WorkLogEditorScreen } from "@/src/screens/worklogs/WorkLogEditorScreen";
import { WorkLogTranslationScreen } from "@/src/screens/worklogs/WorkLogTranslationScreen";
import { ChatRoomScreen } from "@/src/screens/chat/ChatRoomScreen";
import { ChatbotScreen } from "@/src/screens/chat/ChatbotScreen";
import { SettingsScreen } from "@/src/screens/settings/SettingsScreen";
import { AttendanceManagementScreen } from "@/src/screens/management/AttendanceManagementScreen";
import { EmergencyNoticeScreen } from "@/src/screens/management/EmergencyNoticeScreen";
import type { AuthStackParamList, RootStackParamList } from "@/src/navigation/types";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

function MainTabs() {
  const role = useAuthStore((state) => state.role);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "#B4BFCD",
        tabBarStyle: { height: 76, paddingTop: 10 },
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<string, string> = {
            Translate: "translate",
            Chat: "chat-processing-outline",
            Home: role === "ADMIN" ? "hard-hat" : "clock-check-outline",
            WorkLogs: "file-document-outline",
            Safety: "shield-check-outline",
          };
          return <MaterialCommunityIcons name={iconMap[route.name] as never} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Translate" component={LiveTranslationScreen} options={{ title: "번역" }} />
      <Tab.Screen name="Chat" component={ChatRoomListScreen} options={{ title: "채팅" }} />
      <Tab.Screen name="Home" component={role === "ADMIN" ? AdminHomeScreen : WorkerHomeScreen} options={{ title: role === "ADMIN" ? "관리자기능" : "근태" }} />
      <Tab.Screen name="WorkLogs" component={WorkLogListScreen} options={{ title: "작업일지" }} />
      <Tab.Screen name="Safety" component={role === "ADMIN" ? AdminSafetyInspectionScreen : SafetyEducationScreen} options={{ title: "안전점검" }} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const hydrate = useAuthStore((state) => state.hydrate);
  const hydrated = useAuthStore((state) => state.hydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!hydrated) {
    return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
  }

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: theme.colors.background },
      }}
    >
      {isAuthenticated ? (
        <RootStack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: theme.colors.primary },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: { fontWeight: "800" },
          }}
        >
          <RootStack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <RootStack.Screen name="WorkLogDetail" component={WorkLogDetailScreen} options={{ title: "작업일지 상세" }} />
          <RootStack.Screen name="WorkLogEditor" component={WorkLogEditorScreen} options={{ title: "작업일지 작성" }} />
          <RootStack.Screen name="WorkLogTranslation" component={WorkLogTranslationScreen} options={{ title: "작업일지 번역" }} />
          <RootStack.Screen name="LiveTranslation" component={LiveTranslationScreen} options={{ title: "실시간번역" }} />
          <RootStack.Screen name="ChatRoom" component={ChatRoomScreen} options={({ route }) => ({ title: route.params.title })} />
          <RootStack.Screen name="Settings" component={SettingsScreen} options={{ title: "설정" }} />
          <RootStack.Screen name="AttendanceManagement" component={AttendanceManagementScreen} options={{ title: "근태관리" }} />
          <RootStack.Screen name="EmergencyNotice" component={EmergencyNoticeScreen} options={{ title: "긴급사항" }} />
          <RootStack.Screen name="Chatbot" component={ChatbotScreen} options={{ title: "챗봇" }} />
        </RootStack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}
