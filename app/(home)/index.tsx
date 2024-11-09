import { Link } from 'expo-router';
import { Text, View, TouchableOpacity } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      {/* Card for Crypto Wallet Link */}
      <TouchableOpacity
        style={{
          width: '80%',
          padding: 20,
          marginBottom: 20,
          backgroundColor: '#f2f2f2',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 5,
          alignItems: 'center',
        }}
        onPress={() => {}}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>
          Link a Crypto Wallet
        </Text>
      </TouchableOpacity>

      {/* Card for Credit/Debit Card Link */}
      <TouchableOpacity
        style={{
          width: '80%',
          padding: 20,
          backgroundColor: '#f2f2f2',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 5,
          alignItems: 'center',
        }}
        onPress={() => {}}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>
          Link a Credit/Debit Card
        </Text>
      </TouchableOpacity>
    </View>
  );
}
