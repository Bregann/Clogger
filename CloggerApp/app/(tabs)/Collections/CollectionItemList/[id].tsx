import { useCollectionItems } from '@/hooks/Collections/useCollectionItems'
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

  const { data, isLoading, isError } = useCollectionItems(parseInt(id))

  return (
      <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
        <Button mode="contained" style={collectionItemListStyles.editButton} onPress={() => { router.push({ pathname: '/(tabs)/Collections/AddEditCollection/[id]', params: { id } }) }}>Edit Collection</Button>
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

        {isLoading && <Text>Loading items...</Text>}
        {isError && <Text>An error occurred while fetching items</Text>}
        {data !== undefined && !isLoading && data.collectionItems.map((item) => {
          return (
            <Pressable
              key={item.id}
              style={globalStyles.collectionBox}
              onPress={() => { router.push({ pathname: '/Collections/CollectionItem/[id]', params: { id: item.id } }) }}>
              <View>
                <Text style={globalStyles.collectionHeaderText}>{item.itemName}</Text>
                <Text style={globalStyles.collectionItemText}>{item.itemDescription}</Text>
              </View>
            </Pressable>
          )
        })}
      </ScrollView>
  )
}
