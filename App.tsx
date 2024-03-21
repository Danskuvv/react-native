import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MenuProvider} from 'react-native-popup-menu';
import Navigator from './src/navigators/Navigator';
import {UserProvider} from './src/contexts/UserContext';
import {UpdateProvider} from './src/contexts/UpdateContext';

const App = () => {
  console.log('moro');
  return (
    <MenuProvider>
      <SafeAreaProvider>
        <UserProvider>
          <UpdateProvider>
            <Navigator />
            <StatusBar style="auto" />
          </UpdateProvider>
        </UserProvider>
      </SafeAreaProvider>
    </MenuProvider>
  );
};

export default App;
