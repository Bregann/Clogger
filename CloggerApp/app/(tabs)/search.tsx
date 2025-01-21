import { ScrollView, Text, View } from 'react-native'
import { Button, Searchbar } from 'react-native-paper'
import globalStyles from '@/styles/globalStyles'
import { useState } from 'react'
import searchStyles from '@/styles/searchStyles'

export default function HomeScreen () {
  const [searchQuery, setSearchQuery] = useState('')

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
      <Button mode="contained" onPress={() => { }}>Search</Button>
      <Text style={searchStyles.searchText}>Found 73 results</Text>
      <Text style={searchStyles.searchHeaderResult}>Collections</Text>
      <View style={globalStyles.collectionBox}>
        <Text style={globalStyles.collectionHeaderText}>Collection 1</Text>
        <Text style={globalStyles.collectionItemText}>Description</Text>
        <Text style={globalStyles.collectionItemText}>500 items</Text>
      </View>
      <View style={globalStyles.collectionBox}>
        <Text style={globalStyles.collectionHeaderText}>Collection 2</Text>
        <Text style={globalStyles.collectionItemText}>Description</Text>
        <Text style={globalStyles.collectionItemText}>500 items</Text>
      </View>
      <View style={globalStyles.collectionBox}>
        <Text style={globalStyles.collectionHeaderText}>Collection 3</Text>
        <Text style={globalStyles.collectionItemText}>Description</Text>
        <Text style={globalStyles.collectionItemText}>500 items</Text>
      </View>
      <View style={globalStyles.collectionBox}>
        <Text style={globalStyles.collectionHeaderText}>Collection 4</Text>
        <Text style={globalStyles.collectionItemText}>Description</Text>
        <Text style={globalStyles.collectionItemText}>500 items</Text>
      </View>

      <Text style={searchStyles.searchHeaderResult}>Items</Text>
      <View style={globalStyles.itemBox}>
        <Text style={globalStyles.collectionHeaderText}>Item 1</Text>
        <Text style={globalStyles.collectionItemText}>Collection: xxx</Text>
      </View>
      <View style={globalStyles.itemBox}>
        <Text style={globalStyles.collectionHeaderText}>Item 2</Text>
        <Text style={globalStyles.collectionItemText}>Collection: xxx</Text>
      </View>
      <View style={globalStyles.itemBox}>
        <Text style={globalStyles.collectionHeaderText}>Item 3</Text>
        <Text style={globalStyles.collectionItemText}>Collection: xxx</Text>
      </View>
    </ScrollView>
  )
}
