import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex min-h-screen overflow-x-hidden bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 px-4 pt-4 pb-10 lg:ml-64">
        <Provider store={store}>
          <Outlet />
        </Provider>
        <Footer />
      </main>
    </div>
  );
}

export default App;
