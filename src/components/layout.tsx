import { Link, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <>
      <header className="nav">
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/about">About</Link>
      </header>

      <main>
        <Outlet />
      </main>
      
      <footer>2022</footer>
    </>
  );
};

export default Layout;
