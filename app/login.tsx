import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AGENTS } from '../mocks/agents';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = () => {
    if (!username || !password) {
      Alert.alert('Information manquante', 'Veuillez saisir votre identifiant et mot de passe.');
      return;
    }
    setLoading(true);
    // Auth mock basique
    const match = AGENTS.find(a => a.username === username && a.password === password);
    setTimeout(() => {
      setLoading(false);
      if (match) {
        router.replace('/bookings');
      } else {
        Alert.alert('Échec de connexion', 'Identifiants invalides (essayez agent1 / 1234).');
      }
    }, 400);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f6f7fb' }}>
      <View style={{ paddingTop: 48, paddingBottom: 24, paddingHorizontal: 20, backgroundColor: '#2563eb' }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '700' }}>Connexion agent</Text>
        <Text style={{ color: 'white', opacity: 0.9, marginTop: 6 }}>Accédez aux réservations du jour</Text>
      </View>

      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 6 }}>Identifiants</Text>

          <TextInput
            placeholder="Nom d’utilisateur"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#e5e7eb',
              borderRadius: 10,
              paddingHorizontal: 14,
              paddingVertical: 12,
            }}
          />
          <TextInput
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#e5e7eb',
              borderRadius: 10,
              paddingHorizontal: 14,
              paddingVertical: 12,
            }}
          />

          <TouchableOpacity
            onPress={onLogin}
            disabled={loading}
            activeOpacity={0.85}
            style={{
              backgroundColor: loading ? '#6b7280' : '#111827',
              paddingVertical: 14,
              borderRadius: 10,
              alignItems: 'center',
              marginTop: 8,
            }}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>
              {loading ? 'Connexion…' : 'Se connecter'}
            </Text>
          </TouchableOpacity>

          <Text style={{ color: '#6b7280', textAlign: 'center', marginTop: 8 }}>
            Astuce: agent1 / 1234 ou agent2 / 1234
          </Text>
        </View>
      </View>
    </View>
  );
}
