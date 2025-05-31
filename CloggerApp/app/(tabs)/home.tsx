import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Text, View, ScrollView, Pressable } from 'react-native'
import { Button } from 'react-native-paper'
import homeStyles from '@/styles/homeStyles'
import globalStyles from '@/styles/globalStyles'
import { useRouter } from 'expo-router'
import { useHome } from '@/hooks/useHome'
import { useCollections } from '@/hooks/Collections/useCollections'
import { JSX } from 'react'

export default function HomeScreen (): JSX.Element {
  const router = useRouter()
  const { data, isLoading, isError } = useHome()
  const { data: collectionsData, isLoading: collectionsIsLoading, isError: collectionsIsError } = useCollections()

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer} keyboardShouldPersistTaps={'always'}>
      <View>
        <Text style={globalStyles.headerText}>Welcome back, {data !== undefined && !isLoading ? data.userFirstName : 'Clogger User'}</Text>
        <Text style={globalStyles.subheaderText}>What would you like to do today?</Text>
        {!isLoading && data !== undefined && <View style={homeStyles.boxContainer}>
          <View style={homeStyles.leftBox}>
            <Text style={homeStyles.statsHeader}>Total Collections</Text>
            <Text style={homeStyles.statsNumber}>{data.totalCollections}</Text>
          </View>
          <View style={homeStyles.rightBox}>
            <Text style={homeStyles.statsHeader}>Total Items</Text>
            <Text style={homeStyles.statsNumber}>{data.totalItems}</Text>
          </View>
        </View>
        }
      {isError && <Text>An error occurred while fetching user stats</Text>}
        <Text style={homeStyles.quickActionsText}>Quick Actions</Text>
        <View style={globalStyles.rowContainer}>
          <Button mode="contained" style={ { marginRight: 10 } } onPress={() => { router.push('/(tabs)/Collections/AddCollection') }}>Add Collection</Button>
          <Button mode="contained" onPress={() => { router.push({ pathname: '/(tabs)/Collections/AddItem/[collectionId]', params: { collectionId: -1 } }) }}>Add Item</Button>
        </View>
        <Pressable onPress={() => { router.push('/collections') }}>
          <Text style={homeStyles.yourCollectionsText}>Your Collections <FontAwesome size={28} name="arrow-circle-right" /></Text>
        </Pressable>
      </View>

      {collectionsIsLoading && <Text>Loading collections...</Text>}
      {collectionsIsError && <Text>An error occurred while fetching collections</Text>}
      {collectionsData !== undefined && !collectionsIsLoading && collectionsData.collections.map((collection) => {
        return (
          <Pressable
            key={collection.id}
            style={globalStyles.collectionBox}
            onPress={() => { router.push({ pathname: '/Collections/CollectionItemList/[id]', params: { id: collection.id } }) }}>
          <View>
            <Text style={globalStyles.collectionHeaderText}>{collection.collectionName}</Text>
            <Text style={globalStyles.collectionItemText}>{collection.collectionDescription}</Text>
            <Text style={globalStyles.collectionItemText}>{collection.collectionItemCount}</Text>
          </View>
        </Pressable>
        )
      })
    }
    </ScrollView>
  )
}


