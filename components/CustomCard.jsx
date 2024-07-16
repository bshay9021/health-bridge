import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';
import { connect, createLocalTracks } from 'twilio-video';
import axios from 'axios';
// import {
//   RTCPeerConnection,
//   RTCIceCandidate,
//   RTCSessionDescription,
//   RTCView,
//   mediaDevices
// } from 'react-native-webrtc';

const CustomCard = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  const [room, setRoom] = useState(null);
  const [localTracks, setLocalTracks] = useState([]);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  // const localStreamRef = useRef(null);
  // const remoteStreamRef = useRef(null);
  // const peerConnectionRef = useRef(new RTCPeerConnection(configuration));

  // useEffect(() => {
  //   if (localStream) {
  //     localStreamRef.current.srcObject = localStream;
  //   }
  // }, [localStream]);

  // useEffect(() => {
  //   if (remoteStream) {
  //     remoteStreamRef.current.srcObject = remoteStream;
  //   }
  // }, [remoteStream]);

  const startVideoCall = async () => {
    console.log('hello');
    // try {
    //   const response = await axios.get('http://10.0.2.2:3000/token?identity', {
    //     params: {
    //       identity: 'bshay12'
    //     }
    //   });
    //   const token = response.data.token;

    //   const tracks = await createLocalTracks();
    //   setLocalTracks(tracks);

    //   const localStream = await mediaDevices.getUserMedia({
    //     audio: true,
    //     video: true
    //   });
    //   setLocalStream(localStream);

    //   const room = await connect(token, {
    //     name: 'health-bridge-room',
    //     tracks: tracks
    //   });
    //   setRoom(room);

    //   room.on(`participant connected: ${participant.identity}`);
    //   participant.tracks.forEach((publication) => {
    //     if(publication.isSubscribed) {
    //       const track = publication.track;
    //       //handle attaching the track to UI
    //     }
    //   });
    // } catch(error) {
    //   console.error('Error starting video call:', error);
    // }
  }


  return (
    <View style={styles.card}>
      <MaterialIcons name="video-call" size={50} color="#2a9d8f" style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>Start a video call with a doctor immediately.</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={startVideoCall}
        activeOpacity={0.7}
        disabled={isLoading}
      >
          <Text style={styles.buttonText}>Start Video Call</Text>
      </TouchableOpacity>
      <View style={styles.mediaContainer}>
        {localTracks.map(track => (
          <View key={track.kind} style={styles.trackContainer}>
            {track.attach()}
          </View>
        ))}
      </View>
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
  mediaContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  trackContainer: {
    width: '48%',
    height: 200,
    margin: '1%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
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