import { View, TextInput, ImageBackground, StyleSheet,TouchableOpacity } from 'react-native';
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
          placeholder="Enter text here" 
          style={styles.input}
        />
        
        <TextInput 
          placeholder="Hello There" 
          style={styles.input}/>
    
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
          
        </TouchableOpacity>
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
