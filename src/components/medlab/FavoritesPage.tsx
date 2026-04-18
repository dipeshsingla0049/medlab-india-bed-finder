import { Heart, BedDouble, X, CalendarCheck } from 'lucide-react';
import { hospitals, Hospital } from '@/data/hospitals';
import HospitalCard from './HospitalCard';
import HospitalModal from './HospitalModal';
import BookingModal from './BookingModal';
import { useState } from 'react';
import { Booking, BedAdjustment } from '@/lib/bedStatus';

interface FavoritesPageProps {
  savedIds: number[];
  onToggleSave: (id: number) => void;
  onNavigate: (page: string) => void;
  bedAdjustments: Record<number, BedAdjustment>;
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  onBookingSubmit: (hospital: { id: number; name: string }, data: { name: string; phone: string; email: string; bedType: 'General' | 'ICU' }) => string;
}

const FavoritesPage = ({ savedIds, onToggleSave, onNavigate, bedAdjustments, bookings, onCancelBooking, onBookingSubmit }: FavoritesPageProps) => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [bookingHospital, setBookingHospital] = useState<Hospital | null>(null);
  const saved = hospitals.filter(h => savedIds.includes(h.id));

  return (
    <div className="bg-ml-bg min-h-[calc(100vh-64px)] px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {bookings.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <CalendarCheck className="w-5 h-5 text-ml-primary" />
              <h2 className="font-syne text-xl font-bold text-ml-text">My Bookings</h2>
              <span className="text-sm text-ml-muted">({bookings.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((b) => (
                <div key={b.id} className="bg-ml-white border border-ml-border rounded-xl p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-syne font-bold text-ml-text truncate">{b.hospitalName}</h4>
                    <p className="text-xs text-ml-muted mt-0.5">{b.name} • {new Date(b.createdAt).toLocaleDateString()}</p>
                    <span className="inline-block mt-2 bg-ml-primary-light text-ml-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">{b.bedType}</span>
                  </div>
                  <button
                    onClick={() => onCancelBooking(b.id)}
                    className="ml-btn flex items-center gap-1 px-3 py-2 rounded-lg border border-ml-red/20 text-ml-red bg-ml-red-bg text-xs font-semibold hover:opacity-90"
                  >
                    <X className="w-3.5 h-3.5" /> Unbook
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-syne text-2xl font-bold text-ml-text">Your Saved Hospitals</h2>
            <p id="fav-count" className="text-sm text-ml-muted mt-1">{saved.length} saved</p>
          </div>
        </div>

        {saved.length === 0 ? (
          <div id="favorites-empty" className="text-center py-20">
            <Heart className="w-16 h-16 text-ml-border mx-auto mb-4" />
            <h3 className="font-syne text-xl font-bold text-ml-text mb-2">No saved hospitals yet</h3>
            <p className="text-ml-muted mb-6">Click the heart icon on any hospital card to save it here</p>
            <button id="btn-browse" onClick={() => onNavigate('beds')} className="ml-btn inline-flex items-center gap-2 bg-ml-primary text-ml-white px-6 py-3 rounded-lg font-semibold hover:bg-ml-primary-dark transition-colors">
              <BedDouble className="w-4 h-4" /> Browse Hospitals
            </button>
          </div>
        ) : (
          <div id="favorites-grid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {saved.map((h) => (
              <HospitalCard
                key={h.id}
                hospital={h}
                isSaved={true}
                bedAdjustments={bedAdjustments}
                onToggleSave={onToggleSave}
                onViewDetails={setSelectedHospital}
                onBook={setBookingHospital}
              />
            ))}
          </div>
        )}
      </div>

      <HospitalModal
        hospital={selectedHospital}
        isOpen={!!selectedHospital}
        isSaved={selectedHospital ? savedIds.includes(selectedHospital.id) : false}
        bedAdjustments={bedAdjustments}
        onClose={() => setSelectedHospital(null)}
        onToggleSave={onToggleSave}
        onBook={(h) => { setSelectedHospital(null); setBookingHospital(h); }}
      />

      <BookingModal
        hospital={bookingHospital}
        isOpen={!!bookingHospital}
        bedAdjustments={bedAdjustments}
        onClose={() => setBookingHospital(null)}
        onSubmit={(data) => onBookingSubmit(bookingHospital!, data)}
      />
    </div>
  );
};

export default FavoritesPage;
