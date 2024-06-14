import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import CustomButton from './CustomButton';

const CustomCard = ({title, handlePress, containerStyles, textStyles, isLoading, onPress}) => {
  return (
    <View style={styles.card}>
      {/* <MaterialIcons name="video-call" size={50} color="#2a9d8f" style={styles.icon} /> */}
      {/* <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="card-image"
        /> */}
        <Image
        source='https://www.istockphoto.com/photo/female-doctor-waving-and-talking-with-colleagues-through-a-video-call-with-a-laptop-gm1249601252-364218777'
        resizeMode="contain"
        className="w-6 h-6"
      />
      <Text style={styles.title}>Get Care Now</Text>
      <Text style={styles.description}>Start a video call with a doctor immediately.</Text>
      <CustomButton 
            title="Start Video Call"
            handlePress={onPress}
            containerStyles="mt-7"
           
          />
      {/* <TouchableOpacity className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`} onPress={onPress}>
        <Text style={styles.buttonText}>Start Video Call</Text>
      </TouchableOpacity> */}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
    margin: 20,
  },
  icon: {
    marginBottom: 10,
    color: '#159BED'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  description: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#159BED',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomCard