import "react-native-gesture-handler";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootSiblingParent } from "react-native-root-siblings";

export default function Index() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootSiblingParent>
          <App />
        </RootSiblingParent>
      </SafeAreaProvider>
    </Provider>
  );
}
