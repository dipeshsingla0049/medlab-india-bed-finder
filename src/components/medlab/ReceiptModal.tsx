import { X, Download, BadgeCheck, Heart } from 'lucide-react';
import { Hospital } from '@/data/hospitals';

interface ReceiptData {
  bookingId: string;
  name: string;
  phone: string;
  bedType: 'General' | 'ICU';
  deposit: number;
  paymentMethod: 'UPI' | 'Card' | 'Net Banking';
  createdAt: number;
}

interface ReceiptModalProps {
  hospital: Hospital;
  data: ReceiptData;
  isOpen: boolean;
  onClose: () => void;
}

const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="receipt-row flex items-baseline justify-between gap-3 py-2">
    <span className="receipt-label text-sm text-ml-muted shrink-0">{label}</span>
    <span className="receipt-dots flex-1 border-b border-dotted border-ml-border/80 mx-2 translate-y-[-3px]" />
    <span className="receipt-value text-sm font-semibold text-ml-text text-right">{value}</span>
  </div>
);

const ReceiptModal = ({ hospital, data, isOpen, onClose }: ReceiptModalProps) => {
  if (!isOpen) return null;

  const ts = new Date(data.createdAt);
  const dateStr = ts.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = ts.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  const handleDownload = () => {
    const prevTitle = document.title;
    document.title = `MedLab_Receipt_${data.bookingId}`;
    window.print();
    setTimeout(() => { document.title = prevTitle; }, 500);
  };

  return (
    <div
      className="receipt-overlay modal-overlay fixed inset-0 z-[120] bg-black/60 flex items-center justify-center p-4 ml-fade-in"
      onClick={onClose}
    >
      <div
        className="receipt-modal ml-scale-in bg-ml-white rounded-[20px] w-full max-w-[480px] max-h-[92vh] overflow-y-auto relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="receipt-close ml-btn absolute top-4 right-4 z-10 w-8 h-8 bg-ml-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-ml-white transition-colors"
          aria-label="Close receipt"
        >
          <X className="w-4 h-4 text-ml-text" />
        </button>

        {/* Receipt — this is the only thing visible when printing */}
        <div className="receipt-content p-7">
          {/* Branding */}
          <div className="receipt-brand text-center pb-5 border-b border-ml-border">
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="w-7 h-7 rounded-lg bg-ml-primary text-ml-white flex items-center justify-center">
                <Heart className="w-4 h-4" fill="currentColor" />
              </span>
              <span className="font-syne text-2xl font-bold text-ml-text tracking-tight">MedLab</span>
            </div>
            <p className="text-xs text-ml-muted italic">Connecting patients to care, instantly.</p>
          </div>

          {/* Receipt header */}
          <div className="flex items-center justify-between mt-5 mb-4">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-ml-muted">Receipt No.</p>
              <p className="font-syne text-base font-bold text-ml-text tracking-wider">REC-{data.bookingId}</p>
            </div>
            <span className="receipt-badge inline-flex items-center gap-1.5 bg-ml-green-bg text-ml-green text-xs font-semibold px-3 py-1.5 rounded-full">
              <BadgeCheck className="w-3.5 h-3.5" />
              Payment Confirmed
            </span>
          </div>

          {/* Date / Patient block */}
          <div className="receipt-section">
            <Row label="Date" value={dateStr} />
            <Row label="Time" value={timeStr} />
            <Row label="Patient Name" value={data.name} />
            <Row label="Contact" value={data.phone} />
          </div>

          <div className="receipt-divider my-3 border-t border-ml-border" />

          {/* Hospital block */}
          <div className="receipt-section">
            <Row label="Hospital" value={hospital.name} />
            <Row label="City" value={hospital.city} />
            <Row label="Bed Type" value={data.bedType} />
          </div>

          <div className="receipt-divider my-3 border-t border-ml-border" />

          {/* Payment block */}
          <div className="receipt-section">
            <Row label="Payment Method" value={data.paymentMethod} />
            <Row
              label="Amount Paid"
              value={<span className="text-ml-primary text-base">{formatINR(data.deposit)}</span>}
            />
          </div>

          {/* Footer note */}
          <p className="receipt-note text-[11px] text-ml-muted text-center leading-relaxed mt-5 pt-4 border-t border-ml-border">
            This receipt is for your advance deposit only. Final billing will be settled at the hospital.
          </p>
        </div>

        {/* Action bar — hidden when printing */}
        <div className="receipt-actions px-7 pb-7">
          <button
            type="button"
            onClick={handleDownload}
            className="ml-btn w-full bg-ml-primary text-ml-white py-3 rounded-xl font-semibold hover:bg-ml-primary-dark transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
