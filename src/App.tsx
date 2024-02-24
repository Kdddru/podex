import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import InfoPage from './components/InfoPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/pokemon/:id' element={<InfoPage/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
