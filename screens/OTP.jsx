import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ConfirmOTP() {
    const nav = useNavigation();
    const route = useRoute();
    const { email } = route.params || {};

    const [getOTP, setOTP] = useState('');
    const [otpError, setOtpError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const validateOTPField = () => {
        if (!getOTP.trim() || getOTP.length !== 6) {
            setOtpError(true);
            return false;
        }
        setOtpError(false);
        return true;
    };

    const verifyOTPHandler = async () => {
        if (!validateOTPField()) return;

        setIsLoading(true);
        setApiError('');

        try {
            const response = await fetch('http://localhost:5000/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: email,
                    otp: getOTP 
                })
            });

            const data = await response.json();

            if (response.ok) {
                
                nav.navigate('ChangePassword', { email: email, otp: getOTP });
            } else {
                setApiError(data.error || 'Invalid OTP');
            }
        } catch (error) {
            console.error('Verify OTP error:', error);
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
                
                <View style={styles.OTPContainer}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 5,
                        marginBottom: 40
                        }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold'}}>
                        Confirm OTP
                    </Text>

                    <Text style={{ fontSize: 12, width: '90%', textAlign: 'center' }}>
                        Please enter the OTP sent to your email.
                    </Text>
                    </View>

                    {/* API Error Message */}
                    {apiError ? (
                        <Text style={styles.apiErrorText}>{apiError}</Text>
                    ) : null}

                    {/* OTP Input */}
                    {otpError && (
                        <Text style={styles.errorText}>
                            Please enter a valid 6-digit OTP.
                        </Text>
                    )}
                    <TextInput
                        style={[styles.TextInputField, otpError && styles.errorInput]}
                        placeholder="Enter 6-digit OTP"
                        value={getOTP}
                        onChangeText={(text) => {
                            setOTP(text.replace(/[^0-9]/g, '')); // Only allow numbers
                            if (otpError) setOtpError(false);
                            setApiError('');
                        }}
                        onBlur={validateOTPField}
                        keyboardType="numeric"
                        maxLength={6}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={verifyOTPHandler}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text style={styles.buttonText}>Verify OTP</Text>
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

    OTPContainer: {
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