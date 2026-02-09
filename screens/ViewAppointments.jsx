import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import { AppointmentDetailsContext } from '../context/AppointmentDetailsContext';

export default function ViewAppointments() {
  const { getAppointments } = useContext(AppointmentDetailsContext);

  // ✅ Hooks must be at the top
  const [showFullDetailsModal, setShowFullDetailsModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowFullDetailsModal(true);
  };

  const closeModal = () => {
    setShowFullDetailsModal(false);
    setSelectedAppointment(null);
  };

  if (getAppointments.length === 0) {
    return (
      <View style= {{
        width: '100%',
        height: '100%'
      }}>
        <View style={styles.ViewAppointmentsContainer}>
          <Text style= {styles.ViewAppointmentsHeader}>Your Appointments</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No appointments yet.</Text>
        </View>
      </View>
      
    );
  }

  return (
    <>
    <View style={styles.ViewAppointmentsContainer}>
          <Text style= {styles.ViewAppointmentsHeader}>Your Appointments</Text>
        </View>
      <ScrollView style={{ padding: 20 }}>
        {getAppointments.map((item) => (
          <View
            key={item.id}
            style={{
              backgroundColor: '#fff',
              padding: 15,
              marginBottom: 15,
              borderRadius: 8
            }}
          >
            <TouchableOpacity onPress={() => openModal(item)}>
              <Text>Service: {item.service}</Text>
              <Text>Date: {item.appointmentDate}</Text>
              <Text>Time: {item.appointmentTimeSlot}</Text>
              <Text>Owner: {item.firstName} {item.lastName}</Text>
              <Text>Pet: {item.petName}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* ✅ SINGLE MODAL */}
      <Modal
        transparent
        visible={showFullDetailsModal}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Full Appointment Details
            </Text>

            {selectedAppointment && (
              <>
                <Text style={styles.ModalItemTexts}>
                  Service: {selectedAppointment.service}
                </Text>
                <Text style={styles.ModalItemTexts}>
                  Date: {selectedAppointment.appointmentDate}
                </Text>
                <Text style={styles.ModalItemTexts}>
                  Time: {selectedAppointment.appointmentTimeSlot}
                </Text>
                <Text style={styles.ModalItemTexts}>
                  Owner: {selectedAppointment.firstName} {selectedAppointment.lastName}
                </Text>
                <Text style={styles.ModalItemTexts}>
                  Pet: {selectedAppointment.petName}
                </Text>
              </>
            )}

            <TouchableOpacity onPress={closeModal} style={styles.doneBtn}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  ModalItemTexts: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  doneBtn: {
    alignSelf: 'flex-end',
    marginTop: 10
  },
  doneText: {
    color: '#FF3B30',
    fontSize: 16
  },

  ViewAppointmentsContainer: {
    height: '9%',
    backgroundColor: "#ffffff"

  },

  ViewAppointmentsHeader: {
    paddingLeft: 20,
    paddingTop: 15,
    fontSize: 30,
    fontWeight: 'bold'
  }
});
