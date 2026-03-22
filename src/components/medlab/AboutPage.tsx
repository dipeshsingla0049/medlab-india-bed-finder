import { Heart, CheckCircle, AlertTriangle, BedDouble, Siren, Code, FileCode, Globe, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const AboutPage = ({ onNavigate }: AboutPageProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('ml-visible'); }),
      { threshold: 0.15 }
    );
    ref.current?.querySelectorAll('.ml-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-ml-primary-light to-ml-bg py-20 px-6 text-center">
        <span className="ml-fade-up inline-block bg-ml-white border border-ml-border rounded-full px-4 py-1.5 text-sm font-medium text-ml-primary mb-5">About MedLab</span>
        <h1 className="ml-fade-up ml-fade-up-d1 font-syne text-3xl md:text-5xl font-bold text-ml-text mb-4 leading-tight">Connecting Patients to Care, Instantly</h1>
        <p className="ml-fade-up ml-fade-up-d2 text-lg text-ml-muted max-w-2xl mx-auto">Built to solve one critical problem — finding available hospital beds should never be this hard.</p>
      </section>

      {/* Mission */}
      <section className="bg-ml-white py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="ml-reveal">
            <span className="text-sm font-semibold text-ml-primary uppercase tracking-wider">Our Mission</span>
            <h2 className="font-syne text-3xl font-bold text-ml-text mt-2 mb-4">Making Emergency Healthcare Accessible</h2>
            <p className="text-ml-text-2 mb-6 leading-relaxed">In medical emergencies, every minute counts. MedLab aggregates real-time bed availability data from hospitals across India, helping patients and families find the care they need — fast.</p>
            <div className="space-y-3">
              {[
                "Real-time bed availability across 500+ hospitals",
                "Search by disease, city, and price category",
                "One-click ICU finder for critical emergencies",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-ml-green shrink-0 mt-0.5" />
                  <span className="text-sm text-ml-text-2">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="ml-reveal bg-ml-primary-light rounded-2xl p-12 flex items-center justify-center" style={{ transitionDelay: '100ms' }}>
            <Heart className="w-24 h-24 text-ml-primary/30" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ml-primary py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "500+", label: "Hospitals Listed" },
            { num: "20+", label: "Cities Covered" },
            { num: "10,000+", label: "Beds Tracked" },
            { num: "50,000+", label: "Patients Helped" },
          ].map((s, i) => (
            <div key={s.label} className="ml-reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="font-syne text-4xl font-bold text-ml-white mb-1">{s.num}</div>
              <div className="text-sm text-ml-white/70">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-ml-bg py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="ml-reveal font-syne text-3xl font-bold text-ml-text mb-10">Built With</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Globe, label: "HTML5" },
              { icon: FileCode, label: "CSS3" },
              { icon: Code, label: "JavaScript" },
              { icon: Zap, label: "RapidAPI" },
            ].map((t, i) => (
              <div key={t.label} className="ml-reveal feature-card bg-ml-white border border-ml-border rounded-2xl p-6 text-center" style={{ transitionDelay: `${i * 80}ms` }}>
                <t.icon className="w-8 h-8 text-ml-primary mx-auto mb-3" />
                <span className="font-syne font-bold text-ml-text">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 py-10">
        <div className="max-w-3xl mx-auto bg-ml-yellow-bg border border-ml-yellow/30 rounded-xl p-6 flex gap-4">
          <AlertTriangle className="w-6 h-6 text-ml-yellow shrink-0 mt-0.5" />
          <div>
            <h3 className="font-syne font-bold text-ml-text mb-1">Important Disclaimer</h3>
            <p className="text-sm text-ml-text-2 leading-relaxed">Bed availability data shown on MedLab is indicative and may vary. Always call the hospital directly to confirm availability before visiting. MedLab is not a substitute for professional medical advice.</p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-ml-dark py-20 px-6 text-center">
        <h2 className="ml-reveal font-syne text-3xl md:text-4xl font-bold text-ml-white mb-4">Ready to Find a Hospital Bed?</h2>
        <p className="ml-reveal text-ml-white/60 mb-8">Search across 500+ hospitals in 20+ Indian cities</p>
        <div className="ml-reveal flex items-center justify-center gap-3 flex-wrap">
          <button onClick={() => onNavigate('beds')} className="ml-btn bg-ml-primary text-ml-white px-6 py-3 rounded-lg font-semibold hover:bg-ml-primary-dark transition-colors flex items-center gap-2">
            <BedDouble className="w-4 h-4" /> Find Beds Now
          </button>
          <button onClick={() => onNavigate('beds')} className="ml-btn border border-ml-white/30 text-ml-white px-6 py-3 rounded-lg font-semibold hover:bg-ml-white/10 transition-colors flex items-center gap-2">
            <Siren className="w-4 h-4" /> Emergency ICU
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
