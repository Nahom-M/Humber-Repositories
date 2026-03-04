import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View, Text } from "react-native";

// Import the separate screen components
import Home from "./components/Home";
import Contact from "./components/Contact";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Reviews from "./components/Reviews";

import logo from "./image/logo.png";

const Tab = createBottomTabNavigator();

export default function App() {
  // Sample reviews array to be passed
  const reviews = [
    { id: 1, reviewer: "John", review: "Great product, highly recommend!" },
    { id: 2, reviewer: "Jane", review: "Good quality, but could improve delivery time." },
    { id: 3, reviewer: "Alice", review: "Affordable and durable. Loved it!" },
    { id: 4, reviewer: "Michael", review: "The food was delicious, and the website is easy to navigate." },
    { id: 5, reviewer: "Sarah", review: "Excellent customer service and amazing meals!" },
    { id: 6, reviewer: "Tom", review: "Loved the flavors, and the online ordering was super simple!" },
    { id: 7, reviewer: "Emma", review: "Quick delivery, great taste, and the site looks fantastic." },
    { id: 8, reviewer: "Oliver", review: "The dishes were amazing, and the website is so user-friendly." },
    { id: 9, reviewer: "Sophia", review: "Highly recommend for both food quality and the easy-to-use site." },
    { id: 10, reviewer: "Liam", review: "Everything was perfect, from the food to the website design." },
  ];

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#3498db" }, // Customize header style
          headerTintColor: "#fff", // Header text color
          tabBarStyle: { backgroundColor: "#f0f0f0" }, // Customize bottom tab bar style
          tabBarActiveTintColor: "#3498db", // Active tab color
          tabBarInactiveTintColor: "#7f8c8d", // Inactive tab color
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image 
                source={logo} 
                style={{ width: 50, height: 50, marginRight: 10 }}
              />
              <Text style={{ color: "#fff", fontSize: 20 }}>PANAMAKAAH</Text>
            </View>
          ),
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Contacts" component={Contact} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen
          name="Products"
          component={Products}
          options={{
            headerRight: () => <></>, // Placeholder for right header component, can be customized in the future
          }}
        />
        <Tab.Screen
          name="Reviews"
          children={() => <Reviews reviews={reviews} />} // Pass reviews array to Reviews screen
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
