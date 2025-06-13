import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 px-4 pb-10 pt-4 lg:ml-64">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
