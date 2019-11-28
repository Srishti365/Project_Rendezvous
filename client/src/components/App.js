import React from 'react';
import {  BrowserRouter,Route} from 'react-router-dom';
import Home from './Home';
import '../css/style.css';

import Dashboard from './Dashboard';


function App() {
  return (
    <div className="imgcontrol">
      <BrowserRouter>
        <div className="bgcontrol">
          <div>
        <Route exact path="/" component={Home}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
