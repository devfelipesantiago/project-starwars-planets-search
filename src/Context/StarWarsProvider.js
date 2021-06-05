import { shape } from 'prop-types';
import React, { useEffect, useState } from 'react';
import getPlanetsStarWars from '../Services/fetchAPI';
import StarWarsContext from './StarWarsContext';

const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });

  const fetchPlanetsStarWars = async () => {
    const { results } = await getPlanetsStarWars();
    results.forEach((element) => delete element.residents);
    setData(results);
  };

  useEffect(() => {
    fetchPlanetsStarWars();
  }, []);

  const context = {
    data,
    setFilters,
    filters,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children }
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: shape().isRequired,
};

export default StarWarsProvider;
