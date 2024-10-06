import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from './navigation/StackNavigator';

function AppEntrypoint() {
  return (
    <NavigationContainer independent={true}>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default AppEntrypoint;