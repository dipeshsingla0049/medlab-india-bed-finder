import { Activity, Home, Info, BedDouble, Heart, Siren } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const Navbar = ({ activePage, onNavigate }: NavbarProps) => {
  const links = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Info },
    { id: 'beds', label: 'Find Beds', icon: BedDouble },
    { id: 'favorites', label: 'Favorites', icon: Heart },
  ];

  return (
    <nav className="sticky top-0 z-50 h-16 bg-ml-white/80 backdrop-blur-xl border-b border-ml-border flex items-center px-6 md:px-8">
      <button onClick={() => onNavigate('home')} className="flex items-center gap-2 mr-8 ml-btn">
        <Activity className="w-6 h-6 text-ml-primary" />
        <span className="font-syne font-bold text-xl text-ml-primary">MedLab</span>
      </button>

      <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
        {links.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            id={`nav-${id}`}
            onClick={() => onNavigate(id)}
            className={`ml-btn flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
              ${activePage === id
                ? 'bg-ml-primary-light text-ml-primary'
                : 'text-ml-text-2 hover:bg-ml-primary-light/50 hover:text-ml-primary'
              }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <button
        id="nav-emergency"
        onClick={() => {
          onNavigate('beds');
          setTimeout(() => {
            const bedFilter = document.getElementById('bed-filter') as HTMLSelectElement;
            if (bedFilter) { bedFilter.value = 'ICU Only'; bedFilter.dispatchEvent(new Event('change')); }
          }, 100);
        }}
        className="ml-btn ml-auto md:ml-0 flex items-center gap-2 bg-ml-emergency text-ml-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        <Siren className="w-4 h-4" />
        <span className="hidden sm:inline">Emergency ICU</span>
      </button>
    </nav>
  );
};

export default Navbar;
