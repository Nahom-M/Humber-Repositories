import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addItem, setLoading } from "../redux/cartSlice";
import Icon from "react-native-vector-icons/Ionicons";
import * as Progress from "react-native-progress";

function Products({ navigation }) {
  const [mealItems, setMealItems] = useState([]);
  const [recipeItems, setRecipeItems] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const loading = useSelector((state) => state.cart.loading);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(10)).current;

  // Store animations for each product button
  const bounceAnimMap = useRef({});

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.cartIconContainer}>
          <Icon
            name="cart-outline"
            size={24}
            onPress={() => navigation.navigate("Cart")}
          />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cart.length}</Text>
          </View>
        </View>
      ),
    });
  }, [cart.length, navigation]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true)); // Set loading to true when fetching starts
      try {
        const [api1Response, api2Response] = await Promise.all([
          fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a"),
          fetch("https://dummyjson.com/recipes"),
        ]);

        const api1Data = await api1Response.json();
        const api2Data = await api2Response.json();

        const mealsWithDescriptions = api1Data.meals?.map((meal) => ({
          ...meal,
          price: 12,
          description: meal.strInstructions,
        })) || [];

        //Limit to the first 3 items for the second API and add price
        const recipes = api2Data.recipes?.slice(0, 3).map((recipe) => ({
          id: recipe.id, //Add the ID from the second API
          name: recipe.name,
          image: recipe.image,
          price: 8, //Custom price for second API items
        })) || [];

        setMealItems(mealsWithDescriptions);
        setRecipeItems(recipes);

        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start();
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        dispatch(setLoading(false)); // Set loading to false when fetching is done
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddItem = (item) => {
    const productToAdd = {
      id: item.idMeal || item.id,
      strMeal: item.strMeal || item.name, 
      price: item.price,
      image: item.strMealThumb || item.image, 
      quantity: 1,  // Default quantity to 1
    };
    dispatch(addItem(productToAdd));
    Alert.alert("Item Added", `${productToAdd.strMeal} has been added to your cart. Change item quantity in cart.`);
    console.log("Item added in cart. Change item quantity in cart.")

    if (!bounceAnimMap.current[item.idMeal || item.id]) {
      bounceAnimMap.current[item.idMeal || item.id] = new Animated.Value(1);
    }

    const bounceAnim = bounceAnimMap.current[item.idMeal || item.id];

    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderMealItem = ({ item }) => {
    if (!bounceAnimMap.current[item.idMeal || item.id]) {
      bounceAnimMap.current[item.idMeal || item.id] = new Animated.Value(1);
    }

    const bounceAnim = bounceAnimMap.current[item.idMeal || item.id];

    return (
      <Animated.View
        style={[styles.item, { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }]}
      >
        <Image
          source={{
            uri: item.strMealThumb || item.image || "https://via.placeholder.com/150",
          }}
          style={styles.image}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.name}>{item.strMeal || item.title}</Text>
          <Text style={styles.price}>Price: ${item.price}</Text>
          <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
            <TouchableOpacity
              onPress={() => handleAddItem(item)}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    );
  };

  const renderRecipeItem = ({ item }) => {
    if (!bounceAnimMap.current[item.idMeal || item.id]) {
      bounceAnimMap.current[item.idMeal || item.id] = new Animated.Value(1);
    }

    const bounceAnim = bounceAnimMap.current[item.idMeal || item.id];

    return (
      <Animated.View
        style={[styles.item, { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }]}
      >
        <Image
          source={{
            uri: item.image || "https://via.placeholder.com/150",
          }}
          style={styles.image}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>Price: ${item.price}</Text>
          <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
            <TouchableOpacity
              onPress={() => handleAddItem(item)}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Products...</Text>
        <Progress.Bar progress={0.5} width={200} color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.flatlistContainer}>
        <Text style={styles.header}>Menu 1</Text>
        <FlatList
          data={mealItems}
          renderItem={renderMealItem}
          keyExtractor={(item) => item.idMeal ? item.idMeal.toString() : item.id.toString()}
        />
      </View>
      <View style={styles.flatlistContainer}>
        <Text style={styles.header}>Menu 2</Text>
        <FlatList
          data={recipeItems}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id.toString()} // Use the ID from the second API
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  flatlistContainer: {
    flex: 1,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    marginBottom: 10,
  },
  cartIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    resizeMode: "cover",
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: "#666",
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Products;
