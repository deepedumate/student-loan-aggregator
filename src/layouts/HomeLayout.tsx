import { Outlet } from 'react-router-dom';
import Navigation from '@/components/home/Navigation';
import Footer from '@/components/home/Footer';
import { Navbar } from '@/components/home/Navbar';

export const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </div>
  );
};