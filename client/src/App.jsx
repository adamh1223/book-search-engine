import { Route, Routes } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchBooks />} />
      <Route path="/saved" element={<SavedBooks />} />
    </Routes>
  );
}

export default App;
