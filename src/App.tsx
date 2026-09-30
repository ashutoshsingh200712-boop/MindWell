import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { HomePage } from './pages/HomePage';
import { YogaPage } from './pages/YogaPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChatPage } from './pages/ChatPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#0A0A0F] text-[#F5F3FF] selection:bg-purple-600 selection:text-white relative">
          {/* Global Sticky Glass Navbar */}
          <Navbar />

          {/* Main Route Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/yoga" element={<YogaPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Global Floating Chat Widget */}
          <ChatWidget />

          {/* Global Rich Footer */}
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
