import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import Home from './pages/Home';
import Live from './pages/Live';
import Analytics from './pages/Analytics';
import Database from './pages/Database';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onOpenRequest() {
      setSidebarOpen(true);
    }

    window.addEventListener('SidebarOpen',
      onOpenRequest as EventListener
    );  

    function hndlOutClick(e: MouseEvent){
      if (!sidebarRef.current) return;

      if (!sidebarRef.current.contains(e.target as Node)){
        setSidebarOpen(false);
      }
    }

    if (sidebarOpen){
      document.addEventListener("click", hndlOutClick);
    }

    return () => {
      window.removeEventListener(
        'SidebarOpen',
        onOpenRequest as EventListener
      );
      document.removeEventListener("click", hndlOutClick);
    };
  }, [sidebarOpen ]);
  return (
    <BrowserRouter>
      <div className="app">
        <div className="sidebar-container">
          <div className="sidebar-logo">
            <div className="sidebar-logo-mark" role="button" onClick={(e) => {e.stopPropagation(); setSidebarOpen((prev) => !prev)}}>
              <img src="/assets/SMARTSOIL-LOGO.png" alt="SmartSoil Logo" className='sidebar-logo-img'/>
            </div>
            <h2 className="bar-title">SMARTSOIL</h2>
          </div>
          <aside ref={sidebarRef} className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>

          <nav className="sidebar-nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                'nav-link' + (isActive ? ' nav-link-active' : '')
              }
            >
              <span className="material-icons">home</span>
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                'nav-link' + (isActive ? ' nav-link-active' : '')
              }
            >
               <span className="material-icons">dashboard</span>
            </NavLink>

            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                'nav-link' + (isActive ? ' nav-link-active' : '')
              }
            >
              <span className="material-icons">bar_chart</span>
            </NavLink>

            <NavLink
              to="/database"
              className={({ isActive }) =>
                'nav-link' + (isActive ? ' nav-link-active' : '')
              }
            >
              <span className="material-icons">storage</span>
            </NavLink>
            
          </nav>
          </aside>
        </div>

        <div className="main">
          <div className="content">
          <div className="header">
            <div className="header-title">Real-time Soil Monitor</div>
            <div className="header-pill">Project: SmartSoil – ESP32</div>
          </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Live />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/database" element={<Database />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
