import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <Provider store={store}>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
        <Sidebar />
        <main className="px-2 pt-4 lg:ml-64">
          <Outlet />
          <Toaster />
        </main>
      </div>
      <Footer />
    </Provider>
  );
}

export default App;
