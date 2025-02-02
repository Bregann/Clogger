import { useAuth } from '@/context/authContext'
import { noAuthApiClient } from '@/helpers/apiClient'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button, TextInput, useTheme } from 'react-native-paper'

export default function RegisterScreen (): JSX.Element {
  const theme = useTheme()
  const router = useRouter()
  const auth = useAuth()

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const attemptRegistration = async (): Promise<void> => {
    const fetchResult = await noAuthApiClient.post('/api/auth/RegisterUser', {
      username,
      firstName: name,
      email,
      password
    })

    if (fetchResult.status === 400) {
      setErrorMsg('There has been an error trying to create your account. Please double check your credentials and try again')
      return
    } else {
      const result = await auth.attemptLogin(email, password)

      // they would be registered but an error logging in so we can just send them to the login page
      if (!result) {
        router.replace('/')
        return
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Create an Account</Text>
      <Text style={styles.subheaderText}>You will need to create an account to use Clogger</Text>
      <TextInput
        label={'Username'}
        style={{ width: '80%', marginBottom: 20 }}
        mode="outlined"
        onChangeText={(text) => { setUsername(text); setErrorMsg('') }}
        outlineColor={theme.colors.primary}
      />
      <TextInput
        label={'Your Name'}
        style={{ width: '80%', marginBottom: 20 }}
        mode="outlined"
        onChangeText={(text) => { setName(text); setErrorMsg('') }}
        outlineColor={theme.colors.primary}
      />
      <TextInput
        label={'Email'}
        style={{ width: '80%', marginBottom: 20 }}
        mode="outlined"
        textContentType="emailAddress"
        keyboardType="email-address"
        onChangeText={(text) => { setEmail(text); setErrorMsg('') }}
        outlineColor={theme.colors.primary}
      />
      <TextInput
        label={'Password'}
        style={{ width: '80%' }}
        mode="outlined"
        secureTextEntry={secureTextEntry}
        onChangeText={(text) => { setPassword(text); setErrorMsg('') }}
        outlineColor={theme.colors.primary}
        right={<TextInput.Icon onPress={() => { setSecureTextEntry(!secureTextEntry) }} icon="eye" />}
      />
      <Text style={{ fontSize: 20, marginTop: 10 }}>Password requirements:</Text>
      <Text style={{ color: password.length >= 8 ? 'green' : 'red' }}>At least 8 characters</Text>
      <Text style={{ color: /[A-Z]/.test(password) ? 'green' : 'red' }}>At least 1 uppercase letter</Text>
      <Text style={{ color: /\d/.test(password) ? 'green' : 'red' }}>At least 1 number</Text>
      <Text style={{ color: /[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'green' : 'red' }}>A special character</Text>
      <Button
        mode="elevated"
        style={styles.loginButton}
        dark={true}
        buttonColor={theme.colors.primary}
        onPress={async () => { await attemptRegistration() }}
        disabled={email.length === 0 ||
          password.length === 0 ||
          name.length === 0 ||
          errorMsg.length > 0 ||
          password.length < 8 ||
          !/[A-Z]/.test(password) ||
          !/\d/.test(password) ||
          !/[!@#$%^&*(),.?":{}|<>]/.test(password)
        }
      >
        Register
      </Button>

      <Text style={{ marginTop: 20, marginBottom: 5 }}>Already have an account?</Text>

      <Button
        mode="elevated"
        dark={true}
        buttonColor={theme.colors.primary}
        onPress={() => { router.push('/') }}
        style={{ padding: 3 }}
      >
        Login
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: '10%'
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subheaderText: {
    marginBottom: 30,
    fontSize: 14,
  },
  loginButton: {
    marginTop: 20,
    padding: 3
  }
})
