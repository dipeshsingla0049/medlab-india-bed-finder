import { Heart, BedDouble } from 'lucide-react';
import { hospitals, Hospital } from '@/data/hospitals';
import HospitalCard from './HospitalCard';
import HospitalModal from './HospitalModal';
import { useState } from 'react';

interface FavoritesPageProps {
  savedIds: number[];
  onToggleSave: (id: number) => void;
  onNavigate: (page: string) => void;
}

const FavoritesPage = ({ savedIds, onToggleSave, onNavigate }: FavoritesPageProps) => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const saved = hospitals.filter(h => savedIds.includes(h.id));

  return (
    <div className="bg-ml-bg min-h-[calc(100vh-64px)] px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
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
                onToggleSave={onToggleSave}
                onViewDetails={setSelectedHospital}
              />
            ))}
          </div>
        )}
      </div>

      <HospitalModal
        hospital={selectedHospital}
        isOpen={!!selectedHospital}
        isSaved={selectedHospital ? savedIds.includes(selectedHospital.id) : false}
        onClose={() => setSelectedHospital(null)}
        onToggleSave={onToggleSave}
      />
    </div>
  );
};

export default FavoritesPage;
