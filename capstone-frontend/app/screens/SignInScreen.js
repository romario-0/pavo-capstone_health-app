import { StatusBar } from 'expo-status-bar';
import React, {useState}from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity,onPress, View, Keyboard } from 'react-native';


export default function SignInScreen() {

  const [inputs,setInputs] = useState({
    fullname:'',
    email:'',
    mobile:'',
    password:''

  })

  const [errors,setErrors]= useState({});

  const validate= () =>{
    Keyboard.dismiss();
    if(!inputs.email){
      handleError('please input emial','email')
    }

    const handleOnChange = (text,input) => {
      setInputs(prevState=>({...prevState, [input]: text}))
    }

    const handleError = (errorMessage,input)=>{
      setErrors(prevState=>({...prevState, [input]: errorMessage}))
    }

  }
  return (
    <View style={styles.signupform}>
      <Text style={styles.header}>Sign In !</Text>
      <TextInput style={styles.textinput} 
                 placeholder="Enter Email"
                 error={errors.email}
                 onChangeText={text=>handleOnChange(text,'email')
                }/>  
      <TextInput style={styles.textinput} 
                 placeholder="Enter Password"
                 onChangeText={text=>handleOnChange(text,'passoword')}/>
      <TouchableOpacity style={styles.sign} > 
        <Text style={styles.signtext}>Sign In</Text>
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
    }
}); 
