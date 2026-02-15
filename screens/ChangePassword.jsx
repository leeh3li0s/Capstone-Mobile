import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ChangePassword() {
    const nav = useNavigation();
    const route = useRoute();
    const { email, otp } = route.params || {};

    const [getNewPassword, setNewPassword] = useState('');
    const [getConfirmPassword, setConfirmPassword] = useState('');
    
    const [passwordError, setPasswordError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const validatePasswordField = () => {
        if (!getNewPassword.trim() || getNewPassword.length < 6) {
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
        if (getConfirmPassword !== getNewPassword) {
            setConfirmError(true);
            return false;
        }
        setConfirmError(false);
        return true;
    };

    const changePasswordHandler = async () => {
        const passwordValid = validatePasswordField();
        const confirmValid = validateConfirmPasswordField();

        if (!passwordValid || !confirmValid) return;

        setIsLoading(true);
        setApiError('');

        try {
            const response = await fetch('http://localhost:5000/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: email,
                    otp: otp,
                    newPassword: getNewPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Password changed successfully! Please login with your new password.');
                nav.navigate('Login');
            } else {
                setApiError(data.error || 'Failed to reset password');
            }
        } catch (error) {
            console.error('Reset password error:', error);
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
                
                <View style={styles.ChangePasswordContainer}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 5,
                        marginBottom: 40
                        }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold'}}>
                        Change Password
                    </Text>

                    <Text style={{ fontSize: 12, width: '90%', textAlign: 'center' }}>
                        Please enter your new password.
                    </Text>
                    </View>

                    {/* API Error Message */}
                    {apiError ? (
                        <Text style={styles.apiErrorText}>{apiError}</Text>
                    ) : null}

                    {/* NEW PASSWORD */}
                    {passwordError && (
                        <Text style={styles.errorText}>
                            Password must be at least 6 characters.
                        </Text>
                    )}
                    <TextInput
                        style={[styles.TextInputField, passwordError && styles.errorInput]}
                        placeholder="New Password"
                        secureTextEntry
                        value={getNewPassword}
                        onChangeText={(text) => {
                            setNewPassword(text);
                            if (passwordError) setPasswordError(false);
                            setApiError('');
                        }}
                        onBlur={validatePasswordField}
                    />

                    {/* CONFIRM NEW PASSWORD */}
                    {confirmError && (
                        <Text style={styles.errorText}>
                            Passwords do not match.
                        </Text>
                    )}
                    <TextInput
                        style={[styles.TextInputField, confirmError && styles.errorInput]}
                        placeholder="Confirm New Password"
                        secureTextEntry
                        value={getConfirmPassword}
                        onChangeText={(text) => {
                            setConfirmPassword(text);
                            if (confirmError) setConfirmError(false);
                            setApiError('');
                        }}
                        onBlur={validateConfirmPasswordField}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={changePasswordHandler}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text style={styles.buttonText}>Change Password</Text>
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

    ChangePasswordContainer: {
        width: '80%',
        height: '45%',
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
        width: '50%',
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