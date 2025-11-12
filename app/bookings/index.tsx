import React, { useMemo } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { RESERVATIONS } from '../../mocks/reservations';

const toYMD = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export default function BookingsListScreen() {
  const today = useMemo(() => toYMD(new Date()), []);
  const todays = useMemo(
    () => RESERVATIONS.filter(r => r.date === today),
    [today]
  );

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#f6f7fb' }}>
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Réservations du jour</Text>

      {todays.length === 0 ? (
        <View style={{ paddingVertical: 24 }}>
          <Text style={{ color: '#6b7280' }}>Aucune réservation pour aujourd'hui.</Text>
        </View>
      ) : (
        <FlatList
          data={todays}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 14,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: '#e5e7eb',
                // Ombre iOS
                shadowColor: '#000',
                shadowOpacity: 0.06,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 3 },
                // Élévation Android
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 12, color: '#6b7280' }}>{item.id}</Text>
              <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 4 }}>{item.customer}</Text>
              <Text style={{ color: '#374151', marginTop: 2 }}>{item.vehicle}</Text>
              <Text style={{ color: '#2563eb', fontWeight: '600', marginTop: 6 }}>Heure: {item.time}</Text>

              <View style={{ marginTop: 10, alignItems: 'flex-start' }}>
                <Link href={`/booking/${item.id}`} asChild>
                  <Button title="Ouvrir" onPress={() => {}} />
                </Link>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
