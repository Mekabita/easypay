import { useAppKit } from '@reown/appkit-wagmi-react-native';
import '@walletconnect/react-native-compat';
import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Cards from '../(linkCards)/Cards';
import CryptoCard from '../(linkCrypto)/CryptoCard';
import Transactions from '../Transactions/Transactions';

export default function Index() {
  const { open } = useAppKit();
  const navigate = useNavigation();

  useEffect(() => {
    navigate.setOptions({ headerShown: false });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          ...styles.container,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            marginTop: 80,
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 18,
            textAlign: 'left',
          }}
        >
          Linked Crypto Wallets
        </Text>
        <CryptoCard />

        <Text
          style={{
            marginTop: 50,
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'left',
          }}
        >
          Linked Cards
        </Text>
        <Cards />

        <Transactions />

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          {/* Card for Crypto Wallet Link */}
          <TouchableOpacity style={styles.button} onPress={() => open()}>
            <Text style={{ color: '#333' }}>Link a Crypto Wallet</Text>
          </TouchableOpacity>

          {/* Card for Credit/Debit Card Link */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/(linkCards)')}
          >
            <Text style={{ color: '#333' }}>Link a Credit/Debit Card</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // // alignItems: 'center',
    // justifyContent: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#e0e4e8', // Softer background color
    borderRadius: 15, // Rounded corners for a smoother look
    borderWidth: 1,
    borderColor: '#d1d5db', // Subtle border for extra dimension
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, // Softer shadow
    shadowRadius: 10, // More spread for a smoother shadow
    elevation: 6,
    alignItems: 'center',
  },
});
