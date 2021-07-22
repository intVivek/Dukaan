import App from './App';
import { Route, Switch } from "react-router-dom";

const Router = () =>{

  return(
    <Switch>
      <Route
          path ="/:page"
          render={()=>
            <App/>
          }
        />
        <Route
          path ="/"
          render={()=>
            <App/>
          }
        />
    </Switch>
  );
}

export default Router;