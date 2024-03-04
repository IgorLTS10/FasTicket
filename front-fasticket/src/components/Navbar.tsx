import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'; // Assurez-vous d'importer Link de react-router-dom pour une navigation optimisée dans une SPA
import './Navbar.css';

type Event = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  location: string;
  type: string;
  stock: number;
};

const Navbar: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Event[]>([]);


  useEffect(() => {
    if (searchTerm) {
      // Effectuer la recherche si searchTerm n'est pas vide
      fetch(`http://localhost:5000/events/search/${searchTerm}`)
        .then(response => response.json())
        .then(data => setSearchResults(data))
        .catch(error => console.error('Erreur lors de la recherche:', error));
    } else {
      // Réinitialiser les résultats de la recherche si searchTerm est vide
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <nav className="navbar">
  <Link to="/" className="navbar-brand">FasTicket</Link>
  <div className="nav-links">
    <Link to="/AllEvents" className="nav-link">Events</Link>
    <div className="dropdown">
      <button className="dropbtn">Categories</button>
      <div className="dropdown-content">
        <Link to="/events/type/Concert">Concert</Link>
        <Link to="/events/type/Opera">Opéra</Link>
        <Link to="/events/type/Sport">Sport</Link>
      </div>
    </div>
    <Link to="/about">About</Link>
    <Link to="/contact">Contact</Link>
  </div>
  <div className="navbar-search">
    <input
      type="text"
      placeholder="Search for events"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button type="submit">🔍</button>
  </div>
  {/* Ici, nous ajoutons les résultats de recherche juste en dessous de la barre de recherche */}
  {searchResults.length > 0 && (
    <div className="search-results">
      {searchResults.map((event) => (
        <Link key={event.id} to={`/event/${event.id}`}>
          <div className="search-item">{event.title}</div>
        </Link>
      ))}
    </div>
  )}
  <div className="navbar-buttons">
    <button className="btn btn-white">Log in</button>
    <button className="btn btn-black">Get Started</button>
  </div>
</nav>

  );
};

export default Navbar;
