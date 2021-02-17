import './App.css';
import { MainPage } from './Pages/MainPage'
import { Route, BrowserRouter } from 'react-router-dom'


function App() {

  return (
    <>
      <BrowserRouter>
        <Route path={`/mainPage`}>
          <MainPage />
        </Route>
      </BrowserRouter>
    </>
  );
}

export default App;
