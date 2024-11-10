import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const transactions = [
  {
    id: '1',
    description: 'Groceries',
    amount: 'ETH 0.05',
    date: '2023-11-08',
    status: 'AUD $240.55',
    txnType: 'crypto',
  },
  {
    id: '2',
    description: 'Dining Out',
    amount: 'ETH 0.10',
    date: '2023-11-05',
    status: 'USD $316.57',
    txnType: 'crypto',
  },
  {
    id: '3',
    description: 'Electricity Bill',
    amount: '$120.00',
    date: '2023-11-03',
    status: 'BRL 688.54',
    txnType: 'AMEX',
  },
  // Add more transactions as needed
];

export default function TransactionList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionCard}>
            <View style={styles.transactionInfo}>
              <Text style={styles.description}>{item.description} </Text>
              <Text
                style={{
                  color: '#7a7a7a',
                  fontSize: 14,
                  fontWeight: 400,
                  textTransform: 'capitalize',
                }}
              >
                {item?.txnType}
              </Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <View style={styles.transactionDetails}>
              <Text
                style={[
                  styles.amount,
                  {
                    color: '#f44336',
                  },
                ]}
              >
                {item.amount}
              </Text>
              <Text
                style={[
                  styles.status,
                  {
                    color: '#4caf50',
                  },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#f5f5f5',
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  transactionDetails: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    marginTop: 4,
  },
});
