import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import AddressScreen from '../screens/AddressScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ShoppingCartScreen}
        name="cart"
        options={{title: 'Giỏ hàng'}}
      />
      <Stack.Screen
        component={AddressScreen}
        name="Address"
        options={{title: 'Địa chỉ'}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
