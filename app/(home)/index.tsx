import { useAppKit } from '@reown/appkit-wagmi-react-native';
import '@walletconnect/react-native-compat';
import { router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  SafeAreaView,
} from 'react-native';
import Cards from '../(linkCards)/Cards';
import CryptoCard from '../(linkCrypto)/CryptoCard';
import Transactions from '../Transactions/Transactions';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { LogBox } from 'react-native';
import Header from './Header';

// Ignore all warnings
LogBox.ignoreAllLogs(true);

// Or ignore specific warnings
LogBox.ignoreLogs([
  'Warning: ...', // Replace with the warning message you want to ignore
]);

export default function Index() {
  const { open } = useAppKit();
  const navigate = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const translateY = new Animated.Value(0); // for tracking the swipe

  useEffect(() => {
    navigate.setOptions({ headerShown: false });

  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    translateY.setValue(0); // reset translateY
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.translationY > 100) {
      // Threshold for swipe down
      closeModal();
    } else {
      // Animate back to initial position if threshold isn't met
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleCardPayPress = () => {
    closeModal()
    router.push(`/cardDetails/3`);
  };

    const handleCryptoPayPress = () => {
    closeModal()
    router.push(`/cryptoDetails/3`);
  };



  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Header />

        <View
          style={{
            ...styles.container,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              marginTop: 20,
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 18,
              textAlign: 'left',
              alignSelf: 'flex-start',
              marginLeft: 20,
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
              alignSelf: 'flex-start',
              marginLeft: 20,
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
      <View style={floating.container}>
        <TouchableOpacity style={floating.floatingButton} onPress={openModal}>
          <Text style={floating.buttonText}>Pay</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={modal.overlay} />
        </TouchableWithoutFeedback>
        <View style={modal.bottomSheet}>
          <Text style={modal.sheetTitle}>Payment Methods</Text>
          <TouchableOpacity
            style={modal.option}
            onPress={handleCryptoPayPress}
          >
            <Text style={modal.optionText}>Crypto Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={modal.option}
            onPress={() => alert('Selected PayPal')}
          >
            <TouchableOpacity onPress={handleCardPayPress}>
      <Text style={modal.optionText}>Linked Cards</Text>
    </TouchableOpacity>
            {/* <Text style={modal.optionText}>Linked Cards</Text> */}
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={modal.option}
            onPress={() => alert('Selected Apple Pay')}
          >
            <Text style={modal.optionText}>Apple Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={modal.option}
            onPress={() => alert('Selected Google Pay')}
          >
            <Text style={modal.optionText}>Google Pay</Text>
          </TouchableOpacity> */}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingBottom: 100,
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

const floating = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    width: '30%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

const modal = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    color: '#007AFF',
  },
});
