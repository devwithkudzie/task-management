import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <header>
        {/* Your header content */}
      </header>
      
      <main className="container">
        <Outlet />
      </main>

      <footer>
        {/* Your footer content */}
      </footer>
    </div>
  );
}

export default Layout; 