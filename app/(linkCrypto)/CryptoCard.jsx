import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAccount, useBalance } from 'wagmi';

const API_KEY = Process.env.YOUR_COINMARKETCAP_API_KEY;

export default function CryptoAccountCard() {
  const { address } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const [exchangeRate, setExchangeRate] = useState(null);
  const [fiatEquivalent, setFiatEquivalent] = useState('0.00');

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
            crypto.symbol.toUpperCase() === balanceData?.symbol.toUpperCase()
        );

        if (cryptoData) {
          const priceUsd = cryptoData.quote.USD.price;
          setExchangeRate(priceUsd?.toFixed(2));
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
  }, [balanceData?.symbol]);

  useEffect(() => {
    if (exchangeRate) {
      const fiatValue = (parseFloat(balanceData?.value) * exchangeRate).toFixed(
        2
      );
      setFiatEquivalent(fiatValue);
    }
  }, [exchangeRate, balanceData?.value]);

  return address ? (
    <View style={styles.cardContainer}>
      <Text style={styles.cardNumber} numberOfLines={1} ellipsizeMode="tail">
        {address}
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
  ) : (
    <Text>Crypto account has not been linked</Text>
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
    aspectRatio: 2,
    backgroundColor: '#1e1e1e',
    borderRadius: 15,
    padding: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    marginTop: 20,
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
});
