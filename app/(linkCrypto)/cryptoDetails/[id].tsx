import { useRouter, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAccount, useBalance } from 'wagmi';
import { useWalletInfo } from '@reown/appkit-wagmi-react-native';

const API_KEY = process.env.EXPO_PUBLIC_COINMARKETCAP_API_KEY;

export default function CryptoAccountCard() {
  const { walletInfo } = useWalletInfo();
  const { address } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const [exchangeRate, setExchangeRate] = useState(3229.57);
  const [fiatEquivalent, setFiatEquivalent] = useState('0.00');
      const navigation = useNavigation();

    const router = useRouter();
    
      // Static transactions array for demonstration
  const transactions = [
    {
      id: 1,
      date: '2024-11-01',
      description: 'Bali Safari',
      amount: '-THB32.50',
    },
    {
      id: 2,
      date: '2024-11-03',
      description: 'Hotel Mariott',
      amount: '-Rs120.00',
    },
    {
      id: 3,
      date: '2024-11-05',
      description: 'Star Bucks',
      amount: '-Rs5.75',
    },
    { id: 4, date: '2024-11-07', description: 'Patan Durbar Square', amount: '-Rs40.00' },
  ];
    
  useEffect(() => {
    const fetchFiatEquivalent = async () => {
      try {
        // Fetch the latest cryptocurrency listings
        const response = await fetch(
          'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
          {
            headers: {
              'X-CMC_PRO_API_KEY': API_KEY,
            },
          }
        );
        const data = await response.json();

        // Find the cryptocurrency data by symbol
        const cryptoData = data.data.find(
          (crypto) =>
            crypto.symbrol.toUpperCase() === balanceData?.symbol.toUpperCase()
        );

        if (cryptoData) {
          const priceUsd = cryptoData.quote.USD.price|| 3229.57;
          setExchangeRate(priceUsd?.toFixed(2) || 3229.57);
          const fiatValue = (parseFloat(balanceData?.value) * priceUsd).toFixed(
            2
          );
          setFiatEquivalent(fiatValue);
        } else {
          console.warn(`No data found for symbol: ${balanceData?.symbol}`);
          setFiatEquivalent('0.00');
        }
      } catch (error) {
        console.error('Error fetching fiat equivalent:', error);
        setFiatEquivalent('0.00');
      } finally {
        setIsLoading(false);
      }
    };

      fetchFiatEquivalent();
          navigation.setOptions({
      title: 'Crypto Pay',
    });
  }, [balanceData?.symbol]);

  useEffect(() => {
    if (exchangeRate) {
      const fiatValue = (parseFloat(balanceData?.value) * exchangeRate).toFixed(
        2
      );
      setFiatEquivalent(fiatValue);
    }
  }, [exchangeRate, balanceData?.value]);


  console.log(fiatEquivalent);

  return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.cardContainer}>
      <Text style={styles.cardNumber} numberOfLines={1} ellipsizeMode="tail">
        {walletInfo?.name}
      </Text>
      <Text style={{ color: 'white' }}>
        1 {balanceData?.symbol} = {exchangeRate}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center', // Aligns items vertically in the center
          width: '100%', // Ensures the full width of the container is used
          paddingHorizontal: 10, // Optional: add padding if needed
        }}
      >
        <Text style={{ ...styles?.cardHolder, fontWeight: 600 }}>
          {balanceData?.value?.toString()}{' '}
          <Text style={styles.cardHolder}>{balanceData?.symbol}</Text>
        </Text>
        <Text style={styles.cardExpiry}>USD ${fiatEquivalent}</Text>
      </View>
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
          
      <Button title="Back to Home" onPress={() => router.replace('/(home)')} />
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
    fontSize: 16,
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
});
