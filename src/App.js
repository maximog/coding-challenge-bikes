import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.scss';

import HomePage from './pages/HomePage.component';
import CardDetails from './components/CardDetails.component';
import ErrorBoundary from './components/error-boundary.component';

const App = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState([]);
  const [selectedBike, setSelectedBike] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const [searchfield, setSearchfield] = useState({
    incident_type: 'theft',
    occurred_after: '',
    occurred_before: '',
    query: '',
    per_page: 100,
    page: 1
  });


  useEffect(() => {
    fetch('https://bikewise.org:443/api/v2/incidents?incident_type=theft&per_page=100')
      .then(data => data.json())
      .then(data => {
        setResults(data.incidents)
        setIsLoaded(true);
      })
  }, [])


  const customFetch = () => {

    let refinedSearch = {};
    for (const param in searchfield) {
      if (searchfield[param] !== '') {
        if (param === 'occurred_before' || param === 'occurred_after') {
          refinedSearch = { ...refinedSearch, [param]: Date.parse(searchfield[param]) / 1000 }

        } else {
          refinedSearch = { ...refinedSearch, [param]: searchfield[param] }
        }
      }
    }
    console.log(refinedSearch)
    let url = new URL('https://bikewise.org:443/api/v2/incidents')
    url.search = new URLSearchParams({ ...refinedSearch })
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setIsLoaded(true);
        setResults(data.incidents);
      })

  }

  const handleChange = e => {
    setSearchfield({ ...searchfield, [e.target.name]: e.target.value })
  }


  const handleSubmit = e => {
    e.preventDefault();
    setIsLoaded(false);
    customFetch();
  }

  const handleClic = page => {
    switch (page) {
      case 'first':
        setCurrentPage(1);
        break;
      case 'prev':
        if (currentPage !== 1) { setCurrentPage(currentPage - 1) }
        break;
      case 'next':
        if (currentPage !== 10) { setCurrentPage(currentPage + 1) }
        break;
      case 'last':
        setCurrentPage(10);
        break;
      default:
        page > 0 ? setCurrentPage(page) : setCurrentPage(1);
        break;
    }
  }

  const handleSelect = (bike) => {
    setSelectedBike(bike);
  }

  return (
    <div className='container'>
      <div className='title'>
        <Link to='/'><h1>Police Department of Berlin</h1></Link>
        <h2>Stolen Bikes</h2>
      </div>
      <div className='search' onSubmit={handleSubmit}>
        <form className='form'>
          <input type='text' placeholder='Search case descriptions' name='query' value={searchfield.query} onChange={handleChange} />
          <input type='date' placeholder='from' name='occurred_after' value={searchfield.occurred_after} onChange={handleChange} />
          <input type='date' placeholder='to' name='occurred_before' value={searchfield.occurred_before} onChange={handleChange} />
          <button type='submit'>Find cases</button>
        </form>
      </div>

      <Switch>
        <ErrorBoundary>
        <Route exact path='/'>
          <HomePage results={results} currentPage={currentPage} handleClic={handleClic} handleSelect={handleSelect} isLoaded={isLoaded} />
        </Route>
        <Route exact path='/cardDetails/:id' render={({ ...props }) => <CardDetails selectedBike={selectedBike} {...props} />} />
        </ErrorBoundary>
      </Switch>

    </div>
  );
}

export default App;
