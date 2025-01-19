import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'

export default function HomeScreen () {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.headerText}>Welcome back, Tilly</Text>
        <Text style={styles.subheaderText}>What would you like to do today?</Text>
        <View style={styles.boxContainer}>
          <View style={styles.leftBox}>
            <Text style={styles.statsHeader}>Total Collections</Text>
            <Text style={styles.statsNumber}>5</Text>
          </View>
          <View style={styles.rightBox}>
            <Text style={styles.statsHeader}>Total Items</Text>
            <Text style={styles.statsNumber}>5</Text>
          </View>
        </View>
        <Text style={styles.quickActionsText}>Quick Actions</Text>
        <View style={styles.rowContainer}>
          <Button mode="contained" style={ { marginRight: 10 } } onPress={() => { }}>Add Collection</Button>
          <Button mode="contained" onPress={() => { }}>Add Item</Button>
        </View>
        <Text style={styles.yourCollectionsText}>Your Collections <FontAwesome size={28} name="arrow-circle-right" /></Text>
      </View>
      <View style={styles.collectionBox}>
        <Text style={styles.collectionHeaderText}>Collection 1</Text>
        <Text style={styles.collectionItemText}>500 items</Text>
      </View>
      <View style={styles.collectionBox}>
        <Text style={styles.collectionHeaderText}>Collection 2</Text>
        <Text style={styles.collectionItemText}>500 items</Text>
      </View>
      <View style={styles.collectionBox}>
        <Text style={styles.collectionHeaderText}>Collection 3</Text>
        <Text style={styles.collectionItemText}>500 items</Text>
      </View>
      <View style={styles.collectionBox}>
        <Text style={styles.collectionHeaderText}>Collection 4</Text>
        <Text style={styles.collectionItemText}>500 items</Text>
      </View>
      <View style={styles.collectionBox}>
        <Text style={styles.collectionHeaderText}>Collection 5</Text>
        <Text style={styles.collectionItemText}>500 items</Text>
      </View>
      <View style={styles.collectionBox}>
        <Text style={styles.collectionHeaderText}>Collection 6</Text>
        <Text style={styles.collectionItemText}>500 items</Text>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: '10%',
    alignItems: 'center',
    backgroundColor: '#e2e3db',
  },
  headerText: {
    color: 'black',
    fontSize: 32,
    textAlign: 'center',
  },
  subheaderText: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%'
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
  },
  leftBox: {
    width: '48%',
    height: 80,
    backgroundColor: 'white',
    borderRadius: 10,
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 5,
  },
  rightBox: {
    width: '48%',
    height: 80,
    backgroundColor: 'white',
    borderRadius: 10,
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 5
  },
  statsHeader: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },
  statsNumber: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 5
  },
  quickActionsText: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
  },
  yourCollectionsText: {
    fontSize: 28,
    marginTop: 25,
    marginBottom: 20
  },
  collectionBox: {
    width: '90%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 5
  },
  collectionHeaderText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 5
  },
  collectionItemText: {
    textAlign: 'center',
    fontStyle: 'italic'
  }
})
