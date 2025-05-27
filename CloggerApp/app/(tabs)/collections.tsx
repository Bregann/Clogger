import globalStyles from '@/styles/globalStyles'
import { useState } from 'react'
import { Text, View, ScrollView, Pressable } from 'react-native'
import { Button, Searchbar } from 'react-native-paper'
import collectionStyles from '@/styles/collectionsStyles'
import { useRouter } from 'expo-router'
import { useCollections } from '@/hooks/Collections/useCollections'

export default function CollectionsScreen (): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const { data, isLoading, isError } = useCollections()

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer} keyboardShouldPersistTaps={'always'}>
      <View>
        <Text style={globalStyles.headerText}>Collections</Text>
        <Text style={globalStyles.subheaderText}>Look at all those items!</Text>
        <Searchbar
          style={collectionStyles.searchBar}
          placeholder="Filter Collections"
          onChangeText={(e) => { setSearchQuery(e) }}
          value={searchQuery}
          elevation={2}
        />
      </View>
      <Button style={collectionStyles.addCollectionButton} mode="contained" onPress={() => { router.push('/(tabs)/Collections/AddCollection') }}>Add New Collection</Button>

      {isLoading && <Text>Loading collections...</Text>}
      {isError && <Text>An error occurred while fetching collections</Text>}
      {data !== undefined && !isLoading &&
        (searchQuery === '' ? data.collections : data.collections.filter(x => x.collectionName === searchQuery)
        ).map((collection) => {
          return (
            <Pressable
              key={collection.id}
              style={globalStyles.collectionBox}
              onPress={() => { router.push({ pathname: '/Collections/CollectionItemList/[id]', params: { id: collection.id } }) }}>
              <View>
                <Text style={globalStyles.collectionHeaderText}>{collection.collectionName}</Text>
                <Text style={globalStyles.collectionItemText}>{collection.collectionDescription}</Text>
                <Text style={globalStyles.collectionItemText}>{collection.collectionItemCount}</Text>
              </View>
            </Pressable>
          )
        })}
    </ScrollView>
  )
}
