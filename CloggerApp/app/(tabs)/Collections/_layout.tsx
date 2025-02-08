import { Stack } from 'expo-router'

export default function CollectionsStack (): JSX.Element {
  return (
    <Stack>
      <Stack.Screen name="CollectionItemList/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="CollectionItem/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="EditCollection/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="AddCollection" options={{ headerShown: false }} />
      <Stack.Screen name="AddItem/[collectionId]" options={{ headerShown: false }} />
      <Stack.Screen name="EditItem/[id]" options={{ headerShown: false }} />
    </Stack>
  )
}