// design
import { COLORS } from './src/config/colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'

// native components
import { NativeBaseProvider, Box, Text } from 'native-base';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// screens
import DashboardScreen from './src/screens/DashboardScreen';
import ChamadoFormScreen from './src/screens/Forms/ChamadoFormScreen';
import AnalistaFormScreen from './src/screens/Forms/AnalistaFormScreen';
import ChamadosScreen from './src/screens/ChamadosScreen';
import AnalistasScreen from './src/screens/AnalistasScreen';

const DashboardOverview = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerStyle: { backgroundColor: COLORS.bluegrey[600] },
      headerTintColor: COLORS.white,
      tabBarStyle: { backgroundColor: COLORS.bluegrey[600], height: 60, paddingBottom: 3, paddingTop: 3 },
      tabBarActiveTintColor: COLORS.orange[200],
      tabBarInactiveTintColor: COLORS.white,
      tabBarLabelStyle: { fontSize: 16 }
    }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{
        tabBarIcon: ({ color, size }) => <AntDesign name="barschart" size={size} color={color} />,
      }} />
      <Tab.Screen name="Chamados" component={ChamadosScreen} options={{
        tabBarIcon: ({ color, size }) => <FontAwesome name="th-list" size={size} color={color} />,
      }} />
      <Tab.Screen name="Analistas" component={AnalistasScreen} options={{
        tabBarIcon: ({ color, size }) => <Fontisto name="person" size={size} color={color} />,
      }} />
    </Tab.Navigator>
  )
}


const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="DashboardOverview" component={DashboardOverview} options={{ headerShown: false }} />
          <Stack.Screen name="ChamadoFormScreen" component={ChamadoFormScreen} />
          <Stack.Screen name="AnalistaFormScreen" component={AnalistaFormScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
export default App;