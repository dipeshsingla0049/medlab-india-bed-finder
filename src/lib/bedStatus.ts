export interface BedStatus {
  label: string;
  color: string;
  bg: string;
}

export const getBedStatus = (total: number): BedStatus => {
  if (total === 0) return { label: 'Full', color: 'text-ml-red', bg: 'bg-ml-red-bg' };
  if (total <= 10) return { label: 'Limited', color: 'text-ml-yellow', bg: 'bg-ml-yellow-bg' };
  return { label: 'Available', color: 'text-ml-green', bg: 'bg-ml-green-bg' };
};

export const getBedCountColor = (count: number): string => {
  if (count === 0) return 'text-ml-red';
  if (count <= 10) return 'text-ml-yellow';
  return 'text-ml-green';
};

export interface BedAdjustment {
  general: number;
  icu: number;
}

export const getAdjustedBeds = (
  hospital: { id: number; generalBeds: number; icuBeds: number },
  adjustments: Record<number, BedAdjustment>
) => {
  const adj = adjustments[hospital.id] || { general: 0, icu: 0 };
  return {
    generalBeds: Math.max(0, hospital.generalBeds + adj.general),
    icuBeds: Math.max(0, hospital.icuBeds + adj.icu),
  };
};

export interface Booking {
  id: string;
  hospitalId: number;
  hospitalName: string;
  name: string;
  phone: string;
  email: string;
  bedType: 'General' | 'ICU';
  createdAt: number;
  deposit?: number;
  paymentMethod?: 'UPI' | 'Card' | 'Net Banking';
}

export const getDeposit = (
  hospital: { minDeposit?: number; price?: string },
  bedType: 'General' | 'ICU'
): number => {
  const base = hospital.minDeposit ?? 2500;
  const surcharge = bedType === 'ICU' ? 1500 : 0;
  return base + surcharge;
};

export const generateBookingId = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};
