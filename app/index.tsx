import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from './navigation/StackNavigator';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function AppEntrypoint() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer independent={true}>
        <StackNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default AppEntrypoint;