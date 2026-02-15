import { View, TextInput, ImageBackground, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function TestGround() {
  return (
    <ImageBackground
      source={require('../assets/Background.png')}
      style={{flex: 1}}
      resizeMode="stretch"
    >
        <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']} // required
        start={{ x: 0, y: 0 }} // optional
        end={{ x: 1, y: 1 }}   // optional
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={{ color: '#fff' }}>Hello Gradient</Text>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 250,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
    width: 150,
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
