import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import SuccessPage from './pages/SuccessPage';

function HomeRoute() {
  const [searchParams] = useSearchParams();

  if (searchParams.get('lead') === 'success') {
    return <Navigate to="/thank-you" replace />;
  }

  return <LandingPage />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/nosotros" element={<Navigate to="/about" replace />} />
      <Route path="/thank-you" element={<SuccessPage />} />
      <Route path="/gracias" element={<Navigate to="/thank-you" replace />} />
    </Routes>
  );
}
