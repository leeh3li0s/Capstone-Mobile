// screens/ViewAppointments.jsx
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { AuthenticationContext } from '../context/AuthenticationContext';

export default function ViewAppointments() {
  const { getAuthenticationDetails } = useContext(AuthenticationContext);
  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullDetailsModal, setShowFullDetailsModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const fetchAppointments = async () => {
    try {
      const userId = getAuthenticationDetails?.pk;
      if (!userId) return;

      const response = await fetch(`http://localhost:5000/appointments/user/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setAppointments(data.appointments);
      } else {
        console.error('Failed to fetch appointments:', data.error);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowFullDetailsModal(true);
  };

  const closeModal = () => {
    setShowFullDetailsModal(false);
    setSelectedAppointment(null);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4F7CFF" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.ViewAppointmentsContainer}>
        <Text style={styles.ViewAppointmentsHeader}>Your Appointments</Text>
      </View>
      
      {appointments.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#666', marginBottom: 10 }}>
            No appointments yet.
          </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Home')}
            style={{
              backgroundColor: '#4F7CFF',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 8
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '500' }}>
              Book an Appointment
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={{ padding: 20 }}>
          {appointments.map((item) => (
            <View
              key={item.appointment_id}
              style={{
                backgroundColor: '#fff',
                padding: 15,
                marginBottom: 15,
                borderRadius: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <TouchableOpacity onPress={() => openModal(item)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text style={{ fontWeight: 'bold', color: '#4F7CFF' }}>
                    {item.appointment_type}
                  </Text>
                  {/* <Text style={{ 
                    color: item.status === 'scheduled' ? '#4CAF50' : '#FF9800',
                    fontWeight: '500'
                  }}>
                    {item.status || 'scheduled'}
                  </Text> */}
                </View>
                <Text style={{ color: '#333', marginBottom: 4 }}>
                  Date: {new Date(item.appointment_date).toLocaleDateString()}
                </Text>
                <Text style={{ color: '#333', marginBottom: 4 }}>
                  Time: {item.appointment_time}
                </Text>
                <Text style={{ color: '#333', marginBottom: 4 }}>
                  Pet: {item.pet_name}
                </Text>
                <Text style={{ color: '#666', fontSize: 12, marginTop: 8 }}>
                  Tap to view full details
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Full Details Modal */}
      <Modal
        transparent
        visible={showFullDetailsModal}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Appointment Details
            </Text>

            {selectedAppointment && (
              <ScrollView style={{ maxHeight: 400 }}>
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Service Details</Text>
                  <Text style={styles.ModalItemTexts}>
                    Service: {selectedAppointment.appointment_type}
                  </Text>
                  <Text style={styles.ModalItemTexts}>
                    Date: {new Date(selectedAppointment.appointment_date).toLocaleDateString()}
                  </Text>
                  <Text style={styles.ModalItemTexts}>
                    Time: {selectedAppointment.appointment_time}
                  </Text>
                  {/* <Text style={styles.ModalItemTexts}>
                    Status: {selectedAppointment.status || 'scheduled'}
                  </Text> */}
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Owner Details</Text>
                  <Text style={styles.ModalItemTexts}>
                    Name: {selectedAppointment.patient_name}
                  </Text>
                  <Text style={styles.ModalItemTexts}>
                    Contact: {selectedAppointment.patient_phone}
                  </Text>
                  <Text style={styles.ModalItemTexts}>
                    Email: {selectedAppointment.patient_email}
                  </Text>
                  <Text style={styles.ModalItemTexts}>
                    Reason: {selectedAppointment.patient_reason}
                  </Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Pet Details</Text>
                  <Text style={styles.ModalItemTexts}>
                    Name: {selectedAppointment.pet_name}
                  </Text>
                  <Text style={styles.ModalItemTexts}>
                    Species: {selectedAppointment.pet_species}
                  </Text>
                  <Text style={styles.ModalItemTexts}>
                    Breed: {selectedAppointment.pet_breed}
                  </Text>
                  <Text style={styles.ModalItemTexts}>
                    Gender: {selectedAppointment.pet_gender}
                  </Text>
                </View>
              </ScrollView>
            )}

            <TouchableOpacity onPress={closeModal} style={styles.doneBtn}>
              <Text style={styles.doneText}>Close</Text>
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
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#4F7CFF',
    textAlign: 'center',
  },
  modalSection: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  ModalItemTexts: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
  doneBtn: {
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: '#4F7CFF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  doneText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  ViewAppointmentsContainer: {
    height: '9%',
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  ViewAppointmentsHeader: {
    paddingLeft: 20,
    paddingTop: 15,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
});