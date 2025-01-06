import type { Character } from '../types/Character';

interface CharacterCardProps {
  character: Character;
}

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className="flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <header>
        <h3 className="text-xl font-semibold mb-3">{character.name}</h3>
      </header>
      <img
        src={character.image}
        alt={character.name}
        className="rounded-md w-full h-auto"
        loading="lazy"
      />
    </article>
  );
}

export default CharacterCard;
