import logo from './logo.svg';
import './App.css';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import ThemeRoutes from './ThemeRoutes';

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <ThemeRoutes />
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
