import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../../assets/images/Logo_np-removebg-preview.png')}
          style={styles.logo}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: '#000',
            marginLeft: 10,
          }}
        >
          NexusPay
        </Text>
      </View>
      <Image
        source={{ uri: 'https://image.pngaaa.com/200/326200-middle.png' }}
        style={styles.profileIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space out the logo and profile icon
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff', // Optional background color for header
  },
  logo: {
    width: 80, // Adjust width as needed
    height: 80, // Adjust height as needed
    resizeMode: 'contain', // Keeps the logo aspect ratio
    borderRadius: 20, // Makes the logo circular
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20, // Makes the icon circular
  },
});
