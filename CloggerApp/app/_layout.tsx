import { AuthProvider, useAuth } from '@/context/authContext'
import { useRouter } from 'expo-router'
import { Stack } from 'expo-router/stack'
import { useEffect } from 'react'
import { DefaultTheme, PaperProvider } from 'react-native-paper'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function RootLayout (): JSX.Element {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#01b6af',
      accent: '#f1c40f',
      secondary: '#f53f2a'
    }
  }

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PaperProvider theme={theme}>
          <AuthStateWrapper />
        </PaperProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

const AuthStateWrapper = (): JSX.Element => {
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
            backgroundColor: '#e2e3db',
          },
          headerShown: false
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, contentStyle: { backgroundColor: '#e2e3db' } }}
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
