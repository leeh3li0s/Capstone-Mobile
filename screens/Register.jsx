import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'

export default function Register() {
    return (
    <View style={styles.mainComponent}  >
        <View style={styles.RegisterContainer}>
            <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 30,
            }}
            >Register</Text>
            <TextInput style={styles.TextInputField} placeholder='Email' />
            <TextInput style={styles.TextInputField} placeholder='Username' />
            <TextInput style={styles.TextInputField} placeholder='Password' />
            <TextInput style={styles.TextInputField} placeholder='Confirm Password' />

            <TouchableOpacity style={{
                marginTop: 15,
                width: '40%',
                height: '10%',
                backgroundColor: '#007bff',
                borderRadius: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    color: '#ffffff',
                    fontSize: 15,
                    fontWeight: 'bold',
                }}>Register</Text>
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

        borderColor: '#cccccc',
        backgroundColor: '#ffffff',
    }
})
