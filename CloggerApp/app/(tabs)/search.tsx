import { useAuth } from '@/context/authContext'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import globalStyles from '@/styles/globalStyles'

export default function HomeScreen () {
  const auth = useAuth()
  return (
    <View style={globalStyles.container}>
      <Text style={styles.text}>Search screen</Text>
      <Button mode="contained" onPress={() => { auth.logOut() }}>button</Button>
    </View>
  )
}

const styles = StyleSheet.create({

  text: {
    color: '#fff',
  },
})
