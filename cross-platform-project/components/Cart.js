import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart, updateQuantity } from "../redux/cartSlice";
import {
  FlatList,
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TextInput,
  Modal,
  Alert
} from "react-native";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    setModalType("clear");
    setIsModalVisible(true);
  };

  const confirmClearCart = () => {
    dispatch(clearCart());
    setIsModalVisible(false);
  };

  const cancelModal = () => {
    setIsModalVisible(false);
    setEmail("");
    setEmailError("");
    setAddress("");
    setAddressError("");
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setModalType("empty");
    } else {
      setModalType("checkout");
    }
    setIsModalVisible(true);
  };

  const handleProceed = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!address.trim()) {
      setAddressError("Address is required.");
      isValid = false;
    } else {
      setAddressError("");
    }

    if (isValid) {
      Alert.alert("Success", "Order has been sent.");
      console.log("Order has been sent.")
      dispatch(clearCart());
      setIsModalVisible(false);
      setEmail("");
      setAddress("");
    }
  };

  const calculateSubtotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{
          uri:
            item.strMealThumb ||
            item.image ||
            "https://via.placeholder.com/150",
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{item.strMeal || item.title}</Text>
        <Text>Price: ${item.price}</Text>
        <View style={styles.quantityContainer}>
          <Text>Quantity:</Text>
          <TextInput
            style={styles.quantityInput}
            value={item.quantity.toString()}
            keyboardType="numeric"
            onChangeText={(text) =>
              handleQuantityChange(item.idMeal || item.id, text)
            }
          />
          <Button
            title="Remove"
            onPress={() => handleRemove(item.idMeal || item.id)}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.idMeal || item.id}
      />
      <Text style={styles.subtotalText}>Subtotal: ${calculateSubtotal()}</Text>
      <Button title="Checkout" onPress={handleCheckout}/>
      <Button title="Clear Cart" onPress={handleClearCart} />
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {modalType === "empty" && (
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Your cart is empty!</Text>
                <Button title="Cancel" onPress={cancelModal} />
              </View>
            )}

            {modalType === "clear" && (
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Are you sure you want to clear your cart?
                </Text>
                <View style={styles.buttonContainer}>
                  <Button title="Yes" onPress={confirmClearCart} />
                  <Button title="No" onPress={cancelModal} />
                </View>
              </View>
            )}

            {modalType === "checkout" && (
              <View style={styles.modalContent}>
                <TextInput
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                />
                {emailError && <Text style={styles.error}>{emailError}</Text>}
                <TextInput
                  placeholder="Enter your address"
                  value={address}
                  onChangeText={setAddress}
                  style={styles.input}
                />
                {addressError && (
                  <Text style={styles.error}>{addressError}</Text>
                )}
                <Button title="Proceed" onPress={handleProceed} />
                <Button title="Cancel" onPress={cancelModal} />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtotalText: {
    fontSize: 16,
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityInput: {
    width: 50,
    height: 30,
    borderColor: "#ccc",
    borderWidth: 1,
    textAlign: "center",
    marginHorizontal: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Lighter background
  },
  modalContainer: {
    backgroundColor: "#fff", // White background for the modal
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    marginBottom: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    justifyContent: "center",
  },
});

export default Cart;
