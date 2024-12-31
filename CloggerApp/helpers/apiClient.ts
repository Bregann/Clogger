import axios from 'axios'
import { keychainHelper } from './keychainHelper'
import { useAuth } from '@/context/authContext'

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL
})


apiClient.interceptors.request.use(async (config) => {
  const accessToken = await keychainHelper.getAccessToken()

  if (accessToken !== null) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // if it's errored with 401, we try to refresh the token
    if (error.response.status === 401) {
      const refreshToken = await keychainHelper.getRefreshToken()

      if (refreshToken === null) {
        return Promise.reject(error)
      }

      try {
        const { data } = await apiClient.post('/refresh', {
          refreshToken
        });

        keychainHelper.setAccessToken(data.accessToken)

        error.config.headers['Authorization'] = `Bearer ${data.accessToken}`

        return apiClient.request(error.config)
      } catch (error) {
        // if there's any error trying to refresh the token then just force them out of the app
        const { logOut } = useAuth()
        await logOut()
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient