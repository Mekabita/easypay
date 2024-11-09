import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { saveCardDetails } from '../db';
import { useRouter } from 'expo-router';

export default function AddCardDetails() {
  const [cardInfo, setCardInfo] = useState(null);
  const [isCardValid, setIsCardValid] = useState(false);
  const userId = 'user-123'; // Replace with actual userId from auth system
  const router = useRouter();

  // Handle card details update
    const handleCardDetails = (formData) => {
    console.log('Status:', formData.status);
    setCardInfo(formData);
    setIsCardValid(formData.status.number === "valid" && formData.status.expiry === "valid" && formData.status.cvc === "valid");
  };

  // Save card details if valid
  const handleSaveCardDetails = () => {
    if (isCardValid && cardInfo) {
      saveCardDetails(userId, cardInfo.values.number, cardInfo.values.name, cardInfo.values.expiry);
      Alert.alert('Success', 'Card details saved successfully!');
      router.push('/viewCardDetails'); // Navigate to card details view
    } else {
      Alert.alert('Invalid Input', 'Please enter valid card details.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.heading}>Enter your credit card details</Text>

        {/* Credit Card Input Form */}
        <CreditCardInput
          autoFocus
          requiresName
          requiresCVC
          requiresPostalCode
          labelStyle={styles.labelStyle}
          inputStyle={styles.inputStyle}
          onChange={handleCardDetails}
          validColor="black" // Color for valid inputs
          invalidColor="red" // Color for invalid inputs
          placeholderColor="darkgray"
        />

        {/* Submit Button */}
        <Button
          title="Save Card Details"
          onPress={handleSaveCardDetails}
          disabled={!isCardValid} // Disable if card is invalid
          color="#007BFF"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  labelStyle: {
    fontSize: 14,
    color: '#333',
  },
  inputStyle: {
    fontSize: 16,
    color: '#333',
    padding: 10,
  },
});

