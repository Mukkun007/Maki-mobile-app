export type Reservation = {
  id: string;
  date: string; // YYYY-MM-DD (jour de la réservation)
  time: string; // HH:mm
  customer: string;
  vehicle: string;
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
  { id: 'R-1001', date: today, customer: 'John Doe',  vehicle: 'Peugeot 208',  time: '10:00' },
  { id: 'R-1002', date: today, customer: 'Jane Smith', vehicle: 'Renault Clio', time: '11:30' },
  // Exemple hors jour courant (ne doit pas s’afficher dans "aujourd’hui")
  { id: 'R-2001', date: '2099-12-31', customer: 'Future User', vehicle: 'Citroën C3', time: '09:15' },
];
