import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import { getCards, getCardDetails } from '../db';
import { useRouter } from 'expo-router';

export default function ViewCard() {
  const [cardDetails, setCardDetails] = useState([]);
  const userId = 'user-123';
  const router = useRouter();

  useEffect(() => {
    // Fetch all card details for the current user
    getCards(userId, (details) => {
      if (details && Array.isArray(details)) {
        setCardDetails(details);
      }
    });
  }, []);

  if (!cardDetails.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.noCardText}>No card details found for this user.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {cardDetails.map((card, index) => (
        <View key={index} style={styles.cardContainer}>
          <Text style={styles.cardNumber}>{card.cardNumber}</Text>
          <Text style={styles.cardHolder}>{card.cardHolderName}</Text>
          <Text style={styles.cardExpiry}>Expiry: {card.expiryDate}</Text>
        </View>
      ))}
      <Button title="Back to Home" onPress={() => router.push('/')} />
    </ScrollView>
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
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardContainer: {
    width: '90%',
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
  },
});
