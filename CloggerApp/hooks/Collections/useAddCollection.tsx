import { authApiClient } from '@/helpers/apiClient'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export interface AddCollectionRequest {
  collectionId?: number
  collectionName: string
  collectionDescription: string
  customFieldNames: string[]
}

const addCollection = async (dto: AddCollectionRequest): Promise<void> => {
  const response = await authApiClient.post('/api/collections/AddOrUpdateCollection', dto)
  return response.data
}

export const useAddOrEditCollection = (): UseMutationResult<void, Error, AddCollectionRequest> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
    },
    onError: (error) => {
    }
  })
}
