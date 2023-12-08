import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import * as Yup from "yup";

import ActivityIndicator from '../components/ActivityIndicator';
import SuccessIndicator from '../components/SuccessIndicator';
import defaultStyles from "../config/styles";
import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).matches().label("Password"),
});


function RegisterScreen(props) {

  const [isLoading, setLoading] = useState(false);
  const [isSent, setSent] = useState(false);

  const registerUser = async (values) => {
    try {
      setLoading(true);
      fetch('http://10.0.0.243:3000/api/users/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([values])
      });
    } catch (error) {
      console.error("The ERROR: ",error);
    }finally{
      setLoading(false);
      setSent(true);
      setTimeout(() => {setSent(false)},1300);
    }
  };


  return (
   <> 
   {isLoading && <ActivityIndicator visible={true}/>}
   {isSent && <SuccessIndicator visible={true}/>}
   {(!isLoading && !isSent) && (<Screen style={styles.container}>
      <AppForm
        initialValues={{ name: "", username: "", email: "", password: "" }}
        onSubmit={(values) => registerUser(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
          textContentType="name"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="account"
          name="username"
          placeholder="Username"
          textContentType="name"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          name="email"
          keyboardType="email-address"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry={true}
          textContentType="password"
        />
        <View style={styles.buttonContainer}>
            <SubmitButton 
              title="Register" 
              style={[styles.submit, styles.text]} 
            />
        </View>
      </AppForm>
    </Screen>
   )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center"
  },
  submit: {
    width: "50%",
    backgroundColor: defaultStyles.colors.primary
  },
  text: {
    fontSize: 15,
  }
});

export default RegisterScreen;
