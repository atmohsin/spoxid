import React, {Component} from "react";
import { View, Text,TextInput,ScrollView, StyleSheet, KeyboardAvoidingView,AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import { onSignIn, setStorage } from "../auth";
import ValidationComponent from "react-native-form-validator";

class Login extends ValidationComponent {
  constructor(props){
    super(props);
    this.state = {username:'',password:''}
  }

  _handleSubmit = () => {

    var isValidate = this.validate({
      username: {minlength:3, required: true},
      password: {minlength:3, required: true}
    });

    if(isValidate){

      fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',  
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
        .then((response) => response.json())
        .then((res)=> {
            if(res.success === true){
                AsyncStorage.setItem('user',res.user);
                this.props.navigation.navigate('SignedIn');
            }
            else {
                alert(res.message);
            }
        })
        .done();

    }
  }

  render() {
    return(
    <ScrollView>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
         
        <TextInput autoCapitalize = 'none' style={styles.textInput} ref="username" onChangeText={(username) => this.setState({username})} value={this.state.username} />
        <TextInput secureTextEntry= {true} autoCapitalize = 'none' style={styles.textInput} ref="password" onChangeText={(password) => this.setState({password})} value={this.state.password} />

          <Button
            large
            backgroundColor="#e58f19"
            textStyle={{ color: "#666" }}
            fontWeight="bold"
            raised={true}
            title="SIGN IN"
            onPress={this._handleSubmit}
          />
        </KeyboardAvoidingView>

        <Text>
            {this.getErrorMessages()}
        </Text>

      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
      flex: 1,
  },
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2896d3',
      paddingLeft: 40,
      paddingRight: 40,
  },
  header: {
      fontSize: 24,
      marginBottom: 60,
      color: '#fff',
      fontWeight: 'bold',
  },
  textInput: {
      alignSelf: 'stretch',
      padding: 16,
      marginBottom: 20,
      backgroundColor: '#fff',
  },
  btn: {
      alignSelf: 'stretch',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#01c853',
  }

});

export default Login;

