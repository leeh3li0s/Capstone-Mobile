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
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthenticationContext } from '../context/AuthenticationContext';

export default function AppointmentForm() {
  const nav = useNavigation();
  const route = useRoute();
  const { service, appointmentDate, appointmentTimeSlot } = route.params;
  const { getAuthenticationDetails } = useContext(AuthenticationContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: getAuthenticationDetails?.email || '',
    reasonForVisit: '',
    petName: '',
    petType: '',
    petBreed: '',
    petGender: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateField = (field, value) => {
    if (!value || value.trim() === '') {
      return 'This field is required.';
    }
    
    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address.';
      }
    }
    
    if (field === 'contactNumber') {
      const phoneRegex = /^[0-9]{10,15}$/;
      if (!phoneRegex.test(value.replace(/[^0-9]/g, ''))) {
        return 'Please enter a valid contact number.';
      }
    }
    
    return '';
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateForm = () => {
    let newErrors = {};
    let newTouched = {};

    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
      newTouched[field] = true;
    });

    setErrors(newErrors);
    setTouched(newTouched);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      
      return;
    }

    nav.navigate('ConfirmAppointment', {
      service,
      appointmentDate,
      appointmentTimeSlot,
      ...formData,
      user_id: getAuthenticationDetails?.pk
    });
  };

  const renderError = (field) => {
    return touched[field] && errors[field] ? (
      <Text style={styles.errorText}>{errors[field]}</Text>
    ) : null;
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
            <View style={{ flex: 1, marginRight: 8 }}>
              <TextInput
                style={[
                  styles.input,
                  touched.firstName && errors.firstName && { borderColor: 'red' }
                ]}
                placeholder="First Name"
                value={formData.firstName}
                onChangeText={text => updateField('firstName', text)}
                onBlur={() => handleBlur('firstName')}
              />
              {renderError('firstName')}
            </View>

            <View style={{ flex: 1 }}>
              <TextInput
                style={[
                  styles.input,
                  touched.lastName && errors.lastName && { borderColor: 'red' }
                ]}
                placeholder="Last Name"
                value={formData.lastName}
                onChangeText={text => updateField('lastName', text)}
                onBlur={() => handleBlur('lastName')}
              />
              {renderError('lastName')}
            </View>
          </View>

          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={[
              styles.input,
              touched.contactNumber && errors.contactNumber && { borderColor: 'red' }
            ]}
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChangeText={text => updateField('contactNumber', text)}
            onBlur={() => handleBlur('contactNumber')}
            keyboardType="phone-pad"
          />
          {renderError('contactNumber')}

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[
              styles.input,
              touched.email && errors.email && { borderColor: 'red' }
            ]}
            placeholder="Email Address"
            value={formData.email}
            onChangeText={text => updateField('email', text)}
            onBlur={() => handleBlur('email')}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {renderError('email')}

          <Text style={styles.label}>Reason for Visit</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              touched.reasonForVisit && errors.reasonForVisit && { borderColor: 'red' }
            ]}
            placeholder="Reason for visit"
            value={formData.reasonForVisit}
            onChangeText={text => updateField('reasonForVisit', text)}
            onBlur={() => handleBlur('reasonForVisit')}
            multiline
          />
          {renderError('reasonForVisit')}
        </View>

        {/* PET DETAILS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pet Details</Text>

          <Text style={styles.label}>Pet's Name</Text>
          <TextInput
            style={[
              styles.input,
              touched.petName && errors.petName && { borderColor: 'red' }
            ]}
            placeholder="Pet's Name"
            value={formData.petName}
            onChangeText={text => updateField('petName', text)}
            onBlur={() => handleBlur('petName')}
          />
          {renderError('petName')}

          <Text style={styles.label}>Species</Text>
          <TextInput
            style={[
              styles.input,
              touched.petType && errors.petType && { borderColor: 'red' }
            ]}
            placeholder="Species"
            value={formData.petType}
            onChangeText={text => updateField('petType', text)}
            onBlur={() => handleBlur('petType')}
          />
          {renderError('petType')}

          <Text style={styles.label}>Pet's Gender</Text>
          <View style={styles.genderContainer}>
            {['Male', 'Female'].map(gender => (
              <TouchableOpacity
                key={gender}
                style={[
                  styles.genderButton,
                  formData.petGender === gender && styles.genderButtonSelected,
                  touched.petGender && errors.petGender && { borderColor: 'red' }
                ]}
                onPress={() => {
                  updateField('petGender', gender);
                  setErrors(prev => ({ ...prev, petGender: '' }));
                }}
                onBlur={() => handleBlur('petGender')}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    formData.petGender === gender && styles.genderButtonTextSelected
                  ]}
                >
                  {gender}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {renderError('petGender')}

          <Text style={styles.label}>Pet's Breed</Text>
          <TextInput
            style={[
              styles.input,
              touched.petBreed && errors.petBreed && { borderColor: 'red' }
            ]}
            placeholder="Pet's Breed"
            value={formData.petBreed}
            onChangeText={text => updateField('petBreed', text)}
            onBlur={() => handleBlur('petBreed')}
          />
          {renderError('petBreed')}
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 4,
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
    backgroundColor: '#4F7CFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  continueButtonText: { fontSize: 18, color: 'white', fontWeight: 'bold' },
});
// 