import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link href={{ pathname: '/LinkCards' }}>Link a Crypto Wallet</Link>
      <Link href={{ pathname: '/LinkCards' }}>Link a Credit/Debit Cards</Link>
    </View>
  );
}
