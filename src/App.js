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

function App() {

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/addrecipe">Add Recipe</Link>
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
