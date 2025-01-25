import collectionItemListStyles from '@/styles/collectionItemListStyles'
import globalStyles from '@/styles/globalStyles'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import { Button, Searchbar } from 'react-native-paper'

export default function CollectionItemListScreen (): JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  return (
      <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
        <Button mode="contained" style={collectionItemListStyles.editButton}>Edit Collection</Button>
        <View>
          <Text style={globalStyles.headerText}>Collection Name</Text>
          <Text style={globalStyles.subheaderText}>Collection Description</Text>
          <Searchbar
            style={collectionItemListStyles.searchBar}
            placeholder="Filter items"
            onChangeText={(e) => { setSearchQuery(e) }}
            value={searchQuery}
            elevation={2}
          />
        </View>
        <View style={[globalStyles.rowContainer, { marginBottom: 20 }]}>
          <Button mode="contained" style={{ marginRight: 10 }}>Add Item</Button>

        </View>
        <Pressable style={[globalStyles.itemBox, { width: '70%' }]}
          onPress={() => { router.push({ pathname: '/Collections/CollectionItem/[id]', params: { id: 1 } }) }}>
          <View>
            <Text style={globalStyles.collectionHeaderText}>Item 1</Text>
            <Text style={globalStyles.collectionItemText}>Collection xxx</Text>
          </View>
        </Pressable>

        <View style={[globalStyles.itemBox, { width: '70%' }]}>
          <Text style={globalStyles.collectionHeaderText}>Item 1</Text>
          <Text style={globalStyles.collectionItemText}>Collection xxx</Text>
        </View>
        <View style={[globalStyles.itemBox, { width: '70%' }]}>
          <Text style={globalStyles.collectionHeaderText}>Item 1</Text>
          <Text style={globalStyles.collectionItemText}>Collection xxx</Text>
        </View>
        <View style={[globalStyles.itemBox, { width: '70%' }]}>
          <Text style={globalStyles.collectionHeaderText}>Item 1</Text>
          <Text style={globalStyles.collectionItemText}>Collection xxx</Text>
        </View>
        <View style={[globalStyles.itemBox, { width: '70%' }]}>
          <Text style={globalStyles.collectionHeaderText}>Item 1</Text>
          <Text style={globalStyles.collectionItemText}>Collection xxx</Text>
        </View>
        <View style={[globalStyles.itemBox, { width: '70%' }]}>
          <Text style={globalStyles.collectionHeaderText}>Item 1</Text>
          <Text style={globalStyles.collectionItemText}>Collection xxx</Text>
        </View>
        <View style={[globalStyles.itemBox, { width: '70%' }]}>
          <Text style={globalStyles.collectionHeaderText}>Item 1</Text>
          <Text style={globalStyles.collectionItemText}>Collection xxx</Text>
        </View>
        <View style={[globalStyles.itemBox, { width: '70%' }]}>
          <Text style={globalStyles.collectionHeaderText}>Item 1</Text>
          <Text style={globalStyles.collectionItemText}>Collection xxx</Text>
        </View>
      </ScrollView>
  )
}
