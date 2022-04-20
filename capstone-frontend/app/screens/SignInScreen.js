import { StatusBar } from 'expo-status-bar';
import React, {useContext, useState}from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity,onPress, View, Keyboard } from 'react-native';
import { AuthenticationContext } from '../services/AuthenticationContext';


export default function SignInScreen() {

  const {onLogin} = useContext(AuthenticationContext);

  const [inputs,setInputs] = useState({
    email:'',
    password:''

  })

  const [formErrors,setFormErrors]= useState({});

  const [errors,setErrors]= useState({});

  const validate= () =>{
    Keyboard.dismiss();
    if(!inputs.email){
      handleError('please input email','email')
    }
  }

  
    
    const handleOnChange = (text,input) => {
      setInputs(prevState=>({...prevState, [input]: text}))
      
    }

    const handleSubmit=(e)=>{
      e.preventDefault();
      setFormErrors(validate(inputs));
      setIsSubmit(true)
      console.log(inputs) 
 
     }


  const handleSignIn = () => {
    onLogin(inputs.email, inputs.password);
  }

  return (
    <View style={styles.signinform}>
      <Text style={styles.header}>Sign In !</Text>
      <TextInput style={styles.textinput} 
                 placeholder="Enter Email"
                 value={inputs.email}
                 onChangeText={text=>handleOnChange(text,'email')
                }/>
      <TextInput style={styles.textinput} 
                 placeholder="Enter Password" 
                 secureTextEntry={true}
                 onChangeText={text=>handleOnChange(text,'password')}/>
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
      fontsize:27,
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
    borderBottomColor:"#f8f8f8",
    borderBottomWidth:1,
    outlineStyle:"none"    
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
