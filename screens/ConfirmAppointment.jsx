import { View, Text, Button } from 'react-native';
import React, { useContext } from 'react';
import BookingDetails from '../components/BookingDetails';
import { AppointmentDetailsContext } from '../context/AppointmentDetailsContext';

export default function ConfirmAppointment({ navigation }) {
  const {
  getAppointmentDetails,
  getAppointments,
  setAppointments
} = useContext(AppointmentDetailsContext);


  const handleConfirm = () => {
  setAppointments(prev => [...prev, getAppointmentDetails]);
  navigation.navigate('ViewAppointments');
};


  return (
    <View style={{ width: '100%', height: '100%' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 }}>
        Confirm Appointment
      </Text>
      <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20 }}>
        Please check the following details below before confirming
      </Text>
      <BookingDetails />
      <Button title="Confirm Appointment" onPress={handleConfirm} />
    </View>
  );
}