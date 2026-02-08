import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { AppointmentDetailsContext } from '../context/AppointmentDetailsContext';

export default function ViewAppointments() {
  const { getAppointments } = useContext(AppointmentDetailsContext);

  if (getAppointments.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No appointments yet.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      {getAppointments.map((item, index) => (
        <View
          key={item.id}
          style={{
            backgroundColor: '#fff',
            padding: 15,
            marginBottom: 15,
            borderRadius: 8
          }}
        >
          <TouchableOpacity style={{
            backgroundColor: '#ffffff',
            width: '100%',
            height: '100%'
          }}
          onPress={() => alert(`Full Details:\n\nService: ${item.service}\nDate: ${item.appointmentDate}\nTime: ${item.appointmentTimeSlot}\nOwner: ${item.firstName} ${item.lastName}\nPet Name: ${item.petName} \nPet Type: ${item.petType} \nPet Breed: ${item.petBreed} \nPet Gender: ${item.petGender}\nReason for Visit: ${item.reasonForVisit}`)}>
          <Text>Service: {item.service}</Text>
          <Text>Date: {item.appointmentDate}</Text>
          <Text>Time: {item.appointmentTimeSlot}</Text>
          <Text>Owner: {item.firstName} {item.lastName}</Text>
          <Text>Pet: {item.petName}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
