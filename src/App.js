import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import FirebaseContext from './context/firebase';
import UserContext from './context/user';
import useAuthListener from './hooks/useAuthListener';

const Home = lazy(() => import('./screens/Home'));
const Login = lazy(() => import('./screens/Login'));
const NotFound = lazy(() => import('./screens/NotFound'));
const Signup = lazy(() => import('./screens/Signup'));

const App = () => {

  const { firebase, auth } = useContext(FirebaseContext);
  const user = useAuthListener(UserContext);

  return (
    <UserContext.Provider value={user}>
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
    </UserContext.Provider>
  );
}

export default App;
