import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getFlow, setChecklist, type HandoverChecklist } from '../../../store/handoverStore';

const FUEL_LEVELS: HandoverChecklist['fuelLevel'][] = ['vide', '1/4', '1/2', '3/4', 'plein'];
const ACCESSORY_OPTIONS = ['GPS', 'Siège bébé', 'Triangle', 'Gilet', 'Câbles'];

export default function HandoverChecklistScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const existing = useMemo(() => getFlow(String(id)).checklist, [id]);

  const [fuelLevel, setFuelLevel] = useState<HandoverChecklist['fuelLevel']>(existing.fuelLevel);
  const [cleanliness, setCleanliness] = useState<HandoverChecklist['cleanliness']>(existing.cleanliness ?? 'ok');
  const [accessories, setAccessories] = useState<string[]>(existing.accessories ?? []);
  const [notes, setNotes] = useState(existing.notes ?? '');

  const toggleAccessory = (name: string) => {
    setAccessories((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  };

  const onContinue = () => {
    if (!fuelLevel) {
      Alert.alert('Champ requis', 'Veuillez indiquer le niveau de carburant.');
      return;
    }
    setChecklist(String(id), { fuelLevel, cleanliness, accessories, notes });
    router.push(`/handover/${id}/signature`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f6f7fb' }}>
      {/* Header */}
      <View style={{ paddingTop: 16, paddingBottom: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={{ paddingVertical: 8, paddingRight: 8 }}>
          <Text style={{ fontSize: 16 }}>← Retour</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Remise — Checklist</Text>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={64}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 24 }} keyboardShouldPersistTaps="handled">
        {/* Carburant */}
        <Text style={{ fontWeight: '700', marginBottom: 8 }}>Niveau de carburant</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {FUEL_LEVELS.map((lvl) => {
            const active = fuelLevel === lvl;
            return (
              <TouchableOpacity
                key={lvl}
                onPress={() => setFuelLevel(lvl)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: active ? '#2563eb' : '#e5e7eb',
                  backgroundColor: active ? '#dbeafe' : 'white',
                }}
              >
                <Text style={{ color: active ? '#1d4ed8' : '#111827', fontWeight: '600' }}>{lvl}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Propreté */}
        <Text style={{ fontWeight: '700', marginBottom: 8 }}>Propreté</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
          {['ok', 'a_nettoyer'].map((opt) => {
            const active = cleanliness === opt;
            const label = opt === 'ok' ? 'OK' : 'À nettoyer';
            return (
              <TouchableOpacity
                key={opt}
                onPress={() => setCleanliness(opt as any)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: active ? '#2563eb' : '#e5e7eb',
                  backgroundColor: active ? '#dbeafe' : 'white',
                }}
              >
                <Text style={{ color: active ? '#1d4ed8' : '#111827', fontWeight: '600' }}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Accessoires */}
        <Text style={{ fontWeight: '700', marginBottom: 8 }}>Accessoires</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {ACCESSORY_OPTIONS.map((name) => {
            const active = accessories.includes(name);
            return (
              <TouchableOpacity
                key={name}
                onPress={() => toggleAccessory(name)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: active ? '#2563eb' : '#e5e7eb',
                  backgroundColor: active ? '#dbeafe' : 'white',
                }}
              >
                <Text style={{ color: active ? '#1d4ed8' : '#111827', fontWeight: '600' }}>{name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Notes */}
        <Text style={{ fontWeight: '700', marginBottom: 8 }}>Remarques</Text>
        <TextInput
          placeholder="Observations, dommages, etc."
          value={notes}
          onChangeText={setNotes}
          multiline
          style={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#e5e7eb',
            borderRadius: 10,
            paddingHorizontal: 12,
            paddingVertical: 10,
            minHeight: 90,
            textAlignVertical: 'top',
          }}
        />

        {/* Actions */}
        <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => router.back()} style={{ paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, borderWidth: 1, borderColor: '#e5e7eb', backgroundColor: 'white' }}>
            <Text style={{ color: '#111827', fontWeight: '600' }}>Retour</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onContinue} style={{ paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, backgroundColor: '#2563eb' }}>
            <Text style={{ color: 'white', fontWeight: '600' }}>Continuer</Text>
          </TouchableOpacity>
        </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
