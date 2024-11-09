import { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { getCardDetails } from '../db'; // Import getCardDetails function
import { useRouter } from 'expo-router';

export default function ViewCard() {
  const [cardDetails, setCardDetails] = useState(null);
  const userId = 'user-123'; // Replace with the actual userId from your auth system
  const router = useRouter();

  useEffect(() => {
    // Fetch card details for the current user
    getCardDetails(userId, (details) => {
      if (details) {
        setCardDetails(details); // Set the card details in state
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      {cardDetails ? (
        <>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Card Number: {cardDetails.cardNumber}</Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Cardholder: {cardDetails.cardHolderName}</Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Expiry Date: {cardDetails.expiryDate}</Text>
        </>
      ) : (
        <Text>No card details found for this user</Text>
      )}
      <Button title="Back to Home" onPress={() => router.push('/')} />
    </View>
  );
}
