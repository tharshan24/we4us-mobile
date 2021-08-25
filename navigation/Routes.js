/* eslint-disable react-native/no-inline-styles */
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import PublicRegistration from '../screens/Common/publicRegistration';
import Login from '../screens/Common/login';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Notifications from '../screens/Public/notifications';
import forgotPassword from '../screens/Common/forgotPassword';
import colorConstant from '../constants/colorConstant';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ExploreAvailability from '../screens/Public/exploreAvailability';
import ExploreRequest from '../screens/Public/exploreRequest';
import AddAvailabilityRequest from '../screens/Public/addAvailabilityRequest';
import DashboardPublic from '../screens/Public/dashboardPublic';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryDonation from '../screens/Public/historyDonation';
import HistoryRequest from '../screens/Public/historyRequest';
import SettingsPublic from '../screens/Public/settingsPublic';
import OngoingDonation from '../screens/Public/ongoingDonation';
import OngoingRequest from '../screens/Public/ongoingRequest';
import RegisterDriver from '../screens/Public/registerDriver';
import EditProfile from '../screens/Public/editProfile';
import ChangePassword from '../screens/Common/changePassword';
import DriverSettings from '../screens/Public/driverSettings';
import AboutUs from '../screens/Public/aboutUs';
import PrivacyPolicy from '../screens/Public/privacyPolicy';
import TermsCondition from '../screens/Public/termsCondition';
import Welcome_Page from '../screens/Common/welcomScreen';
import OrganizationRegister from '../screens/Common/organizationRegister';
import PersonRegister from '../screens/Public/personRegister';
import DashboardNgo from '../screens/NGO/dashboardNgo';
import SplashScreen from '../screens/Common/splashScreen';
import SettingsOrganization from '../screens/NGO/settingsOrganization';
import BrowseAvailability from '../screens/Public/browseAvailability';
import FilterResults from '../screens/Public/filterResults';
import {useNavigation} from '@react-navigation/native';
import DonationTrackingMap from '../screens/Public/donationTrackingMap';
import OngoingDeliveryDetails from '../screens/Public/ongoingDeliveryDetails';
import RequestForDonation from '../screens/Public/requestsForDonation';
import availabilityInputSetOne from '../screens/Public/availabilityInputSetOne';
import availabilityInputSetTwo from '../screens/Public/availabilityInputSetTwo';
import availabilityInputSetThree from '../screens/Public/availabilityInputSetThree';
import CreateRequest from '../screens/Public/CreateRequest';
import findLocationMap from '../screens/Public/findLocationMap';
import cameraScreen from '../screens/Common/cameraScreen';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Top = createMaterialTopTabNavigator();

// Ngo
const DashboardNgoStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={DashboardNgoTap}
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

const AuthStackNgo = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="DashboardNGO" component={DashboardNgo} /> */}
      {/* <Stack.Screen name="DashboardShops" component={DashboardShops} /> */}
      {/* <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Welcome_page" component={Welcome_Page} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={PublicRegistration} />
      <Stack.Screen name="PersonRegister" component={PersonRegister} />
      <Stack.Screen
        name="OrganizationRegister"
        component={OrganizationRegister}
      />
      <Stack.Screen name="forgotPassword" component={forgotPassword} />
    </Stack.Navigator>
  );
};

const DashboardNgoTap = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={colorConstant.proRed}
      inactiveColor="#727E8E"
      barStyle={{backgroundColor: '#ffffff'}}>
      <Tab.Screen
        name="Home"
        component={DashboardNgo}
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
        component={ExploreNgoStack}
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
        component={AddAvailabilityRequest}
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
        component={SettingsOrganization}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="cog-outline"
              color={color}
              size={26}
              style={{alignItems: 'center', flexDirection: 'column'}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const ExploreNgoStack = () => {
  return (
    <Top.Navigator
      tabBarOptions={{
        indicatorStyle: {
          backgroundColor: '#ffffff',
          paddingTop: 5,
          borderRadius: 10,
        },
        labelStyle: {fontSize: 16, fontFamily: 'Barlow-Bold', color: '#ffffff'},
        style: {backgroundColor: colorConstant.primaryColor},
      }}>
      <Top.Screen name="Availability" component={ExploreAvailability} />
      <Top.Screen name="Request" component={ExploreRequest} />
    </Top.Navigator>
  );
};

//Public Dashboard
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
        component={AddAvailabilityRequest}
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
        component={Notifications}
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

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="DashboardNGO" component={DashboardNgo} /> */}
      {/* <Stack.Screen name="DashboardShops" component={DashboardShops} /> */}
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Welcome_page" component={Welcome_Page} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={PublicRegistration} />
      <Stack.Screen name="PersonRegister" component={PersonRegister} />
      <Stack.Screen
        name="OrganizationRegister"
        component={OrganizationRegister}
      />
      <Stack.Screen name="forgotPassword" component={forgotPassword} />
    </Stack.Navigator>
  );
};

const ExploreStack = () => {
  return (
    <Top.Navigator
      screenOptions={{}}
      tabBarOptions={{
        indicatorStyle: {
          backgroundColor: '#ffffff',
          paddingTop: 5,
          borderRadius: 10,
        },
        labelStyle: {fontSize: 16, fontFamily: 'Barlow-Bold', color: '#ffffff'},
        style: {backgroundColor: colorConstant.primaryColor},
      }}>
      <Top.Screen name="Availability" component={ExploreAvailability} />
      <Top.Screen name="Request" component={ExploreRequest} />
    </Top.Navigator>
  );
};

const DashboardPublicStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={DashboardTap}
        options={{headerShown: false}}
      />
      <Stack.Screen name="History-Donation" component={HistoryDonation} />
      <Stack.Screen name="History-Request" component={HistoryRequest} />
      <Stack.Screen
        name="OngoingDonation"
        component={OngoingDonation}
        options={{
          headerTintColor: '#ffffff',
          title: 'Donations',
          headerTitleAlign: 'center',
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
      <Stack.Screen
        name="BrowseAvailability"
        component={BrowseAvailability}
        options={{
          headerTintColor: '#ffffff',
          title: 'Availabilities',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colorConstant.primaryColor,
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
          headerRightContainerStyle: {padding: 15},
          headerTitleStyle: {
            fontFamily: 'Barlow-SemiBold',
          },
        }}
      />
      <Stack.Screen
        name="FilterResults"
        component={FilterResults}
        options={{
          headerTintColor: '#ffffff',
          title: 'Filter',
          headerTitleAlign: 'center',
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
      <Stack.Screen
        name="OngoingDeliveryDetails"
        component={OngoingDeliveryDetails}
        options={{
          headerTintColor: '#ffffff',
          title: 'Details',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colorConstant.primaryColor,
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
          headerRightContainerStyle: {padding: 15},
          headerTitleStyle: {
            fontFamily: 'Barlow-SemiBold',
          },
        }}
      />
      <Stack.Screen
        name="RequestForDonation"
        component={RequestForDonation}
        options={{
          headerTintColor: '#ffffff',
          title: 'Requests',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colorConstant.primaryColor,
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
          headerRightContainerStyle: {padding: 15},
          headerTitleStyle: {
            fontFamily: 'Barlow-SemiBold',
          },
        }}
      />
      <Stack.Screen
        name="DonationTrackingMap"
        component={DonationTrackingMap}
        options={{
          headerTintColor: '#ffffff',
          title: 'Track Donation',
          headerTitleAlign: 'center',
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
      <Stack.Screen
        name="availabilityInputSetOne"
        component={availabilityInputSetOne}
        options={{
          headerTintColor: '#ffffff',
          title: 'Create Availability',
          headerTitleAlign: 'center',
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
      <Stack.Screen
        name="availabilityInputSetTwo"
        component={availabilityInputSetTwo}
        options={{
          headerTintColor: '#ffffff',
          title: 'Create Availability',
          headerTitleAlign: 'center',
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
      <Stack.Screen
        name="availabilityInputSetThree"
        component={availabilityInputSetThree}
        options={{
          headerTintColor: '#ffffff',
          title: 'Create Availability',
          headerTitleAlign: 'center',
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
      <Stack.Screen
        name="CreateRequest"
        component={CreateRequest}
        options={{
          headerTintColor: '#ffffff',
          title: 'Create Request',
          headerTitleAlign: 'center',
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
      <Stack.Screen
        name="findLocationMap"
        component={findLocationMap}
        options={{
          headerTintColor: '#ffffff',
          title: 'Mark your Place',
          headerTitleAlign: 'center',
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
      <Stack.Screen
        name="cameraScreen"
        component={cameraScreen}
        options={{
          headerTintColor: '#ffffff',
          title: 'Capture',
          headerTitleAlign: 'center',
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
    </Stack.Navigator>
  );
};

function InitialStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="AuthNgo" component={AuthStackNgo} />
      <Stack.Screen name="Dashboard" component={DashboardPublicStack} />
      <Stack.Screen name="DashboardNgo" component={DashboardNgoStack} />
      {/* <Stack.Screen name="DashboardShops" component={DashboardShops} /> */}
      {/* <Stack.Screen name="Password" component={changePwd} /> */}
    </Stack.Navigator>
  );
}

export default InitialStack;
