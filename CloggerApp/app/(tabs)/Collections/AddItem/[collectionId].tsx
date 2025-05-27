import { useGetCollectionsDropdown } from '@/hooks/Collections/useGetCollectionsDropdown'
import { useGetCustomCollectionFields } from '@/hooks/Collections/useGetCustomCollectionFields'
import addEditItemStyles from '@/styles/addEditItemStyles'
import globalStyles from '@/styles/globalStyles'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { Dropdown } from 'react-native-paper-dropdown'
import { CustomFieldData, useAddItem } from '@/hooks/Items/useAddItem'
import { useImagePicker } from '@/context/imagePickerContext'

export default function AddEditItemScreen (): JSX.Element {
  // -1 = no collection otherwise it will be the collection id
  const { collectionId } = useLocalSearchParams<{ collectionId: string }>()

  const [currentCollectionId, setCurrentCollectionId] = useState<number>(parseInt(collectionId))
  const [customFieldData, setCustomFieldData] = useState<CustomFieldData[]>([])
  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [addItemPressed, setAddItemPressed] = useState(false)

  const pickImage = useImagePicker()

  useFocusEffect(
    useCallback(() => {
      return (): void => {
        pickImage.resetImage()
        setItemName('')
        setItemDescription('')
        setAddItemPressed(false)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  )

  const { data: dropdownData, isLoading: isLoadingDropdownData, isError: isErrorDropdownData } = useGetCollectionsDropdown()
  const { data: customFieldsData, isLoading: isLoadingCustomFieldsData, isError: isErrorCustomFieldsData } = useGetCustomCollectionFields(currentCollectionId)
  const { mutateAsync: addItemMutation } = useAddItem(currentCollectionId)

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

  const addItem = async (): Promise<void> => {
    setAddItemPressed(true)
    if (currentCollectionId === -1) {
      return
    }

    await addItemMutation({
      collectionId: currentCollectionId,
      imageUri: pickImage.image ?? null,
      imageFileName: pickImage.imageFileName ?? '',
      imageMimeType: pickImage.imageMimeType ?? '',
      itemName,
      itemDescription,
      customFieldData: customFieldData
    })

    setAddItemPressed(false)
  }

  useEffect(() => {
    setCustomFieldData([])
  }, [currentCollectionId])

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer} keyboardShouldPersistTaps={'always'}>
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

      <TextInput
        mode="outlined"
        label="Item Name"
        style={addEditItemStyles.textInput}
        onChangeText={(text) => { setItemName(text) }}
      />
      <TextInput
        multiline={true}
        mode="outlined"
        label="Item Description"
        style={addEditItemStyles.textInput}
        onChangeText={(text) => { setItemDescription(text) }}
      />

      <Button mode="contained" style={{ marginTop: 20 }} onPress={async () => { await pickImage.pickImage() }}>Upload Image</Button>
      {pickImage.image !== null || pickImage.image !== undefined && <Text>Image Uploaded</Text>}

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
      <Button
        mode="contained"
        style={{ marginTop: 20 }}
        onPress={async () => { await addItem() }}
        disabled={currentCollectionId === -1 || itemName === '' || itemDescription === '' || addItemPressed}
      >
        Add Item
      </Button>
    </ScrollView>
  )
}

