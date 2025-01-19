import { noAuthApiClient } from "@/helpers/apiClient"
import { keychainHelper } from "@/helpers/keychainHelper"
import { useRouter } from "expo-router"
import { createContext, useContext, useEffect, useState } from "react"

type ContextType = {
  isAuthenticated: boolean
  logOut: () => Promise<void>
  checkAuthStatus: () => void
  attemptLogin: (email: string, password: string) => Promise<boolean>
}

const AuthContext = createContext<ContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider")
  }

  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const checkAuthStatus = async () => {
    const accessToken = await keychainHelper.getAccessToken()
    setIsAuthenticated(accessToken !== null)
  }

  const logOut = async () => {
    await keychainHelper.deleteTokens()
    setIsAuthenticated(false)
    router.push('/')
  }

  const attemptLogin = async (email: string, password: string): Promise<boolean> => {
    const response = await noAuthApiClient.post('/login', {
      email,
      password
    })

    if (response.status === 401) {
      return false
    } else {
      setIsAuthenticated(true)
      keychainHelper.setAccessToken(response.data.accessToken)
      keychainHelper.setRefreshToken(response.data.refreshToken)
      router.replace('/home')
    }

    return true
  }

  useEffect(() => {
    checkAuthStatus()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, logOut, checkAuthStatus, attemptLogin }}>
      {children}
    </AuthContext.Provider>
  )
}