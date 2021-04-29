import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import FirebaseContext from './context/firebase';

const Login = lazy(() => import('./screens/Login'));
const Signup = lazy(() => import('./screens/Signup'));


const App = () => {

  const { firebase, auth } = useContext(FirebaseContext);

  return (
    <Router>
      <Suspense fallback={<p>Loading ...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN}>
            <Login />
          </Route>
          <Route path={ROUTES.SIGNUP}>
            <Signup />
          </Route>
          <Route path={ROUTES.DASHBOARD}>
            <button onClick={() => console.log(firebase.auth().currentUser)}className="bg-blue-500 w-80">Hi</button>
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
