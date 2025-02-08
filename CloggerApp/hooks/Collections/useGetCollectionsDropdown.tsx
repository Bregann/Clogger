import { authApiClient } from '@/helpers/apiClient'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export interface GetCollectionDropdownValuesDto {
  collections: LabelValue[]
}

export interface LabelValue {
  label: string
  value: string
}

export const useGetCollectionsDropdown = (): UseQueryResult<GetCollectionDropdownValuesDto, Error> => {
  return useQuery({
    queryKey: ['addItemDropdownCollections'],
    queryFn: async () => {
      const response = await authApiClient.get('/api/collections/GetCollectionDropdownValues')

      if (response.status !== 200) {
        throw new Error('An error occurred while fetching collections')
      }

      return response.data
    }
  })
}