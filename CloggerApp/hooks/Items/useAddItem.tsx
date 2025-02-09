import { authApiClient } from '@/helpers/apiClient'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import FormData from 'form-data'

export interface AddItemRequestDto {
  imageUri?: string | null
  imageMimeType: string
  imageFileName: string
  collectionId: number
  itemName: string
  itemDescription: string
  customFieldData: CustomFieldData[]
}

export interface CustomFieldData {
  id: number
  value: string
}

const addItem = async (dto: AddItemRequestDto): Promise<number> => {
  const formData = new FormData()

  if (dto.imageUri !== null) {
    formData.append('image', {
      uri: dto.imageUri,
      name: dto.imageFileName,
      type: dto.imageMimeType
    })
  }

  formData.append('collectionId', dto.collectionId.toString())
  formData.append('itemName', dto.itemName)
  formData.append('itemDescription', dto.itemDescription)

  if (dto.customFieldData.length > 0) {
    dto.customFieldData.forEach((field, index) => {
      formData.append(`customField[${index}].fieldId`, field.id.toString())
      formData.append(`customField[${index}].fieldValue`, field.value)
    })
  }

  const apiResponse = await authApiClient.postForm('/api/items/AddItem', formData)
  return apiResponse.data
}

export const useAddItem = (collectionId: number): UseMutationResult<number, Error, AddItemRequestDto> => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: addItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['collectionItems', collectionId] })
      router.replace({ pathname: '/(tabs)/Collections/CollectionItem/[id]', params: { id: data } })
    }
  })
}