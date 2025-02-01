import { authApiClient } from '@/helpers/apiClient'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

interface GetUserHeaderStatsDto {
  totalCollections: number
  totalItems: number
  userFirstName: string
}

export const useHome = (): UseQueryResult<GetUserHeaderStatsDto, Error> => {
  return useQuery({
    queryKey: ['home'],
    queryFn: async () => {
      const response = await authApiClient.get('/api/homeGetUserHeaderStats')

      if (response.status !== 200) {
        throw new Error('An error occurred while fetching user stats')
      }

      return response.data
    }
  })
}