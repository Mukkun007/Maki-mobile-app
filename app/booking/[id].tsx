import React from 'react';
import { View, Text, Button } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';

export default function BookingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Détail réservation {id}</Text>
      <Button title="Prendre des photos (TODO)" onPress={() => {}} />
      <Link href="/signature" asChild>
        <Button title="Signature client" onPress={() => {}} />
      </Link>
    </View>
  );
}
