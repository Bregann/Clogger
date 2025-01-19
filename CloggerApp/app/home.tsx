import { useAuth } from '@/context/authContext'
import { authApiClient } from '@/helpers/apiClient'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

export default function HomeScreen () {
  const auth = useAuth()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Button mode="contained" onPress={() => { auth.logOut() }}>button</Button>
      <Button mode="contained" onPress={async () => {
              console.log('attempting to set username')
              const r = await authApiClient.post(`/api/UserData/SetUsername/sdf`, {})
              console.log(r)


       }}>button 2</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
})
