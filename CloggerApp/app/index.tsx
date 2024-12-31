import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>this is the login index wow {isAuthenticated ? 'yes' : 'no'}</Text>
      <Button title="test" onPress={() => { router.replace('/home');  }}></Button>
    </View>
  );
}
