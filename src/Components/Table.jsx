import React, { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsContext';
import Filters from './Filters';

export default () => {
  const { filters, data } = useContext(StarWarsContext);

  const renderHeader = () => (
    <tr>
      <th>Name</th>
      <th>Rotation Period</th>
      <th>Orbital Period</th>
      <th>diameter</th>
      <th>Climate</th>
      <th>Gravity</th>
      <th>Terrain</th>
      <th>Surface Water</th>
      <th>Population</th>
      <th>Films</th>
      <th>Created</th>
      <th>Edited</th>
      <th>URL</th>
    </tr>
  );

  const renderBody = (list) => (
    list.map((planet, index) => (
      <tr key={ index }>
        <td data-testid="planet-name">{ planet.name }</td>
        <td>{ Number(planet.rotation_period) }</td>
        <td>{ Number(planet.orbital_period) }</td>
        <td>{ Number(planet.diameter) }</td>
        <td>{ planet.climate }</td>
        <td>{ planet.gravity }</td>
        <td>{ planet.terrain }</td>
        <td>{ Number(planet.surface_water) }</td>
        <td>{ planet.population }</td>
        <td>{ planet.films }</td>
        <td>{ planet.created }</td>
        <td>{ planet.edited }</td>
        <td>{ planet.url }</td>
      </tr>
    ))
  );

  // const isNumber = (value) => { return Number.isNaN(+value) ? value : +value; };

  const sortAscending = (datas) => {
    const { column } = filters.order;
    const one = 1;
    const oneLess = -1;

    datas.sort((a, b) => {
      const data1 = Number.isNaN(+a[column]) ? a[column] : +a[column];
      const data2 = Number.isNaN(+b[column]) ? b[column] : +b[column];
      if (data1 > data2) return one;
      if (data2 > data1) return oneLess;
      return 0;
    });
  };

  const descendingOrder = (datas) => {
    const { column } = filters.order;
    const one = 1;
    const oneLess = -1;

    datas.sort((a, b) => {
      const data1 = Number.isNaN(+a[column]) ? a[column] : +a[column];
      const data2 = Number.isNaN(+b[column]) ? b[column] : +b[column];
      if (data1 < data2) return one;
      if (data2 < data1) return oneLess;
      return 0;
    });
  };

  const orderTable = (list) => {
    const { sort } = filters.order;
    if (sort === 'ASC') return sortAscending(list);
    if (sort === 'DESC') return descendingOrder(list);
  };

  const filterPlanets = () => {
    let planets = data
      .filter((planet) => planet.name.match(filters.filterByName.name));

    if (filters.filterByNumericValues.length) {
      filters.filterByNumericValues
        .forEach(({ column, comparison, value }) => {
          if (comparison === 'maior que') {
            planets = planets
              .filter((planet) => Number(planet[column]) > value);
          }
          if (comparison === 'menor que') {
            planets = planets
              .filter((planet) => Number(planet[column]) < value);
          }
          if (comparison === 'igual a') {
            planets = planets
              .filter((planet) => Number(planet[column]) === Number(value));
          }
        });
    }
    orderTable(planets);
    return planets;
  };

  return (
    <>
      <Filters />
      <table>
        <tbody>
          { renderHeader() }
          { renderBody(filterPlanets()) }
        </tbody>
      </table>
    </>
  );
};
