import { useGetCollectionsDropdown } from '@/hooks/Collections/useGetCollectionsDropdown'
import { useGetCustomCollectionFields } from '@/hooks/Collections/useGetCustomCollectionFields'
import addEditItemStyles from '@/styles/addEditItemStyles'
import globalStyles from '@/styles/globalStyles'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { Dropdown } from 'react-native-paper-dropdown'
import * as ImagePicker from 'expo-image-picker'
import { CustomFieldData, useAddItem } from '@/hooks/Items/useAddItem'

export default function AddEditItemScreen (): JSX.Element {
  // -1 = no collection otherwise it will be the collection id
  const { collectionId } = useLocalSearchParams<{ collectionId: string }>()

  const [currentCollectionId, setCurrentCollectionId] = useState<number>(parseInt(collectionId))
  const [customFieldData, setCustomFieldData] = useState<CustomFieldData[]>([])
  const [itemName, setItemName] = useState('t')
  const [itemDescription, setItemDescription] = useState('t')
  const [image, setImage] = useState<string | null | undefined>(null)
  const [imageFileName, setImageFileName] = useState<string | null | undefined>(undefined)
  const [imageMimeType, setImageMimeType] = useState<string | undefined>(undefined)

  const { data: dropdownData, isLoading: isLoadingDropdownData, isError: isErrorDropdownData } = useGetCollectionsDropdown()
  const { data: customFieldsData, isLoading: isLoadingCustomFieldsData, isError: isErrorCustomFieldsData } = useGetCustomCollectionFields(currentCollectionId)
  const { mutateAsync: addItemMutation } = useAddItem()

  const addOrUpdateCustomField = (fieldId: number, value: string): void => {
    if (!customFieldData.some((field) => field.id === fieldId)) {
      setCustomFieldData([...customFieldData, { id: fieldId, value }])
      return
    }

    const updatedFields = customFieldData.map((field) => {
      if (field.id === fieldId) {
        return { ...field, value }
      }

      return field
    })

    setCustomFieldData(updatedFields)
  }

  const pickImage = async (): Promise<void> => {
    // go for camera perms first as it's easier
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync()

    if (cameraPermission.granted) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 1,
      })
      console.log(result)
      if (!result.canceled) {
        setImage(result.assets[0].uri)
        setImageFileName(result.assets[0].fileName)
        setImageMimeType(result.assets[0].mimeType)
      }
    } else {

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
      })

      console.log(result)

      if (!result.canceled) {
        setImage(result.assets[0].uri)
        setImageFileName(result.assets[0].fileName)
        setImageMimeType(result.assets[0].mimeType)
      }
    }
  }

  const addItem = async (): Promise<void> => {
    if (currentCollectionId === -1) {
      return
    }
    console.log('hello')
    await addItemMutation({
      collectionId: currentCollectionId,
      imageUri: image ?? '',
      imageFileName: imageFileName ?? '',
      imageMimeType: imageMimeType ?? '',
      itemName,
      itemDescription,
      customFieldData: customFieldData
    })
  }

  useEffect(() => {
    setCustomFieldData([])
  }, [currentCollectionId])

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
      <Text style={globalStyles.headerText}>Add New Item</Text>
      <Text style={globalStyles.subheaderText}>Add a new item to your collection</Text>

      {isLoadingDropdownData && <Text>Loading collection data...</Text>}
      {isErrorDropdownData && <Text>An error occurred while fetching collection data</Text>}
      {dropdownData !== undefined && !isLoadingDropdownData &&
        <View style={{ width: '90%' }}>
          <Dropdown
            label="Collection"
            placeholder="Select Collection"
            options={dropdownData.collections}
            value={currentCollectionId.toString()}
            onSelect={(e) => { setCurrentCollectionId(parseInt(e ?? '-1')) }}
            mode="outlined"
          />
        </View>
      }
      <TextInput mode="outlined" label="Item Name" style={addEditItemStyles.textInput} />
      <TextInput multiline={true} mode="outlined" label="Item Name" style={addEditItemStyles.textInput} />
      <Button mode="contained" style={{ marginTop: 20 }} onPress={async () => { await pickImage() }}>Upload Image</Button>
      {currentCollectionId !== -1 &&
        <>
          <Text style={addEditItemStyles.collectionItemPropertiesHeaderText}>Item Properties</Text>
          {isLoadingCustomFieldsData && <Text>Loading custom fields...</Text>}
          {isErrorCustomFieldsData && <Text>An error occurred while fetching custom fields</Text>}
          {customFieldsData !== undefined && !isLoadingCustomFieldsData && customFieldsData.customFields.length === 0 &&
            <Text>No custom fields found for this collection</Text>
          }
          {customFieldsData !== undefined && !isLoadingCustomFieldsData && customFieldsData.customFields.length > 0 && customFieldsData.customFields.map((field) => {
            return (
              <TextInput
                key={field.id}
                mode="outlined"
                label={field.fieldName}
                style={addEditItemStyles.textInput}
                onChangeText={(text) => { addOrUpdateCustomField(field.id, text) }}
              />
            )
          })}
        </>
      }
      <Button mode="contained" style={{ marginTop: 20 }} onPress={async () => { await addItem() }}>Add Item</Button>
    </ScrollView>
  )
}

