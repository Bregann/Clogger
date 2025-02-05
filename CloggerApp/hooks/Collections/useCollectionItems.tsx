import { authApiClient } from '@/helpers/apiClient'
import { useQuery, UseQueryResult } from '@tanstack/react-query'



interface GetCollectionItemsDto {
  collectionItems: CollectionItemList[]
}

interface CollectionItemList {
  id: number
  itemName: string
  itemDescription: string
}

export const useCollectionItems = (collectionId: number): UseQueryResult<GetCollectionItemsDto, Error> => {
  return useQuery({
    queryKey: ['collectionItems', collectionId],
    queryFn: async () => {
      const response = await authApiClient.get(`/api/collections/GetCollectionItems/${collectionId}`)

      if (response.status !== 200) {
        throw new Error('An error occurred while fetching collection items')
      }

      return response.data
    }
  })
}