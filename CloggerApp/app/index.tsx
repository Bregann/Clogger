import { useAuth } from "@/context/authContext";
import apiClient from "@/helpers/apiClient";
import { keychainHelper } from "@/helpers/keychainHelper";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";

export default function Index() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const theme = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')



  const attemptLogin = async () => {
    console.log('attempting login')
    try {
      const response = await apiClient.post('/login', {
        email,
        password
      })

      if(response.status === 401) {
        setErrorMsg('Invalid email or password')
      } else {
        keychainHelper.setAccessToken(response.data.accessToken)
        keychainHelper.setRefreshToken(response.data.refreshToken)
        router.replace('/home')
      }
    } catch (error) {
      setErrorMsg('There has been an unknown error, please try again')
    }
  }

  return (
    <View
      style={styles.container}
    >
      <Image
        style={styles.logo}
        source={require('@/assets/images/icon.png')}
      />

      <Text style={styles.headerText}>Welcome to Clogger</Text>
      <Text style={styles.subheaderText}>The ultimate collection logging app</Text>
      <TextInput 
        label={'Email'}
        style={{ width: '80%', marginBottom: 20 }}
        mode="outlined"
        textContentType="emailAddress"
        keyboardType="email-address"
        onChangeText={(text) => { setEmail(text); setErrorMsg('') }} 
      />
      <TextInput 
        label={'Password'}
        style={{ width: '80%' }}
        mode="outlined"
        secureTextEntry={true}
        onChangeText={(text) => { setPassword(text); setErrorMsg('') }} 
      />

      <Text style={{color: 'red', marginTop: 5}}>{errorMsg}</Text>

      <Button 
        mode="elevated" 
        style={styles.loginButton} 
        dark={true}
        buttonColor={theme.colors.primary} 
        onPress={async () => { await attemptLogin() }}
        disabled={email.length === 0 || password.length === 0 || errorMsg.length > 0}
      >
        Login
      </Button>

      <Text style={{marginTop: 20, marginBottom: 5}}>New here?</Text>

      <Button 
        mode="elevated" 
        dark={true} 
        buttonColor={theme.colors.primary} 
        onPress={() => { router.push('/register') }}
        style={{padding: 3}}
      >
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: '25%'
  },
  logo: {
    width: 128,
    height: 128,
    marginBottom: 20
  },
  headerText:{
    fontSize: 24,
    fontWeight: 'bold'
  },
  subheaderText: {
    marginBottom: 10,
    fontStyle: 'italic'
  },
  loginButton: {
    marginTop: 20,
    padding: 3
  }
});