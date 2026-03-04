import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";

const Reviews = ({ reviews }) => {
  const [reviewList, setReviewList] = useState(reviews);
  const animationValues = reviews.map(() => new Animated.Value(1)); // Initialize animation values for scaling

  const moveToBottom = (index) => {
    const selectedReview = reviewList[index];

    // Animate the selected review to scale down, then back up
    Animated.sequence([
      Animated.timing(animationValues[index], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animationValues[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Move the selected review to the bottom of the list
      const updatedList = [...reviewList];
      updatedList.splice(index, 1); // Remove the review from the current position
      updatedList.push(selectedReview); // Add it to the end
      setReviewList(updatedList);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {reviewList.map((review, index) => (
        <Animated.View
          key={review.id}
          style={[
            styles.reviewCard,
            { transform: [{ scale: animationValues[index] }] },
          ]}
        >
          <TouchableOpacity onPress={() => moveToBottom(index)}>
            <Text style={styles.reviewerName}>{review.reviewer}</Text>
            <Text style={styles.reviewText}>{review.review}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  reviewCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: "#333",
  },
});

export default Reviews;