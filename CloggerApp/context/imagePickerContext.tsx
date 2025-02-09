import { createContext, useContext, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

type ContextType = {
  image: string | null | undefined,
  imageFileName: string | null | undefined,
  imageMimeType: string | undefined,
  pickImage: () => Promise<void>
  resetImage: () => void
}

const ImagePickerContext = createContext<ContextType | undefined>(undefined)

export const ImagePickerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [image, setImage] = useState<string | null | undefined>(null)
  const [imageFileName, setImageFileName] = useState<string | null | undefined>(undefined)
  const [imageMimeType, setImageMimeType] = useState<string | undefined>(undefined)

    const pickImage = async (): Promise<void> => {
      // go for camera perms first as it's easier
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync()

      if (cameraPermission.granted) {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ['images'],
          quality: 1,
        })

        if (!result.canceled) {
          setImage(result.assets[0].uri)
          setImageFileName(result.assets[0].fileName)
          setImageMimeType(result.assets[0].mimeType)
        }
      } else {

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          quality: 1,
        })

        if (!result.canceled) {
          setImage(result.assets[0].uri)
          setImageFileName(result.assets[0].fileName)
          setImageMimeType(result.assets[0].mimeType)
        }
      }
    }

    const resetImage = (): void => {
      setImage(null)
      setImageFileName(null)
      setImageMimeType(undefined)
    }

    return (
      <ImagePickerContext.Provider value={{ image, imageFileName, imageMimeType, pickImage, resetImage }}>
        {children}
      </ImagePickerContext.Provider>
    )
}

export const useImagePicker = (): ContextType => {
  const context = useContext(ImagePickerContext)
  if (context === undefined) {
    throw new Error('useImagePicker must be used within a ImagePickerProvider')
  }

  return context
}