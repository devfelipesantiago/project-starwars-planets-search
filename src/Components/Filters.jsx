import React, { useContext, useState } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

export default () => {
  const { setFilters, filters, data } = useContext(StarWarsContext);

  const [activeFilter, setActiveFilter] = useState([]);

  const [valueFilter, setValueFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [columns, setColumns] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  const [selectOrder, setSelectOrder] = useState({
    column: 'name',
    sort: '',
  });

  const getValueInput = ({ target }) => {
    const { value } = target;
    setFilters({ ...filters, filterByName: { name: value } });
  };

  const getValuesNumberInput = ({ target }) => {
    const { value, name } = target;
    setValueFilter({ ...valueFilter, [name]: value });
  };

  const handlerOrder = ({ target }) => {
    const { value, name } = target;
    setSelectOrder({ ...selectOrder, [name]: value });
  };

  const handleClickFilter = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues, valueFilter],
    });
  };

  const removeColumn = ({ column }) => {
    setColumns(columns.filter((item) => item !== column));
    if (column) setActiveFilter([...activeFilter, column]);
  };

  const handleClickActiveFilter = ({ target: { name } }) => {
    setFilters({
      ...filters,
      filterByNumericValues:
        filters.filterByNumericValues
          .filter(({ column }) => column !== name),
    });
    setColumns([...columns, ...activeFilter.filter((filter) => filter === name)]);
    setActiveFilter(activeFilter.filter((filter) => filter !== name));
  };

  const buttonActiveFilter = () => (
    filters.filterByNumericValues.map(({ column }) => (
      <span data-testid="filter" key={ `${column}-filter-button` }>
        { column }
        <button
          type="button"
          name={ column }
          onClick={ (e) => handleClickActiveFilter(e) }
        >
          X
        </button>
      </span>
    ))
  );

  const renderFilters = () => (
    <>
      <label htmlFor="colums">
        Colunas:
        <select
          name="column"
          id="colums"
          value={ valueFilter.column }
          data-testid="column-filter"
          onChange={ (e) => getValuesNumberInput(e) }
        >
          { columns.map((col) => (
            <option key={ col } value={ col }>{ col }</option>
          )) }
        </select>
      </label>
      <label htmlFor="comparison">
        Comparação
        <select
          name="comparison"
          id="comparison"
          data-testid="comparison-filter"
          onChange={ (e) => getValuesNumberInput(e) }
          value={ valueFilter.comparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          name="value"
          id="value-filter"
          data-testid="value-filter"
          placeholder="Digite um numero"
          onChange={ (e) => getValuesNumberInput(e) }
          value={ valueFilter.value }
        />
      </label>
    </>
  );

  const renderOrderBy = (list) => {
    const orderColumn = Object.values(list)[0];
    return (
      <div>
        Ordernar por :
        <select
          data-testid="column-sort"
          value={ selectOrder.column }
          onChange={ (e) => handlerOrder(e) }
          name="column"
        >
          { orderColumn && Object.keys(orderColumn)
            .map((column, key) => (
              <option
                key={ key }
                value={ column }
                name={ column }
              >
                { column }
              </option>
            )) }
        </select>
        <span> </span>
        <label htmlFor="ASC">
          Crescente :
          <input
            type="radio"
            value="ASC"
            id="ASC"
            name="sort"
            data-testid="column-sort-input-asc"
            onClick={ (e) => handlerOrder(e) }
          />
        </label>
        <label htmlFor="DESC">
          Decrescente :
          <input
            type="radio"
            value="DESC"
            id="DESC"
            name="sort"
            data-testid="column-sort-input-desc"
            onClick={ (e) => handlerOrder(e) }
          />
        </label>
        <button
          data-testid="column-sort-button"
          type="button"
          onClick={ () => {
            setFilters({
              ...filters, order: selectOrder,
            });
          } }
        >
          Ordernar
        </button>
      </div>
    );
  };

  return (
    <form>
      <label htmlFor="ask">
        Planeta:
        <input
          type="text"
          name="ask"
          id="ask"
          data-testid="name-filter"
          placeholder="Digite o planeta"
          onChange={ (e) => getValueInput(e) }
        />
      </label>
      {renderFilters() }
      <button
        onClick={ () => { handleClickFilter(); removeColumn(valueFilter); } }
        type="button"
        data-testid="button-filter"
      >
        Filtrar
      </button>
      <div>{ renderOrderBy(data) }</div>
      { activeFilter.length > 0 && buttonActiveFilter() }
    </form>
  );
};
