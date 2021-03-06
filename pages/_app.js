import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/client";
import App from "next/app";
import { AppProvider } from "@shopify/polaris";
import { Provider, useAppBridge } from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import { ProductWrapper } from '../context/ProductContext'; // import based on where you put it
import Router from '../utils/RoutePropagator';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}

function MyProvider(props) {
  const app = useAppBridge();

    if (typeof window !== "undefined") {
      window.app = app; // save instance of app in window variable for use with auth fetch
    }

  const client = new ApolloClient({
    fetch: userLoggedInFetch(app),
    fetchOptions: {
      credentials: "include",
    },
  });

  const Component = props.Component;

  return (
    <ProductWrapper>
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
    </ProductWrapper>
  );
}



class MyApp extends App {
  render() {
    const { Component, pageProps, host } = this.props;

     return (
      <AppProvider i18n={translations}>
        <Provider
          config={{
            apiKey: API_KEY,
            host: host,
            forceRedirect: true,
          }}
        >
          <Router />
          <ToastContainer />
          <MyProvider Component={Component} {...pageProps} />
        </Provider>
      </AppProvider>
     );
    }
  }


MyApp.getInitialProps = async ({ ctx }) => {
  return {
    host: ctx.query.host,
  };
};

export default MyApp;