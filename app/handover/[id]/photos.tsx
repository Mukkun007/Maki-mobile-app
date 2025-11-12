import React, { useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { addPhoto, getFlow, removePhoto } from '../../../store/handoverStore';

export default function HandoverPhotosScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const [refresh, setRefresh] = useState(0);

  const photos = useMemo(() => getFlow(String(id)).photos, [id, refresh]);

  if (!permission) {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />;
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f7fb' }}>
        <View style={{ paddingTop: 16, paddingBottom: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={{ paddingVertical: 8, paddingRight: 8 }}>
            <Text style={{ fontSize: 16 }}>← Retour</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: '700' }}>Remise — Photos</Text>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <Text style={{ textAlign: 'center', marginBottom: 16 }}>La caméra nécessite votre permission.</Text>
          <TouchableOpacity onPress={requestPermission} style={{ backgroundColor: '#111827', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10 }}>
            <Text style={{ color: 'white', fontWeight: '600' }}>Autoriser la caméra</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const onCapture = async () => {
    try {
      const photo = await cameraRef.current?.takePictureAsync?.({ quality: 0.7, skipProcessing: true });
      if (photo?.uri) {
        addPhoto(String(id), photo.uri);
        setRefresh(x => x + 1);
      }
    } catch {}
  };

  const onDelete = (uri: string) => {
    removePhoto(String(id), uri);
    setRefresh(x => x + 1);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f6f7fb' }}>
      <View style={{ paddingTop: 16, paddingBottom: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={{ paddingVertical: 8, paddingRight: 8 }}>
          <Text style={{ fontSize: 16 }}>← Retour</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Remise — Photos</Text>
      </View>

      <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <Text style={{ color: '#374151' }}>Photos prises: {photos.length}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ aspectRatio: 3/4, marginHorizontal: 16, borderRadius: 12, overflow: 'hidden', backgroundColor: '#000' }}>
          <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />
        </View>

        <View style={{ marginTop: 12, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={onCapture} activeOpacity={0.8} style={{ backgroundColor: '#111827', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 999 }}>
            <Text style={{ color: 'white', fontWeight: '700' }}>Capturer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push(`/handover/${id}/checklist`)}
            activeOpacity={0.8}
            disabled={photos.length === 0}
            style={{
              backgroundColor: photos.length === 0 ? '#9ca3af' : '#2563eb',
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>Continuer</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={photos}
          keyExtractor={(u) => u}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
          renderItem={({ item }) => (
            <View style={{ marginRight: 12 }}>
              <Image source={{ uri: item }} style={{ width: 96, height: 96, borderRadius: 8 }} />
              <TouchableOpacity onPress={() => onDelete(item)} style={{ position: 'absolute', top: 4, right: 4, backgroundColor: 'rgba(0,0,0,0.6)', paddingVertical: 4, paddingHorizontal: 6, borderRadius: 6 }}>
                <Text style={{ color: 'white', fontSize: 12 }}>Suppr</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}
