import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AppointmentDetailsContext } from '../context/AppointmentDetailsContext'
import MobileStylesheet from '../styles/MobileStylesheet';


export default function BookingDetails() {
const getData = useContext(AppointmentDetailsContext);
const { 
    service,
    firstName,
    lastName,
    contactNumber,
    email,
    reasonForVisit,
    petName,
    petType,
    petBreed,
    petGender,
    appointmentDate,
    appointmentTimeSlot 
    } = getData.getAppointmentDetails;

  return (
    
    <View style={{
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        gap: 15,
        paddingVertical: 10,
    }}>
    {/* Owner Details Card */}
      <View style={{
        backgroundColor: '#ffffff',
        width: '90%',
        borderRadius: 20,
        justifyContent: 'center',
        padding: 10,
        gap: 10,
        borderColor: '#5a2d2d',
        borderWidth: 2
        
        
        }}>
        <Text style={{
            fontWeight: 'bold',
                fontSize: 20
                }}>
        Owner Details
        </Text>

        <View style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 20
        }}>
            <View style={MobileStylesheet.DetailsCardComponent}> 
            <Text>Full Name:</Text>
            <Text>Contact Number:</Text>
            <Text>Email:</Text>
            <Text>Reason for Visit:</Text>
        </View>

        <View style={MobileStylesheet.DetailsCardComponent}> 
            <Text>{firstName} {lastName}</Text>
            <Text>{contactNumber}</Text>
            <Text>{email}</Text>
            <Text>{reasonForVisit}</Text>
        </View>
        </View>
        
      </View>

    {/* Pet Details Card */}
    <View style={{
        backgroundColor: '#ffffff',
        width: '90%',
        borderRadius: 20,
        justifyContent: 'center',
        padding: 10,
        gap: 10,
        borderColor: '#5a2d2d',
        borderWidth: 2
        
        
        }}>
        <Text style={{
            fontWeight: 'bold',
                fontSize: 20
                }}>
        Pet Details
        </Text>

        <View style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 20
        }}>
            <View style={MobileStylesheet.DetailsCardComponent}> 
            <Text>Pet Name:</Text>
            <Text>Species:</Text>
            <Text>Gender:</Text>
            <Text>Breed:</Text>
            <Text>Service:</Text>
            <Text>Date & Time:</Text>
        </View>

        <View style={MobileStylesheet.DetailsCardComponent}> 
            <Text>{petName}</Text>
            <Text>{petType}</Text>
            <Text>{petGender}</Text>
            <Text>{petBreed}</Text>
            <Text>{service}</Text>
            <Text>{appointmentDate} {appointmentTimeSlot}</Text>
            
        </View>
        </View>
        
      </View>
      
    </View>
  )
}