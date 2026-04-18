import { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { Hospital } from '@/data/hospitals';
import { getAdjustedBeds, BedAdjustment } from '@/lib/bedStatus';

interface BookingModalProps {
  hospital: Hospital | null;
  isOpen: boolean;
  bedAdjustments: Record<number, BedAdjustment>;
  onClose: () => void;
  onSubmit: (data: { name: string; phone: string; email: string; bedType: 'General' | 'ICU' }) => string;
}

const schema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  phone: z.string().trim().regex(/^\d{10,15}$/, 'Phone must be 10-15 digits'),
  email: z.string().trim().email('Invalid email').max(255, 'Email too long'),
  bedType: z.enum(['General', 'ICU']),
});

const BookingModal = ({ hospital, isOpen, bedAdjustments, onClose, onSubmit }: BookingModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [bedType, setBedType] = useState<'General' | 'ICU'>('General');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<{ name: string; bedType: string; bookingId: string } | null>(null);

  const adjusted = hospital ? getAdjustedBeds(hospital, bedAdjustments) : { generalBeds: 0, icuBeds: 0 };
  const generalDisabled = adjusted.generalBeds === 0;
  const icuDisabled = adjusted.icuBeds === 0;

  useEffect(() => {
    if (isOpen) {
      setName(''); setPhone(''); setEmail(''); setBedType('General'); setErrors({}); setSuccess(null);
    }
  }, [isOpen, hospital?.id]);

  useEffect(() => {
    if (!isOpen) return;
    if (generalDisabled && !icuDisabled) setBedType('ICU');
    else if (icuDisabled && !generalDisabled) setBedType('General');
  }, [isOpen, generalDisabled, icuDisabled]);

  if (!isOpen || !hospital) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ name, phone, email, bedType });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => { if (err.path[0]) fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    const data = result.data as { name: string; phone: string; email: string; bedType: 'General' | 'ICU' };
    const isDisabled = data.bedType === 'General' ? generalDisabled : icuDisabled;
    if (isDisabled) {
      setErrors({ bedType: 'Selected bed type unavailable' });
      return;
    }
    const bookingId = onSubmit(data);
    setSuccess({ name: data.name, bedType: data.bedType, bookingId });
  };

  return (
    <div className="modal-overlay fixed inset-0 z-[110] bg-black/60 flex items-center justify-center p-4 ml-fade-in" onClick={onClose}>
      <div
        className="ml-scale-in bg-ml-white rounded-[20px] w-full max-w-[520px] max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="ml-btn absolute top-4 right-4 z-10 w-8 h-8 bg-ml-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-ml-white transition-colors">
          <X className="w-4 h-4 text-ml-text" />
        </button>

        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ml-green-bg flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-ml-green" />
            </div>
            <h2 className="font-syne text-2xl font-bold text-ml-text mb-2">Booking Confirmed!</h2>
            <p className="text-sm text-ml-muted mb-5">Your request has been submitted successfully.</p>

            <div className="bg-ml-bg rounded-xl p-5 text-left space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-ml-muted">Hospital</span>
                <span className="text-ml-text font-semibold text-right">{hospital.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ml-muted">Patient Name</span>
                <span className="text-ml-text font-semibold">{success.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ml-muted">Bed Type</span>
                <span className="bg-ml-primary-light text-ml-primary text-xs font-semibold px-3 py-1 rounded-full">{success.bedType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ml-muted">Booking ID</span>
                <span className="text-ml-text font-mono text-xs">{success.bookingId.slice(0, 12)}</span>
              </div>
            </div>

            <button onClick={onClose} className="ml-btn w-full bg-ml-primary text-ml-white py-3 rounded-xl font-semibold hover:bg-ml-primary-dark transition-colors">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-7">
            <h2 className="font-syne text-2xl font-bold text-ml-text mb-1">Book a Bed</h2>
            <p className="text-sm text-ml-muted mb-5">{hospital.name}</p>

            <div className="bg-ml-yellow-bg border border-ml-yellow/30 rounded-xl p-3 mb-5 flex gap-2 items-start">
              <AlertCircle className="w-4 h-4 text-ml-yellow flex-shrink-0 mt-0.5" />
              <p className="text-xs text-ml-text-2 leading-relaxed">
                Your booking request has been submitted. Final confirmation and remaining details will be approved by the hospital directly for a smoother experience.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ml-text mb-1.5">Full Name *</label>
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={100}
                  className="w-full px-3 py-2.5 bg-ml-white border border-ml-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ml-primary/20 focus:border-ml-primary"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-xs text-ml-red mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-ml-text mb-1.5">Phone Number *</label>
                <input
                  type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} maxLength={15}
                  className="w-full px-3 py-2.5 bg-ml-white border border-ml-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ml-primary/20 focus:border-ml-primary"
                  placeholder="9876543210"
                />
                {errors.phone && <p className="text-xs text-ml-red mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-ml-text mb-1.5">Email Address *</label>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255}
                  className="w-full px-3 py-2.5 bg-ml-white border border-ml-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ml-primary/20 focus:border-ml-primary"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-xs text-ml-red mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-ml-text mb-2">Bed Type *</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${bedType === 'General' ? 'border-ml-primary bg-ml-primary-light' : 'border-ml-border'} ${generalDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <input type="radio" name="bedType" value="General" checked={bedType === 'General'} onChange={() => setBedType('General')} disabled={generalDisabled} className="accent-ml-primary" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-ml-text">General</div>
                      <div className="text-xs text-ml-muted">{adjusted.generalBeds} available</div>
                    </div>
                  </label>
                  <label className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${bedType === 'ICU' ? 'border-ml-primary bg-ml-primary-light' : 'border-ml-border'} ${icuDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <input type="radio" name="bedType" value="ICU" checked={bedType === 'ICU'} onChange={() => setBedType('ICU')} disabled={icuDisabled} className="accent-ml-primary" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-ml-text">ICU</div>
                      <div className="text-xs text-ml-muted">{adjusted.icuBeds} available</div>
                    </div>
                  </label>
                </div>
                {errors.bedType && <p className="text-xs text-ml-red mt-1">{errors.bedType}</p>}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button type="button" onClick={onClose} className="ml-btn flex-1 bg-ml-white border border-ml-border text-ml-text-2 py-3 rounded-xl font-semibold hover:border-ml-primary/30 transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={generalDisabled && icuDisabled} className="ml-btn flex-1 bg-ml-primary text-ml-white py-3 rounded-xl font-semibold hover:bg-ml-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Submit Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
