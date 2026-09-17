import { StatusBar } from 'expo-status-bar';
import {NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import {Colors} from "./constants/colors";
import Map from "./screens/Map";
import {useEffect, useState} from "react";
import {init} from "./util/database";
import * as SplashScreen from "expo-splash-screen";
import PlaceDetails from "./screens/PlaceDetails";

SplashScreen.preventAutoHideAsync().catch(() => {});

const Stack = createNativeStackNavigator();

export default function App() {
    const [dbInitialized, setDbInitialized] = useState(false);

    useEffect(() => {
        init().then(()=>{
            setDbInitialized(true);
        }).catch((error)=>{
            console.error(error);
        });
    }, []);

    useEffect(() => {
        if (dbInitialized) {
            SplashScreen.hideAsync().catch(() => {});
        }
    }, [dbInitialized]);

    if (!dbInitialized) {
        return null;
    }

  return (
     <>
       <StatusBar style="dark" />
       <NavigationContainer>
         <Stack.Navigator
             screenOptions={{
                 headerStyle: {backgroundColor: Colors.primary500},
                 headerTintColor: Colors.gray700,
                 contentStyle: {backgroundColor: Colors.gray700},
             }}
         >
           <Stack.Screen
               name='AllPlaces'
               component={AllPlaces}
               options={({navigation}) => ({
                title: 'Your Favorite Places',
                 headerRight : ({tintColor}) => (
                     <IconButton
                         icon='add'
                         size={24}
                         color={tintColor}
                         onPress={() => navigation.navigate('AddPlace')}
                     />
                 )
               })}
           />
           <Stack.Screen
               name='AddPlace'
               component={AddPlace}
               options={{
                   title: 'Add new Place',
                   headerBackTitle: 'Back',
               }}
           />
             <Stack.Screen name='Map' component={Map} />
             <Stack.Screen
                 name='PlaceDetails'
                 component={PlaceDetails}
                 options={
                 {
                     title:'Loading Place...'
                 }
             } />
         </Stack.Navigator>
       </NavigationContainer>
     </>
  );
}