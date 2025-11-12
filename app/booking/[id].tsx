import React, { useMemo } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Link, useRouter } from 'expo-router';
import { RESERVATIONS } from '../../mocks/reservations';

export default function BookingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const reservation = useMemo(() => RESERVATIONS.find(r => r.id === id), [id]);

  return (
    <View style={{ flex: 1, backgroundColor: '#f6f7fb' }}>
      {/* Header avec retour */}
      <View style={{ paddingTop: 16, paddingBottom: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={{ paddingVertical: 8, paddingRight: 8 }}>
          <Text style={{ fontSize: 16 }}>← Retour</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Détail réservation</Text>
      </View>

      <View style={{ flex: 1, padding: 16 }}>
        {!reservation ? (
          <Text style={{ color: '#6b7280' }}>Réservation introuvable (id: {id})</Text>
        ) : (
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: '#e5e7eb',
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 3 },
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 12, color: '#6b7280' }}>{reservation.id}</Text>
            <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 6 }}>{reservation.customerName}</Text>
            <Text style={{ color: '#374151', marginTop: 2 }}>{reservation.vehicleModel}</Text>
            <Text style={{ color: '#2563eb', fontWeight: '600', marginTop: 8 }}>
              Remise: {reservation.pickupTime} • Retour: {reservation.returnTime}
            </Text>
            <Text style={{ color: '#111827', marginTop: 4 }}>Lieu: {reservation.location}</Text>

            <View style={{ marginTop: 16, gap: 10 }}>
              <Button title="Prendre des photos (TODO)" onPress={() => {}} />
              <Link href="/signature" asChild>
                <Button title="Signature client" onPress={() => {}} />
              </Link>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
