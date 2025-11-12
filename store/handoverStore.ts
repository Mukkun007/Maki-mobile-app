export type HandoverChecklist = {
  fuelLevel?: 'vide' | '1/4' | '1/2' | '3/4' | 'plein';
  cleanliness?: 'ok' | 'a_nettoyer';
  accessories?: string[]; // ex: ['GPS', 'Siege bebe']
  notes?: string;
};

export type HandoverFlow = {
  reservationId: string;
  photos: string[]; // URIs
  checklist: HandoverChecklist;
  signatureBase64?: string;
};

const flows: Record<string, HandoverFlow> = {};

export function getFlow(reservationId: string): HandoverFlow {
  if (!flows[reservationId]) {
    flows[reservationId] = {
      reservationId,
      photos: [],
      checklist: {},
      signatureBase64: undefined,
    };
  }
  return flows[reservationId];
}

export function setPhotos(reservationId: string, photos: string[]) {
  getFlow(reservationId).photos = photos;
}

export function addPhoto(reservationId: string, uri: string) {
  const f = getFlow(reservationId);
  f.photos = [...f.photos, uri];
}

export function removePhoto(reservationId: string, uri: string) {
  const f = getFlow(reservationId);
  f.photos = f.photos.filter(p => p !== uri);
}

export function setChecklist(reservationId: string, checklist: HandoverChecklist) {
  getFlow(reservationId).checklist = checklist;
}

export function setSignature(reservationId: string, base64: string) {
  getFlow(reservationId).signatureBase64 = base64;
}
