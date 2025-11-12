export type ReservationStatus = 'a_livrer' | 'a_recuperer' | 'termine';

export type Reservation = {
  id: string;
  date: string; // YYYY-MM-DD (jour de la réservation)
  customerName: string;
  vehicleModel: string;
  pickupTime: string; // HH:mm
  returnTime: string; // HH:mm
  location: string; // lieu de rendez-vous
  status: ReservationStatus; // à livrer / à récupérer / terminé
};

// Utilitaire pour obtenir YYYY-MM-DD local
const toYMD = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const today = toYMD(new Date());

export const RESERVATIONS: Reservation[] = [
  {
    id: 'R-1001',
    date: today,
    customerName: 'John Doe',
    vehicleModel: 'Peugeot 208',
    pickupTime: '10:00',
    returnTime: '16:00',
    location: 'Aéroport CDG - Terminal 2F',
    status: 'a_livrer',
  },
  {
    id: 'R-1002',
    date: today,
    customerName: 'Jane Smith',
    vehicleModel: 'Renault Clio',
    pickupTime: '11:30',
    returnTime: '18:30',
    location: 'Gare de Lyon - Hall 1',
    status: 'a_recuperer',
  },
  // Exemple hors jour courant (ne doit pas s’afficher dans "aujourd’hui")
  {
    id: 'R-2001',
    date: '2099-12-31',
    customerName: 'Future User',
    vehicleModel: 'Citroën C3',
    pickupTime: '09:15',
    returnTime: '12:00',
    location: 'Agence Centrale',
    status: 'termine',
  },
];
