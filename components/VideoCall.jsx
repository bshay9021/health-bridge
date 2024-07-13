// VideoCall.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TwilioVideo } from 'twilio-video';
import axios from 'axios';

const VideoCall = ({ identity, roomName }) => {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchTokenAndConnect = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/token?identity=${identity}`);
        const { token } = response.data;

        const room = await TwilioVideo.connect(token, { name: roomName });
        setRoom(room);
      } catch (error) {
        console.error('Error connecting to Twilio Video:', error);
      }
    };

    fetchTokenAndConnect();

    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {room ? (
        <Text>Connected to room: {roomName}</Text>
      ) : (
        <Text>Connecting to room...</Text>
      )}
      <Button title="Disconnect" onPress={() => room.disconnect()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default VideoCall;
