import './App.css';
import './styles/variables.css';
import Home from './pages/Home';
import { LanguageProvider } from './i18n/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Home />
      </div>
    </LanguageProvider>
  );
}

export default App;
