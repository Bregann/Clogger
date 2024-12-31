import * as Keychain from "react-native-keychain"

const getAccessToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword()

    if(credentials !== false && credentials.username === "accessToken") {
      return credentials.password
    }
  
    return null
  } 
  catch {
    return null
  }
}

const getRefreshToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword()

    if(credentials !== false && credentials.username === "refreshToken") {
      return credentials.password;
    }
  
    return null
  } 
  catch {
    return null
  }
}

const setAccessToken = async (accessToken: string): Promise<void> => {
  await Keychain.setGenericPassword("accessToken", accessToken)
}

const setRefreshToken = async (refreshToken: string): Promise<void> => {
  await Keychain.setGenericPassword("refreshToken", refreshToken)
}

const deleteTokens = async (): Promise<void> => {
  await Keychain.resetGenericPassword()
}

const isAuthenticated = async (): Promise<boolean> => {
  const accessToken = await getAccessToken()
  return accessToken !== null
}

export const keychainHelper = {
  getAccessToken,
  getRefreshToken,
  isAuthenticated,
  deleteTokens,
  setAccessToken,
  setRefreshToken
};