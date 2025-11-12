import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function HandoverChecklistScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: '#f6f7fb' }}>
      <View style={{ paddingTop: 16, paddingBottom: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={{ paddingVertical: 8, paddingRight: 8 }}>
          <Text style={{ fontSize: 16 }}>← Retour</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Remise — Checklist</Text>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Écran checklist (à implémenter à l’étape suivante)</Text>
        <TouchableOpacity onPress={() => router.push(`/handover/${id}/signature`)} style={{ marginTop: 16 }}>
          <Text style={{ color: '#2563eb', fontWeight: '600' }}>Continuer vers Signature →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
