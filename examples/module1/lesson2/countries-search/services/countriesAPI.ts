import type { Countries } from './types';

export const createCountriesAPI = (
  baseURL = 'https://restcountries.com/v3.1'
) => {
  const fetchCountries = async (name: string): Promise<Countries> => {
    const response = await fetch(`${baseURL}/name/${name}`);
    return response.json();
  };

  return { fetchCountries };
};
