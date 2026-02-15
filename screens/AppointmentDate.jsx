import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { AppointmentDetailsContext } from '../context/AppointmentDetailsContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import MobileStylesheet from '../styles/MobileStylesheet';

export default function AppointmentDate() {
  const nav = useNavigation();
  const route = useRoute();
  const { service } = route.params; // Get service from previous screen

  // Initialize state
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  // Modal state
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  // In AppointmentDate.jsx, update the timeSlots array
const timeSlots = [
  '12:00 PM',
  '1:00 PM',
  '2:00 PM'
];

// When selecting a time slot
const handleTimeSelect = (slot) => {
  setSelectedTimeSlot(slot);
};

// When navigating to next screen
const handleNext = () => {
  nav.navigate('AppointmentForm', {
    service: service,
    appointmentDate: selectedDate,
    appointmentTimeSlot: selectedTimeSlot  // This will be just "12:00 PM"
  });
};

  const backHandler = () => {
    if (selectedDate || selectedTimeSlot) {
      setShowCancelModal(true);
    } else {
      nav.goBack();
    }
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    nav.goBack();
  };

  return (
    <View style={[MobileStylesheet.mainContainer, {
      justifyContent: 'center',
      alignItems: 'center',
    }]}>

      {/* Back Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 10,
        }}
        onPress={backHandler}
      >
        <Text style={{ fontSize: 16, color: '#007AFF' }}>
          Return
        </Text>
      </TouchableOpacity>

      {/* Cancel Confirmation Modal */}
      <Modal
        transparent
        visible={showCancelModal}
        animationType="fade"
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 12,
            width: '80%'
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10
            }}>
              Cancel appointment?
            </Text>

            <Text style={{
              fontSize: 14,
              color: '#666',
              marginBottom: 20
            }}>
              You have unsaved changes. Are you sure you want to go back?
            </Text>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 15
            }}>
              <TouchableOpacity onPress={() => setShowCancelModal(false)}>
                <Text style={{ color: '#007AFF', fontSize: 16 }}>
                  Stay
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={confirmCancel}>
                <Text style={{ color: '#FF3B30', fontSize: 16 }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Title */}
      <Text style={{ fontWeight: 'bold', fontSize: 25, paddingBottom: 10 }}>
        Time & Date
      </Text>

      <Text style={{
        fontSize: 12,
        paddingBottom: 20,
        width: "70%",
        textAlign: 'center',
        color: '#a1a1a1'
      }}>
        Select your preferred time and date for the {service?.toLowerCase() || 'your'} appointment.
      </Text>

      {/* Calendar */}
      <View style={{ 
        height: '38%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
        <Calendar
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            dayTextColor: '#FFFFFF',
            todayTextColor: '#FFFFFF',
            monthTextColor: '#FFFFFF',
            arrowColor: '#FFFFFF',
            selectedDayBackgroundColor: '#FFFFFF',
            selectedDayTextColor: '#4F7CFF'
          }}
          style={{
            alignSelf: 'center',
            width: '100%',
            margin: 20,
            backgroundColor: '#4F7CFF',
            borderRadius: 20,
            padding: 10
          }}
          onDayPress={handleDateSelect}
          markedDates={
            selectedDate ? { [selectedDate]: { selected: true } } : {}
          }
        />
      </View>

      {/* Time Slots */}
      <View style={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
      }}>
        {timeSlots.map(slot => {
          const selected = selectedTimeSlot === slot;

          return (
            <TouchableOpacity
              key={slot}
              style={[
                MobileStylesheet.TimeSlot,
                selected && { backgroundColor: '#4F7CFF', borderColor: '#4F7CFF' }
              ]}
              onPress={() => handleTimeSelect(slot)}
            >
              <Text style={{ color: selected ? '#FFFFFF' : '#242424' }}>
                {slot}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Next Button */}
      <View style={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: '5%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TouchableOpacity
          style={[
            MobileStylesheet.Button,
            !(selectedDate && selectedTimeSlot) && { opacity: 0.5 }
          ]}
          disabled={!(selectedDate && selectedTimeSlot)}
          onPress={handleNext}
        >
          <Text style={{ color: '#ffffff' }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
// 