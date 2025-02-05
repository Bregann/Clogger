import addEditCollectionStyles from '@/styles/addEditCollectionStyles'
import globalStyles from '@/styles/globalStyles'
import { useFocusEffect } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Text, ScrollView } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

export default function AddEditCollection (): JSX.Element {
  const [collectionName, setCollectionName] = useState('')
  const [collectionDescription, setCollectionDescription] = useState('')
  const [customFieldNames, setCustomFieldNames] = useState<string[]>([])

  useFocusEffect(
    useCallback(() => {
      return (): void => {
        setCollectionName('')
        setCollectionDescription('')
        setCustomFieldNames([])
      }
    }, [])
  )

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
      <Text style={globalStyles.headerText}>Add New Collection</Text>
      <Text style={globalStyles.subheaderText}>Add a new collection to your list</Text>
      <TextInput mode="outlined" label="Collection Name" style={addEditCollectionStyles.textInput} value={collectionName} />
      <TextInput mode="outlined" label="Collection Description" style={addEditCollectionStyles.textInput} value={collectionDescription} />

      <Text style={addEditCollectionStyles.collectionItemPropertiesHeaderText}>Collection item properties</Text>
      <Text style={addEditCollectionStyles.collectionItemPropertiesSubheaderText}>Below you can add custom collection item properties. By default items will only have a name, added added, date modified and notes</Text>

      {/* Add in the id's as -1 as they will be set by the API, it knows that -1 is a new id */}
      <Button mode="contained" onPress={() => { setCustomFieldNames([...customFieldNames, '']) }}>Add property</Button>
      {customFieldNames.map((field, index) => (
        <TextInput key={index} mode="outlined" label={field} style={addEditCollectionStyles.textInput} />
      ))}

      <Button mode="contained" style={{ marginTop: 20 }}>Add Collection</Button>
    </ScrollView>
  )
}