import React, { useMemo } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { RESERVATIONS } from '../../mocks/reservations';

const toYMD = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export default function BookingsListScreen() {
  const router = useRouter();
  const today = useMemo(() => toYMD(new Date()), []);
  const todays = useMemo(
    () => RESERVATIONS.filter(r => r.date === today),
    [today]
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f6f7fb' }}>
      {/* Header avec retour */}
      <View style={{ paddingTop: 16, paddingBottom: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={{ paddingVertical: 8, paddingRight: 8 }}>
          <Text style={{ fontSize: 16 }}>← Retour</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Réservations du jour</Text>
      </View>

      <View style={{ flex: 1, padding: 16 }}>

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
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>{item.id}</Text>
                <StatusBadge status={item.status} />
              </View>
              <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 6 }}>{item.customerName}</Text>
              <Text style={{ color: '#374151', marginTop: 2 }}>{item.vehicleModel}</Text>
              <Text style={{ color: '#2563eb', fontWeight: '600', marginTop: 6 }}>
                Remise: {item.pickupTime} • Retour: {item.returnTime}
              </Text>
              <Text style={{ color: '#111827', marginTop: 4 }}>Lieu: {item.location}</Text>

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
    </View>
  );
}

type BadgeProps = { status: 'a_livrer' | 'a_recuperer' | 'termine' };

function StatusBadge({ status }: BadgeProps) {
  const { label, bg, fg } = (() => {
    switch (status) {
      case 'a_livrer':
        return { label: 'À livrer', bg: '#dbeafe', fg: '#1d4ed8' };
      case 'a_recuperer':
        return { label: 'À récupérer', bg: '#fef9c3', fg: '#92400e' };
      case 'termine':
        return { label: 'Terminé', bg: '#dcfce7', fg: '#166534' };
      default:
        return { label: status, bg: '#e5e7eb', fg: '#374151' };
    }
  })();

  return (
    <View style={{ backgroundColor: bg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 }}>
      <Text style={{ color: fg, fontWeight: '600', fontSize: 12 }}>{label}</Text>
    </View>
  );
}
