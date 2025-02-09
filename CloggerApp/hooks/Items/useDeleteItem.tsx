import { authApiClient } from '@/helpers/apiClient'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'

const deleteItem = async (itemId: number): Promise<void> => {
  const response = await authApiClient.delete(`/api/items/DeleteItem/${itemId}`)
  return response.data
}

export const useDeleteItem = (collectionId: number): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collectionItems'] })
      router.replace({ pathname: '/(tabs)/Collections/CollectionItemList/[id]', params: { id: collectionId } })
    }
  })
}
