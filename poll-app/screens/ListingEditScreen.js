import React from "react";
import { Image, StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
  AppFormPicker as FormPicker,
} from "../components/forms";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  category: Yup.object().required().nullable().label("Category"),
  description: Yup.string().label("Description"),
});

function ListingEditScreen(props) {
  const category = [
    { label: "Furniture", icon: "floor-lamp", color: "#fc5c65", value: 1 },
    { label: "Cars", icon: "car", color: "#fd9644", value: 2 },
    { label: "Cameras", icon: "camera", color: "#fed330", value: 3 },
    { label: "Games", icon: "cards", color: "#26de81", value: 4 },
    { label: "Clothing", icon: "shoe-heel", color: "#2bcbba", value: 5 },
    { label: "Sports", icon: "basketball", color: "#45aaf2", value: 6 },
    {
      label: "Movies &\n  Music",
      icon: "headphones",
      color: "#4b7bec",
      value: 7,
    },
  ];

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          price: "",
          title: "",
          description: "",
          category: null,
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          style={{ width: "40%" }}
          maxLength={8}
          name="price"
          keyboardType="numeric"
          placeholder="Price"
        />
        <FormPicker
          barWidth={{ width: "50%" }}
          name="category"
          placeholder="Category"
          items={category}
        />
        <FormField
          name="description"
          placeholder="Description"
          multiline
          maxLength={255}
          numberOfLines={3}
        />
        <SubmitButton title="Submit" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { paddingLeft: 10, paddingRight: 10, justifyContent: "flex-end" },
});
export default ListingEditScreen;
