import { Search } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { hospitals, Hospital } from '@/data/hospitals';
import HospitalCard from './HospitalCard';
import HospitalModal from './HospitalModal';
import BookingModal from './BookingModal';
import { BedAdjustment, getAdjustedBeds } from '@/lib/bedStatus';

interface FindBedsPageProps {
  savedIds: number[];
  onToggleSave: (id: number) => void;
  initialSearch?: string;
  bedAdjustments: Record<number, BedAdjustment>;
  onBookingSubmit: (hospital: { id: number; name: string }, data: { bookingId: string; name: string; phone: string; email: string; bedType: 'General' | 'ICU'; deposit: number; paymentMethod: 'UPI' | 'Card' | 'Net Banking' }) => void;
}

const FindBedsPage = ({ savedIds, onToggleSave, initialSearch = '', bedAdjustments, onBookingSubmit }: FindBedsPageProps) => {
  const [search, setSearch] = useState(initialSearch);
  const [city, setCity] = useState('All Cities');
  const [bedType, setBedType] = useState('All Beds');
  const [sort, setSort] = useState('Default');
  const [price, setPrice] = useState('All');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [bookingHospital, setBookingHospital] = useState<Hospital | null>(null);

  useEffect(() => { setSearch(initialSearch); }, [initialSearch]);

  const filtered = useMemo(() => {
    let result = [...hospitals];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(h =>
        h.name.toLowerCase().includes(q) ||
        h.diseases.some(d => d.toLowerCase().includes(q)) ||
        h.city.toLowerCase().includes(q)
      );
    }
    if (city !== 'All Cities') result = result.filter(h => h.city === city);
    if (bedType === 'ICU Only') result = result.filter(h => getAdjustedBeds(h, bedAdjustments).icuBeds > 0);
    if (bedType === 'General Only') result = result.filter(h => getAdjustedBeds(h, bedAdjustments).generalBeds > 0);
    if (price !== 'All') result = result.filter(h => h.price === price);

    switch (sort) {
      case 'Name A-Z': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'Most Beds': result.sort((a, b) => {
        const ba = getAdjustedBeds(b, bedAdjustments); const aa = getAdjustedBeds(a, bedAdjustments);
        return (ba.generalBeds + ba.icuBeds) - (aa.generalBeds + aa.icuBeds);
      }); break;
      case 'Rating High to Low': result.sort((a, b) => b.rating - a.rating); break;
    }

    return result;
  }, [search, city, bedType, sort, price, bedAdjustments]);

  const selectClass = "bg-ml-white border border-ml-border rounded-lg px-3 py-2.5 text-sm text-ml-text focus:outline-none focus:ring-2 focus:ring-ml-primary/20 focus:border-ml-primary font-dm";

  return (
    <div>
      <div className="sticky top-16 z-40 bg-ml-white/90 backdrop-blur-xl border-b border-ml-border px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ml-muted" />
            <input
              id="search-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hospitals or diseases..."
              className="w-full pl-10 pr-4 py-2.5 bg-ml-white border border-ml-border rounded-lg text-sm text-ml-text placeholder:text-ml-muted focus:outline-none focus:ring-2 focus:ring-ml-primary/20 focus:border-ml-primary font-dm"
            />
          </div>
          <select id="city-filter" value={city} onChange={(e) => setCity(e.target.value)} className={selectClass}>
            {['All Cities', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Jaipur'].map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select id="bed-filter" value={bedType} onChange={(e) => setBedType(e.target.value)} className={selectClass}>
            {['All Beds', 'ICU Only', 'General Only'].map(b => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <select id="sort-select" value={sort} onChange={(e) => setSort(e.target.value)} className={selectClass}>
            {['Default', 'Name A-Z', 'Most Beds', 'Rating High to Low'].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select id="price-filter" value={price} onChange={(e) => setPrice(e.target.value)} className={selectClass}>
            {['All', 'Government', 'Private', 'Premium'].map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <span id="results-count" className="text-sm text-ml-muted font-dm whitespace-nowrap">
            Showing {filtered.length} hospitals
          </span>
        </div>
      </div>

      <div className="bg-ml-bg px-4 md:px-8 py-8">
        <div id="hospital-grid" className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((h) => (
            <HospitalCard
              key={h.id}
              hospital={h}
              isSaved={savedIds.includes(h.id)}
              bedAdjustments={bedAdjustments}
              onToggleSave={onToggleSave}
              onViewDetails={setSelectedHospital}
              onBook={setBookingHospital}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-ml-muted text-lg">No hospitals found matching your criteria</p>
            <button onClick={() => { setSearch(''); setCity('All Cities'); setBedType('All Beds'); setPrice('All'); }} className="ml-btn mt-4 text-ml-primary font-semibold text-sm hover:underline">
              Clear Filters
            </button>
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

export default FindBedsPage;
