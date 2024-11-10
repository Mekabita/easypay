import { AppConstants } from '@/constants/AppConstants';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getCards } from '../db';

export default function ViewCard() {
  const [cardDetails, setCardDetails] = useState([]);

  const maskCardNumber = (cardNumber) => {
    // Show only the last 4 digits
    const lastFourDigits = cardNumber.slice(-4);
    const maskedSection = cardNumber.slice(0, -4).replace(/\d/g, '*');
    return maskedSection + lastFourDigits;
  };

  useEffect(() => {
    // Fetch all card details for the current user
    getCards(AppConstants.userId, (details) => {
      if (details && Array.isArray(details)) {
        setCardDetails(details);
      }
    });
  }, [setCardDetails]);

  if (!cardDetails.length) {
    return <Text>No card details found for this user.</Text>;
  }

  return cardDetails.map((card, index) => (
    <View key={index} style={styles.cardContainer}>
      <Text style={styles.cardNumber} numberOfLines={1} ellipsizeMode="tail">
        {maskCardNumber(card.cardNumber)}
      </Text>
      <Text style={styles.cardHolder}>{card.cardHolderName}</Text>
      <Text style={styles.cardExpiry}>Expiry: {card.expiryDate}</Text>
    </View>
  ));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  cardContainer: {
    width: '90%',
    aspectRatio: 2,
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    marginTop: 25,
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