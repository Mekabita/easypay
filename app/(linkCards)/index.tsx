import { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter
import { getCardDetails, createTable } from '../db'; // Import your function to get card details

export default function Index() {
  const [hasCardDetails, setHasCardDetails] = useState(false);
  const userId = 'user-123'; // Replace with the actual userId from your auth system
  const router = useRouter(); // Initialize router

  useEffect(() => {
    // Create the table if it doesn't exist
    createTable();
    // Check if the user has saved card details
    getCardDetails(userId, (details) => {
      if (details) {
        setHasCardDetails(true); // Card details exist, set the flag to true
      }
    });
  }, []);

  const handleNavigation = () => {
    if (hasCardDetails) {
      // If the user has card details, navigate to the 'ViewCardDetails' page
      router.push('/viewCardDetails');
    } else {
      // If no card details, navigate to the 'AddCardDetails' page
      router.push('/addCardDetails');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Welcome to your Wallet</Text>
      <Button title="Go to Your Card" onPress={handleNavigation} />
    </View>
  );
}
