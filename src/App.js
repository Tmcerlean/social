import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import FirebaseContext from './context/firebase';

const Home = lazy(() => import('./screens/Home'));
const Login = lazy(() => import('./screens/Login'));
const NotFound = lazy(() => import('./screens/NotFound'));
const Signup = lazy(() => import('./screens/Signup'));

const App = () => {

  const { firebase, auth } = useContext(FirebaseContext);

  return (
    <Router>
      <Suspense fallback={<p>Loading ...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} exact>
            <Login />
          </Route>
          <Route path={ROUTES.SIGNUP} exact>
            <Signup />
          </Route>
          <Route path={ROUTES.HOME} exact>
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
