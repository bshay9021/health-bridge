import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Image } from 'react-native';
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../constants'
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider'

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  // if(!isLoading && !isLoggedIn) return <Redirect href="/home" />
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image 
            source={images.logoSmall}
            className="w-[250px] h-[250px]"
            resizeMode="contain" 
          />

          {/* <Image 
            source={images.cards}
            className="max-w-[380] w-full h-[300px]"
            resizeMode="contain" 
          /> */}

          <View className="relative mt-5">
            <Text className="text-3xl font-pregular text-sky-800 font-bold text-center">Health Bridge</Text>
            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Bridging the Gap to Personalized Healthcare</Text>


            {/* <Image 
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            /> */}
          </View>

          {/* <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Bridging the Gap to Personalized Healthcare</Text> */}

          <CustomButton 
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />

        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
}


