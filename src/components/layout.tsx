import { NavLink, Outlet } from 'react-router-dom';

const setActive = ({isActive}: {isActive: boolean}) => isActive ? 'activeLink' : '';

const Layout: React.FC = () => {
  return (
    <>
      <header className="nav">
        <NavLink to="/" className={setActive}>Home</NavLink>
        <NavLink to="/posts" className={setActive}>Blog</NavLink>
        <NavLink to="/about" className={setActive}>About</NavLink>
      </header>

      <main>
        <Outlet />
      </main>
      
      <footer>
        <div>© 2022 Company, Inc</div>
      </footer>
    </>
  );
};

export {Layout};
