import { Stack, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const walletTypes = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  },
  {
    name: 'DogeCoin',
    symbol: 'DOGE',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
  },
  {
    name: 'Shiba Inu',
    symbol: 'SHIB',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png',
  },
];

export default function Component() {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Link Crypto Wallet',
    });
  }, [navigation]);

  const handleWalletSelection = (wallet) => {
    setSelectedWallet(wallet);
  };

  const handleLinkWallet = () => {
    if (selectedWallet) {
      // This is where you would implement the actual wallet linking logic
      Alert.alert(
        'Linking Wallet',
        `Initiating connection to ${selectedWallet.name}...`
      );
    } else {
      Alert.alert('Error', 'Please select a wallet first.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Link Your Crypto Wallet</Text>
      <ScrollView style={styles.walletList}>
        {walletTypes.map((wallet) => (
          <TouchableOpacity
            key={wallet.name}
            style={[
              styles.walletItem,
              selectedWallet?.name === wallet.name && styles.selectedWallet,
            ]}
            onPress={() => handleWalletSelection(wallet)}
          >
            <Image
              source={{
                uri: wallet.icon,
              }}
              style={{ width: 32, height: 32, marginRight: 16 }}
            />
            <Text style={styles.walletName}>{wallet.name}</Text>
            {selectedWallet?.name === wallet.name && (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color="#4F46E5"
                style={styles.checkIcon}
              />
            )}
          </TouchableOpacity>
        ))}
        <Text style={styles.walletAddressTest}>Enter your Wallet Address</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter wallet address"
            value={walletAddress}
            onChangeText={setWalletAddress}
            autoCapitalize="none"
          />
          <Ionicons
            name="camera"
            size={24}
            color="#9CA3AF"
            style={styles.inputIcon}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.linkButton, !selectedWallet && styles.disabledButton]}
        onPress={handleLinkWallet}
        disabled={!selectedWallet}
      >
        <Text style={styles.linkButtonText}>Link Wallet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1F2937',
  },
  walletList: {
    marginBottom: 20,
  },
  walletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedWallet: {
    borderColor: '#4F46E5',
    borderWidth: 2,
  },
  walletIcon: {
    marginRight: 16,
  },
  walletName: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
  linkButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  linkButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  walletAddressTest: {
    textAlign: 'center',
    paddingTop: 26,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  inputIcon: {
    padding: 10,
  },
});
