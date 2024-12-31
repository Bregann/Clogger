import { AuthProvider, useAuth } from "@/context/authContext";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthStateWrapper />
    </AuthProvider>
  );
}

const AuthStateWrapper = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/home')
    } else{
      router.replace('/')
    }

  }, [isAuthenticated])

  return (
    <Stack />
  );
};
