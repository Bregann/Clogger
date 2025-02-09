import { authApiClient } from '@/helpers/apiClient'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

interface SearchResultsDto {
  totalResults: number
  collections: SearchCollectionDto[]
  items: SearchItemDto[]
}

interface SearchCollectionDto {
  collectionId: number
  collectionName: string
  collectionDescription: string
  collectionItemCount: number
}

interface SearchItemDto {
  itemId: number
  itemName: string
  itemDescription: string
  collectionName: string
}

export const useSearch = (searchQuery: string): UseQueryResult<SearchResultsDto, Error> => {
  return useQuery({
    queryKey: ['search', searchQuery],
    queryFn: async () => {
      const response = await authApiClient.get(`/api/Search/${searchQuery}`)

      if (response.status !== 200) {
        throw new Error('An error occurred while fetching search results')
      }

      return response.data
    },
    enabled: false
  })
}