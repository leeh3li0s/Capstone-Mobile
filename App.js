import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


import AppointmentServices from './screens/AppointmentServices';
import AppointmentDate from './screens/AppointmentDate';
import AppointmentForm from './screens/AppointmentForm';
import ViewAppointments from './screens/ViewAppointments';
import Calendar from './screens/Calendar';
import BookingDetails from './components/BookingDetails';
import ConfirmAppointment from './screens/ConfirmAppointment';
import Register from './screens/Register';
import Login from './screens/Login';

import { AppointmentDetailsContext } from './context/AppointmentDetailsContext';
import { AuthenticationContext } from './context/AuthenticationContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  /* ---------------- AUTH STATE ---------------- */
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [getAuthenticationDetails, setAuthenticationDetails] = useState({
    email: '123',
    username: '456',
    password: '789',
    confirmPassword: '00',
  });

  /* ------------- APPOINTMENT STATE ------------ */
  const [getAppointmentDetails, setAppointmentDetails] = useState({
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
  });

  const [getAppointments, setAppointments] = useState([]);

  /* ---------------- NAVIGATORS ---------------- */


  function getTabBarStyle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'AppointmentServices';

  if (
    routeName === 'AppointmentDate' ||
    routeName === 'AppointmentForm' ||
    routeName === 'BookingDetails' ||
    routeName === 'ConfirmAppointment' ||
    routeName === 'Calendar'
  ) {
    return { display: 'none' };
  }

  return {};
}


  function HomeStackNavigator() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AppointmentServices" component={AppointmentServices} />
        <Stack.Screen name="AppointmentDate" component={AppointmentDate} />
        <Stack.Screen name="AppointmentForm" component={AppointmentForm} />
        <Stack.Screen name="BookingDetails" component={BookingDetails} />
        <Stack.Screen name="ConfirmAppointment" component={ConfirmAppointment} />
        <Stack.Screen name="Calendar" component={Calendar} />
      </Stack.Navigator>
    );
  }

  function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={({ route }) => ({
          headerShown: false,
          tabBarStyle: getTabBarStyle(route),
        })}
      />
      <Tab.Screen
        name="ViewAppointments"
        component={ViewAppointments}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}


  function AuthStackNavigator() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  }

  /* ---------------- ROOT ---------------- */

  return (
    <AuthenticationContext.Provider
      value={{
        getAuthenticationDetails,
        setAuthenticationDetails,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      <AppointmentDetailsContext.Provider
        value={{
          getAppointmentDetails,
          setAppointmentDetails,
          getAppointments,
          setAppointments,
        }}
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
    </AuthenticationContext.Provider>
  );
}
