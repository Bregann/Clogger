import { useImagePicker } from '@/context/imagePickerContext'
import { CustomFieldDataValueId, useEditItemProperties } from '@/hooks/Items/useEditItemProperties'
import addEditItemStyles from '@/styles/addEditItemStyles'
import globalStyles from '@/styles/globalStyles'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { Text, ScrollView, Alert } from 'react-native'
import { Button, TextInput, useTheme } from 'react-native-paper'

export default function AddEditItemScreen (): JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>()
  const theme = useTheme()
  const pickImage = useImagePicker()

  const { data, isLoading, isError, error } = useEditItemProperties(parseInt(id))

  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [customFields, setCustomFields] = useState<CustomFieldDataValueId[]>([])

  useFocusEffect(
    useCallback(() => {
      return (): void => {
        pickImage.resetImage()
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  )

  useEffect(() => {
    if (data !== undefined && !isLoading) {
      setItemName(data.itemName)
      setItemDescription(data.itemDescription)
      setCustomFields(data.customFields)
    }
  }, [data, isLoading])

  const confirmDeletionAlert = (): void => {
    Alert.alert('Delete confirmation', 'Are you sure you want to delete this item?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: (): void => { console.log('Delete item') },
        style: 'destructive'
      }
    ])
  }

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
      {isLoading && <Text>Loading item...</Text>}
      {isError && <Text>{error.message}</Text>}
      {data !== undefined && !isLoading &&
        <>
          <Button mode="contained" style={addEditItemStyles.addEditButton}>Save Changes</Button>
          <Text style={globalStyles.headerText}>Editing Item {itemName}</Text>
          <Text style={globalStyles.subheaderText}>Edit the item details</Text>

          <TextInput
            mode="outlined"
            label="Item Name"
            style={addEditItemStyles.textInput}
            value={itemName}
          />

          <TextInput
            multiline={true}
            mode="outlined"
            label="Item Description"
            style={addEditItemStyles.textInput}
            value={itemDescription}
          />

          <Button
            mode="contained"
            style={{ marginTop: 20 }}
            onPress={async () => { await pickImage.pickImage() }}
          >
            {data.hasImage ? 'Replace Image' : 'Upload Image'}
          </Button>
          {data.hasImage && <Text style={{ width: '85%' }}>Note: You already have an image uploaded, uploading a new one will replace the old image</Text>}
          {pickImage.image !== null && <Text>Image Uploaded</Text>}
          <Button onPress={() => { console.log(pickImage) }}>test</Button>
          {customFields.length > 0 &&
            <>
              <Text style={addEditItemStyles.collectionItemPropertiesHeaderText}>Item Properties</Text>
              {customFields.map((field) => (
                <TextInput
                  key={field.fieldId}
                  mode="outlined"
                  label={field.fieldName}
                  style={addEditItemStyles.textInput}
                  value={field.fieldValue}
                  onChangeText={(text) => {
                    const newCustomFields = customFields.map((customField) => {
                      if (customField.fieldId === field.fieldId) {
                        return { ...customField, fieldValue: text }
                      }
                      return customField
                    })

                    setCustomFields(newCustomFields)
                  }}
                />
              ))}
            </>
          }

          <Button
            mode="contained"
            buttonColor={theme.colors.secondary}
            style={{ marginTop: 20 }}
            onPress={confirmDeletionAlert}
            >
              Delete Item
          </Button>
        </>}
    </ScrollView>
  )
}

