import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignatureScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: '#f6f7fb' }}>
      {/* Header avec retour */}
      <View style={{ paddingTop: 16, paddingBottom: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={{ paddingVertical: 8, paddingRight: 8 }}>
          <Text style={{ fontSize: 16 }}>← Retour</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Signature client</Text>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <Text>Signature (placeholder) — intégration à venir</Text>
      </View>
    </View>
  );
}
