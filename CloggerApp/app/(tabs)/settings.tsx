import { useAuth } from '@/context/authContext'
import { keychainHelper } from '@/helpers/keychainHelper'
import { JSX, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

export default function HomeScreen (): JSX.Element {
  const auth = useAuth()
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [refreshToken2, setRefreshToken2] = useState<string | null>(null)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings screen</Text>
      <Button mode="contained" onPress={() => { auth.logOut() }}>button</Button>
      <Button onPress={async () => { const token = await keychainHelper.getRefreshToken(); setRefreshToken(token) }}>refresh debug</Button>
      <Button onPress={async () => { const token = await keychainHelper.getAccessToken(); setRefreshToken2(token) }}>idk debug</Button>
      <Text>{refreshToken}</Text>
      <Text>{refreshToken2}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e2e3db',
  },
  text: {
    color: '#fff',
  },
})
