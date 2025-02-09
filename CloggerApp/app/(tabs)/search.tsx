import { Pressable, ScrollView, Text, View } from 'react-native'
import { Button, Searchbar } from 'react-native-paper'
import globalStyles from '@/styles/globalStyles'
import { useState } from 'react'
import searchStyles from '@/styles/searchStyles'
import { useSearch } from '@/hooks/useSearch'
import React from 'react'
import { useRouter } from 'expo-router'

export default function HomeScreen (): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('')
  const searchData = useSearch(searchQuery)
  const router = useRouter()

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
      <View>
        <Text style={globalStyles.headerText}>Search</Text>
        <Text style={globalStyles.subheaderText}>Search your collections and items</Text>
      </View>
      <Searchbar
        style={searchStyles.searchBar}
        placeholder="Search name or description"
        onChangeText={(e) => { setSearchQuery(e) }}
        value={searchQuery}
        elevation={2}
      />
      <Button disabled={searchQuery === ''} mode="contained" onPress={() => { searchData.refetch() }}>Search</Button>
      {searchData.isLoading && <Text>Searching...</Text>}
      {searchData.isError && <Text>Error: {searchData.error.message}</Text>}
      {searchData.isSuccess && searchData.data !== undefined &&
      <>
        <Text>Found {searchData.data.totalResults} results</Text>

        <Text style={searchStyles.searchHeaderResult}>Collections</Text>
        {searchData.data.collections.map((collection) => (
          <Pressable
            style={globalStyles.collectionBox}
            key={collection.collectionId}
            onPress={() => { router.push({ pathname: '/(tabs)/Collections/CollectionItemList/[id]', params: { id: collection.collectionId } }) }}
          >
            <View key={collection.collectionId}>
              <Text style={globalStyles.collectionHeaderText}>{collection.collectionName}</Text>
              <Text style={globalStyles.collectionItemText}>{collection.collectionDescription}</Text>
              <Text style={globalStyles.collectionItemText}>{collection.collectionItemCount} items</Text>
            </View>
          </Pressable>

        ))}

        <Text style={searchStyles.searchHeaderResult}>Items</Text>
        {searchData.data.items.map((item) => (
          <Pressable
            style={globalStyles.collectionBox}
            key={item.itemId}
            onPress={() => { router.push({ pathname: '/(tabs)/Collections/CollectionItem/[id]', params: { id: item.itemId } }) }}
           >
            <View key={item.itemId}>
              <Text style={globalStyles.collectionHeaderText}>{item.itemName}</Text>
              <Text style={globalStyles.collectionItemText}>{item.itemDescription}</Text>
              <Text style={globalStyles.collectionItemText}>Collection: {item.collectionName}</Text>
            </View>
          </Pressable>
        ))}
      </>
      }
    </ScrollView>
  )
}
