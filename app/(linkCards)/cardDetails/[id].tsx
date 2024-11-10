import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import { getCards, getCardDetailsById } from '../../db';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';

export default function ViewCard() {
  const [cardDetails, setCardDetails] = useState([]);
  const userId = 'user-123';
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Retrieve the card ID from the route params
  const navigation = useNavigation();

  // Static transactions array for demonstration
  const transactions = [
    {
      id: 1,
      date: '2024-11-01',
      description: 'Bali Restaurant',
      amount: '-thb32.50',
    },
    {
      id: 2,
      date: '2024-11-03',
      description: 'Hyderbaad Biryani',
      amount: '-Rs120.00',
    },
    {
      id: 3,
      date: '2024-11-05',
      description: 'Himalayan Java',
      amount: '-Rs5.75',
    },
    { id: 4, date: '2024-11-07', description: 'Wow Momo', amount: '-Rs40.00' },
  ];

  const maskCardNumber = (cardNumber) => {
    // Show only the last 4 digits
    const lastFourDigits = cardNumber.slice(-4);
    const maskedSection = cardNumber.slice(0, -4).replace(/\d/g, '*');
    return maskedSection + lastFourDigits;
  };

  useEffect(() => {
    // Fetch all card details for the current user
    getCardDetailsById(id, (details) => {
      if (details) {
        setCardDetails(details);
      }
    });
    navigation.setOptions({
      title: 'Card Details',
    });
  }, [id]);

  if (!cardDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.noCardText}>No card details found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardNumber}>
            {maskCardNumber(cardDetails.cardNumber)}
          </Text>
          <Text style={styles.cardHolder}>{cardDetails.cardHolderName}</Text>
          <Text style={styles.cardExpiry}>
            Expiry: {cardDetails.expiryDate}
          </Text>
        </View>

        <Text style={styles.transactionsHeading}>Transactions</Text>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionContainer}>
            <Text style={styles.transactionDate}>{transaction.date}</Text>
            <Text style={styles.transactionDescription}>
              {transaction.description}
            </Text>
            <Text style={styles.transactionAmount}>{transaction.amount}</Text>
          </View>
        ))}

        <Button title="Back to Home" onPress={() => router.push('/(home)')} />
      </View>
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
    width: '100%',
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
  transactionsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  transactionContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f00',
  },
  noCardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
