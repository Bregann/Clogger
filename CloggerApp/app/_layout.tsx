import { AuthProvider, useAuth } from '@/context/authContext'
import { Stack } from 'expo-router/stack'
import { JSX, useEffect } from 'react'
import { DefaultTheme, PaperProvider } from 'react-native-paper'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ImagePickerProvider } from '@/context/imagePickerContext'
import * as SplashScreen from 'expo-splash-screen'
import { Nunito_400Regular, Nunito_700Bold, Nunito_400Regular_Italic, useFonts } from '@expo-google-fonts/nunito'
import { useRouter } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function RootLayout (): JSX.Element {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#01b6af',
      accent: '#f1c40f',
      secondary: '#f53f2a'
    },
  }

  const [loaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_400Regular_Italic
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ImagePickerProvider>
          <PaperProvider theme={theme}>
            <AuthStateWrapper />
          </PaperProvider>
        </ImagePickerProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

const AuthStateWrapper = (): JSX.Element => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/')
    } else if (isAuthenticated === true) {
      router.replace('/home')
    }
  }, [isAuthenticated, router])

  if (isAuthenticated === null) {
    return <Stack />
  }

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: '#e2e3db',
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" /> {/* This is your login screen */}

      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
  )
}
