import { Activity } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer = ({ onNavigate }: FooterProps) => (
  <footer className="bg-ml-dark text-ml-white px-6 md:px-8 pt-12 pb-6">
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-5 h-5 text-ml-primary" />
          <span className="font-syne font-bold text-lg">MedLab</span>
        </div>
        <p className="text-sm text-ml-white/50 leading-relaxed">Connecting patients to care, instantly across India.</p>
      </div>
      <div>
        <h4 className="font-syne font-semibold mb-3 text-sm">Quick Links</h4>
        <div className="space-y-2">
          {[
            { label: 'About', id: 'about' },
            { label: 'Find Beds', id: 'beds' },
            { label: 'Emergency', id: 'beds' },
            { label: 'Contact', id: 'about' },
          ].map((l) => (
            <button key={l.label} onClick={() => onNavigate(l.id)} className="block text-sm text-ml-white/50 hover:text-ml-white transition-colors">
              {l.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-syne font-semibold mb-3 text-sm">Data Source</h4>
        <p className="text-sm text-ml-white/50 leading-relaxed">Data sourced from verified Indian hospitals and government databases.</p>
      </div>
    </div>
    <div className="border-t border-ml-white/10 pt-6 text-center">
      <p className="text-xs text-ml-white/40">© 2025 MedLab. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
