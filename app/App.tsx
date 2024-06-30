import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import ProductScreen from "./screens/ProductScreen";
import AddProductScreen from "./screens/AddProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { singInSelector } from "./redux/auth/Auth.selector";
import { useDispatch, useSelector } from "react-redux";
import { ProductStackParamList, Route } from "./typs";
import { Button } from "react-native";
import { authActions } from "./redux/auth";
import EditProductScreen from "./screens/EditProductScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const ProductStack = createStackNavigator<ProductStackParamList>();

const ProductStackNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen
        name={Route.Product}
        component={ProductScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={() => dispatch(authActions.logoutSuccess())}
              title="Log out"
              color="#f00"
            />
          ),
        }}
      />
      <ProductStack.Screen
        name={Route.EditProduct}
        component={EditProductScreen}
      />
    </ProductStack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={Route.ProductStack}
        component={ProductStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen name={Route.AddProduct} component={AddProductScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  const isSignedIn = useSelector(singInSelector);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        {!isSignedIn ? (
          <>
            <Stack.Screen
              name={Route.Login}
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name={Route.Register} component={RegisterScreen} />
          </>
        ) : (
          <Stack.Screen
            name={Route.Home}
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
