import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './src/navigators/Navigator';
import {UserProvider} from './src/contexts/UserContext';

const App = () => {
  console.log('moro');
  return (
    <SafeAreaProvider>
      <UserProvider>
        <Navigator />
      </UserProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

export default App;
