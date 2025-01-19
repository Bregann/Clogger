import { keychainHelper } from '@/helpers/keychainHelper'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

export default function HomeScreen () {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Button mode="contained" onPress={() => { keychainHelper.getAccessToken().then((token) => {console.log(token)}) }}>button</Button>
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
