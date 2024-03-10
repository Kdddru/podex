import './pokeTypeCss/type.css'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';

const Layout = React.lazy(() => import('./layout/Layout'));
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
