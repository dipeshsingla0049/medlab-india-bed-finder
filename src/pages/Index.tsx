import { useState, useCallback, useEffect } from 'react';
import Navbar from '@/components/medlab/Navbar';
import HomePage from '@/components/medlab/HomePage';
import AboutPage from '@/components/medlab/AboutPage';
import FindBedsPage from '@/components/medlab/FindBedsPage';
import FavoritesPage from '@/components/medlab/FavoritesPage';
import Footer from '@/components/medlab/Footer';

const Index = () => {
  const [activePage, setActivePage] = useState('home');
  const [savedIds, setSavedIds] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem('medlab-saved') || '[]'); } catch { return []; }
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('medlab-saved', JSON.stringify(savedIds));
  }, [savedIds]);

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

  return (
    <div className="min-h-screen bg-ml-bg">
      <Navbar activePage={activePage} onNavigate={navigate} />
      
      {activePage === 'home' && <HomePage onNavigate={navigate} onSearch={handleSearch} />}
      {activePage === 'about' && <AboutPage onNavigate={navigate} />}
      {activePage === 'beds' && <FindBedsPage savedIds={savedIds} onToggleSave={toggleSave} initialSearch={searchQuery} />}
      {activePage === 'favorites' && <FavoritesPage savedIds={savedIds} onToggleSave={toggleSave} onNavigate={navigate} />}

      <Footer onNavigate={navigate} />
    </div>
  );
};

export default Index;
