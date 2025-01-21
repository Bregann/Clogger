import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#e2e3db',
    paddingTop: '5%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e2e3db'
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
    marginBottom: 20,
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