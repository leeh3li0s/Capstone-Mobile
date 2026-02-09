import { View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native'
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
    
    // Modal state
    
    return (
        <View style={MobileStylesheet.mainContainer}>
            <View style = {styles.HeaderContainer}>
                <Text style={styles.HeaderText}>Services</Text>
                <Text>What kind of service do you want to avail?</Text>
            </View>
            
            <View style={MobileStylesheet.AppointmentServicesContainer}>
                <TouchableOpacity style={MobileStylesheet.Services} onPress={() => handleServiceSelection('Checkup or Consultation')}>
                    <Text style={{
                    width: '60%',
                    textAlign: 'center'
                }}>Checkup or Consultation</Text>
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

const styles = StyleSheet.create({
    HeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    backgroundColor: '#ffffff',
    
    marginTop: 30
    },
    HeaderText: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    SubheaderText: {
        fontSize: 15,
        color: '#797979'
    },

    
}) 