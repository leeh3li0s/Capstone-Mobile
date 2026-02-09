// Alternative version without clearAppointmentDetails function
import { View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import React, { useContext } from 'react';
import BookingDetails from '../components/BookingDetails';
import { AppointmentDetailsContext } from '../context/AppointmentDetailsContext';

export default function ConfirmAppointment({ navigation }) {
  const {
    getAppointmentDetails,
    getAppointments,
    setAppointments,
    setAppointmentDetails
  } = useContext(AppointmentDetailsContext);

  const handleConfirm = () => {
    // Add the current appointment to the appointments list
    setAppointments(prev => [...prev, getAppointmentDetails]);
    
    // Clear the appointment form data by setting each field to empty
    // Use the setAppointmentDetails function to reset everything
    setAppointmentDetails({
      // Owner Details
      firstName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      reasonForVisit: '',
      
      // Pet Details
      petName: '',
      petType: '',
      petBreed: '',
      petGender: '',
      
      // Date & Time
      appointmentDate: '',
      appointmentTimeSlot: '',
      
      // Services (if you have them)
      selectedServices: [],
      
      // ID will be set when creating next appointment
      id: null
    });
    
    // Optional: Show confirmation message
    Alert.alert(
      'Appointment Confirmed!',
      'Your appointment has been successfully booked.',
      [{ text: 'OK' }]
    );
    
    // Navigate to ViewAppointments
    navigation.reset({
      index: 1,
      routes: [
        { name: 'Home', params: { screen: 'AppointmentServices' } },
        { name: 'ViewAppointments' }
      ]
    });
  };

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 }}>
        Confirm Appointment
      </Text>
      <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#666' }}>
        Please check the following details below before confirming
      </Text>
      
      <BookingDetails />
      
      <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
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
          <Text
            style={{
              color: "#fff",
              fontWeight: 'bold',
              fontSize: 18
            }}
          >
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
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              color: "#333",
              fontWeight: '500',
              fontSize: 16
            }}
          >
            Go Back to Make Changes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}