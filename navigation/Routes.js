/* eslint-disable react-native/no-inline-styles */
//Public
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import PublicRegistration from '../screens/Common/publicRegistration';
import Login from '../screens/Common/login';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Notifications from '../screens/Public/notifications';
import forgotPassword from '../screens/Common/forgotPassword';
import colorConstant from '../constants/colorConstant';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ExploreAvailability from '../screens/Public/Availability/exploreAvailability';
import ExploreRequest from '../screens/Public/exploreRequest';
import AddAvailabilityRequest from '../screens/Public/addAvailabilityRequest';
import DashboardPublic from '../screens/Public/dashboardPublic';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryDonation from '../screens/Public/historyDonation';
import HistoryRequest from '../screens/Public/historyRequest';
import SettingsPublic from '../screens/Public/settingsPublic';
import OngoingDonation from '../screens/Public/ongoingDonation';
import OngoingRequest from '../screens/Public/ongoingRequest';
import EditProfile from '../screens/Public/editProfile';
import ChangePassword from '../screens/Common/changePassword';
import DriverSettings from '../screens/Public/Driver/driverSettings';
import AboutUs from '../screens/Public/aboutUs';
import PrivacyPolicy from '../screens/Public/privacyPolicy';
import TermsCondition from '../screens/Public/termsCondition';
import Welcome_Page from '../screens/Common/welcomScreen';
import OrganizationRegister from '../screens/Common/organizationRegister';
import PersonRegister from '../screens/Public/personRegister';
import DashboardNgo from '../screens/NGO/dashboardNgo';
import SplashScreen from '../screens/Common/splashScreen';
import SettingsOrganization from '../screens/NGO/settingsOrganization';
import BrowseAvailability from '../screens/Public/Availability/browseAvailability';
import FilterResults from '../screens/Public/filterResults';
import DonationTrackingMap from '../screens/Public/donationTrackingMap';
import OngoingDeliveryDetails from '../screens/Public/ongoingDeliveryDetails';
import RequestForDonation from '../screens/Public/requestsForDonation';
import availabilityInputSetOne from '../screens/Public/Availability Creation/availabilityInputSetOne';
import availabilityInputSetTwo from '../screens/Public/Availability Creation/availabilityInputSetTwo';
import availabilityInputSetThree from '../screens/Public/Availability Creation/availabilityInputSetThree';
import RequestCreationSetOne from '../screens/Public/Request Creation/RequestCreationSetOne';
import findLocationMap from '../screens/Public/Availability Creation/findLocationMap';
import cameraScreen from '../screens/Common/cameraScreen';
import driverRegistrationSetOne from '../screens/Public/Driver/driverRegistrationSetOne';
import driverRegistrationSetTwo from '../screens/Public/Driver/driverRegistrationSetTwo';
import CameraLicenseProof from '../screens/Public/Driver/cameraLicenseProof';
import cameraScreenDriver from '../screens/Public/Driver/cameraScreenDriver';
import CameraVehicleProof from '../screens/Public/Driver/cameraVehicleProof';
import RequestCreationSetTwo from '../screens/Public/Request Creation/RequestCreationSetTwo';
import findLocationMapRequest from '../screens/Public/Request Creation/findLocationMapRequest';
import AddItemsRequest from '../screens/Public/Request Creation/addItemsRequest';
import cameraScreenRequest from '../screens/Public/Request Creation/cameraScreenRequest';
import ChatComponent from '../screens/Common/chatComponent';
import Conversations from '../screens/Public/Conversations';
import CommonCheck from '../screens/Public/commonCheck';
import collectionPointsPublic from '../screens/Public/collectionPoints';
import sellingPointsPublic from '../screens/Public/sellingPoints';
//Ngo
import HistoryDonationNgo from '../screens/NGO/historyDonationNgo';
import HistoryRequestNgo from '../screens/NGO/historyRequestNgo';
import OngoingDonationNgo from '../screens/NGO/ongoingDonationNgo';
import OngoingRequestNgo from '../screens/NGO/ongoingRequestNgo';
import HistoryCollectionPoint from '../screens/NGO/historyCollectionPoint';
import OngoingCollectionPoint from '../screens/NGO/ongoingCollectionPoint';
import OngoingDeliveryDetailsNgo from '../screens/NGO/ongoingDeliveryDetailsNgo';
import OngoingRequestDetailsNgo from '../screens/NGO/ongoingRequestDetailsNgo';
import CreateActionNgo from '../screens/NGO/createActionNgo';
import availabilityInputSetOneNgo from '../screens/NGO/Availability Creation/availabilityInputSetOne';
import availabilityInputSetTwoNgo from '../screens/NGO/Availability Creation/availabilityInputSetTwo';
import availabilityInputSetThreeNgo from '../screens/NGO/Availability Creation/availabilityInputSetThree';
import RequestForDonationNgo from '../screens/NGO/requestsForDonationNgo';
import DonationTrackingMapNgo from '../screens/NGO/donationTrackingMapNgo';
import NotificationsNgo from '../screens/NGO/notificationsNgo';
import BrowseAvailabilityNgo from '../screens/NGO/browseAvailabilityNgo';
import ExploreAvailabilityNgo from '../screens/NGO/exploreAvailabilityNgo';
import ExploreRequestNgo from '../screens/NGO/exploreRequestNgo';
import FilterResultsNgo from '../screens/NGO/filterResultsNgo';
import collectionpointInputSetOne from '../screens/NGO/Collectionpoint Creation/collectionpointInputSetOne';
import collectionpointInputSetTwo from '../screens/NGO/Collectionpoint Creation/collectionpointInputSetTwo';
import OngoingCollectionpointDetailsNgo from '../screens/NGO/ongoingCollectionpointDetailsNgo';
import BrowseCollectionpointNgo from '../screens/NGO/browseCollectionpointNgo';
import CollectionpointTrackingMapNgo from '../screens/NGO/Collectionpoint Creation/collectionpointTrackingMapNgo';
import findLocationMapAvailability from '../screens/NGO/Availability Creation/findLocationMapAvailability';
import RequestCreationSetOneNgo from '../screens/NGO/Request Creation/RequestCreationSetOne';
import RequestCreationSetTwoNgo from '../screens/NGO/Request Creation/RequestCreationSetTwo';
import findLocationMapRequestNgo from '../screens/NGO/Request Creation/findLocationMapRequest';
import AddItemsRequestNgo from '../screens/NGO/Request Creation/addItemsRequest';
import cameraScreenRequestNgo from '../screens/NGO/Request Creation/cameraScreenRequest';
import AddMember from '../screens/NGO/addMember';
//home
import DashboardHome from '../screens/CareHome/dashboardHome';
import HistoryDonationHome from '../screens/CareHome/historyDonationHome';
import HistoryRequestHome from '../screens/CareHome/historyRequestHome';
import CreateActionHome from '../screens/CareHome/createActionHome';
import OngoingDeliveryDetailsHome from '../screens/CareHome/ongoingDeliveryDetailsHome';
import RequestForDonationHome from '../screens/CareHome/requestsForDonationHome';
import OngoingDonationHome from '../screens/CareHome/ongoingDonationHome';
import DonationTrackingMapHome from '../screens/CareHome/donationTrackingMapHome';
import OngoingRequestHome from '../screens/CareHome/ongoingRequestHome';
import availabilityInputSetOneHome from '../screens/CareHome/Availability Creation/availabilityInputSetOne';
import availabilityInputSetTwoHome from '../screens/CareHome/Availability Creation/availabilityInputSetTwo';
import availabilityInputSetThreeHome from '../screens/CareHome/Availability Creation/availabilityInputSetThree';
import RequestCreationSetOneHome from '../screens/CareHome/Request Creation/RequestCreationSetOne';
import findLocationMapHome from '../screens/CareHome/Availability Creation/findLocationMap';
import findLocationMapRequestHome from '../screens/CareHome/Request Creation/findLocationMapRequest';
import NotificationsHome from '../screens/CareHome/notificationsHome';
import RequestCreationSetTwoHome from '../screens/CareHome/Request Creation/RequestCreationSetTwo';
import BrowseAvailabilityHome from '../screens/CareHome/browseAvailabilityHome';
import ExploreAvailabilityHome from '../screens/CareHome/exploreAvailabilityHome';
import ExploreRequestHome from '../screens/CareHome/exploreRequestHome';
import FilterResultsHome from '../screens/CareHome/filterResultsHome';
//shop
import DashboardShops from '../screens/Shops/dashboardShops';
import HistorySellingpoint from '../screens/Shops/Selling Point/historySellingpoint';
import OngoingSellingpoint from '../screens/Shops/Selling Point/ongoingSellingpoint';
import OngoingSellingpointDetails from '../screens/Shops/Selling Point/ongoingSellingpointDetails';
import CreateActionShop from '../screens/Shops/createActionShop';
import sellingpointInputSetOne from '../screens/Shops/Selling Point Creation/sellingpointInputSetOne';
import sellingpointInputSetTwo from '../screens/Shops/Selling Point Creation/sellingpointInputSetTwo';
import findLocationMapSellingpoint from '../screens/Shops/Selling Point Creation/findLocationMapSellingpoint';
import cameraScreenSellingPoint from '../screens/Shops/Selling Point Creation/cameraScreenSellingpoint';
import NotificationsShop from '../screens/Shops/notificationsShop';
import ExploreRequestShop from '../screens/Shops/exploreRequestShop';
import ExploreSellingpoint from '../screens/Shops/exploreSellingpoint';
import FilterResultsShop from '../screens/Shops/filterResultsShop';
import SettingsOrganizationShop from '../screens/Shops/settingsOrganization';
//Restaurant
import DashboardRestaruant from '../screens/Restaruant/dashboardRestaurant';
import HistoryDonationRest from '../screens/Restaruant/Donation/historyDonationRest';
import OngoingDonationRest from '../screens/Restaruant/Donation/ongoingDonation';
import OngoingDeliveryDetailsRest from '../screens/Restaruant/Donation/ongoingDeliveryDetails';
import RequestForDonationRest from '../screens/Restaruant/Donation/requestsForDonation';
import DonationTrackingMapRest from '../screens/Restaruant/Donation/donationTrackingMap';
import CreateActionRest from '../screens/Restaruant/createAction';
import availabilityInputSetOneRest from '../screens/Restaruant/Availability Creation/availabilityInputSetOne';
import availabilityInputSetTwoRest from '../screens/Restaruant/Availability Creation/availabilityInputSetTwo';
import availabilityInputSetThreeRest from '../screens/Restaruant/Availability Creation/availabilityInputSetThree';
import findLocationMapRest from '../screens/CareHome/Availability Creation/findLocationMap';

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
      <Stack.Screen name="History-Donation" component={HistoryDonationNgo} />
      <Stack.Screen name="History-Request" component={HistoryRequestNgo} />
      <Stack.Screen name="PublicSetting" component={SettingsPublic} />
      <Stack.Screen name="OngoingDonation" component={OngoingDonationNgo} />
      <Stack.Screen name="OngoingRequest" component={OngoingRequestNgo} />

      <Stack.Screen
        name="History-Collection-Point"
        component={HistoryCollectionPoint}
      />
      <Stack.Screen
        name="OngoingCollectionPoint"
        component={OngoingCollectionPoint}
      />
      <Stack.Screen
        name="OngoingDeliveryDetailsNgo"
        component={OngoingDeliveryDetailsNgo}
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
        name="OngoingCollectionpointDetailsNgo"
        component={OngoingCollectionpointDetailsNgo}
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
        name="AddMember"
        component={AddMember}
        options={{
          headerTintColor: '#ffffff',
          title: 'Add Member',
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
        name="OngoingRequestDetailsNgo"
        component={OngoingRequestDetailsNgo}
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
        name="BrowseAvailabilityNgo"
        component={BrowseAvailabilityNgo}
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
        name="BrowseCollectionpointNgo"
        component={BrowseCollectionpointNgo}
        options={{
          headerTintColor: '#ffffff',
          title: 'Collection Point',
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
        name="FilterResultsNgo"
        component={FilterResultsNgo}
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
        name="availabilityInputSetOne"
        component={availabilityInputSetOneNgo}
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
        component={availabilityInputSetTwoNgo}
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
        component={availabilityInputSetThreeNgo}
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
        name="collectionpointInputSetOne"
        component={collectionpointInputSetOne}
        options={{
          headerTintColor: '#ffffff',
          title: 'Create Collection Point',
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
        name="collectionpointInputSetTwo"
        component={collectionpointInputSetTwo}
        options={{
          headerTintColor: '#ffffff',
          title: 'Create Collection Point',
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
        name="RequestForDonationNgo"
        component={RequestForDonationNgo}
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
        name="DonationTrackingMapNgo"
        component={DonationTrackingMapNgo}
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
        name="CollectionpointTrackingMapNgo"
        component={CollectionpointTrackingMapNgo}
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
        name="findLocationMapAvailability"
        component={findLocationMapAvailability}
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
        name="CreateRequestNgo"
        component={RequestCreationSetOneNgo}
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
        name="RequestCreationSetTwoNgo"
        component={RequestCreationSetTwoNgo}
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
        name="AddItemsRequestNgo"
        component={AddItemsRequestNgo}
        options={{
          headerTintColor: '#ffffff',
          title: 'Add Items',
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
        name="findLocationMapRequest"
        component={findLocationMapRequestNgo}
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
        name="cameraScreenRequestNgo"
        component={cameraScreenRequestNgo}
        options={{
          headerTintColor: '#ffffff',
          title: 'Camera',
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
        component={CreateActionNgo}
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
        component={NotificationsNgo}
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
      <Top.Screen name="Availability" component={ExploreAvailabilityNgo} />
      <Top.Screen name="Request" component={ExploreRequestNgo} />
      <Top.Screen name="Collection Point" component={ExploreRequestNgo} />
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
      barStyle={{
        backgroundColor: '#ffffff',
      }}>
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
        name="conversations"
        component={Conversations}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="chat-outline"
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
      tabBarOptions={{
        indicatorStyle: {
          backgroundColor: '#ffffff',
          paddingTop: 5,
          borderRadius: 10,
        },
        labelStyle: {fontSize: 15, fontFamily: 'Barlow-Bold', color: '#ffffff'},
        style: {backgroundColor: colorConstant.primaryColor},
        scrollEnabled: true,
        tabStyle: {width: 180},
      }}>
      <Top.Screen name="Donations" component={ExploreAvailability} />
      <Top.Screen name="Request" component={ExploreRequest} />
      <Top.Screen
        name="collection  points"
        component={collectionPointsPublic}
      />
      <Top.Screen name="selling  points" component={sellingPointsPublic} />
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
      <Stack.Screen
        name="DriverSettings"
        component={DriverSettings}
        options={{
          headerTintColor: '#ffffff',
          title: 'Driver Option',
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
        component={RequestCreationSetOne}
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
        name="RequestCreationSetTwo"
        component={RequestCreationSetTwo}
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
        name="AddItemsRequest"
        component={AddItemsRequest}
        options={{
          headerTintColor: '#ffffff',
          title: 'Add Items',
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
        name="findLocationMapRequest"
        component={findLocationMapRequest}
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
      <Stack.Screen
        name="registerDriverOne"
        component={driverRegistrationSetOne}
        options={{
          headerTintColor: '#ffffff',
          title: 'Register Driver',
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
        name="registerDriverTwo"
        component={driverRegistrationSetTwo}
        options={{
          headerTintColor: '#ffffff',
          title: 'Register Driver',
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
        name="CameraLicenseProof"
        component={CameraLicenseProof}
        options={{
          headerTintColor: '#ffffff',
          title: 'Capture Proof',
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
        name="CameraVehicleProof"
        component={CameraVehicleProof}
        options={{
          headerTintColor: '#ffffff',
          title: 'Capture Proof',
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
        name="cameraScreenDriver"
        component={cameraScreenDriver}
        options={{
          headerTintColor: '#ffffff',
          title: 'Capture Proof',
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
        name="cameraScreenRequest"
        component={cameraScreenRequest}
        options={{
          headerTintColor: '#ffffff',
          title: 'Camera',
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
        name="chatComponent"
        component={ChatComponent}
        options={{
          headerTintColor: '#ffffff',
          title: 'Chat',
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
        name="CommonCheck"
        component={CommonCheck}
        options={{
          headerTintColor: '#ffffff',
          title: 'CommonCheck',
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

//home
const DashboardHomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={DashboardHomeTap}
      />
      <Stack.Screen name="History-Donation" component={HistoryDonationHome} />
      <Stack.Screen name="History-Request" component={HistoryRequestHome} />
      <Stack.Screen name="PublicSetting" component={SettingsPublic} />
      <Stack.Screen name="OngoingDonation" component={OngoingDonationHome} />
      <Stack.Screen name="OngoingRequest" component={OngoingRequestHome} />

      <Stack.Screen
        name="OngoingDeliveryDetailsHome"
        component={OngoingDeliveryDetailsHome}
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
        name="BrowseAvailabilityHome"
        component={BrowseAvailabilityHome}
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
        name="FilterResultsHome"
        component={FilterResultsHome}
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
        name="availabilityInputSetOneHome"
        component={availabilityInputSetOneHome}
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
        name="availabilityInputSetTwoHome"
        component={availabilityInputSetTwoHome}
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
        name="availabilityInputSetThreeHome"
        component={availabilityInputSetThreeHome}
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
        name="RequestForDonationHome"
        component={RequestForDonationHome}
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
        name="DonationTrackingMapHome"
        component={DonationTrackingMapHome}
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
        name="findLocationMapHome"
        component={findLocationMapHome}
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
        name="CreateRequestHome"
        component={RequestCreationSetOneHome}
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
        name="RequestCreationSetTwoHome"
        component={RequestCreationSetTwoHome}
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
        name="findLocationMapRequest"
        component={findLocationMapRequestHome}
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
    </Stack.Navigator>
  );
};

const DashboardHomeTap = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={colorConstant.proRed}
      inactiveColor="#727E8E"
      barStyle={{backgroundColor: '#ffffff'}}>
      <Tab.Screen
        name="Home"
        component={DashboardHome}
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
        component={ExploreHomeStack}
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
        component={CreateActionHome}
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
        name="NotificationHome"
        component={NotificationsHome}
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

const ExploreHomeStack = () => {
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
      <Top.Screen name="Availability" component={ExploreAvailabilityHome} />
      <Top.Screen name="Request" component={ExploreRequestHome} />
    </Top.Navigator>
  );
};

//shop

const DashboardShopStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={DashboardShopTap}
      />
      <Stack.Screen
        name="History-Sellingpoint"
        component={HistorySellingpoint}
      />
      <Stack.Screen name="PublicSetting" component={SettingsPublic} />
      <Stack.Screen
        name="OngoingSellingpoint"
        component={OngoingSellingpoint}
      />
      <Stack.Screen
        name="OngoingSellingpointDetails"
        component={OngoingSellingpointDetails}
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
      <Stack.Screen name="TermsCondition" component={TermsCondition} />{' '}
      <Stack.Screen
        name="FilterResultsShop"
        component={FilterResultsShop}
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
        name="sellingpointInputSetOne"
        component={sellingpointInputSetOne}
        options={{
          headerTintColor: '#ffffff',
          title: 'Create Selling Point',
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
        name="sellingpointInputSetTwo"
        component={sellingpointInputSetTwo}
        options={{
          headerTintColor: '#ffffff',
          title: 'Create Selling Point',
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
        name="findLocationMapSellingpoint"
        component={findLocationMapSellingpoint}
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
        name="cameraScreenSellingPoint"
        component={cameraScreenSellingPoint}
        options={{
          headerTintColor: '#ffffff',
          title: 'Camera',
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

const DashboardShopTap = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={colorConstant.proRed}
      inactiveColor="#727E8E"
      barStyle={{backgroundColor: '#ffffff'}}>
      <Tab.Screen
        name="Home"
        component={DashboardShops}
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
        component={ExploreShopStack}
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
        component={CreateActionShop}
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
        name="NotificationHome"
        component={NotificationsShop}
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
        component={SettingsOrganizationShop}
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

const ExploreShopStack = () => {
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
      <Top.Screen name="Selling Point" component={ExploreSellingpoint} />
      <Top.Screen name="Request" component={ExploreRequestShop} />
    </Top.Navigator>
  );
};

//Restaruant
const DashboardRestaurantStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={DashboardRestaruantTap}
      />
      <Stack.Screen name="History-Donation" component={HistoryDonationRest} />
      <Stack.Screen name="PublicSetting" component={SettingsPublic} />
      <Stack.Screen name="OngoingDonation" component={OngoingDonationRest} />

      <Stack.Screen
        name="OngoingDeliveryDetailsRest"
        component={OngoingDeliveryDetailsRest}
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
        name="RequestForDonationRest"
        component={RequestForDonationRest}
        options={{
          headerTintColor: '#ffffff',
          title: 'Request',
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
        name="availabilityInputSetOneRest"
        component={availabilityInputSetOneRest}
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
        name="availabilityInputSetTwoRest"
        component={availabilityInputSetTwoRest}
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
        name="availabilityInputSetThreeRest"
        component={availabilityInputSetThreeRest}
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
        name="DonationTrackingMapRest"
        component={DonationTrackingMapRest}
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
        name="findLocationMapRest"
        component={findLocationMapRest}
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
    </Stack.Navigator>
  );
};

const DashboardRestaruantTap = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={colorConstant.proRed}
      inactiveColor="#727E8E"
      barStyle={{backgroundColor: '#ffffff'}}>
      <Tab.Screen
        name="Home"
        component={DashboardRestaruant}
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
        component={ExploreRestaruantStack}
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
        component={CreateActionRest}
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
    </Tab.Navigator>
  );
};

const ExploreRestaruantStack = () => {
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
      <Top.Screen name="Selling Point" component={ExploreSellingpoint} />
      <Top.Screen name="Request" component={ExploreRequestShop} />
    </Top.Navigator>
  );
};

function InitialStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="AuthNgo" component={AuthStackNgo} />
      <Stack.Screen name="Dashboard" component={DashboardPublicStack} />
      <Stack.Screen name="DashboardNgo" component={DashboardNgoStack} />
      <Stack.Screen name="DashboardHome" component={DashboardHomeStack} />
      <Stack.Screen name="DashboardShops" component={DashboardShopStack} />
      <Stack.Screen
        name="DashboardRestaurant"
        component={DashboardRestaurantStack}
      />
      {/* <Stack.Screen name="Password" component={changePwd} /> */}
    </Stack.Navigator>
  );
}

export default InitialStack;
