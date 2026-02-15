import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { AuthenticationContext } from '../context/AuthenticationContext'
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const nav = useNavigation();
    const { setIsLoggedIn } = useContext(AuthenticationContext); // Only need this

    const [getEmail, setEmail] = useState('');
    const [getUsername, setUsername] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getLabel, setLabel] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    // SIMPLIFIED loginHandler - directly calls backend
    const loginHandler = async () => {
        // Use either email or username
        const useEmail = getEmail.trim() !== '';
        const useUsername = getUsername.trim() !== '';
        const usePassword = getPassword.trim() !== '';

        if (!useEmail && !useUsername && !usePassword) {
            setEmailError(true);
            setUsernameError(true);
            setPasswordError(true);
            return;
        }

        const emailValid = useEmail ? validateEmailField() : true;
        const usernameValid = useUsername ? validateUsernameField() : true;
        const passwordValid = usePassword ? validatePasswordField(): true;

        if (!passwordValid || !emailValid || !usernameValid) return;

        setIsLoading(true);

        try {
            // Prepare login data
            const loginData = {
                password: getPassword
            };

            if (useEmail) {
                loginData.email = getEmail;
            } else {
                loginData.username = getUsername;
            }

            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (response.ok) {
                setIsLoggedIn(true); // This triggers navigation to Home
            } else {
                setLabel(data.message || 'Login failed. Please check your credentials.');
                alert(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Network error. Please check your connection.');
        } finally {
            setIsLoading(false);
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
    
            <View style={styles.mainComponent}>
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

                        <Text style={{ fontSize: 12, width: '90%', textAlign: 'center' }}>
                            Welcome back! Please enter your credentials to access your account.
                        </Text>
                    </View>
                    
                    <Text style={{ fontSize: 12, width: '90%', textAlign: 'center', color: 'red' }}>
                            {getLabel}
                        </Text>

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
                    onPress={() => nav.navigate('Register')}
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

// Your EXACT same styles
const styles = StyleSheet.create({
    mainComponent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    LoginContainer: {
        width: '80%',
        height: '60%',
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

    buttonText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
    },

    errorText: {
        color: 'red',
        fontSize: 10,
        width: '80%',
        paddingLeft: 5,
    },
});