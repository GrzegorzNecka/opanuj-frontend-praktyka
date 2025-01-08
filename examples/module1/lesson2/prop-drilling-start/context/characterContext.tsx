import { useState, useContext, createContext } from 'react';
import { useCharacterSearch } from '../hooks/useCharacterSearch';
import type { Character } from '../types/Character';
import { sortCharacters } from '../utils/sortCharacters';

interface CharacterContextValues {
  characters: Character[];
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValues: CharacterContextValues = {
  characters: [],
  name: '',
  setName: () => {},
  gender: '',
  setGender: () => {},
  sortOption: '',
  setSortOption: () => {},
};

const CharacterContext = createContext<CharacterContextValues>(defaultValues);

export const CharacterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [sortOption, setSortOption] = useState('');
  const characters = useCharacterSearch(name, gender);

  const value = {
    name,
    setName,
    gender,
    setGender,
    sortOption,
    setSortOption,
    characters: sortCharacters(characters, sortOption),
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => useContext(CharacterContext);
