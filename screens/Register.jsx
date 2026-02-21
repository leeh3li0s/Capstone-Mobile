import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
    const nav = useNavigation();

   
    const [getFullName, setFullName] = useState('');
    const [getContactNumber, setContactNumber] = useState('');
    
   
    const [getEmail, setEmail] = useState('');
    const [getUsername, setUsername] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getConfirmPassword, setConfirmPassword] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);

   
    const [fullNameError, setFullNameError] = useState(false);
    const [contactError, setContactError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
    
 
    const [apiError, setApiError] = useState('');
    
    
    const [successMessage, setSuccessMessage] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    // Validation 
    const validateFullName = () => {
        if (!getFullName.trim()) {
            setFullNameError(true);
            return false;
        }
        setFullNameError(false);
        return true;
    };

    const validateContact = () => {
        if (!getContactNumber.trim()) {
            setContactError(true);
            return false;
        }
        if (!phoneRegex.test(getContactNumber.replace(/[^0-9]/g, ''))) {
            setContactError(true);
            return false;
        }
        setContactError(false);
        return true;
    };

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
        if (!getPassword.trim() || getPassword.length < 6) {
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

    const registerHandler = async () => {
       
        setApiError('');
        setSuccessMessage('');
        
        
        const fullNameValid = validateFullName();
        const contactValid = validateContact();
        const emailValid = validateEmailField();
        const usernameValid = validateUsernameField();
        const passwordValid = validatePasswordField();
        const confirmValid = validateConfirmPasswordField();

        if (!fullNameValid || !contactValid || !emailValid || !usernameValid || !passwordValid || !confirmValid) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: getFullName,
                    contactNumber: getContactNumber,
                    email: getEmail,
                    username: getUsername,
                    password: getPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
            
                setSuccessMessage('Registration successful! Redirecting to login...');
                
             
                setTimeout(() => {
                    nav.navigate('Login');
                }, 2000);
            } else {
                
                setApiError(data.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
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
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.RegisterContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Create Account</Text>
                        <Text style={styles.headerSubtitle}>Fill in your personal details to get started</Text>
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

                    {/* PERSONAL DETAILS SECTION */}
                    <Text style={styles.sectionTitle}>Personal Details</Text>

                    {/* Full Name */}
                    {fullNameError && (
                        <Text style={styles.errorText}>Please enter your full name.</Text>
                    )}
                    <TextInput
                        style={[styles.TextInputField, fullNameError && styles.errorInput]}
                        placeholder="Full Name"
                        value={getFullName}
                        onChangeText={(text) => {
                            setFullName(text);
                            if (fullNameError) setFullNameError(false);
                            setApiError('');
                        }}
                        onBlur={validateFullName}
                    />

                    {/* Contact Number */}
                    {contactError && (
                        <Text style={styles.errorText}>Please enter a valid contact number (10-15 digits).</Text>
                    )}
                    <TextInput
                        style={[styles.TextInputField, contactError && styles.errorInput]}
                        placeholder="Contact Number"
                        value={getContactNumber}
                        onChangeText={(text) => {
                            setContactNumber(text);
                            if (contactError) setContactError(false);
                            setApiError('');
                        }}
                        onBlur={validateContact}
                        keyboardType="phone-pad"
                    />

                    {/* ACCOUNT DETAILS SECTION */}
                    <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Account Details</Text>

                    {/* Email */}
                    {emailError && (
                        <Text style={styles.errorText}>Please enter a valid email.</Text>
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

                    {/* Username */}
                    {usernameError && (
                        <Text style={styles.errorText}>Please enter a username.</Text>
                    )}
                    <TextInput
                        style={[styles.TextInputField, usernameError && styles.errorInput]}
                        placeholder="Username"
                        value={getUsername}
                        onChangeText={(text) => {
                            setUsername(text);
                            if (usernameError) setUsernameError(false);
                            setApiError('');
                        }}
                        onBlur={validateUsernameField}
                        autoCapitalize="none"
                    />

                    {/* Password */}
                    {passwordError && (
                        <Text style={styles.errorText}>Password must be at least 6 characters.</Text>
                    )}
                    <TextInput
                        style={[styles.TextInputField, passwordError && styles.errorInput]}
                        placeholder="Password"
                        secureTextEntry
                        value={getPassword}
                        onChangeText={(text) => {
                            setPassword(text);
                            if (passwordError) setPasswordError(false);
                            setApiError('');
                        }}
                        onBlur={validatePasswordField}
                    />

                    {/* Confirm Password */}
                    {confirmError && (
                        <Text style={styles.errorText}>Passwords do not match.</Text>
                    )}
                    <TextInput
                        style={[styles.TextInputField, confirmError && styles.errorInput]}
                        placeholder="Confirm Password"
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
                        style={[styles.button, isLoading && styles.buttonDisabled]}
                        onPress={registerHandler}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text style={styles.buttonText}>Register</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.loginLink}
                        onPress={() => nav.navigate('Login')}
                    >
                        <Text style={styles.loginLinkText}>
                            Already have an account? Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    RegisterContainer: {
        width: '85%',
        backgroundColor: '#ffffff7c',
        borderRadius: 10,
        borderColor: '#c5c5c573',
        borderWidth: 1,
        padding: 20,
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginBottom: 30,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    headerSubtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
    },
   
    successContainer: {
        backgroundColor: '#e8f5e8',
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
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
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ffcdd2',
    },
    apiErrorText: {
        color: '#d32f2f',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4F7CFF',
        marginBottom: 10,
        marginLeft: 5,
    },
    TextInputField: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        borderColor: '#ffffff',
        backgroundColor: '#ffffff7c',
        marginBottom: 15,
    },
    errorInput: {
        borderColor: 'red',
        borderWidth: 2,
    },
    errorText: {
        color: 'red',
        fontSize: 10,
        width: '100%',
        paddingLeft: 5,
        marginBottom: 2,
    },
    button: {
        marginTop: 20,
        width: '60%',
        height: 45,
        backgroundColor: '#007bff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#999',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginLink: {
        marginTop: 15,
        alignSelf: 'center',
    },
    loginLinkText: {
        color: '#007bff',
        fontSize: 14,
    },
});