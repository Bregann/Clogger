import globalStyles from '@/styles/globalStyles'
import { useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Button, Searchbar } from 'react-native-paper'
import collectionStyles from '@/styles/collectionsStyles'

export default function HomeScreen () {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
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
      <Button style={collectionStyles.addCollectionButton} mode="contained" onPress={() => { }}>Add New Collection</Button>

      <View style={globalStyles.collectionBox}>
        <Text style={globalStyles.collectionHeaderText}>Collection 1</Text>
        <Text style={globalStyles.collectionItemText}>500 items</Text>
      </View>
      <View style={globalStyles.collectionBox}>
        <Text style={globalStyles.collectionHeaderText}>Collection 2</Text>
        <Text style={globalStyles.collectionItemText}>500 items</Text>
      </View>
      <View style={globalStyles.collectionBox}>
        <Text style={globalStyles.collectionHeaderText}>Collection 3</Text>
        <Text style={globalStyles.collectionItemText}>500 items</Text>
      </View>
      <View style={globalStyles.collectionBox}>
        <Text style={globalStyles.collectionHeaderText}>Collection 4</Text>
        <Text style={globalStyles.collectionItemText}>500 items</Text>
      </View>
      <View style={globalStyles.collectionBox}>
        <Text style={globalStyles.collectionHeaderText}>Collection 5</Text>
        <Text style={globalStyles.collectionItemText}>500 items</Text>
      </View>
      <View style={globalStyles.collectionBox}>
        <Text style={globalStyles.collectionHeaderText}>Collection 6</Text>
        <Text style={globalStyles.collectionItemText}>500 items</Text>
      </View>
      <View style={globalStyles.collectionBox}>
        <Text style={globalStyles.collectionHeaderText}>Collection 7</Text>
        <Text style={globalStyles.collectionItemText}>500 items</Text>
      </View>
      <View style={globalStyles.collectionBox}>
        <Text style={globalStyles.collectionHeaderText}>Collection 8</Text>
        <Text style={globalStyles.collectionItemText}>500 items</Text>
      </View>

    </ScrollView>
  )
}
