import { View, Text, StyleSheet, TouchableOpacity, Image, PermissionsAndroid } from 'react-native'
import React from 'react'
import { useState, useRef, useEffect } from 'react';
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
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [videoTracks, setVideoTracks] = useState([]);

  useEffect(() => {
    requestCameraAndAudioPermission();
  }, []);

  async function requestCameraAndAudioPermission() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
      if (
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the camera and microphone');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const startVideoCall = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/token?identity', {
        params: {
          identity: 'bshay12'
        }
      });
      const token = response.data.token;

      const tracks = await createLocalTracks({
        audio: true,
        video: { width: 640 }
      });
      setLocalTracks(tracks);

      // const localStream = await mediaDevices.getUserMedia({
      //   audio: true,
      //   video: true
      // });
      // setLocalStream(localStream);

      const room = await connect(token, {
        name: 'health-bridge-room',
        tracks: tracks
      });
      setRoom(room);

      room.on('participantConnected', participant => {
        console.log(`Participant connected: ${participant.identity}`);
        participant.tracks.forEach(publication => {
          if (publication.isSubscribed) {
            const track = publication.track;
            // Handle attaching the track to UI
            if (track.kind === 'video') {
              setVideoTracks(prevTracks => [...prevTracks, track]);
            } else if (track.kind === 'audio') {
              setAudioTracks(prevTracks => [...prevTracks, track]);
            }
          }
        });
      });

      room.on('trackSubscribed', track => {
        if (track.kind === 'video') {
          setVideoTracks(prevTracks => [...prevTracks, track]);
        } else if (track.kind === 'audio') {
          setAudioTracks(prevTracks => [...prevTracks, track]);
        }
      });

    } catch(error) {
      console.error('Error starting video call:', error);
    }
  }


  return (
    <View style={styles.card}>
      <MaterialIcons name="video-call" size={50} color="#2a9d8f" style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>Start a video call with a doctor immediately.</Text>
      {localTracks.map(track => (
        track.kind === 'video' && (
          <View key={track.sid}>
            <Text>Local Video</Text>
            <track.attach />
          </View>
        )
      ))}
      {videoTracks.map(track => (
        <View key={track.sid}>
          <Text>Remote Video</Text>
          <track.attach />
        </View>
      ))}
      <TouchableOpacity 
        style={styles.button}
        onPress={startVideoCall}
        activeOpacity={0.7}
        disabled={isLoading}
      >
          <Text style={styles.buttonText}>Start Video Call</Text>
      </TouchableOpacity>
      {/* {localStream && (
        <RTCView
          streamURL={localStream.toURL()}
          style={{ width: '100%', height: 200 }}
        />
      )} */}
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