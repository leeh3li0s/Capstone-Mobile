import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, {useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AuthenticationContext } from '../context/AuthenticationContext';


export default function Register() {
    const nav = useNavigation();
    const getAuthData = useContext(AuthenticationContext);

    const {email, username, password, confirmPassword} = getAuthData.getAuthenticationDetails;

    const [getEmail, setEmail] = useState('');
    const [getUsername, setUsername] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getConfirmPassword, setConfirmPassword] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const registerHandler = () => {
        let isValid = true;
        
        // Validate email
        if (!getEmail.trim()) {
            setEmailError(true);
            isValid = false;
        } else if (!validateEmail(getEmail)) {
            setEmailError(true);
            isValid = false;
        }

        // Validate username
        if (!getUsername.trim()) {
            setUsernameError(true);
            isValid = false;
        }

        // Validate password
        if (!getPassword.trim()) {
            setPasswordError(true);
            isValid = false;
        }

        // Validate confirm password
        if (!getConfirmPassword.trim()) {
            setConfirmError(true);
            isValid = false;
        }

        if (!isValid) {
            alert('Please fill in all fields correctly.');
            return;
        }

        if (getPassword !== getConfirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        getAuthData.setAuthenticationDetails({
            email: getEmail,
            username: getUsername,
            password: getPassword,
            confirmPassword: getConfirmPassword,
        })
        nav.navigate('Login');
        }

        const validateEmail = (value) => {
            return emailRegex.test(value);
        };

        const [confirmError, setConfirmError] = useState(false);

        const handleConfirmChange = (text) => {
        setConfirmPassword(text);
        if (confirmError) setConfirmError(false);
        };

        const validateConfirmPassword = () => {
        if (getConfirmPassword !== getPassword) {
            setConfirmError(true);
            return false;
        }


        return true;
        };
        

    return (
    <View style={styles.mainComponent}  >
        <View style={styles.RegisterContainer}>
            <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 30,
            }}
            >Register</Text>

            {/* Email Input */}
            {emailError && (
            <Text style={{
                    color: 'red',
                    fontSize: 10,
                    width: '80%',
                    paddingLeft: 5
                    }}>
                Please enter a valid email address.
                </Text>
            )}
            <TextInput
            style={[
                styles.TextInputField,
                emailError && { borderColor: 'red', borderWidth: 2 },
            ]}
            placeholder="Email"
            value={getEmail}
            onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError(false); // clear error while typing
            }}
            onBlur={() => {
                if (getEmail && !validateEmail(getEmail)) setEmailError(true);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            />
            
            
            {usernameError && (
            <Text style={{
                    color: 'red',
                    fontSize: 10,
                    width: '80%',
                    paddingLeft: 5
                    }}>
                Please enter a username.
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
            }}/>

            {passwordError && (
            <Text style={{
                    color: 'red',
                    fontSize: 10,
                    width: '80%',
                    paddingLeft: 5
                    }}>
                Please enter a password.
                </Text>
            )}
            <TextInput 
            style={[
                styles.TextInputField,
                passwordError && { borderColor: 'red', borderWidth: 2 },
            ]}
            placeholder='Password' 
            secureTextEntry='true'
            value={getPassword}
            onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError(false);
            }}/>

            {confirmError && (
            <Text style={{
                    color: 'red',
                    fontSize: 10,
                    width: '80%',
                    paddingLeft: 5
                    }}>
                Passwords do not match.
                </Text>
            )}
            <TextInput
            style={[
            styles.TextInputField,
            confirmError && { borderColor: 'red', borderWidth: 2 },
            ]}
            placeholder="Confirm Password"
            secureTextEntry
            value={getConfirmPassword}
            onChangeText={handleConfirmChange}
            onBlur={validateConfirmPassword}/>
            

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
            onPress={registerHandler}
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

        borderColor: '#ddd',
        backgroundColor: '#ffffff',
    }
})
