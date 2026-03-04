import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";

// Import the logo image
import logo from "../image/logo.png"; // Adjust the path based on your file structure

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Shared values for animation
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const height = useSharedValue(50); // Initial button height
  const width = useSharedValue(200); // Initial button width
  const translateY = useSharedValue(0);

  // Handle button press
  const handlePress = () => {
    if (!isExpanded) {
      // Animate button transition
      height.value = withTiming(150, { duration: 500, easing: Easing.ease });
      width.value = withTiming(300, { duration: 500, easing: Easing.ease });
      opacity.value = withTiming(0, { duration: 300 }, () => {
        // After fade-out, show the "About Us" content
        setIsExpanded(true);
        opacity.value = withTiming(1, { duration: 300 });
      });
      translateY.value = withSpring(-50, { damping: 5, stiffness: 100 });
    }
  };

  // Animated styles
  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      width: width.value,
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />

      <Text style={styles.header}>Welcome To PANAMAKAAH</Text>

      {/* Animated Button/Box */}
      <Animated.View style={[styles.button, animatedButtonStyle]}>
        {isExpanded ? (
          <Text style={styles.text}>
            The shopping cart application with the goal of delivering meals to
            everyone!
          </Text>
        ) : (
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.buttonText}>About Us</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2ecc71",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 20,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});

export default Home;
