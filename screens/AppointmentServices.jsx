import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MobileStylesheet from '../styles/MobileStylesheet';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthenticationContext } from '../context/AuthenticationContext';

export default function AppointmentServices() {
  const nav = useNavigation();
  const { getAuthenticationDetails } = useContext(AuthenticationContext);

  const handleServiceSelection = (selectedService) => {
    nav.navigate('AppointmentDate', {
      service: selectedService
    });
  };

  const renderServiceButton = (label) => (
    <TouchableOpacity
      style={[
        MobileStylesheet.Services,
      ]}
      onPress={() => handleServiceSelection(label)}
    >
      <Text style={styles.serviceText}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={MobileStylesheet.mainContainer}>
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderText}>Services</Text>
        <Text style={styles.SubheaderText}>
          Welcome, {getAuthenticationDetails?.username || 'Guest'}! What kind of service do you want to avail?
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
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
});
// 