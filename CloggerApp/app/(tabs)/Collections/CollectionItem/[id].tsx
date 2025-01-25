import collectionItemStyles from "@/styles/collectionItemStyles"
import globalStyles from "@/styles/globalStyles"
import { useLocalSearchParams, useRouter } from "expo-router"
import { ScrollView, View, Text } from "react-native"
import { Button, Divider } from "react-native-paper"
import { Image } from 'expo-image'

export default function CollectionItemListScreen (): JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
      <Button mode="contained" style={collectionItemStyles.editButton}>Edit Item</Button>
      <Text style={globalStyles.headerText}>item Name</Text>
      <View style={collectionItemStyles.pictureBox}>
        <Image source={{ uri: 'https://placecats.com/2268/4032' }} style={collectionItemStyles.pictureItem} />
      </View>
      <Text style={collectionItemStyles.itemDetailsHeader}>Notes</Text>
      <Text style={collectionItemStyles.itemDetailsText}>Description of the item</Text>
      <Text style={[collectionItemStyles.itemDetailsHeader, { marginBottom: 10 }]}>Item Details</Text>
      <View style={collectionItemStyles.cardContainer}>
        <View style={collectionItemStyles.card}>
          <Text style={collectionItemStyles.itemDetailsSubheader}>Property Name 1</Text>
          <Text style={collectionItemStyles.itemDetailsText}>$100</Text>
        </View>
        <View style={collectionItemStyles.card}>
          <Text style={collectionItemStyles.itemDetailsSubheader}>Property Name 2</Text>
          <Text style={collectionItemStyles.itemDetailsText}>$100</Text>
        </View>
      </View>
      <View style={collectionItemStyles.cardContainer}>
        <View style={collectionItemStyles.card}>
          <Text style={collectionItemStyles.itemDetailsSubheader}>Property Name 1</Text>
          <Text style={collectionItemStyles.itemDetailsText}>$100</Text>
        </View>
        <View style={collectionItemStyles.card}>
          <Text style={collectionItemStyles.itemDetailsSubheader}>Property Name 2</Text>
          <Text style={collectionItemStyles.itemDetailsText}>$100</Text>
        </View>
      </View>
      <View style={collectionItemStyles.cardContainer}>
        <View style={collectionItemStyles.card}>
          <Text style={collectionItemStyles.itemDetailsSubheader}>Property Name 1</Text>
          <Text style={collectionItemStyles.itemDetailsText}>$100</Text>
        </View>
        <View style={collectionItemStyles.card}>
          <Text style={collectionItemStyles.itemDetailsSubheader}>Property Name 2</Text>
          <Text style={collectionItemStyles.itemDetailsText}>$100</Text>
        </View>
      </View>
    </ScrollView>

  )
}
