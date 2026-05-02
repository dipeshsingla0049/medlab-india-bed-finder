import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import Navbar from '@/components/medlab/Navbar';
import HomePage from '@/components/medlab/HomePage';
import AboutPage from '@/components/medlab/AboutPage';
import FindBedsPage from '@/components/medlab/FindBedsPage';
import FavoritesPage from '@/components/medlab/FavoritesPage';
import Footer from '@/components/medlab/Footer';
import { Booking, BedAdjustment } from '@/lib/bedStatus';

const Index = () => {
  const [activePage, setActivePage] = useState('home');
  const [savedIds, setSavedIds] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem('medlab-saved') || '[]'); } catch { return []; }
  });
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try { return JSON.parse(localStorage.getItem('medlab-bookings') || '[]'); } catch { return []; }
  });
  const [bedAdjustments, setBedAdjustments] = useState<Record<number, BedAdjustment>>(() => {
    try { return JSON.parse(localStorage.getItem('medlab-bed-adjustments') || '{}'); } catch { return {}; }
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { localStorage.setItem('medlab-saved', JSON.stringify(savedIds)); }, [savedIds]);
  useEffect(() => { localStorage.setItem('medlab-bookings', JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem('medlab-bed-adjustments', JSON.stringify(bedAdjustments)); }, [bedAdjustments]);

  const navigate = useCallback((page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleSave = useCallback((id: number) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleBookingSubmit = useCallback((hospital: { id: number; name: string }, data: { bookingId: string; name: string; phone: string; email: string; bedType: 'General' | 'ICU'; deposit: number; paymentMethod: 'UPI' | 'Card' | 'Net Banking' }) => {
    const booking: Booking = {
      id: data.bookingId,
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      name: data.name, phone: data.phone, email: data.email,
      bedType: data.bedType, createdAt: Date.now(),
      deposit: data.deposit, paymentMethod: data.paymentMethod,
    };
    setBookings(prev => [...prev, booking]);
    setBedAdjustments(prev => {
      const cur = prev[hospital.id] || { general: 0, icu: 0 };
      const key = data.bedType === 'General' ? 'general' : 'icu';
      return { ...prev, [hospital.id]: { ...cur, [key]: cur[key] - 1 } };
    });
    toast.success('Bed secured — see you at the hospital');
  }, []);

  const handleCancelBooking = useCallback((bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    setBedAdjustments(prev => {
      const cur = prev[booking.hospitalId] || { general: 0, icu: 0 };
      const key = booking.bedType === 'General' ? 'general' : 'icu';
      return { ...prev, [booking.hospitalId]: { ...cur, [key]: cur[key] + 1 } };
    });
    toast.success('Booking cancelled, bed restored');
  }, [bookings]);

  return (
    <div className="min-h-screen bg-ml-bg">
      <Navbar activePage={activePage} onNavigate={navigate} />
      
      {activePage === 'home' && <HomePage onNavigate={navigate} onSearch={handleSearch} />}
      {activePage === 'about' && <AboutPage onNavigate={navigate} />}
      {activePage === 'beds' && <FindBedsPage savedIds={savedIds} onToggleSave={toggleSave} initialSearch={searchQuery} bedAdjustments={bedAdjustments} onBookingSubmit={handleBookingSubmit} />}
      {activePage === 'favorites' && <FavoritesPage savedIds={savedIds} onToggleSave={toggleSave} onNavigate={navigate} bedAdjustments={bedAdjustments} bookings={bookings} onCancelBooking={handleCancelBooking} onBookingSubmit={handleBookingSubmit} />}

      <Footer onNavigate={navigate} />
    </div>
  );
};

export default Index;
