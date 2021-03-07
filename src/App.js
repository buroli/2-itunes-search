import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import { Home } from './components/Home';
import { DetailsTrack } from './components/DetailsTrack';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/:trackId'>
            <DetailsTrack />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
