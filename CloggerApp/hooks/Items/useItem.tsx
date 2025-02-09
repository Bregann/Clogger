import { authApiClient } from '@/helpers/apiClient'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

interface GetItemDto {
  id: number
  itemName: string
  itemDescription: string
  imageUrl?: string | null
  dateAdded: string
  lastUpdated: string
  customFields: CustomField[]
}

interface CustomField {
  fieldName: string
  fieldValue: string
}

export const useItem = (itemId: number): UseQueryResult<GetItemDto, Error> => {
  return useQuery({
    queryKey: ['item', itemId],
    queryFn: async () => {
      const response = await authApiClient.get(`/api/items/GetItem/${itemId}`)

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