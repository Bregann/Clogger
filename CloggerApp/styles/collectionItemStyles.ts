import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  editButton: {
    marginLeft: 'auto',
    marginHorizontal: 10
  },
  pictureBox: {
    marginTop: 10,
    width: '95%',
    aspectRatio: 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  pictureItem: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'white',
  },
  itemDetailsHeader: {
   fontWeight: 'bold',
   color: 'black',
   fontSize: 28,
   textAlign: 'center'
  },
  itemDetailsSubheader: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  itemDetailsText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 3,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: '1%',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginVertical: 5,
  }
})