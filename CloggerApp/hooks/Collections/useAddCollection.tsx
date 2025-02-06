import { authApiClient } from '@/helpers/apiClient'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'

export interface AddCollectionRequest {
  collectionName: string
  collectionDescription: string
  customFieldNames?: string[]
}

const addCollection = async (dto: AddCollectionRequest): Promise<number> => {
  const response = await authApiClient.post('/api/collections/AddNewCollection', dto)

  if (response.status === 400) {
    throw new Error('There has been an unexpected error. Please try again later')
  }

  if (response.status === 409) {
    throw new Error('This collection name already exists')
  }

  return response.data
}

export const useAddCollection = (): UseMutationResult<number, Error, AddCollectionRequest> => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: addCollection,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
      router.replace({ pathname: '/(tabs)/Collections/CollectionItemList/[id]', params: { id: data } })
    }
  })
}
