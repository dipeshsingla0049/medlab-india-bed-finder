import { Star, MapPin, Phone, Heart } from 'lucide-react';
import { Hospital } from '@/data/hospitals';

interface HospitalCardProps {
  hospital: Hospital;
  isSaved: boolean;
  onToggleSave: (id: number) => void;
  onViewDetails: (hospital: Hospital) => void;
}

const getBedColor = (count: number) => {
  if (count >= 20) return 'text-ml-green';
  if (count >= 5) return 'text-ml-yellow';
  return 'text-ml-red';
};

const getAvailabilityBadge = (general: number, icu: number) => {
  const total = general + icu;
  if (total >= 30) return { text: 'Available', bg: 'bg-ml-green-bg', color: 'text-ml-green' };
  if (total >= 10) return { text: 'Limited', bg: 'bg-ml-yellow-bg', color: 'text-ml-yellow' };
  return { text: 'Critical', bg: 'bg-ml-red-bg', color: 'text-ml-red' };
};

const getPriceBadge = (price: string) => {
  if (price === 'Government') return { bg: 'bg-ml-green-bg', color: 'text-ml-green' };
  if (price === 'Private') return { bg: 'bg-ml-primary-light', color: 'text-ml-primary' };
  return { bg: 'bg-ml-yellow-bg', color: 'text-ml-yellow' };
};

const HospitalCard = ({ hospital, isSaved, onToggleSave, onViewDetails }: HospitalCardProps) => {
  const avail = getAvailabilityBadge(hospital.generalBeds, hospital.icuBeds);
  const priceStyle = getPriceBadge(hospital.price);

  return (
    <div className="hospital-card bg-ml-white border border-ml-border rounded-2xl overflow-hidden">
      {/* Image */}
      <div className="relative h-[200px]">
        <img src={hospital.image} alt={hospital.name} className="card-img w-full h-full object-cover" loading="lazy" />
        <span className={`availability-badge absolute top-3 left-3 ${avail.bg} ${avail.color} text-xs font-semibold px-3 py-1 rounded-full`}>
          {avail.text}
        </span>
        <span className={`price-badge absolute top-3 right-3 ${priceStyle.bg} ${priceStyle.color} text-xs font-semibold px-3 py-1 rounded-full`}>
          {hospital.price}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Rating */}
        <div className="card-rating flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(hospital.rating) ? 'text-ml-yellow fill-ml-yellow' : 'text-ml-border'}`} />
          ))}
          <span className="text-sm font-bold text-ml-text ml-1">{hospital.rating}</span>
          <span className="text-xs text-ml-muted">({hospital.reviews.toLocaleString()})</span>
        </div>

        <h3 className="card-name font-syne text-lg font-bold text-ml-text mb-1">{hospital.name}</h3>
        <p className="card-location flex items-center gap-1 text-sm text-ml-muted mb-3">
          <MapPin className="w-3.5 h-3.5" /> {hospital.location}
        </p>

        {/* Diseases */}
        <div className="card-diseases flex flex-wrap gap-1.5 mb-4">
          {hospital.diseases.slice(0, 3).map((d) => (
            <span key={d} className="disease-tag bg-ml-primary-light text-ml-primary text-xs font-medium px-2.5 py-1 rounded-full">{d}</span>
          ))}
          {hospital.diseases.length > 3 && (
            <span className="text-xs text-ml-muted py-1">+{hospital.diseases.length - 3}</span>
          )}
        </div>

        <div className="border-t border-ml-border pt-3 mb-3">
          <div className="card-beds flex justify-between text-sm">
            <span className="beds-general">General: <strong className={getBedColor(hospital.generalBeds)}>{hospital.generalBeds} beds</strong></span>
            <span className="beds-icu">ICU: <strong className={getBedColor(hospital.icuBeds)}>{hospital.icuBeds} beds</strong></span>
          </div>
        </div>

        <p className="card-contact flex items-center gap-1 text-xs text-ml-muted mb-4">
          <Phone className="w-3 h-3" /> {hospital.contact}
        </p>

        <div className="card-buttons flex gap-2">
          <button
            onClick={() => onViewDetails(hospital)}
            className="btn-details ml-btn flex-1 bg-ml-primary text-ml-white py-2.5 rounded-lg text-sm font-semibold hover:bg-ml-primary-dark transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => onToggleSave(hospital.id)}
            className={`btn-save ml-btn flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-colors flex items-center justify-center gap-1.5
              ${isSaved
                ? 'bg-ml-red-bg border-ml-red/20 text-ml-red'
                : 'bg-ml-white border-ml-border text-ml-text-2 hover:border-ml-primary/30 hover:text-ml-primary'
              }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-ml-red' : ''}`} />
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
