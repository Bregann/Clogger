import { authApiClient } from '@/helpers/apiClient'
import FormData from 'form-data'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { CustomFieldDataValueId } from './useEditItemProperties'

export interface EditItemRequestDto {
  imageUri?: string | null
  imageMimeType: string
  imageFileName: string
  itemId: number
  itemName: string
  itemDescription: string
  customFieldData: CustomFieldDataValueId[]
}

interface EditItemResponseDto {
  itemId: number
  collectionId: number
}

const saveItemChanges = async (dto: EditItemRequestDto): Promise<EditItemResponseDto> => {
  const formData = new FormData()

  if (dto.imageUri !== null) {
    formData.append('image', {
      uri: dto.imageUri,
      name: dto.imageFileName,
      type: dto.imageMimeType
    })
  }

  formData.append('itemId', dto.itemId.toString())
  formData.append('itemName', dto.itemName)
  formData.append('itemDescription', dto.itemDescription)

  if (dto.customFieldData.length > 0) {
    dto.customFieldData.forEach((field, index) => {
      formData.append(`customField[${index}].fieldId`, field.fieldId.toString())
      formData.append(`customField[${index}].fieldValue`, field.fieldValue)
    })
  }

  const apiResponse = await authApiClient.postForm('/api/items/SaveItemChanges', formData)
  return apiResponse.data
}

export const useSaveItemChanges = (): UseMutationResult<EditItemResponseDto, Error, EditItemRequestDto> => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: saveItemChanges,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['collectionItems', data.collectionId] })
      queryClient.invalidateQueries({ queryKey: ['collectionItem', data.itemId] })
      router.replace({ pathname: '/(tabs)/Collections/CollectionItem/[id]', params: { id: data.itemId } })
    }
  })
}