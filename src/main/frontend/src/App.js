import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import PageLayout from './components/PageLayout';
import Register from './pages/Register';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Account from './pages/Account';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route
              exact
              path="/"
              render={() => {
                  return (
                      <Redirect to="/home" />
                  )
              }}
          />
          <Route path="/home">
            <PageLayout >
              <Home />
            </PageLayout>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <PageLayout title="Register">
              <Register />
            </PageLayout>
          </Route>
          <Route path="/shop">
            <PageLayout>
              <Shop />
            </PageLayout>
          </Route>
          <Route path="/cart">
            <PageLayout>
              <Cart />
            </PageLayout>
          </Route>
          <Route path="/account">
            <PageLayout>
              <Account />
            </PageLayout>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
