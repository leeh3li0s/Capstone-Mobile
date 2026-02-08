import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppointmentDetailsContext } from '../context/AppointmentDetailsContext';

export default function AppointmentForm() {
  const nav = useNavigation();

  // ✅ FIX: destructure EVERYTHING you use
  const {
    getAppointmentDetails,
    setAppointmentDetails,
    setAppointments
  } = useContext(AppointmentDetailsContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    reasonForVisit: '',
    petName: '',
    petType: '',
    petBreed: '',
    petGender: '',
  });

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
  const finalAppointment = {
    ...getAppointmentDetails,
    ...formData,
    id: Date.now()
  };

  // update draft only
  setAppointmentDetails(finalAppointment);

  nav.navigate('ConfirmAppointment');
};



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity style={styles.backButton} onPress={() => nav.goBack()}>
          <Text style={styles.backButtonText}>Return</Text>
        </TouchableOpacity>

        <Text style={styles.mainTitle}>Pet & Owner Details</Text>
        <Text style={styles.subtitle}>
          Fill out the Details below to Book an Appointment with us.
        </Text>

        {/* OWNER DETAILS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Owner Details</Text>

          <Text style={styles.label}>Full Name</Text>
          <View style={styles.nameRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={text => updateField('firstName', text)}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={text => updateField('lastName', text)}
            />
          </View>

          <Text style={styles.label}>Contact No.</Text>
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChangeText={text => updateField('contactNumber', text)}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>E-Mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={formData.email}
            onChangeText={text => updateField('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Reason for Visit</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Reason for visit"
            value={formData.reasonForVisit}
            onChangeText={text => updateField('reasonForVisit', text)}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* PET DETAILS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pet Details</Text>

          <Text style={styles.label}>Pet's Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Pet's Name"
            value={formData.petName}
            onChangeText={text => updateField('petName', text)}
          />

          <Text style={styles.label}>Species (e.g. Dog, Cat)</Text>
          <TextInput
            style={styles.input}
            placeholder="Species"
            value={formData.petType}
            onChangeText={text => updateField('petType', text)}
          />

          <Text style={styles.label}>Pet's Gender</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                formData.petGender === 'Male' && styles.genderButtonSelected
              ]}
              onPress={() => updateField('petGender', 'Male')}
            >
              <Text
                style={[
                  styles.genderButtonText,
                  formData.petGender === 'Male' && styles.genderButtonTextSelected
                ]}
              >
                Male
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderButton,
                formData.petGender === 'Female' && styles.genderButtonSelected
              ]}
              onPress={() => updateField('petGender', 'Female')}
            >
              <Text
                style={[
                  styles.genderButtonText,
                  formData.petGender === 'Female' && styles.genderButtonTextSelected
                ]}
              >
                Female
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Pet's Breed</Text>
          <TextInput
            style={styles.input}
            placeholder="Pet's Breed"
            value={formData.petBreed}
            onChangeText={text => updateField('petBreed', text)}
          />

          <Text style={styles.uploadLabel}>
            If your pet has previous medical records, you can upload them here:
          </Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleSubmit}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollView: { flex: 1, padding: 20 },
  backButton: { marginBottom: 20, alignSelf: 'flex-start' },
  backButtonText: { fontSize: 16, color: '#007AFF' },
  mainTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: { fontSize: 20, fontWeight: '600', marginBottom: 20, color: '#333' },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 8, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  halfInput: { width: '48%' },
  textArea: { height: 80, textAlignVertical: 'top' },
  genderContainer: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  genderButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  genderButtonSelected: { backgroundColor: '#4F7CFF', borderColor: '#4F7CFF' },
  genderButtonText: { fontSize: 16, color: '#333', fontWeight: '500' },
  genderButtonTextSelected: { color: '#fff' },
  uploadLabel: { fontSize: 16, color: '#333', marginBottom: 12 },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButtonText: { fontSize: 16, color: '#007AFF', fontWeight: '500' },
  continueButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  continueButtonText: { fontSize: 18, color: 'white', fontWeight: 'bold' },
});