import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { CustomFieldName } from './useGetEditCollectionData'
import { authApiClient } from '@/helpers/apiClient'

export interface GetCustomCollectionFieldsDto {
  customFields: CustomFieldName[]
}

export const useGetCustomCollectionFields = (collectionId: number): UseQueryResult<GetCustomCollectionFieldsDto, Error> => {
  return useQuery({
    queryKey: ['customFields', collectionId],
    queryFn: async () => {
      if (collectionId === -1) {
        return { customFields: [] }
      }

      const response = await authApiClient.get(`/api/collections/GetCustomCollectionFields/${collectionId}`)

      if (response.status === 404) {
        throw new Error('Collection not found')
      }

      if (response.status !== 200) {
        throw new Error('An error occurred while fetching custom fields')
      }

      return response.data
    }
  })
}