import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store"; // Ensure this points to your store file

// Wrap the App with Provider to provide the Redux store to the app
const RootComponent = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

registerRootComponent(RootComponent);
