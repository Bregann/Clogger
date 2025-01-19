import axios from 'axios'
import { keychainHelper } from './keychainHelper'
import { useAuth } from '@/context/authContext'
import Constants from 'expo-constants'

const authApiClient = axios.create({
  baseURL: Constants.expoConfig?.extra?.ApiUrl || ''
})

const noAuthApiClient = axios.create({
  baseURL: Constants.expoConfig?.extra?.ApiUrl || '',
  validateStatus (status) {
    return status < 500
  },
})


authApiClient.interceptors.request.use(async (config) => {
  const accessToken = await keychainHelper.getAccessToken()
  console.log('hello?')
  if (accessToken !== null) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  console.log('hello2?')
  return config
})

authApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // don't bother to try and retry with a 500 error
    if (error.response.status >= 500) {
      return Promise.reject(error)
    }

    // if it's errored with 401, we try to refresh the token
    if (error.response.status === 401) {
      const refreshToken = await keychainHelper.getRefreshToken()

      if (refreshToken === null) {
        return Promise.reject(error)
      }

      try {
        const { data } = await authApiClient.post('/refresh', {
          refreshToken
        })

        keychainHelper.setAccessToken(data.accessToken)

        error.config.headers['Authorization'] = `Bearer ${data.accessToken}`

        return authApiClient.request(error.config)
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

export { authApiClient, noAuthApiClient }
