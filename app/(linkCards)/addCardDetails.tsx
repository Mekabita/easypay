import { useState } from 'react';
import { Text, TextInput, Button, View } from 'react-native';
import { saveCardDetails } from '../db'; // Import save function
import { useRouter } from 'expo-router';

export default function AddCardDetails() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const userId = 'user-123'; // Replace with the actual userId from your auth system
  const router = useRouter();

  const handleSaveCardDetails = () => {
    if (cardNumber && cardHolderName && expiryDate) {
      saveCardDetails(userId, cardNumber, cardHolderName, expiryDate); // Save card details for this user
      alert('Card details saved successfully!');
      router.push('/viewCardDetails'); // Redirect to the card view page
    } else {
      alert('Please fill in all the details');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Enter your credit card details</Text>

      <TextInput
        style={{
          width: '80%',
          padding: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          marginBottom: 20,
        }}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <TextInput
        style={{
          width: '80%',
          padding: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          marginBottom: 20,
        }}
        placeholder="Cardholder's Name"
        value={cardHolderName}
        onChangeText={setCardHolderName}
      />

      <TextInput
        style={{
          width: '80%',
          padding: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          marginBottom: 20,
        }}
        placeholder="Expiry Date (MM/YY)"
        value={expiryDate}
        onChangeText={setExpiryDate}
      />

      <Button title="Save Card Details" onPress={handleSaveCardDetails} />
    </View>
  );
}
