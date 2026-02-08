import { View, Text, TouchableOpacity } from 'react-native'
import MobileStylesheet from '../styles/MobileStylesheet'
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AppointmentDetailsContext } from '../context/AppointmentDetailsContext';

export default function AppointmentServices() {

    const nav = useNavigation();

    const getData = useContext(AppointmentDetailsContext);
    const service = getData.getAppointmentDetails.service;

    const handleServiceSelection = (selectedService) => {
        getData.setAppointmentDetails(prevDetails => ({
            ...prevDetails,
            service: selectedService
        }));
        nav.navigate('AppointmentDate');
    }
    
    return (
        <View style={MobileStylesheet.mainContainer}>
            <Text>Appointment</Text>
            <Text>What kind of Service do you want to Avail?</Text>

            <View style={MobileStylesheet.AppointmentServicesContainer}>
                <TouchableOpacity style={MobileStylesheet.Services} onPress={() => handleServiceSelection('Checkup or Consultation')}>
                    <Text>Checkup or Consultation</Text>
                </TouchableOpacity>

                <TouchableOpacity style={MobileStylesheet.Services} onPress={() => handleServiceSelection('Wellness & Vaccination')}>
                    <Text>Wellness & Vaccination</Text>
                </TouchableOpacity>

                <TouchableOpacity style={MobileStylesheet.Services} onPress={() => handleServiceSelection('Deworming')}>
                    <Text>Deworming</Text>
                </TouchableOpacity>

                <TouchableOpacity style={MobileStylesheet.Services} onPress={() => handleServiceSelection('Parasite Control')}>
                    <Text>Parasite Control</Text>
                </TouchableOpacity>

                <TouchableOpacity style={MobileStylesheet.Services} onPress={() => handleServiceSelection('Grooming')}>
                    <Text>Grooming</Text>
                </TouchableOpacity>

                <TouchableOpacity style={MobileStylesheet.Services} onPress={() => handleServiceSelection('Others')}>
                    <Text>Others</Text>
                </TouchableOpacity>

            </View>

        </View>
)
}