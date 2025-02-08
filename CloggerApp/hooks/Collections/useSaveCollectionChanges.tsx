import { authApiClient } from '@/helpers/apiClient'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { CustomFieldName } from './useGetEditCollectionData'

export interface SaveCollectionChangesRequest {
  collectionId: number
  collectionName: string
  collectionDescription: string
  customFieldNames: CustomFieldName[]
}

const saveCollectionChanges = async (dto: SaveCollectionChangesRequest): Promise<void> => {
  const response = await authApiClient.patch('/api/collections/SaveCollectionChanges', dto)

  if (response.status === 400) {
    throw new Error('There has been an unexpected error. Please try again later')
  }

  if (response.status === 404) {
    throw new Error('Collection not found')
  }

  if (response.status === 409) {
    throw new Error('This collection name already exists')
  }
}

export const useSaveCollectionChanges = (collectionId: number): UseMutationResult<void, Error, SaveCollectionChangesRequest> => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: saveCollectionChanges,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
      router.replace({ pathname: '/(tabs)/Collections/CollectionItemList/[id]', params: { id: collectionId } })
    }
  })
}