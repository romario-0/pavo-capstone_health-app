import { StatusBar } from 'expo-status-bar';
import React, {useState}from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity,onPress, View, Keyboard } from 'react-native';


export default function SignUpScreen() {

  const [inputs,setInputs] = useState({
    username:'',
    email:'',
    mobile:'',
    password:''

  })

  const [errors,setErrors]= useState({});

  

    const handleOnChange = (text,input) => {
      setInputs(prevState=>({...prevState, [input]: text}))
      console.log(inputs)
    }

    const handleError = (errorMessage,input)=>{
      setErrors(prevState=>({...prevState, [input]: errorMessage}))
    }

  
  return (
    <View style={styles.signupform}>
      <Text style={styles.header}>Sign Up !</Text>
      <TextInput style={styles.textinput} 
                 placeholder="Enter Full Name"
                 name="username"
                 value={inputs.username}
                 onChangeText={handleOnChange}/>
      <TextInput style={styles.textinput} 
                 placeholder="Enter Email"
                 error={errors.email}
                 onChangeText={handleOnChange}/>  
       <TextInput style={styles.textinput}
                 keyboardType='numeric'
                 placeholder="Enter Mobile Number" 
                 onChangeText={handleOnChange}/>
      <TextInput style={styles.textinput} 
                 placeholder="Create Password"
                 onChangeText={handleOnChange}/>
      <TextInput style={styles.textinput} 
                 placeholder="Confirm Password"
                 onChangeText={handleOnChange}/>
      <TouchableOpacity style={styles.sign} > 
        <Text style={styles.signtext}>Sign Up</Text>
      </TouchableOpacity>  
      <StatusBar style="auto" /> 
    </View>
  ); 
} 

const styles = StyleSheet.create({ 
  signupform: {
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
    borderBottomColor:"#f8f8f8",
    borderBottomWidth:1,
        
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
    }
}); 
