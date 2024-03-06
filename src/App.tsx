import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import './pokeTypeCss/type.css'
import React, { Suspense } from 'react';

const InfoPage = React.lazy(() => import('./components/InfoPage'));

function App() {

  return (
    <div>
      <Suspense fallback={<div>...loading</div>}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/pokemon/:id' element={<InfoPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
