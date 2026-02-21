import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function ForgotPassword() {
    const nav = useNavigation();

    const [getEmail, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

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

    const sendOTPHandler = async () => {
        if (!validateEmailField()) return;

        setIsLoading(true);
        setApiError('');

        try {
            const response = await fetch('http://localhost:5000/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: getEmail })
            });

            const data = await response.json();

            if (response.ok) {
               
                nav.navigate('ConfirmOTP', { email: getEmail });
            } else {
                setApiError(data.error || 'Failed to send OTP');
            }
        } catch (error) {
            console.error('Send OTP error:', error);
            setApiError('Network error. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/Background.png')}
            style={{ flex: 1 }}
            resizeMode="stretch"
        >
            <View style={styles.mainComponent}>
                
                <View style={styles.ForgotPasswordContainer}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 5,
                        marginBottom: 40
                        }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold'}}>
                        Forgot Password
                    </Text>

                    <Text style={{ fontSize: 12, width: '90%', textAlign: 'center' }}>
                        Please enter your email and we will send an OTP for you to reset your password.
                    </Text>
                    </View>

                    {/* API Error Message */}
                    {apiError ? (
                        <Text style={styles.apiErrorText}>{apiError}</Text>
                    ) : null}

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
                            setApiError('');
                        }}
                        onBlur={validateEmailField}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={sendOTPHandler}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text style={styles.buttonText}>Send OTP</Text>
                        )}
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

    ForgotPasswordContainer: {
        width: '80%',
        height: '40%',
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

    apiErrorText: {
        color: 'red',
        fontSize: 12,
        width: '80%',
        textAlign: 'center',
        marginBottom: 5,
        backgroundColor: '#ffebee',
        padding: 8,
        borderRadius: 5,
    },

    button: {
        marginTop: 15,
        width: '40%',
        height: '8%',
        backgroundColor: '#007bff',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
    }
});
// 