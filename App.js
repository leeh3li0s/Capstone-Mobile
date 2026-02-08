import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';

import AppointmentServices from './screens/AppointmentServices';
import AppointmentDate from './screens/AppointmentDate';
import AppointmentForm from './screens/AppointmentForm';
import ViewAppointments from './screens/ViewAppointments';
import Calendar from './screens/Calendar';
import BookingDetails from './components/BookingDetails';
import ConfirmAppointment from './screens/ConfirmAppointment';
import Register from './screens/Register';

import { AppointmentDetailsContext } from './context/AppointmentDetailsContext';

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

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

  // This is your main app with tabs
  function MainTabNavigator() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackNavigator} options={{ headerShown: false }} />
        <Tab.Screen name="View Appointments" component={ViewAppointments} options={{ headerShown: false }} />
      </Tab.Navigator>
    );
  }

  // Stack for screens inside "Home"
  function HomeStackNavigator() {
    return (
      <Stack.Navigator initialRouteName="AppointmentServices">
        <Stack.Screen name="AppointmentServices" component={AppointmentServices} options={{ headerShown: false }} />
        <Stack.Screen name="AppointmentDate" component={AppointmentDate} options={{ headerShown: false }} />
        <Stack.Screen name="AppointmentForm" component={AppointmentForm} options={{ headerShown: false }} />
        <Stack.Screen name="BookingDetails" component={BookingDetails} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmAppointment" component={ConfirmAppointment} options={{ headerShown: false }} />
        <Stack.Screen name="Calendar" component={Calendar} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

  // Stack for authentication
  function AuthStackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        {/* If you add Login screen, add here */}
      </Stack.Navigator>
    );
  }

  // Root navigator decides which stack to show
  // For now, let's assume user is not logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppointmentDetailsContext.Provider
      value={{ getAppointmentDetails, setAppointmentDetails, getAppointments, setAppointments }}
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <Stack.Screen name="MainApp" component={MainTabNavigator} />
          ) : (
            <Stack.Screen name="Auth" component={AuthStackNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppointmentDetailsContext.Provider>
  );
}
