import { useAuth } from '@/context/authContext'
import Constants from 'expo-constants'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Image, View, Text } from 'react-native'
import { TextInput, Button, useTheme } from 'react-native-paper'
import styles from '@/styles/indexStyles'
import globalStyles from '@/styles/globalStyles'

export default function Index (): JSX.Element {
  const auth = useAuth()
  const router = useRouter()
  const theme = useTheme()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  const handleLogin = async (): Promise<void> => {
    try {
      const result = await auth.attemptLogin(username, password)

      if (result === false) {
        setErrorMsg('Invalid username or password')
      }
    } catch (error) {
      setErrorMsg('There has been an unknown error, please try again. Error info: ' + error + `${Constants.expoConfig?.extra?.ApiUrl || ''}`)
    }
  }

  return (
    <View
      style={globalStyles.container}
    >
      <Image
        style={styles.logo}
        source={require('@/assets/images/icon.png')}
      />

      <Text style={globalStyles.headerText}>Welcome to Clogger</Text>
      <Text style={globalStyles.subheaderText}>The ultimate collection logging app</Text>
      <TextInput
        label={'Username'}
        style={{ width: '80%', marginBottom: 20 }}
        mode="outlined"
        textContentType="username"
        onChangeText={(text) => { setUsername(text); setErrorMsg('') }}
      />
      <TextInput
        label={'Password'}
        style={{ width: '80%' }}
        mode="outlined"
        secureTextEntry={true}
        onChangeText={(text) => { setPassword(text); setErrorMsg('') }}
        right={<TextInput.Icon onPress={() => { setSecureTextEntry(!secureTextEntry) }} icon="eye" />}
        passwordRules={'minlength: 8; required: lower; required: upper; required: digit;'}
      />

      <Text style={{ color: 'red', marginTop: 5, fontFamily: 'Nunito_400Regular' }}>{errorMsg}</Text>

      <Button
        mode="elevated"
        style={styles.loginButton}
        dark={true}
        buttonColor={theme.colors.primary}
        onPress={async () => { await handleLogin() }}
        disabled={username.length === 0 || password.length === 0 || errorMsg.length > 0}
      >
        Login
      </Button>

      <Text style={{ marginTop: 20, marginBottom: 5, fontFamily: 'Nunito_400Regular' }}>New here?</Text>

      <Button
        mode="elevated"
        dark={true}
        buttonColor={theme.colors.primary}
        onPress={() => { router.push('/register') }}
        style={{ padding: 3 }}
      >
        Register
      </Button>
    </View>
  )
}
