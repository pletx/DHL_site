import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NosActions from './pages/Actions/PageAction';
import NosDroits from './pages/Droits/PageDroits';
import Contact from './pages/Contact/PageContact';
import HomePage from './pages/Home/Home';
import Error404 from './pages/Error404/Error404';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/actions" element={<NosActions />} />
          <Route path="/droits" element={<NosDroits />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
