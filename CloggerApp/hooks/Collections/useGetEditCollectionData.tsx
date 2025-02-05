import { authApiClient } from '@/helpers/apiClient'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

interface GetEditCollectionDataDto {
  collectionName: string
  collectionDescription: string
  customFieldNames: CustomFieldName[]
}

export interface CustomFieldName {
  id: number
  fieldName: string
}

export const useGetEditCollectionData = (collectionId: number): UseQueryResult<GetEditCollectionDataDto, Error> => {
  return useQuery({
    queryKey: ['editCollection', collectionId],
    queryFn: async () => {
      const response = await authApiClient.get(`/api/collections/GetEditCollectionData/${collectionId}`)

      if (response.status === 404) {
        throw new Error('Collection not found')
      }

      if (response.status !== 200) {
        throw new Error('An error occurred while fetching collection')
      }

      return response.data
    }
  })
}
