import './app.css';

interface HeroListItemProps {
  id: number;
  name: string;
  available: boolean;
  onToggle: (id: number) => void;
}

const HeroListItem = ({ id, name, available, onToggle }: HeroListItemProps) => {
  const handleClick = () => {
    onToggle(id);
  };

  return (
    <li
      onClick={handleClick}
      className={`hero-list-item ${available ? 'available' : ''}`}
    >
      {id}. {name} {available && '"Available"'}
    </li>
  );
};

export default HeroListItem;
