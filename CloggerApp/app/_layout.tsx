import { AuthProvider, useAuth } from "@/context/authContext"
import { useRouter } from "expo-router"
import { Stack } from 'expo-router/stack'
import { useEffect } from "react"
import { DefaultTheme, PaperProvider } from 'react-native-paper'

export default function RootLayout () {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#01b6af',
      accent: '#f1c40f',
      secondary: '#f53f2a',
    }
  }

  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <AuthStateWrapper />
      </PaperProvider>
    </AuthProvider>
  )
}

const AuthStateWrapper = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/home')
    } else {
      router.replace('/')
    }

  }, [isAuthenticated, router])

  if (isAuthenticated) {
    return (
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: 'green',
          },
          headerShown: false
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    )
  } else {
    return (
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: '#e2e3db',
          },
          headerShown: false
        }}
      />
    )
  }


}
