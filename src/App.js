import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NosActions from './pages/Actions/PageAction';
import NosDroits from './pages/Droits/PageDroits';
import Contact from './pages/Contact/PageContact';
import HomePage from './pages/Home/Home';
import Information from './pages/Information/Information'
import Error404 from './pages/Error404/Error404';
import Accords from './pages/Accord/PageAccord';
import { AuthProvider } from './AuthContext'; // Import du AuthProvider
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider> {/* Envelopper toute l'application avec AuthProvider */}
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/actions" element={<NosActions />} />
            <Route path="/droits" element={<NosDroits />} />
            <Route path="/accords" element={<Accords />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/information" element={<Information />} /> 
            <Route path="*" element={<Error404 />} />
          </Routes>
          <Footer /> 
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
