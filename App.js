import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

import AppointmentServices from './screens/AppointmentServices';
import AppointmentDate from './screens/AppointmentDate';
import AppointmentForm from './screens/AppointmentForm';
import ViewAppointments from './screens/ViewAppointments';
import Calendar from './screens/Calendar';
import BookingDetails from './components/BookingDetails';
import ConfirmAppointment from './screens/ConfirmAppointment';

import { AppointmentDetailsContext } from './context/AppointmentDetailsContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  // Global state for current draft + confirmed list
  const AppointmentDetails = {
    service: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    reasonForVisit: '',
    petName: '',
    petType: '',
    petBreed: '',
    petGender: '',
    appointmentDate: '',
    appointmentTimeSlot: '',
  };

  const [getAppointmentDetails, setAppointmentDetails] = useState(AppointmentDetails);
  const [getAppointments, setAppointments] = useState([]);

  function HomeStackNavigator() {
    return (
      <Stack.Navigator initialRouteName="AppointmentServices">
        <Stack.Screen name="AppointmentDate" component={AppointmentDate} options={{ headerShown: false }} />
        <Stack.Screen name="AppointmentForm" component={AppointmentForm} options={{ headerShown: false }} />
        <Stack.Screen name="AppointmentServices" component={AppointmentServices} options={{ headerShown: false }} />
        <Stack.Screen name="ViewAppointments" component={ViewAppointments} options={{ headerShown: false }} />
        <Stack.Screen name="Calendar" component={Calendar} options={{ headerShown: false }} />
        <Stack.Screen name="BookingDetails" component={BookingDetails} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmAppointment" component={ConfirmAppointment} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

  return (
    <AppointmentDetailsContext.Provider
      value={{ getAppointmentDetails, setAppointmentDetails, getAppointments, setAppointments }}
    >
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeStackNavigator} options={{ headerShown: false }} />
          <Tab.Screen name="View Appointments" component={ViewAppointments} options={{ headerShown: false }} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppointmentDetailsContext.Provider>
  );
}