import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { getCards, createTable, deleteCardById } from '../db';
import { AppConstants } from '@/constants/AppConstants';

export default function Index() {
  const [cardDetails, setCardDetails] = useState([]);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    // Create the table if it doesn't exist
    createTable();

    // Fetch all card details for the current user
    getCards(AppConstants.userId, (details) => {
      if (details && Array.isArray(details)) {
        setCardDetails(details);
      }
    });

    navigation.setOptions({
      title: 'Card List',
    });
    // deleteCardById(2, (details) => {
    //   if (details) {
    //     setCardDetails(details);
    //   }
    // });
  }, []);

  const handleAddCard = () => {
    router.push('/addCardDetails');
  };

  const handleCardPress = (card) => {
    router.push(`/cardDetails/${card.id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Your Wallet</Text>
      {cardDetails.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {cardDetails.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cardContainer}
              onPress={() => handleCardPress(card)}
            >
              <Text style={styles.cardNumber}>{card.cardNumber}</Text>
              <Text style={styles.cardHolder}>{card.cardHolderName}</Text>
              <Text style={styles.cardExpiry}>Expiry: {card.expiryDate}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noCardText}>
          No card details found for this user.
        </Text>
      )}

      {/* Show "Add Card" button at the bottom */}
      <Button title="Add Your Card" onPress={handleAddCard} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardContainer: {
    width: '95%',
    aspectRatio: 1.6,
    backgroundColor: '#1e1e1e',
    borderRadius: 15,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 20,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    marginTop: 50,
    textAlign: 'center',
  },
  cardHolder: {
    fontSize: 16,
    color: '#fff',
    alignSelf: 'flex-start',
    marginTop: 20,
    textTransform: 'uppercase',
  },
  cardExpiry: {
    fontSize: 14,
    color: '#ccc',
    alignSelf: 'flex-end',
  },
  noCardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
});
