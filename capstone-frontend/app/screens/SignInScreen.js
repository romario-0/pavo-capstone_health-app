import { StatusBar } from 'expo-status-bar';
import React, {useContext, useState}from 'react'
import styled from "styled-components/native"
import { StyleSheet, Text, TextInput, TouchableOpacity,onPress, View, Keyboard } from 'react-native';
import { AuthenticationContext } from '../services/AuthenticationContext';


export default function SignInScreen() {

  const {onLogin} = useContext(AuthenticationContext);

  const [inputs,setInputs] = useState({
    email:'',
    password:''

  })

  const [formErrors,setFormErrors]= useState({});
  const [isSubmit,setIsSubmit]= useState(false);
 


  

    
    const handleOnChange = (text,input) => {
      setInputs(prevState=>({...prevState, [input]: text}))
      
    }


  const handleSignIn = () => {
      onLogin(inputs.email, inputs.password);
    } 

    const validate= (values) => {
      const errors={};
      if(!values.email){
         errors.email="Please enter email";
      }
      if(!values.password){
        errors.password="Please enter password";
      }
      return errors;
    }
   
  

  return (
    <View style={styles.signinform}>
      <Text style={styles.header}>Sign In !</Text>
      <TextInput style={styles.textinput} 
                 placeholder="Enter Email"
                 value={inputs.email}
                 onChangeText={text=>handleOnChange(text,'email')
                }/>
                 <Text style={styles.error}>{formErrors.email}</Text>
      <TextInput style={styles.textinput} 
                 placeholder="Enter Password" 
                 secureTextEntry={true}
                 onChangeText={text=>handleOnChange(text,'password')}/>
                  <Text style={styles.error}>{formErrors.password}</Text>
      <TouchableOpacity style={styles.sign} onPress={handleSignIn}> 
        <Text style={styles.signtext}>Sign In</Text>
      </TouchableOpacity>  
      <StatusBar style="auto" /> 
    </View>
  ); 
} 

const styles = StyleSheet.create({ 
  signinform: {
    alignSelf:'stretch',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#36485f',
    paddingLeft: 60,
    paddingRight: 60,
    flex:1
  },
  header:{
      fontSize:27,
      fontWeight:"bold",
      color:"#fff",
      paddingBottom:10,
      marginBottom:40,
      borderBottomColor:"#199187",
      borderBottomWidth:1
  },
  textinput:{
    alignSelf:'stretch',
    height:40,
    marginBottom:30,
    color:"#fff",
    outlineStyle:"none",
    borderBottomColor:"#f8f8f8",
    borderBottomWidth:1,
    paddingLeft:20
        
  },
  sign:{
      alignSelf:"stretch",
      alignItems:"center",
      padding:20,
      backgroundColor:"#59cbbd",
      borderRadius:10,
      marginTop:20
    },
    signtext:{
        fontWeight:"bold" 
    },
    error:{
      color:"red",
      marginRight:'auto',
      fontsize:21,
      marginTop:-20
  
      }
}); 

const Container = styled.TextInput`
  outline-style:none;
  padding-left:20px;
`;
