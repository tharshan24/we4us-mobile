/* eslint-disable react-native/no-inline-styles */
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import Registration from '../screens/registration';
import Login from '../screens/login';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Notification from '../screens/notification';
import forgotPassword from '../screens/forgotPassword';
import colorConstant from '../constants/colorConstant';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ExploreAvailability from '../screens/exploreAvailability';
import ExploreRequest from '../screens/exploreRequest';
import AddAction from '../screens/AddAction';
import DashboardPublic from '../screens/dashboardPublic';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryDonation from '../screens/historyDonation';
import HistoryRequest from '../screens/historyRequest';
import SettingsPublic from '../screens/settingsPublic';
import OngoingDonation from '../screens/ongoingDonation';
import OngoingRequest from '../screens/ongoingRequest';
import RegisterDriver from '../screens/registerDriver';
import EditProfile from '../screens/editProfile';
import ChangePassword from '../screens/changePassword';
import DriverSettings from '../screens/driverSettings';
import AboutUs from '../screens/aboutUs';
import PrivacyPolicy from '../screens/privacyPolicy';
import TermsCondition from '../screens/termsCondition';
import Welcome_Page from '../screens/welcomScreen';
import OrganizationRegister from '../screens/organizationRegister';
import PersonRegister from '../screens/personRegister';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Top = createMaterialTopTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
       options={{
          title: false,
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },}}
       name="Welcome_page" 
       component={Welcome_Page} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: false,
          headerStyle: {
            backgroundColor: colorConstant.primaryColor,
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
        }}
      />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="PersonRegister" component={PersonRegister} />
      <Stack.Screen name="OrganizationRegister" component={OrganizationRegister} />
      <Stack.Screen name="forgotPassword" component={forgotPassword} />
    </Stack.Navigator>
  );
};

const ExploreStack = () => {
  return (
    <Top.Navigator>
      <Top.Screen name="Availability" component={ExploreAvailability} />
      <Top.Screen name="Request" component={ExploreRequest} />
    </Top.Navigator>
  );
};

const DashboardPublicStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={DashboardTap}
      />
      <Stack.Screen name="History-Donation" component={HistoryDonation} />
      <Stack.Screen name="History-Request" component={HistoryRequest} />
      <Stack.Screen name="PublicSetting" component={SettingsPublic} />
      <Stack.Screen name="OngoingDonation" component={OngoingDonation} />
      <Stack.Screen name="OngoingRequest" component={OngoingRequest} />
      <Stack.Screen name="RegisterDriver" component={RegisterDriver} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTintColor: '#ffffff',
          title: 'Edit Profile',
          headerStyle: {
            backgroundColor: colorConstant.primaryColor,
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
          headerTitleStyle: {
            fontFamily: 'Barlow-SemiBold',
          },
        }}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="DriverSettings" component={DriverSettings} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsCondition" component={TermsCondition} />
    </Stack.Navigator>
  );
};

const DashboardTap = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={colorConstant.proRed}
      inactiveColor="#727E8E"
      barStyle={{backgroundColor: '#ffffff'}}>
      <Tab.Screen
        name="Home"
        component={DashboardPublic}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreStack}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="layers-search-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddAction"
        component={AddAction}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="plus-box"
              color={color}
              size={26}
              style={({alignItems: 'center'}, {flexDirection: 'column'})}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="bell-outline"
              color={color}
              size={26}
              style={({alignItems: 'center'}, {flexDirection: 'column'})}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsPublic}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="cog-outline"
              color={color}
              size={26}
              style={({alignItems: 'center'}, {flexDirection: 'column'})}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function InitialStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Dashboard" component={DashboardPublicStack} />
      {/* <Stack.Screen name="Password" component={changePwd} /> */}
    </Stack.Navigator>
  );
}

export default InitialStack;
