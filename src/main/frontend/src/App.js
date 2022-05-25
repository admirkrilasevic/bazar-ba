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
import AboutUs from './pages/footer/AboutUs';
import Contact from './pages/footer/Contact';
import Impressum from './pages/footer/Impressum';
import PrivacyPolicy from './pages/footer/PrivacyPolicy';
import TermsAndConditions from './pages/footer/TermsAndConditions';
import SellerGuidelines from './pages/footer/SellerGuidelines';
import ItemPage from './pages/ItemPage';
import { AuthProvider } from './utils/AuthContext';
import store from './app/store'
import { Provider } from 'react-redux'
import SellPage from './pages/SellPage';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE } from './constants.js';


function App() {

  const stripePromise = loadStripe(STRIPE.PUBLIC_KEY);

  return (
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <AuthProvider>
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
                <Route path="/shop/:categoryId">
                  <Shop />
                </Route>
                <Route path="/cart">
                  <PageLayout>
                    <Cart />
                  </PageLayout>
                </Route>
                <Route path="/account/:section">
                  <PageLayout>
                    <Account />
                  </PageLayout>
                </Route>
                <Route path="/about">
                  <PageLayout title="About Us">
                    <AboutUs />
                  </PageLayout>
                </Route>
                <Route path="/contact">
                  <PageLayout title="Contact">
                    <Contact />
                  </PageLayout>
                </Route>
                <Route path="/impressum">
                  <PageLayout title="Impressum">
                    <Impressum />
                  </PageLayout>
                </Route>
                <Route path="/privacy">
                  <PageLayout title="Privacy Policy">
                    <PrivacyPolicy />
                  </PageLayout>
                </Route>
                <Route path="/terms">
                  <PageLayout title="Terms and Conditions">
                    <TermsAndConditions />
                  </PageLayout>
                </Route>
                <Route path="/guidelines">
                  <PageLayout title="Seller Guidelines">
                    <SellerGuidelines />
                  </PageLayout>
                </Route>
                <Route path="/items/:itemId">
                  <ItemPage />
                </Route>
                <Route path="/sell">
                  <SellPage />
                </Route>
                <Route path="/checkout">
                  <PageLayout title="Checkout" >
                    <Checkout />
                  </PageLayout>
                </Route>
                <Route path="/payment">
                  <Payment />
                </Route>
              </Switch>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </Provider>
    </Elements>
  );
}

export default App;
