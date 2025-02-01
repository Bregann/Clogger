import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Text, View, ScrollView, Pressable } from 'react-native'
import { Button } from 'react-native-paper'
import homeStyles from '@/styles/homeStyles'
import globalStyles from '@/styles/globalStyles'
import { useRouter } from 'expo-router'
import { useHome } from '@/reactQueryHooks/homeQueries'
import { useCollections } from '@/reactQueryHooks/collectionQueries'

export default function HomeScreen (): JSX.Element {
  const router = useRouter()
  const { data, isLoading, isError } = useHome()
  const { data: collectionsData, isLoading: collectionsIsLoading, isError: collectionsIsError } = useCollections()

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
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
            <Text style={homeStyles.statsNumber}>{data.totalCollections}</Text>
          </View>
        </View>
        }
      {isError && <Text>An error occurred while fetching user stats</Text>}
        <Text style={homeStyles.quickActionsText}>Quick Actions</Text>
        <View style={globalStyles.rowContainer}>
          <Button mode="contained" style={ { marginRight: 10 } } onPress={() => { router.push({ pathname: '/(tabs)/Collections/AddEditCollection/[id]', params: { id: 0 } }) }}>Add Collection</Button>
          <Button mode="contained" onPress={() => { router.push({ pathname: '/(tabs)/Collections/AddEditItem/[id]', params: { id: 0 } }) }}>Add Item</Button>
        </View>
        <Text style={homeStyles.yourCollectionsText}>Your Collections <FontAwesome size={28} name="arrow-circle-right" /></Text>
      </View>
      <Pressable
        style={globalStyles.collectionBox}
        onPress={() => { router.push({ pathname: '/Collections/CollectionItemList/[id]', params: { id: 1 } }) }}>
        <View>
          <Text style={globalStyles.collectionHeaderText}>Collection 1</Text>
          <Text style={globalStyles.collectionItemText}>500 items</Text>
        </View>
      </Pressable>
      <View style={globalStyles.collectionBox}>
        <Text style={globalStyles.collectionHeaderText}>Collection 2</Text>
        <Text style={globalStyles.collectionItemText}>500 items</Text>
      </View>
      <View style={globalStyles.collectionBox}>
        <Text style={globalStyles.collectionHeaderText}>Collection 3</Text>
        <Text style={globalStyles.collectionItemText}>500 items</Text>
      </View>
      <View style={globalStyles.collectionBox}>
        <Text style={globalStyles.collectionHeaderText}>Collection 4</Text>
        <Text style={globalStyles.collectionItemText}>500 items</Text>
      </View>
      <View style={globalStyles.collectionBox}>
        <Text style={globalStyles.collectionHeaderText}>Collection 5</Text>
        <Text style={globalStyles.collectionItemText}>500 items</Text>
      </View>
      <View style={globalStyles.collectionBox}>
        <Text style={globalStyles.collectionHeaderText}>Collection 6</Text>
        <Text style={globalStyles.collectionItemText}>500 items</Text>
      </View>
    </ScrollView>
  )
}


