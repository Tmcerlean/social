import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/useAuthListener';
import ProtectedRoute from './helpers/protected-route';
import IsUserLoggedIn from './helpers/is-user-logged-in';

const Home = lazy(() => import('./screens/Home'));
const Login = lazy(() => import('./screens/Login'));
const NotFound = lazy(() => import('./screens/NotFound'));
const Profile = lazy(() => import('./screens/Profile'));
const Signup = lazy(() => import('./screens/Signup'));

const App = () => {

  const user = useAuthListener();

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Suspense fallback={<p>Loading ...</p>}>
          <Switch>
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.HOME} path={ROUTES.LOGIN}>
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.HOME} path={ROUTES.SIGNUP}>
              <Signup />
            </IsUserLoggedIn>
            <Route path={ROUTES.PROFILE}>
              <Profile />
            </Route>
            <ProtectedRoute user={user} path={ROUTES.HOME} exact>
                <Home />
            </ProtectedRoute>
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
