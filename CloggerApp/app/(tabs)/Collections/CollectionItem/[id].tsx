import collectionItemStyles from '@/styles/collectionItemStyles'
import globalStyles from '@/styles/globalStyles'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { Image } from 'expo-image'
import { useItem } from '@/hooks/Items/useItem'
import React from 'react'

export default function CollectionItemListScreen (): JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, isLoading, isError } = useItem(parseInt(id))

  return (
    <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
      {isLoading && <Text>Loading item...</Text>}
      {isError && <Text>An error occurred while fetching item</Text>}
      {data !== undefined && !isLoading && (
        <>
          <Button mode="contained" style={collectionItemStyles.editButton}>Edit Item</Button>
          <Text style={globalStyles.headerText}>{data.itemName}</Text>
          <View style={collectionItemStyles.pictureBox}>
            <Image source={{ uri: 'https://placecats.com/2268/4032' }} style={collectionItemStyles.pictureItem} />
          </View>
          <Text style={collectionItemStyles.itemDetailsHeader}>Description</Text>
          <Text style={collectionItemStyles.itemDetailsText}>{data.itemDescription}</Text>
          <Text style={[collectionItemStyles.itemDetailsHeader, { marginBottom: 10 }]}>Item Details</Text>
          <View style={collectionItemStyles.cardContainer}>
            <View style={collectionItemStyles.card}>
              <Text style={collectionItemStyles.itemDetailsSubheader}>Added at</Text>
              <Text style={collectionItemStyles.itemDetailsText}>{data.dateAdded}</Text>
            </View>
            <View style={collectionItemStyles.card}>
              <Text style={collectionItemStyles.itemDetailsSubheader}>Last Updated</Text>
              <Text style={collectionItemStyles.itemDetailsText}>{data.lastUpdated}</Text>
            </View>
          </View>
          {/* if there any custom fields then we need to add them in */}
          {data.customFields.length > 0 && data.customFields.reduce<{ fieldName: string; fieldValue: string }[][]>((acc, property, index) => {
            // start a new row every 2 properties
            if (index % 2 === 0) {
              acc.push([])
            }
            acc[acc.length - 1].push(property)
            return acc
          }, []).map((row, rowIndex) => (
            <View key={rowIndex} style={collectionItemStyles.cardContainer}>
              {row.map((property, index) => (
                <View key={index} style={collectionItemStyles.card}>
                  <Text style={collectionItemStyles.itemDetailsSubheader}>{property.fieldName}</Text>
                  <Text style={collectionItemStyles.itemDetailsText}>{property.fieldValue}</Text>
                </View>
              ))}
            </View>
          ))}
        </>
      )}

    </ScrollView>

  )
}
