// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import Product from './components/Catalogs/Product';
import ProductFamily from './components/Catalogs/ProductFamily';
import Invoice from './components/Documents/Invoice';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/menu" component={Menu} />
        <Route path="/catalogs/products" component={Product} />
        <Route path="/catalogs/product-families" component={ProductFamily} />
        <Route path="/documents/invoice" component={Invoice} />
        {/* Redirige a /login por defecto */}
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
};

export default App;
