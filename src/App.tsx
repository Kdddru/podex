import './pokeTypeCss/type.css'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import InfoPage from './components/InfoPage';


const Layout = React.lazy(() => import('./layout/Layout'));

function App() {

  return (
    <div>
      <Suspense>
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
