import { AuthProvider, useAuth } from "@/context/authContext";
import { keychainHelper } from "@/helpers/keychainHelper";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { DefaultTheme, PaperProvider } from 'react-native-paper'

export default function RootLayout() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#01b6af',
      accent: '#f1c40f'
    }
  }

  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <AuthStateWrapper />
      </PaperProvider>
    </AuthProvider>
  );
}

const AuthStateWrapper = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log('????')
    if (isAuthenticated) {
      router.replace('/home')
    } else{
      router.replace('/')
    }

  }, [isAuthenticated])

  return (
    <Stack 
      screenOptions={{
        contentStyle: {
          backgroundColor: '#e2e3db',
        },
        headerShown: false
      }}
    />
  );
};
