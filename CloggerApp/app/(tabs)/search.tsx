import { useAuth } from '@/context/authContext'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

export default function HomeScreen () {
  const auth = useAuth()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search screen</Text>
      <Button mode="contained" onPress={() => { auth.logOut() }}>button</Button>
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
