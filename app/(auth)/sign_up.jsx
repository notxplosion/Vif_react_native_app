import { ScrollView, View, Text, Image, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { Link, router } from 'expo-router'

import { createUser } from '../../lib/appwrite'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const submit = async () => {
    if(!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields');
    };

    setSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);

      setUser(result)
      setIsLoggedIn(true)
      
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[78vh] px-4 my-6">
          <Image
            source={images.logo}
            className="w-[130px] h-[60px] right-3"
            resizeMode="contain"
          />
          
          <Text className="text-2xl text-white font-psemibold mt-10 -right-0.5">
            Sign Up to Vif
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton 
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={submitting}
          />

          <View className="justify-center pt-5 flew-row gap-2">
            <Text className="text-center text-lg text-gray-100 font-pregular">
              Have an account already?
              <Link href="/sign_in" className="text-lg font-psemibold text-secondary"> Sign In</Link>
            </Text>     
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp;