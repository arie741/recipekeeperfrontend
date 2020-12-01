import React from 'react';
import MainTable from './components/MainTable';
import AddModal from './components/AddModal';
import EditRecipe from './components/EditRecipe';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faUtensils } from '@fortawesome/free-solid-svg-icons';

function App() {

  return (
    <Router>
      <div>
        <nav className="sideNav">
          <ul>
            <li>
              <Link to="/"><FontAwesomeIcon icon={faHome} /><span className="navText">Home</span></Link>
            </li>
            <li>
              <Link to="/addrecipe"><FontAwesomeIcon icon={faUtensils} /><span className="navText">Add Recipe</span></Link>
            </li>
          </ul>        
        </nav>

        <Switch>
          <Route path="/addrecipe">
            <AddModal/>
          </Route>
          <Route path="/editrecipe/:id">
            <EditComp/>
          </Route>
          <Route path="/">
            <div className="App">
              <MainTable/>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function EditComp(){
    let { id } = useParams();
    return (
        <EditRecipe recipeId={id}/>
      )
}

export default App;
