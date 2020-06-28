import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/auth/Login'
import Register from './screens/auth/Register'
import ForgotPassword from './screens/auth/ForgotPassword'
import BottomTabNavigator from './navigation/BottomTabNavigator';
import Nav from './navigation/Nav'
import useLinking from './navigation/useLinking';
import store from './redux/store';
import { loadUser } from './redux/actions/auth';
import { Provider, useSelector } from 'react-redux';
import axios from 'axios';

axios.defaults.baseURL = 'https://conmeter.herokuapp.com/';
axios.defaults.timeout = 6000;


const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
        
        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());
        
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'disolve': require('./assets/fonts/Disolve_regular.ttf')
        });

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  React.useEffect(()=>{
    store.dispatch(loadUser());
  },[])


  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Nav/>
        </NavigationContainer>
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
