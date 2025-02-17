import { useContext } from 'react';
import { BsBag } from 'react-icons/bs';
import { CiShop } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { useRenderLogging } from '../tests/useRenderLogging';
import CartBadge from './CartBadge';

interface HeaderProps {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setIsSidebarOpen }: HeaderProps) => {
  useRenderLogging('Header'); // Code required for acceptance testing

  return (
    <header
      className={`bg-none py-6 fixed w-full z-10 lg:px-8 transition-all`}
      data-testid="shop-header"
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={`/`} className="cursor-pointer ml-8">
          <CiShop className="text-3xl " />
        </Link>
        <div
          onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
          className="cursor-pointer flex relative mr-8"
        >
          <BsBag className="text-2xl" />
          <CartBadge />
        </div>
      </div>
    </header>
  );
};

export default Header;
