import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto'
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
    marginTop: 10,
    fontFamily: 'Nunito_700Bold'
  },
  statsNumber: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Nunito_400Regular'
  },
  quickActionsText: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
    fontFamily: 'Nunito_400Regular'
  },
  yourCollectionsText: {
    fontSize: 28,
    marginTop: 25,
    marginBottom: 20,
    fontFamily: 'Nunito_400Regular'
  }
})