// screens/ConfirmAppointment.jsx
import { View, Text, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native'; // Added StyleSheet import
import React, { useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthenticationContext } from '../context/AuthenticationContext';

export default function ConfirmAppointment() {
  const nav = useNavigation();
  const route = useRoute();
  const { getAuthenticationDetails } = useContext(AuthenticationContext);
  
  const {
    service,
    appointmentDate,
    appointmentTimeSlot,
    firstName,
    lastName,
    contactNumber,
    email,
    reasonForVisit,
    petName,
    petType,
    petBreed,
    petGender,
    user_id
  } = route.params;

  const handleConfirm = async () => {
    try {
      console.log('Sending appointment data:', {
        user_id: user_id || getAuthenticationDetails?.pk,
        appointment_type: service,
        appointment_date: appointmentDate,
        appointment_time: appointmentTimeSlot,
        patient_name: `${firstName} ${lastName}`,
        patient_phone: contactNumber,
        patient_email: email,
        patient_reason: reasonForVisit,
        pet_name: petName,
        pet_species: petType,
        pet_gender: petGender,
        pet_breed: petBreed
      });

      const response = await fetch('http://localhost:5000/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id || getAuthenticationDetails?.pk,
          appointment_type: service,
          appointment_date: appointmentDate,
          appointment_time: appointmentTimeSlot,
          patient_name: `${firstName} ${lastName}`,
          patient_phone: contactNumber,
          patient_email: email,
          patient_reason: reasonForVisit,
          pet_name: petName,
          pet_species: petType,
          pet_gender: petGender,
          pet_breed: petBreed
        }),
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (response.ok) {
        
            nav.navigate('Home', { screen: 'AppointmentServices' });

          
      } else {
        Alert.alert('Error', data.error || 'Failed to book appointment');
      }
    } catch (error) {
      console.error('Booking error:', error);
      Alert.alert('Error', 'Network error. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <TouchableOpacity 
          style={{ marginBottom: 20, alignSelf: 'flex-start' }} 
          onPress={() => nav.goBack()}
        >
          <Text style={{ fontSize: 16, color: '#007AFF' }}>← Return</Text>
        </TouchableOpacity>

        <Text style={{ 
          fontSize: 24, 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginVertical: 20,
          color: '#333'
        }}>
          Confirm Appointment
        </Text>
        
        <Text style={{ 
          fontSize: 16, 
          textAlign: 'center', 
          marginBottom: 30, 
          color: '#666' 
        }}>
          Please check the following details below before confirming
        </Text>

        {/* Service Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Service Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Service:</Text>
            <Text style={styles.value}>{service}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{appointmentDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Time:</Text>
            <Text style={styles.value}>{appointmentTimeSlot}</Text>
          </View>
        </View>

        {/* Owner Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Owner Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{firstName} {lastName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Contact:</Text>
            <Text style={styles.value}>{contactNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Reason:</Text>
            <Text style={styles.value}>{reasonForVisit}</Text>
          </View>
        </View>

        {/* Pet Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pet Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{petName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Species:</Text>
            <Text style={styles.value}>{petType}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Breed:</Text>
            <Text style={styles.value}>{petBreed}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.value}>{petGender}</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 30 }}>
          <TouchableOpacity
            style={{
              width: "100%",
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: "#4F7CFF",
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3,
            }}
            onPress={handleConfirm}
          >
            <Text style={{
              color: "#fff",
              fontWeight: 'bold',
              fontSize: 18
            }}>
              Confirm Appointment
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              width: "100%",
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: "transparent",
              marginTop: 15,
              borderWidth: 1,
              borderColor: '#ddd'
            }}
            onPress={() => nav.goBack()}
          >
            <Text style={{
              color: "#333",
              fontWeight: '500',
              fontSize: 16
            }}>
              Go Back to Make Changes
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// Changed from object to StyleSheet.create
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#4F7CFF',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    width: 80,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
});
// 