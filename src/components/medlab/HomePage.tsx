import { Search, Activity, Siren, BedDouble, Filter, MapPin, Clock } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSearch: (query: string) => void;
}

const HomePage = ({ onNavigate, onSearch }: HomePageProps) => {
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('ml-visible'); }),
      { threshold: 0.15 }
    );
    sectionsRef.current?.querySelectorAll('.ml-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSearch = () => {
    const input = document.getElementById('hero-search') as HTMLInputElement;
    if (input?.value.trim()) {
      onSearch(input.value.trim());
      onNavigate('beds');
    }
  };

  const features = [
    { icon: Activity, title: "Real-Time Availability", desc: "Live bed counts updated instantly across all listed hospitals" },
    { icon: Siren, title: "Emergency ICU Access", desc: "Find critical care beds in one click during emergencies" },
    { icon: Filter, title: "Smart Search & Filter", desc: "Filter by city, disease, price category and bed type" },
    { icon: MapPin, title: "Pan-India Coverage", desc: "Hospitals across 20+ major cities in India" },
  ];

  const steps = [
    { num: "01", icon: Search, title: "Search", desc: "Enter city, hospital name or disease in the search bar" },
    { num: "02", icon: Filter, title: "Filter", desc: "Filter by bed type, price range, and availability status" },
    { num: "03", icon: MapPin, title: "Contact", desc: "Call the hospital directly or get directions instantly" },
  ];

  return (
    <div ref={sectionsRef}>
      {/* Hero */}
      <section className="bg-gradient-to-b from-ml-primary-light to-ml-bg py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="ml-fade-up inline-flex items-center gap-2 bg-ml-white border border-ml-border rounded-full px-4 py-1.5 text-sm font-medium text-ml-primary mb-6">
            <span className="w-2 h-2 rounded-full bg-ml-green animate-pulse" />
            Live Bed Tracking
          </span>
          <h1 className="ml-fade-up ml-fade-up-d1 font-syne text-4xl md:text-[56px] font-bold leading-[1.1] text-ml-text mb-5">
            Find Available <span className="text-ml-primary">Hospital Beds</span> Instantly
          </h1>
          <p className="ml-fade-up ml-fade-up-d2 text-lg text-ml-muted mb-8 max-w-xl mx-auto">
            Search real-time bed availability across top Indian hospitals. Fast. Free. Reliable.
          </p>

          {/* Search bar */}
          <div className="ml-fade-up ml-fade-up-d3 max-w-[600px] mx-auto bg-ml-white rounded-full border border-ml-border shadow-lg flex items-center p-1.5 mb-6">
            <Search className="w-5 h-5 text-ml-muted ml-4 shrink-0" />
            <input
              id="hero-search"
              type="text"
              placeholder="Search by hospital name or disease..."
              className="flex-1 px-3 py-2.5 bg-transparent text-sm text-ml-text placeholder:text-ml-muted focus:outline-none font-dm"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} className="ml-btn bg-ml-primary text-ml-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-ml-primary-dark transition-colors">
              Find Beds
            </button>
          </div>

          {/* Action buttons */}
          <div className="ml-fade-up ml-fade-up-d4 flex items-center justify-center gap-3 mb-10">
            <button id="btn-find-beds" onClick={() => onNavigate('beds')} className="ml-btn flex items-center gap-2 bg-ml-primary text-ml-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-ml-primary-dark transition-colors">
              <BedDouble className="w-4 h-4" /> Find Beds
            </button>
            <button id="btn-emergency-hero" onClick={() => {
              onNavigate('beds');
              setTimeout(() => {
                const bedFilter = document.getElementById('bed-filter') as HTMLSelectElement;
                if (bedFilter) {
                  const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value')?.set;
                  setter?.call(bedFilter, 'ICU Only');
                  bedFilter.dispatchEvent(new Event('change', { bubbles: true }));
                }
              }, 150);
            }} className="ml-btn flex items-center gap-2 bg-ml-emergency text-ml-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
              <Siren className="w-4 h-4" /> Find ICU Bed Now
            </button>
          </div>

          {/* Stats */}
          <div className="ml-fade-up ml-fade-up-d5 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {[
              { num: "500+", label: "Hospitals" },
              { num: "20+", label: "Cities" },
              { num: "24/7", label: "Available" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 bg-ml-white border border-ml-border rounded-full px-5 py-2.5 shadow-sm">
                <span className="font-syne font-bold text-ml-primary">{s.num}</span>
                <span className="text-sm text-ml-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-ml-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="ml-reveal font-syne text-3xl md:text-4xl font-bold text-center text-ml-text mb-4">Why Choose MedLab?</h2>
          <p className="ml-reveal text-center text-ml-muted mb-12 max-w-lg mx-auto">Real-time hospital bed tracking that saves lives</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={f.title} className={`ml-reveal feature-card bg-ml-white border border-ml-border rounded-2xl p-8 text-center`} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-14 h-14 rounded-2xl bg-ml-primary-light flex items-center justify-center mx-auto mb-5">
                  <f.icon className="w-6 h-6 text-ml-primary" />
                </div>
                <h3 className="font-syne font-bold text-ml-text mb-2">{f.title}</h3>
                <p className="text-sm text-ml-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-ml-bg py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="ml-reveal font-syne text-3xl md:text-4xl font-bold text-center text-ml-text mb-3">How MedLab Works</h2>
          <p className="ml-reveal text-center text-ml-muted mb-14">Find a hospital bed in 3 simple steps</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Dashed connector */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] border-t-2 border-dashed border-ml-border" />
            {steps.map((s, i) => (
              <div key={s.num} className="ml-reveal relative bg-ml-white rounded-2xl p-8 text-center border border-ml-border shadow-sm" style={{ transitionDelay: `${i * 100}ms` }}>
                <span className="font-syne text-5xl font-extrabold text-ml-primary/15 mb-2 block">{s.num}</span>
                <div className="w-12 h-12 rounded-xl bg-ml-primary-light flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-5 h-5 text-ml-primary" />
                </div>
                <h3 className="font-syne font-bold text-lg text-ml-text mb-2">{s.title}</h3>
                <p className="text-sm text-ml-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
