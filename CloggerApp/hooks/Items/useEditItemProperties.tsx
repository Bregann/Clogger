import { authApiClient } from '@/helpers/apiClient'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

interface GetEditItemPropertiesDto {
  itemId: number
  collectionId: number
  itemName: string
  itemDescription: string
  customFields: CustomFieldDataValueId[]
  hasImage: boolean
}

export interface CustomFieldDataValueId {
  fieldId: number
  fieldName: string
  fieldValue?: string
}

export const useEditItemProperties = (itemId: number): UseQueryResult<GetEditItemPropertiesDto, Error> => {
  return useQuery({
    queryKey: ['editItemProperties', itemId],
    queryFn: async () => {
      const response = await authApiClient.get(`/api/items/GetEditItemProperties/${itemId}`)

      if (response.status === 404) {
        throw new Error('Item not found')
      }

      if (response.status !== 200) {
        throw new Error('An error occurred while fetching item')
      }

      return response.data
    }
  })
}