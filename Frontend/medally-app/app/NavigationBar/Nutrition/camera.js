import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera/legacy';
import * as MediaLibrary from 'expo-media-library';
import Button from '../../components/CameraButton';
import APIEndpoint from '../../API';
import { router } from 'expo-router';

const API = new APIEndpoint();

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.on);
  const [focus, setFocus] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);

        // Ensure the file extension is .jpg
        const fileName = asset.filename.replace(/\.[^/.]+$/, ".jpg");

        const formData = new FormData();
        formData.append('image', {
          uri: assetInfo.localUri || assetInfo.uri,
          type: 'image/jpg',
          name: fileName,
        });

        console.log(formData);

        const results = await API.calculateCaloriesFromImage(formData); // Adjusted to pass formData
        console.log(results);
        alert('Picture saved! 🎉');
        
        setImage(null);
        console.log('saved successfully');


        router.push({
          pathname: './results',
          params: {
            ...results.message,
            image,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Pressable 
          style={styles.camera}
          onPress={(e) => {
            // Capture the touch position and simulate focus adjustment
            const { nativeEvent } = e;
            const { locationX, locationY } = nativeEvent;
            console.log('Focus on:', locationX, locationY);
            // Set focus state if needed or handle focus logic here
            setFocus({ x: locationX, y: locationY });
          }}
        >
          <Camera
            style={styles.camera}
            type={type}
            ref={cameraRef}
            flashMode={flash}
            focusDepth={focus ? 0.5 : 0} // Simulate focus adjustment
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 30,
              }}
            >
              <Button
                onPress={() =>
                  setFlash(
                    flash === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.on
                      : Camera.Constants.FlashMode.off
                  )
                }
                icon="flash"
                color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
              />
            </View>
          </Camera>
        </Pressable>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}
          >
            <Button
              title="Re-take"
              onPress={() => setImage(null)}
              icon="retweet"
            />
            <Button title="Save" onPress={savePicture} icon="save" />
          </View>
        ) : (
          <Button onPress={takePicture} icon2="circle" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000',
    padding: 1,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nutritionDistribution:{
    marginTop: 15,
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems: 'center',
    width: '70%'
  },
  nutritionStat:{
    alignItems : 'center',
    marginHorizontal: 10, // Replaced gap with marginHorizontal
  },
  calories: {
    color: '#7d7d7d',
    marginTop: 3,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 15,
    textAlign: 'left',
    letterSpacing: -0.6,
    alignSelf: 'stretch',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  camera: {
    flex: 2.5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
});
