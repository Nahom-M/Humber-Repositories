import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert
} from "react-native";
import * as Progress from "react-native-progress";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);

  const handleMessageChange = (text) => {
    if (text.length <= 250) {
      setMessage(text);
      setProgress(text.length / 250);
    }
  };

  const handleSubmit = () => {
    const errors = [];
    if (!name.trim()) errors.push("Name is required.");
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim()))
      errors.push("A valid email address is required.");
    if (!phone.trim() || !/^\d{10}$/.test(phone.trim()))
      errors.push("A valid 10-digit phone number is required.");
    if (!message.trim()) errors.push("Message is required.");
    if (message.trim().length > 250)
      errors.push("Message exceeds the maximum length of 250 characters.");
  
    if (errors.length > 0) {
      setInvalidFields(errors);
      setModalVisible(true);
      return;
    }
  
    console.log("Form submitted successfully!");
    Alert.alert("Success", "Message Sent");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setProgress(0);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Us</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Your Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Your Message (Max 250 characters)"
        value={message}
        onChangeText={handleMessageChange}
        multiline
      />
      <Progress.Bar
        progress={progress}
        width={300}
        color={progress < 1 ? "#007bff" : "#28a745"}
        style={styles.progressBar}
      />
      <Text style={styles.charCount}>{`${message.length}/250`}</Text>

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          padding: 10,
          backgroundColor: "#007bff",
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Submit</Text>
      </TouchableOpacity>

      {/* Modal for displaying invalid fields */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Validation Errors</Text>
            {invalidFields.map((field, index) => (
              <Text key={index} style={styles.modalText}>
                • {field}
              </Text>
            ))}
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  messageInput: {
    height: 100,
    textAlignVertical: "top",
  },
  progressBar: {
    marginTop: 10,
    marginBottom: 5,
  },
  charCount: {
    textAlign: "right",
    marginBottom: 15,
    fontSize: 12,
    color: "#555",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Contact;
