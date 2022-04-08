import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import PageLayout from './components/PageLayout';
import Register from './pages/Register';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Account from './pages/Account';
import Footer from './components/Footer';

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
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
