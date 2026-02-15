import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MobileStylesheet from '../styles/MobileStylesheet';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AppointmentDetailsContext } from '../context/AppointmentDetailsContext';

export default function AppointmentServices() {
  const nav = useNavigation();
  const getData = useContext(AppointmentDetailsContext);
  const service = getData.getAppointmentDetails.service;

  const handleServiceSelection = (selectedService) => {
    getData.setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      service: selectedService,
    }));
    nav.navigate('AppointmentDate');
  };

  const renderServiceButton = (label) => (
    <TouchableOpacity
      style={[
        MobileStylesheet.Services,
        service === label && styles.selectedService, // apply selected style
      ]}
      onPress={() => handleServiceSelection(label)}
    >
      <Text
        style={[
          styles.serviceText,
          service === label && styles.selectedText, // apply selected text style
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={MobileStylesheet.mainContainer}>
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderText}>Services</Text>
        <Text>What kind of service do you want to avail?</Text>
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
  },
  HeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  SubheaderText: {
    fontSize: 15,
    color: '#797979',
  },
  serviceText: {
    textAlign: 'center',
    width: '60%',
    color: '#000', // default black text
  },
  selectedService: {
    backgroundColor: '#007BFF', // blue background when selected
  },
  selectedText: {
    color: '#fff', // white text when selected
    fontWeight: 'bold',
  },
});