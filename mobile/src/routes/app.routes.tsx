import React from 'react';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';
import { useTheme } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewPoll from '../screens/NewPoll';
import ListPolls from '../screens/ListPolls';
import { Platform } from 'react-native';
import FindPoll from '../screens/FindPoll';
import Details from '../screens/Details';

const { Navigator, Screen } = createBottomTabNavigator();


const AppRoutes: React.FC = () => {
  const { colors, sizes } = useTheme();
  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarLabelPosition: 'beside-icon',
      tabBarActiveTintColor: colors.yellow[500],
      tabBarInactiveTintColor: colors.gray[300],
      tabBarStyle: {
        position: 'absolute',
        height: sizes[22],
        borderTopWidth: 0,
        backgroundColor: colors.gray[800],
      },
      tabBarItemStyle: {
        position: 'relative',
        top: Platform.OS === 'android' ? -10 : 0
      }
    }}>
      <Screen
        name="new"
        component={NewPoll}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={sizes[6]} />,
          tabBarLabel: 'Novo bolão'
        }}
      />
      <Screen
        name="list-polls"
        component={ListPolls}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={sizes[6]} />,
          tabBarLabel: 'Meus bolões'
        }}
      />
      <Screen
        name="find-poll"
        component={FindPoll}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="details"
        component={Details}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
}

export default AppRoutes;