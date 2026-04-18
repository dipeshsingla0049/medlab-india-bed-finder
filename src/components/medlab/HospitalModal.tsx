import { X, Star, MapPin, Phone, Clock, Heart, Navigation, CalendarPlus } from 'lucide-react';
import { Hospital } from '@/data/hospitals';
import { getBedStatus, getAdjustedBeds, BedAdjustment } from '@/lib/bedStatus';

interface HospitalModalProps {
  hospital: Hospital | null;
  isOpen: boolean;
  isSaved: boolean;
  bedAdjustments: Record<number, BedAdjustment>;
  onClose: () => void;
  onToggleSave: (id: number) => void;
  onBook: (hospital: Hospital) => void;
}

const HospitalModal = ({ hospital, isOpen, isSaved, bedAdjustments, onClose, onToggleSave, onBook }: HospitalModalProps) => {
  if (!isOpen || !hospital) return null;

  const adjusted = getAdjustedBeds(hospital, bedAdjustments);
  const generalStatus = getBedStatus(adjusted.generalBeds);
  const icuStatus = getBedStatus(adjusted.icuBeds);
  const total = adjusted.generalBeds + adjusted.icuBeds;

  return (
    <div id="modal-overlay" className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-4 ml-fade-in" onClick={onClose}>
      <div
        id="hospital-modal"
        className="modal-body ml-scale-in bg-ml-white rounded-[20px] w-full max-w-[600px] max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button id="modal-close" onClick={onClose} className="ml-btn absolute top-4 right-4 z-10 w-8 h-8 bg-ml-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-ml-white transition-colors">
          <X className="w-4 h-4 text-ml-text" />
        </button>

        <img id="modal-img" src={hospital.image} alt={hospital.name} className="w-full h-60 object-cover" />

        <div className="p-7">
          <h2 id="modal-name" className="font-syne text-2xl font-bold text-ml-text mb-2">{hospital.name}</h2>

          <div id="modal-rating" className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.round(hospital.rating) ? 'text-ml-yellow fill-ml-yellow' : 'text-ml-border'}`} />
            ))}
            <span className="text-sm font-bold text-ml-text ml-1">{hospital.rating}</span>
            <span className="text-xs text-ml-muted">({hospital.reviews.toLocaleString()} reviews)</span>
          </div>

          <p id="modal-location" className="flex items-center gap-1.5 text-sm text-ml-muted mb-3">
            <MapPin className="w-4 h-4" /> {hospital.location}
          </p>

          <div id="modal-diseases" className="flex flex-wrap gap-1.5 mb-5">
            {hospital.diseases.map((d) => (
              <span key={d} className="bg-ml-primary-light text-ml-primary text-xs font-medium px-3 py-1 rounded-full">{d}</span>
            ))}
          </div>

          <div className="border-t border-ml-border pt-5 mb-5">
            <table id="modal-beds-table" className="w-full text-sm">
              <thead>
                <tr className="text-left text-ml-muted">
                  <th className="pb-3 font-medium">Bed Type</th>
                  <th className="pb-3 font-medium">Available</th>
                  <th className="pb-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-ml-border">
                  <td className="py-3 text-ml-text font-medium">General</td>
                  <td className="py-3 text-ml-text">{adjusted.generalBeds} beds</td>
                  <td className="py-3 text-right"><span className={`${generalStatus.bg} ${generalStatus.color} text-xs font-semibold px-2.5 py-1 rounded-full`}>{generalStatus.label}</span></td>
                </tr>
                <tr className="border-t border-ml-border">
                  <td className="py-3 text-ml-text font-medium">ICU</td>
                  <td className="py-3 text-ml-text">{adjusted.icuBeds} beds</td>
                  <td className="py-3 text-right"><span className={`${icuStatus.bg} ${icuStatus.color} text-xs font-semibold px-2.5 py-1 rounded-full`}>{icuStatus.label}</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p id="modal-contact" className="flex items-center gap-2 text-sm text-ml-text-2 mb-2">
            <Phone className="w-4 h-4 text-ml-muted" /> {hospital.contact}
          </p>
          <p id="modal-hours" className="flex items-center gap-2 text-sm text-ml-muted mb-6">
            <Clock className="w-4 h-4" /> {hospital.hours}
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => onBook(hospital)}
              disabled={total === 0}
              className="ml-btn w-full bg-ml-green text-ml-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CalendarPlus className="w-4 h-4" />
              {total === 0 ? 'No Beds Available' : 'Book a Bed'}
            </button>
            <div className="flex gap-3">
              <button
                id="modal-directions"
                onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(hospital.name + ' ' + hospital.location)}`, '_blank')}
                className="ml-btn flex-1 bg-ml-primary text-ml-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-ml-primary-dark transition-colors"
              >
                <Navigation className="w-4 h-4" /> Get Directions
              </button>
              <button
                id="modal-save"
                onClick={() => onToggleSave(hospital.id)}
                className={`ml-btn flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 border transition-colors
                  ${isSaved
                    ? 'bg-ml-red-bg border-ml-red/20 text-ml-red'
                    : 'bg-ml-white border-ml-border text-ml-text-2 hover:border-ml-emergency/30 hover:text-ml-emergency'
                  }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-ml-red' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalModal;
