import { CustomFieldName, useGetEditCollectionData } from '@/hooks/Collections/useGetEditCollectionData'
import { SaveCollectionChangesRequest, useSaveCollectionChanges } from '@/hooks/Collections/useSaveCollectionChanges'
import addEditCollectionStyles from '@/styles/addEditCollectionStyles'
import globalStyles from '@/styles/globalStyles'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, ScrollView } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

export default function AddEditCollection (): JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, isLoading, isError } = useGetEditCollectionData(parseInt(id))
  const editChangesMutation = useSaveCollectionChanges(parseInt(id))

  const [collectionName, setCollectionName] = useState('')
  const [collectionDescription, setCollectionDescription] = useState('')
  const [customFieldNames, setCustomFieldNames] = useState<CustomFieldName[]>([])

  useEffect(() => {
    if (data !== undefined && !isLoading) {
      setCollectionName(data.collectionName)
      setCollectionDescription(data.collectionDescription)
      setCustomFieldNames(data.customFieldNames)
    }
  }, [data, isLoading])

  const saveChanges = async (): Promise<void> => {
    const dto: SaveCollectionChangesRequest = {
      collectionId: parseInt(id),
      collectionName,
      collectionDescription,
      customFieldNames
    }

    await editChangesMutation.mutateAsync(dto)
  }

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
      <Button mode="contained" style={addEditCollectionStyles.addEditButton} onPress={async () => { await saveChanges() }}>Save Changes</Button>
      <Text style={globalStyles.headerText}>Editing Collection {collectionName}</Text>
      <Text style={globalStyles.subheaderText}>Edit the collection details</Text>

      <Text style={{ color: 'red' }}>{editChangesMutation.error?.message}</Text>

      {isLoading && <Text>Loading collection data...</Text>}
      {isError && <Text>An error occurred while fetching collection data</Text>}
      <TextInput
        mode="outlined"
        label="Collection Name"
        style={addEditCollectionStyles.textInput}
        value={collectionName}
        onChangeText={(e) => { setCollectionName(e) }}
      />

      <TextInput
        mode="outlined"
        label="Collection Description"
        style={addEditCollectionStyles.textInput}
        value={collectionDescription}
        onChangeText={(e) => { setCollectionDescription(e) }}
      />

      <Text style={addEditCollectionStyles.collectionItemPropertiesHeaderText}>Collection item properties</Text>
      <Text style={addEditCollectionStyles.collectionItemPropertiesSubheaderText}>Below you can add custom collection item properties. By default items will only have a name, added added, date modified and notes</Text>

      {/* Add in the id's as -1 as they will be set by the API, it knows that -1 is a new id */}
      <Button mode="contained" onPress={() => { setCustomFieldNames([...customFieldNames, { id: -1, fieldName: '' }]) }}>Add property</Button>
      {customFieldNames.map((field, index) => (
        <TextInput
          key={index}
          mode="outlined"
          style={addEditCollectionStyles.textInput}
          value={field.fieldName}
          onChangeText={(text) => {
            const newCustomFieldNames = [...customFieldNames]
            newCustomFieldNames[field.id].fieldName = text
            setCustomFieldNames(newCustomFieldNames)
          }}
        />
      ))}
    </ScrollView>
  )
}