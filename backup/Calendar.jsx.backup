import { Calendar } from 'react-native-calendars';
import { useState } from 'react';

export default function AppointmentDate() {
    const [selectedDate, setSelectedDate] = useState('');

    return (
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
        onDayPress={(day) => {
            setSelectedDate(day.dateString);
        }}
        markedDates={{
            [selectedDate]: {
            selected: true
            }
        }}
        />
    );
    }
