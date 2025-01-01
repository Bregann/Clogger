import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import { Image, View, Text, StyleSheet } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";

export default function Index() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const theme = useTheme()

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
      />
      <TextInput 
        label={'Password'}
        style={{ width: '80%' }}
        mode="outlined"
        secureTextEntry={true}
      />

      <Button 
        mode="elevated" 
        style={styles.loginButton} 
        dark={true}
        buttonColor={theme.colors.primary} 
        onPress={() => { console.log('aa')}}
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