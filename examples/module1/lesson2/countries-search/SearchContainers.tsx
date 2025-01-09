import { useEffect, useState } from 'react';
import type { Countries } from './types';
import { countriesService } from './fetchCountriesServiceProxy';

// Funkcja serwisowa do pobierania krajów

function CountrySearchContainers() {
  const [name, setName] = useState('');
  const [countries, setCountries] = useState<Countries>([]);

  // Inicjalizacja serwisu z proxy

  useEffect(() => {
    if (name) {
      countriesService
        .fetchCountries(name)
        .then((data: Countries) => setCountries(data))
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [name]);

  return (
    <>
      <h1 className="text-center py-4">Countries Search</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/* <pre>{JSON.stringify(countries, null, 2)}</pre> */}

      {countries.length > 0 ? (
        <div className="countries-grid grid grid-cols-2 gap-4 p-4">
          {countries.map((country) => (
            <article
              key={country.name.common}
              className="flex gap-4 p-4 rounded-lg shadow text-left"
            >
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="h-auto object-contain w-80"
              />
              <div className="flex-1 text-left">
                <h2 className="text-xl font-bold mb-4 text-left">
                  {country.name.common}
                </h2>
                <dl className="space-y-2 text-left">
                  <div className="flex">
                    <dt className="w-24 font-semibold">Capital:</dt>
                    <dd>{country.capital}</dd>
                  </div>

                  <div className="flex">
                    <dt className="w-24 font-semibold">Region:</dt>
                    <dd>{country.region}</dd>
                  </div>

                  <div className="flex">
                    <dt className="w-24 font-semibold">Population:</dt>
                    <dd>{country.population.toLocaleString()}</dd>
                  </div>

                  <div className="flex">
                    <dt className="w-24 font-semibold">Area:</dt>
                    <dd>{country.area} km²</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-left">No countries found</p>
      )}
    </>
  );
}

export default CountrySearchContainers;
