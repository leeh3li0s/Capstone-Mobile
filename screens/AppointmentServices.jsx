import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MobileStylesheet from '../styles/MobileStylesheet';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { AuthenticationContext } from '../context/AuthenticationContext';

export default function AppointmentServices() {
  const nav = useNavigation();
  const { getAuthenticationDetails } = useContext(AuthenticationContext);

  const [pressedService, setPressedService] = useState(null);

  const handleServiceSelection = (selectedService) => {
    setPressedService(selectedService);

    
    setTimeout(() => {
      setPressedService(null);
      nav.navigate('AppointmentDate', {
        service: selectedService,
      });
    }, 300);
  };

  const renderServiceButton = (label) => (
    <TouchableOpacity
      style={[
        MobileStylesheet.Services,
        styles.shadow,
        pressedService === label && styles.pressedButton,
      ]}
      onPress={() => handleServiceSelection(label)}
    >
      <Text style={styles.serviceText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={MobileStylesheet.mainContainer}>
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderText}>Services</Text>
        <Text style={styles.SubheaderText}>
          Welcome, {getAuthenticationDetails?.username || getAuthenticationDetails?.fullname || 'Guest'}! What kind of service do you want to avail?
        </Text>
      </View>

      <View style={MobileStylesheet.AppointmentServicesContainer}>
        {renderServiceButton('Checkup or Consultation')}
        {renderServiceButton('Wellness & Vaccination')}
        {renderServiceButton('Deworming')}
        {renderServiceButton('Parasite Control')}
        {renderServiceButton('Grooming')}
        {renderServiceButton('Others')}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  HeaderText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#003cff',
  },
  SubheaderText: {
    fontSize: 14,
    color: '#797979',
    textAlign: 'center',
  },
  serviceText: {
    textAlign: 'center',
    width: '60%',
    color: '#000',
  },
  shadow: {
    backgroundColor: '#fff',
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    borderRadius: 8,
    marginVertical: 8,
    paddingVertical: 12,
  },
  pressedButton: {
    backgroundColor: '#003cff',
  },
});