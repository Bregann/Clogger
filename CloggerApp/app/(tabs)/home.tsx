import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Text, View, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import homeStyles from '@/styles/homeStyles'
import globalStyles from '@/styles/globalStyles'

export default function HomeScreen () {
  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
      <View>
        <Text style={globalStyles.headerText}>Welcome back, Tilly</Text>
        <Text style={globalStyles.subheaderText}>What would you like to do today?</Text>
        <View style={homeStyles.boxContainer}>
          <View style={homeStyles.leftBox}>
            <Text style={homeStyles.statsHeader}>Total Collections</Text>
            <Text style={homeStyles.statsNumber}>5</Text>
          </View>
          <View style={homeStyles.rightBox}>
            <Text style={homeStyles.statsHeader}>Total Items</Text>
            <Text style={homeStyles.statsNumber}>5</Text>
          </View>
        </View>
        <Text style={homeStyles.quickActionsText}>Quick Actions</Text>
        <View style={homeStyles.rowContainer}>
          <Button mode="contained" style={ { marginRight: 10 } } onPress={() => { }}>Add Collection</Button>
          <Button mode="contained" onPress={() => { }}>Add Item</Button>
        </View>
        <Text style={homeStyles.yourCollectionsText}>Your Collections <FontAwesome size={28} name="arrow-circle-right" /></Text>
      </View>
      <View style={globalStyles.collectionBox}>
        <Text style={globalStyles.collectionHeaderText}>Collection 1</Text>
        <Text style={globalStyles.collectionItemText}>500 items</Text>
      </View>
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


