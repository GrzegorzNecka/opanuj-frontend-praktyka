import type { Country } from '../types';

export const CountriesListItem = ({ country }: { country: Country }) => {
  return (
    <li className="flex gap-4 p-4 rounded-lg shadow text-left">
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
                .map((currency) => `${currency.name} (${currency.symbol})`)
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
  );
};
