import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
// import { TailwindProvider } from 'tailwindcss-react-native';

const InitialProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSave = () => {
    // Add logic to save the profile information
    Alert.alert('Profile Saved', `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex-1 justify-center items-center bg-white p-4">
          <Text className="text-2xl font-bold mb-6">Complete Your Profile</Text>
          
          <TextInput
            className="w-full p-3 mb-4 border rounded border-gray-300"
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          
          <TextInput
            className="w-full p-3 mb-4 border rounded border-gray-300"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          
          <TextInput
            className="w-full p-3 mb-6 border rounded border-gray-300"
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          
          <TouchableOpacity
            className="w-full bg-blue-500 p-3 rounded"
            onPress={handleSave}
          >
            <Text className="text-center text-white text-lg">Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InitialProfilePage;
