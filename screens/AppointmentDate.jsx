import { View, Text, TouchableOpacity } from 'react-native';
import { AppointmentDetailsContext } from '../context/AppointmentDetailsContext';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import MobileStylesheet from '../styles/MobileStylesheet';

export default function AppointmentDate() {
  const getData = useContext(AppointmentDetailsContext);
  const nav = useNavigation();

  // ✅ Local state for selections
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  // Handlers for local state
  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleTimeSelect = (slot) => {
    setSelectedTimeSlot(slot);
  };

  // ✅ Handler: commit local selections into Context when Next is pressed
  const handleNext = () => {
    getData.setAppointmentDetails(prev => ({
      ...prev,
      appointmentDate: selectedDate,
      appointmentTimeSlot: selectedTimeSlot
    }));
    nav.navigate('AppointmentForm');
  };

  const timeSlots = [
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM'
  ];

  return (
    <View style={MobileStylesheet.mainContainer}>
      <Text>Appointment Date</Text>
      <Text>Service: {getData.getAppointmentDetails.service}</Text>
      <Text>Date: {selectedDate || 'None selected'}</Text>
      <Text>Time: {selectedTimeSlot || 'None selected'}</Text>

      {/* Calendar */}
      <View style={{ backgroundColor: '#ffffff', height: '45%' }}>
        <Calendar
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            textSectionTitleColor: '#E6EDFF',
            dayTextColor: '#FFFFFF',
            todayTextColor: '#FFFFFF',
            monthTextColor: '#FFFFFF',
            textMonthFontWeight: 'bold',
            arrowColor: '#FFFFFF',
            selectedDayBackgroundColor: '#FFFFFF',
            selectedDayTextColor: '#4F7CFF'
          }}
          style={{
            margin: 20,
            backgroundColor: '#4F7CFF',
            borderRadius: 20,
            padding: 10
          }}
          onDayPress={handleDateSelect}
          markedDates={
            selectedDate
              ? { [selectedDate]: { selected: true } }
              : {}
          }
        />
      </View>

      {/* Time Slots */}
      <View
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          height: '25%',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10
        }}
      >
        {timeSlots.map(slot => {
          const selected = selectedTimeSlot === slot;

          return (
            <TouchableOpacity
              key={slot}
              style={[
                MobileStylesheet.TimeSlot,
                selected && {
                  backgroundColor: '#4F7CFF',
                  borderColor: '#4F7CFF'
                }
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
      <View
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          height: '5%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
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