import addEditCollectionStyles from '@/styles/addEditCollectionStyles'
import globalStyles from '@/styles/globalStyles'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, ScrollView } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

export default function AddEditCollection (): JSX.Element {
  // 0 = add otherwise it will be the collection id
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
      {id === '0' ?
      <>
        <Text style={globalStyles.headerText}>Add New Collection</Text>
        <Text style={globalStyles.subheaderText}>Add a new collection to your list</Text>
      </>
        :
      <>
        <Button mode="contained" style={addEditCollectionStyles.addEditButton}>Save Changes</Button>
        <Text style={globalStyles.headerText}>Editing Collection xxx</Text>
        <Text style={globalStyles.subheaderText}>Edit the collection details</Text>
      </>
      }

      <TextInput mode="outlined" label="Collection Name" style={addEditCollectionStyles.textInput} />
      <TextInput mode="outlined" label="Collection Description" style={addEditCollectionStyles.textInput} />

      <Text style={addEditCollectionStyles.collectionItemPropertiesHeaderText}>Collection item properties</Text>
      <Text style={addEditCollectionStyles.collectionItemPropertiesSubheaderText}>Below you can add custom collection item properties. By default items will only have a name and notes</Text>
      <Button mode="contained">Add property</Button>
      <TextInput mode="outlined" label="Property 1" style={addEditCollectionStyles.textInput} />
      <TextInput mode="outlined" label="Property 2" style={addEditCollectionStyles.textInput} />
      <TextInput mode="outlined" label="Property 3" style={addEditCollectionStyles.textInput} />
      {id === '0' && <Button mode="contained" style={{ marginTop: 20 }}>Add Collection</Button>}
    </ScrollView>
  )
}