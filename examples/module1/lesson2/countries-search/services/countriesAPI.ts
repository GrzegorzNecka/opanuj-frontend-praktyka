import type { Countries, SearchType } from './types';

export const createCountriesAPI = (
  baseURL = 'https://restcountries.com/v3.1'
) => {
  const fetchCountries = async (
    type: SearchType,
    term: string
  ): Promise<Countries> => {
    const response = await fetch(`${baseURL}/${type}/${term}`);
    return response.json();
  };

  return { fetchCountries };
};
