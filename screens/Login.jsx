import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthenticationContext } from '../context/AuthenticationContext'
import { useNavigation } from '@react-navigation/native';



export default function Login() {
    const nav = useNavigation();

    const { login } = useContext(AuthenticationContext);
    const getAuthData = useContext(AuthenticationContext);
    const {email, username, password, confirmPassword} = getAuthData.getAuthenticationDetails;

    const loginHandler = () => {
        if (getEmail == email &&
            getUsername == username &&
            getPassword == password) {
                alert('Login successful!');
                login();
            }
        
        else {
            alert('Login failed. Please check your credentials and try again.');
        }
    }

    const [getEmail, setEmail] = useState('');
    const [getUsername, setUsername] = useState('');
    const [getPassword, setPassword] = useState('');
    
    
    return (
    <View style={styles.mainComponent}  >
        <View style={styles.RegisterContainer}>
            <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 30,
            }}
            >Login</Text>
            <TextInput
                style={styles.TextInputField}
                placeholder='Email'
                onChangeText={(e) => setEmail(e)}/>
            <TextInput
                style={styles.TextInputField}
                placeholder='Username'
                onChangeText={(e) => setUsername(e)}/>
            <TextInput
                style={styles.TextInputField}
                placeholder='Password'
                onChangeText={(e) => setPassword(e)}/>
            

            <TouchableOpacity style={{
                marginTop: 15,
                width: '40%',
                height: '10%',
                backgroundColor: '#007bff',
                borderRadius: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onPress={loginHandler}
            >
                <Text style={{
                    color: '#ffffff',
                    fontSize: 15,
                    fontWeight: 'bold',
                }}>Login</Text>
            </TouchableOpacity>

        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    mainComponent: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#ebebeb',
    },

    RegisterContainer: {
        width: '80%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,

        borderRadius: 10,
        backgroundColor: '#ffffff',
        
    },

    TextInputField: {
        width: '80%',
        height: '10%',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,

        borderColor: '#cccccc',
        backgroundColor: '#ffffff',
    }
})
