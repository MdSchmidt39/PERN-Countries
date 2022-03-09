import './App.css';
import React from 'react';
import { Route , BrowserRouter, Switch} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import CardDetail from './components/Card/CardDetail';
import AddActivity from './components/AddActivity/AddActivity';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <div>
            <Switch>
              <Route exact path={"/"} component={Landing}/>
              <Route path={"/home"} component={Home}/>
              <Route exact path={"/countries/:id"} component={CardDetail}/>
              <Route path='/activities' render={() => <AddActivity/>}/>
            </Switch>
        </div>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
