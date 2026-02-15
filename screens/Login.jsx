import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground} from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthenticationContext } from '../context/AuthenticationContext'
import { useNavigation } from '@react-navigation/native';




export default function Login() {
    const nav = useNavigation();
    const { getAuthenticationDetails, setIsLoggedIn } = useContext(AuthenticationContext);

    const getAuthData = useContext(AuthenticationContext);
    const {email, username, password, confirmPassword} = getAuthData.getAuthenticationDetails;

    const [getEmail, setEmail] = useState('');
    const [getUsername, setUsername] = useState('');
    const [getPassword, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateEmail = (value) => {
        return emailRegex.test(value);
    };

    const validateEmailField = () => {
        if (!getEmail.trim()) {
            setEmailError(true);
            return false;
        }
        if (!validateEmail(getEmail)) {
            setEmailError(true);
            return false;
        }
        setEmailError(false);
        return true;
    };

    const validateUsernameField = () => {
        if (!getUsername.trim()) {
            setUsernameError(true);
            return false;
        }
        setUsernameError(false);
        return true;
    };

    const validatePasswordField = () => {
        if (!getPassword.trim()) {
            setPasswordError(true);
            return false;
        }
        setPasswordError(false);
        return true;
    };

    const loginHandler = () => {
        // Ensure fields are valid before attempting login
        const emailValid = validateEmailField();
        const usernameValid = validateUsernameField();
        const passwordValid = validatePasswordField();

        if (!emailValid || !usernameValid || !passwordValid) return;

        if (
            getEmail === email &&
            getUsername === username &&
            getPassword === password
        ) {
            alert('Login successful!');
            setIsLoggedIn(true); // 🔥 THIS IS THE SWITCH
        } else {
            alert('Login failed. Please check your credentials.');
        }
    };
    
    
    return (
    <ImageBackground
                source={require('../assets/Background.png')}
                style={{flex: 1}}
                resizeMode="stretch"
            >
    <View style={styles.mainComponent}  >
        <View style={styles.RegisterContainer}>
            <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 30,
            }}
            >Login</Text>
            {emailError && (
            <Text style={{
                    color: 'red',
                    fontSize: 10,
                    width: '80%',
                    paddingLeft: 5
                    }}>
                Please enter your email.
                </Text>
            )}
            <TextInput
                style={[
                    styles.TextInputField,
                    emailError && { borderColor: 'red', borderWidth: 2 },
                ]}
                placeholder='Email'
                value={getEmail}
                onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) setEmailError(false);
                }}
                onBlur={validateEmailField}/>
            {usernameError && (
            <Text style={{
                    color: 'red',
                    fontSize: 10,
                    width: '80%',
                    paddingLeft: 5
                    }}>
                Please enter your username.
                </Text>
            )}
            <TextInput
                style={[
                    styles.TextInputField,
                    usernameError && { borderColor: 'red', borderWidth: 2 },
                ]}
                placeholder='Username'
                value={getUsername}
                onChangeText={(text) => {
                    setUsername(text);
                    if (usernameError) setUsernameError(false);
                }}
                onBlur={validateUsernameField}/>
            {passwordError && (
            <Text style={{
                    color: 'red',
                    fontSize: 10,
                    width: '80%',
                    paddingLeft: 5
                    }}>
                Please enter your password.
                </Text>
            )}
            <TextInput
                style={[
                    styles.TextInputField,
                    passwordError && { borderColor: 'red', borderWidth: 2 },
                ]}
                placeholder='Password'
                secureTextEntry
                value={getPassword}
                onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) setPasswordError(false);
                }}
                onBlur={validatePasswordField}/>
            

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
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    mainComponent: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

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

        borderColor: '#ddd',
        backgroundColor: '#ffffff',
    }
})
