import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { Link } from 'expo-router';

const MOCK_BOOKINGS = [
  { id: 'R-1001', customer: 'John Doe', vehicle: 'Peugeot 208', time: '10:00' },
  { id: 'R-1002', customer: 'Jane Smith', vehicle: 'Renault Clio', time: '11:30' },
];

export default function BookingsListScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 12 }}>Réservations du jour (mock)</Text>
      <FlatList
        data={MOCK_BOOKINGS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 12 }}>
            <Text>{item.id} • {item.customer} • {item.vehicle} • {item.time}</Text>
            <Link href={`/booking/${item.id}`} asChild>
              <Button title="Ouvrir" onPress={() => {}} />
            </Link>
          </View>
        )}
      />
    </View>
  );
}
