import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss'
import Header from './components/Header/Header';
import Home from './pages/Home';
import Editing from './pages/Editing';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="appContainer">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editing" element={<Editing />} />
        </Routes>
        <ScrollToTop />
      </div>
    </Router>
  )
}

export default App
