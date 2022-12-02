import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// storeProvider
import { StoreProvider } from "./utils/GlobalState";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import OrderHistory from "./pages/OrderHistory";
import Success from "./pages/Success";

const httpLink = createHttpLink({
  uri: "/graphql",
});

// stripe id property : prod_MuRM1QrBQu67kA
// stripe price: price_1MAcUl2eZvKYlo2CESqvUNku
//curl https://api.stripe.com/v1/prices -u sk_test_4eC39HqLyjWDarjtT1zdp7dc: -d product="prod_MuRM1QrBQu67kA" -d unit_amount=2000 -d currency=usd
//curl https://api.stripe.com/v1/checkout/sessions -u sk_test_4eC39HqLyjWDarjtT1zdp7dc: -d "payment_method_types[]"=card -d "line_items[][price]"="price_1MAcUl2eZvKYlo2CESqvUNku" -d "line_items[][quantity]"=1 -d mode=payment -d success_url="https://example.com/success?session_id={CHECKOUT_SESSION_ID}" -d cancel_url="https://example.com/cancel"

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {/* global State/context  */}
          <StoreProvider>
            <Nav />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/orderHistory" component={OrderHistory} />
            <Route exact path="/products/:id" component={Detail} />
            <Route component={NoMatch} />
            <Route path="/success" element={<Success />} />
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
