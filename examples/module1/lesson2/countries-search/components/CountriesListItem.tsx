import type { Country } from '../api/types';

export const CountriesListItem = ({ country }: { country: Country }) => {
  return (
    <li className="flex gap-6 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-slate-100 border border-gray-100">
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        className="h-48 object-contain w-72 rounded-lg shadow-sm"
      />
      <div className="flex-1">
        <h2
          data-testid={country.name.common}
          className="text-2xl font-bold mb-6 text-gray-800"
        >
          {country.name.common}
        </h2>
        <dl className="space-y-3">
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <dt className="w-28 font-semibold text-gray-600">Capital:</dt>
            <dd className="text-gray-800">{country.capital}</dd>
          </div>
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <dt className="w-28 font-semibold text-gray-600">Languages:</dt>
            <dd className="text-gray-800">
              {Object.values(country.languages || {}).join(', ')}
            </dd>
          </div>
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <dt className="w-28 font-semibold text-gray-600">Currency:</dt>
            <dd className="text-gray-800">
              {Object.values(country.currencies || {})
                .map((currency) => `${currency.name} (${currency.symbol})`)
                .join(', ')}
            </dd>
          </div>
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <dt className="w-28 font-semibold text-gray-600">Region:</dt>
            <dd className="text-gray-800">{country.region}</dd>
          </div>
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <dt className="w-28 font-semibold text-gray-600">Population:</dt>
            <dd className="text-gray-800">
              {country.population.toLocaleString()}
            </dd>
          </div>
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <dt className="w-28 font-semibold text-gray-600">Area:</dt>
            <dd className="text-gray-800">{country.area} km²</dd>
          </div>
        </dl>
      </div>
    </li>
  );
};
