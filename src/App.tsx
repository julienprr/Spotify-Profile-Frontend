import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen overflow-x-hidden bg-background text-foreground">
        <Sidebar />
        <main className="px-2 pt-4 lg:ml-64">
          <Outlet />
          <Toaster />
        </main>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
