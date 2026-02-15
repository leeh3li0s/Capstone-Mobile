import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AuthenticationContext } from '../context/AuthenticationContext';

export default function Register() {
    const nav = useNavigation();
    const getAuthData = useContext(AuthenticationContext);

    const [getEmail, setEmail] = useState('');
    const [getUsername, setUsername] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getConfirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);

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

    const validateConfirmPasswordField = () => {
        if (!getConfirmPassword.trim()) {
            setConfirmError(true);
            return false;
        }
        if (getConfirmPassword !== getPassword) {
            setConfirmError(true);
            return false;
        }
        setConfirmError(false);
        return true;
    };

    const registerHandler = () => {
        const emailValid = validateEmailField();
        const usernameValid = validateUsernameField();
        const passwordValid = validatePasswordField();
        const confirmValid = validateConfirmPasswordField();

        if (!emailValid || !usernameValid || !passwordValid || !confirmValid) return;

        getAuthData.setAuthenticationDetails({
            email: getEmail,
            username: getUsername,
            password: getPassword,
            confirmPassword: getConfirmPassword,
        });

        alert('Registration successful!');
        nav.navigate('Login');
    };

    return (
        <ImageBackground
            source={require('../assets/Background.png')}
            style={{ flex: 1 }}
            resizeMode="stretch"
        >
            <View style={styles.mainComponent}>
                
                <View style={styles.RegisterContainer}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 5,
                        marginBottom: 40
                        }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold'}}>
                        Register
                    </Text>

                    <Text style={{ fontSize: 12, width: '90%', textAlign: 'center' }}>
                        Create an account to book your pet's appointment!
                    </Text>
                    </View>

                    {/* EMAIL */}
                    {emailError && (
                        <Text style={styles.errorText}>
                            Please enter a valid email.
                        </Text>
                    )}
                    <TextInput
                        style={[styles.TextInputField, emailError && styles.errorInput]}
                        placeholder="Email"
                        value={getEmail}
                        onChangeText={(text) => {
                            setEmail(text);
                            if (emailError) setEmailError(false);
                        }}
                        onBlur={validateEmailField}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {/* USERNAME */}
                    {usernameError && (
                        <Text style={styles.errorText}>
                            Please enter a username.
                        </Text>
                    )}
                    <TextInput
                        style={[styles.TextInputField, usernameError && styles.errorInput]}
                        placeholder="Username"
                        value={getUsername}
                        onChangeText={(text) => {
                            setUsername(text);
                            if (usernameError) setUsernameError(false);
                        }}
                        onBlur={validateUsernameField}
                    />

                    {/* PASSWORD */}
                    {passwordError && (
                        <Text style={styles.errorText}>
                            Please enter a password.
                        </Text>
                    )}
                    <TextInput
                        style={[styles.TextInputField, passwordError && styles.errorInput]}
                        placeholder="Password"
                        secureTextEntry
                        value={getPassword}
                        onChangeText={(text) => {
                            setPassword(text);
                            if (passwordError) setPasswordError(false);
                        }}
                        onBlur={validatePasswordField}
                    />

                    {/* CONFIRM PASSWORD */}
                    {confirmError && (
                        <Text style={styles.errorText}>
                            Passwords do not match.
                        </Text>
                    )}
                    <TextInput
                        style={[styles.TextInputField, confirmError && styles.errorInput]}
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={getConfirmPassword}
                        onChangeText={(text) => {
                            setConfirmPassword(text);
                            if (confirmError) setConfirmError(false);
                        }}
                        onBlur={validateConfirmPasswordField}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={registerHandler}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    mainComponent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    RegisterContainer: {
        width: '80%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        borderRadius: 10,
        backgroundColor: '#ffffff7c',
        borderColor: '#c5c5c573',
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

    errorInput: {
        borderColor: 'red',
        borderWidth: 2,
    },

    errorText: {
        color: 'red',
        fontSize: 10,
        width: '80%',
        paddingLeft: 5,
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
    }
});
