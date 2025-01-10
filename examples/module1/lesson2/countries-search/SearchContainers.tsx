import { useEffect, useState } from 'react';
import type { Countries } from './types';
import { countriesService } from './fetchCountriesServiceProxy';

// Funkcja serwisowa do pobierania krajów
const sortOptions = [
  'name',
  'population',
  'area',
  'region',
  'currency',
] as const;

type SortOption = (typeof sortOptions)[number];

function CountrySearchContainers() {
  const [name, setName] = useState('');
  const [countries, setCountries] = useState<Countries>([]);
  const [sortOption, setSortOption] = useState<SortOption>('name');
  // Inicjalizacja serwisu z proxy

  useEffect(() => {
    if (name) {
      countriesService
        .fetchCountries(name)
        .then((data: Countries) => setCountries(data))
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [name]);

  const sortedCountries = [...countries].sort((a, b) => {
    switch (sortOption) {
      case 'name':
        return a.name.common.localeCompare(b.name.common);
      case 'population':
        return a.population - b.population;
      case 'area':
        return a.area - b.area;
      case 'region':
        return a.region.localeCompare(b.region);
      case 'currency':
        const currencyA = Object.values(a.currencies || {})
          .map((currency: any) => currency.name)
          .join(', ');
        const currencyB = Object.values(b.currencies || {})
          .map((currency: any) => currency.name)
          .join(', ');
        return currencyA.localeCompare(currencyB);
      default:
        return 0;
    }
  });

  return (
    <>
      <h1 className="text-center py-4">Countries Search</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search countries..."
          className="p-2 border rounded"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="p-2 border rounded"
        >
          <option value="name">Sort by name</option>
          <option value="population">Sort by population</option>
          <option value="area">Sort by area</option>
          <option value="region">Sort by region</option>
          <option value="currency">Sort by currency</option>
        </select>
      </div>
      {/* <pre>{JSON.stringify(countries, null, 2)}</pre> */}

      {sortedCountries.length > 0 ? (
        <ul className="countries-grid grid grid-cols-2 gap-4 p-4">
          {sortedCountries.map((country) => (
            <li
              key={country.name.common}
              className="flex gap-4 p-4 rounded-lg shadow text-left"
            >
              <img
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                className="h-auto object-contain w-80"
              />
              <div className="flex-1 text-left">
                <h2
                  data-testid={country.name.common}
                  className="text-xl font-bold mb-4 text-left"
                >
                  {country.name.common}
                </h2>
                <dl className="space-y-2 text-left">
                  <div className="flex">
                    <dt className="w-24 font-semibold">Capital:</dt>
                    <dd>{country.capital}</dd>
                  </div>

                  <div className="flex">
                    <dt className="w-24 font-semibold">Languages:</dt>
                    <dd>{Object.values(country.languages || {}).join(', ')}</dd>
                  </div>

                  <div className="flex">
                    <dt className="w-24 font-semibold">Currency:</dt>
                    <dd>
                      {Object.values(country.currencies || {})
                        .map(
                          (currency: any) =>
                            `${currency.name} (${currency.symbol})`
                        )
                        .join(', ')}
                    </dd>
                  </div>

                  <div className="flex">
                    <dt className="w-24 font-semibold">Region:</dt>
                    <dd>{country.region}</dd>
                  </div>

                  <div className="flex">
                    <dt
                      data-testid={country.population.toLocaleString()}
                      className="w-24 font-semibold"
                    >
                      Population:
                    </dt>
                    <dd>{country.population.toLocaleString()}</dd>
                  </div>

                  <div className="flex">
                    <dt className="w-24 font-semibold">Area:</dt>
                    <dd>{country.area} km²</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-left">No countries found</p>
      )}
    </>
  );
}

export default CountrySearchContainers;
