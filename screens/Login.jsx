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
    
    const forgotPasswordHandler = () => {
        nav.navigate('ForgotPassword')
    }
    
    return (
    <ImageBackground
                source={require('../assets/Background.png')}
                style={{flex: 1}}
                resizeMode="stretch"
            >
    <View style={styles.mainComponent}  >
        <View style={styles.LoginContainer}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
                marginBottom: 40
                }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold'}}>
                Login
                </Text>

                <Text style={{ fontSize: 12, width: '90%', textAlign: 'center', }}>
                    Welcome back! Please enter your credentials to access your account.
                </Text>
            </View>
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
            

            <TouchableOpacity style={styles.button}
            onPress={loginHandler}
            >
                <Text style={{
                    color: '#ffffff',
                    fontSize: 15,
                    fontWeight: 'bold',
                }}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, {height: '3%', backgroundColor: 'none'}]}
            onPress={forgotPasswordHandler}
            >
                <Text style={{
                    color: '#007bff',
                    fontSize: 12,
                    fontWeight: 'bold'
                }}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, {
                width: '60%',
                height: '3%',
                backgroundColor: 'none'}]}
            onPress={forgotPasswordHandler}
            >
                <Text style={{
                    color: '#ffffff',
                    fontSize: 12,
                }}>Dont have an account? Register </Text>
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

    LoginContainer: {
        width: '80%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,

        borderRadius: 10,
        backgroundColor: '#ffffff7c',
        borderColor: '#ffffff',
        borderWidth: 1
        
    },

    TextInputField: {
        width: '80%',
        height: '10%',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,

        borderColor: '#ffffff',
        backgroundColor: '#ffffff7c',
    },

    button: {
        marginTop: 15,
        width: '40%',
        height: '8%',
        backgroundColor: '#007bff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
