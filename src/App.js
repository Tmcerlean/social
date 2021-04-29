import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';

const Login = lazy(() => import('./screens/Login'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<p>Loading ...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN}>
            <Login />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
