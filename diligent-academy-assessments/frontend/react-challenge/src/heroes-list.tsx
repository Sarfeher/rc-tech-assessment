import HeroListItem from './hero-list-item';
import { useHeroes } from './useHeroes';
import './app.css';

const HeroList = () => {
  const { heroes, loading, error, toggleAvailability } = useHeroes();

  if (loading) {
    return <p className="message">Loading...</p>;
  }

  if (error) {
    return <p className="message">{error}</p>;
  }

  return (
    <ul className="hero-list">
      {heroes.map((hero) => (
        <HeroListItem
          key={hero.id}
          id={hero.id}
          name={hero.name}
          available={hero.available}
          onToggle={toggleAvailability}
        />
      ))}
    </ul>
  );
};

export default HeroList;
