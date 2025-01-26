import addEditItemStyles from '@/styles/addEditItemStyles'
import globalStyles from '@/styles/globalStyles'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Button, Provider, TextInput } from 'react-native-paper'
import { Dropdown } from 'react-native-paper-dropdown'

export default function AddEditItemScreen (): JSX.Element {
  // 0 = add otherwise it will be the item id
  const { id } = useLocalSearchParams<{ id: string }>()
  const [gender, setGender] = useState<string>()

  const OPTIONS = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ]

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
      {id === '0' ?
        <>
          <Text style={globalStyles.headerText}>Add New Item</Text>
          <Text style={globalStyles.subheaderText}>Add a new item to your collection</Text>
        </>
        :
        <>
          <Button mode="contained" style={addEditItemStyles.addEditButton}>Save Changes</Button>
          <Text style={globalStyles.headerText}>Editing Item xxx</Text>
          <Text style={globalStyles.subheaderText}>Edit the item details</Text>
        </>
      }

      <View style={{ width: '90%' }}>
        <Dropdown
          label="Collection"
          placeholder="Select Collection"
          options={OPTIONS}
          value={gender}
          onSelect={setGender}
        />
      </View>
      <TextInput mode="outlined" label="Item Name" style={addEditItemStyles.textInput} />
      <TextInput multiline={true} mode="outlined" label="Item Name" style={addEditItemStyles.textInput} />
      <Button mode="contained" style={{ marginTop: 20 }}>Upload Image</Button>
      <Text style={addEditItemStyles.collectionItemPropertiesHeaderText}>Item Properties</Text>
      <TextInput mode="outlined" label="Property 1" style={addEditItemStyles.textInput} />
      <TextInput mode="outlined" label="Property 2" style={addEditItemStyles.textInput} />
      <TextInput mode="outlined" label="Property 3" style={addEditItemStyles.textInput} />
      {id === '0' && <Button mode="contained" style={{ marginTop: 20 }}>Add Item</Button>}

    </ScrollView>
  )
}

