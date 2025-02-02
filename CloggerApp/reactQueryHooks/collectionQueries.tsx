import { authApiClient } from '@/helpers/apiClient'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

interface GetCollectionsDto {
  collections: Collection[]
}

interface Collection {
  id: number
  collectionName: string
  collectionDescription: number
  collectionItemCount: number
}

export const useCollections = (): UseQueryResult<GetCollectionsDto, Error> => {
  return useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
      const response = await authApiClient.get('/api/collections/GetCollections')

      if (response.status !== 200) {
        throw new Error('An error occurred while fetching collections')
      }

      return response.data
    }
  })
}