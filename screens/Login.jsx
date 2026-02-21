// screens/Login.jsx
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import React, { useState, useContext } from 'react';
import { AuthenticationContext } from '../context/AuthenticationContext';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const nav = useNavigation();
    const { setIsLoggedIn, setAuthenticationDetails } = useContext(AuthenticationContext);

    const [getEmail, setEmail] = useState('');
    const [getUsername, setUsername] = useState('');
    const [getPassword, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

 
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    
  
    const [apiError, setApiError] = useState('');
    
   
    const [successMessage, setSuccessMessage] = useState('');

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

    const loginHandler = async () => {
        
        setApiError('');
        setSuccessMessage('');
        
        
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
           
            const loginData = {
                password: getPassword
            };

            if (useEmail) {
                loginData.email = getEmail;
            } else {
                loginData.username = getUsername;
            }

            console.log('Sending login data:', loginData);

            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();
            
            console.log('LOGIN RESPONSE:', data);

            if (response.ok) {
                console.log('USER DATA FROM SERVER:', data.user);
                console.log('CONTACT NUMBER VALUE:', data.user.contactnumber);
                
                
                setSuccessMessage('Login successful! Redirecting...');
                
                
                setTimeout(() => {
                    setAuthenticationDetails({
                        email: data.user.email,
                        username: data.user.username,
                        pk: data.user.pk,
                        fullname: data.user.fullname,
                        contactnumber: data.user.contactnumber,
                        password: '',
                        confirmPassword: '',
                    });
                    
                    setIsLoggedIn(true);
                }, 1500);
            } else {
               
                setApiError(data.error || 'Login failed');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Login error:', error);
            setApiError('Network error. Please check your connection.');
            setIsLoading(false);
        }
    };
    
    const forgotPasswordHandler = () => {
        nav.navigate('ForgotPassword');
    };
    
    return (
        <ImageBackground
            source={require('../assets/Background.png')}
            style={{flex: 1}}
            resizeMode="stretch"
        >
            <View style={styles.mainComponent}>
                <View style={styles.LoginContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Login</Text>
                        <Text style={styles.headerSubtitle}>
                            Welcome back! Please enter your credentials to access your account.
                        </Text>
                    </View>
                    
                  
                    {successMessage ? (
                        <View style={styles.successContainer}>
                            <Text style={styles.successText}>{successMessage}</Text>
                        </View>
                    ) : null}
                    
                   
                    {apiError ? (
                        <View style={styles.apiErrorContainer}>
                            <Text style={styles.apiErrorText}>{apiError}</Text>
                        </View>
                    ) : null}

                    
                    {emailError && (
                        <Text style={styles.errorText}>Please enter a valid email.</Text>
                    )}
                    <TextInput
                        style={[
                            styles.TextInputField,
                            emailError && styles.errorInput,
                        ]}
                        placeholder='Email'
                        value={getEmail}
                        onChangeText={(text) => {
                            setEmail(text);
                            if (emailError) setEmailError(false);
                            setApiError('');
                        }}
                        onBlur={validateEmailField}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                  
                    {usernameError && (
                        <Text style={styles.errorText}>Please enter your username.</Text>
                    )}
                    <TextInput
                        style={[
                            styles.TextInputField,
                            usernameError && styles.errorInput,
                        ]}
                        placeholder='Username'
                        value={getUsername}
                        onChangeText={(text) => {
                            setUsername(text);
                            if (usernameError) setUsernameError(false);
                            setApiError('');
                        }}
                        onBlur={validateUsernameField}
                        autoCapitalize="none"
                    />

                 
                    {passwordError && (
                        <Text style={styles.errorText}>Please enter your password.</Text>
                    )}
                    <TextInput
                        style={[
                            styles.TextInputField,
                            passwordError && styles.errorInput,
                        ]}
                        placeholder='Password'
                        secureTextEntry
                        value={getPassword}
                        onChangeText={(text) => {
                            setPassword(text);
                            if (passwordError) setPasswordError(false);
                            setApiError('');
                        }}
                        onBlur={validatePasswordField}
                    />

                    <TouchableOpacity 
                        style={[styles.button, isLoading && styles.buttonDisabled]}
                        onPress={loginHandler}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text style={styles.buttonText}>Login</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.forgotPasswordButton}
                        onPress={forgotPasswordHandler}
                    >
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.registerButton}
                        onPress={() => nav.navigate('Register')}
                    >
                        <Text style={styles.registerText}>Don't have an account? Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    mainComponent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    LoginContainer: {
        width: '80%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        borderRadius: 10,
        backgroundColor: '#ffffff7c',
        borderColor: '#ffffff',
        borderWidth: 1,
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    headerSubtitle: {
        fontSize: 12,
        width: '90%',
        textAlign: 'center',
        color: '#666',
    },
    
    successContainer: {
        backgroundColor: '#e8f5e8',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        width: '90%',
        borderWidth: 1,
        borderColor: '#c3e6c3',
    },
    successText: {
        color: '#2e7d32',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
    },
    
    apiErrorContainer: {
        backgroundColor: '#ffebee',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        width: '90%',
        borderWidth: 1,
        borderColor: '#ffcdd2',
    },
    apiErrorText: {
        color: '#d32f2f',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
    },
    TextInputField: {
        width: '90%',
        height: 45,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        borderColor: '#ffffff',
        backgroundColor: '#ffffff7c',
        marginBottom: 10,
    },
    errorInput: {
        borderColor: 'red',
        borderWidth: 2,
    },
    errorText: {
        color: 'red',
        fontSize: 10,
        width: '90%',
        paddingLeft: 5,
        marginBottom: 2,
    },
    button: {
        marginTop: 15,
        width: '50%',
        height: 45,
        backgroundColor: '#007bff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#999',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPasswordButton: {
        marginTop: 10,
        padding: 5,
    },
    forgotPasswordText: {
        color: '#007bff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    registerButton: {
        marginTop: 5,
        padding: 5,
    },
    registerText: {
        color: '#007bff',
        fontSize: 12,
    },
});