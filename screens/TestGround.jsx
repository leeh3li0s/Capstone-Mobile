import { View, TextInput, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';

export default function TestGround() {
  return (
    <ImageBackground
      source={require('../assets/Background.png')}
      style={{flex: 1}}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        <TextInput 
          placeholder="Input Field" 
          style={styles.input}
        />

        <Text>Hello</Text>
      </View>
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
});
