import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect,useContext}from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity,onPress, View, Keyboard } from 'react-native';
import { AuthenticationContext } from '../services/AuthenticationContext';
import { RadioButton } from 'react-native-paper';


export default function SignUpScreen() {

  const [inputs,setInputs] = useState({
    username:'',
    email:'',
    mobile:'',
    createpassword:'',
    confirmpassword:'',
  

  })

  const [formErrors,setFormErrors]= useState({}); 

  const [isSubmit,setIsSubmit]= useState(false)
  const {onRegister} = useContext(AuthenticationContext);
  const [checked,setChecked]= useState("male")
    
    const handleOnChange = (text,input) => {
      setInputs(prevState=>({...prevState, [input]: text}))
      
    }

    const handleSignup=()=>{

      setFormErrors(validate(inputs));
      setIsSubmit(true);
      const user={fullname:inputs.username,email:inputs.email,password:inputs.cnfmpwd,gender:checked}
      if(Object.keys(formErrors).length ===0 && isSubmit){
        onRegister(user)
      }
    }

    const validate=  (values) => {
     const errors={};
     const regex= /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
     if(!values.username){
       errors.username="username is required";
     }else if(values.username.length<4){
       errors.username="username must be 4 characters"
     }
     if(!values.email){
      errors.email="emial is required";
    }else if(!regex.test(values.email)){
      errors.email="This is not a valid email"
    }
    if(!values.mobile){
      errors.mobile="mobile is required";
    }else if(values.mobile.length>10 || values.mobile.length<10){
      errors.mobile="Invalid Mobile Number!"
    }
    if(!values.crepwd){
      errors.crepwd="Password is required";
    }else if(values.crepwd.length<8){
      errors.crepwd="Password must be 8 characters"; 
    } 
    if(!values.cnfmpwd){
      errors.cnfmpwd="confirm the password"; 
    } else if(values.crepwd!==values.cnfmpwd){
      errors.cnfmpwd="Password was not matched" 
    }
    return errors;  
    }

  

  
  return (
    <View style={styles.signupform}>
      <Text style={styles.header}>Sign Up !</Text>
      <TextInput style={styles.textinput} 
                 placeholder="Enter Full Name"
                 name="username"
                 value={inputs.username}
                 onChangeText={text=>handleOnChange(text,"username")}/> 
        <Text style={styles.error}>{formErrors.username}</Text>
      <TextInput style={styles.textinput} 
                 placeholder="Enter Email"
                 onChangeText={text=>handleOnChange(text,"email")}/>
                 <Text style={styles.error}>{formErrors.email}</Text>  
       <TextInput style={styles.textinput}
                 keyboardType='numeric'
                 placeholder="Enter Mobile Number" 
                 onChangeText={text=>handleOnChange(text,"mobile")}/>
                 <Text style={styles.error}>{formErrors.mobile}</Text>
        <View style={styles.inline}>
        <Text style={styles.genlabel}>Male</Text>
        <RadioButton
        value="male"
        status={ checked === 'male' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('male')}
      />
      <Text  style={styles.genlabel}>Female</Text>
      <RadioButton 
        value="female"
        status={ checked === 'female' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('female')} 
      />
        </View>
        
      <TextInput style={styles.textinput} 
                 placeholder="Create Password"
                 type="password" 
                 secureTextEntry={true}
                 onChangeText={text=>handleOnChange(text,"crepwd")}/>
                 <Text style={styles.error}>{formErrors.crepwd}</Text>
      <TextInput style={styles.textinput} 
                 placeholder="Confirm Password"
                 type="password"
                 secureTextEntry={true}
                 onChangeText={text=>handleOnChange(text,"cnfmpwd")}/>
                 <Text style={styles.error}>{formErrors.cnfmpwd}</Text>
      <TouchableOpacity style={styles.sign} onPress={handleSignup}> 
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
    gen:{
      alignSelf:"stretch",
      alignItems:"center",
      padding:20,
      background:"tranparent",
      border:"1px solid #fff",
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

    },
    inline:{
      display:"flex",
      flexDirection:"row",
    
    },
    genlabel:{
      color:"#afafaf",
      marginTop:5,
      fontSize:17,
      fontWeight:600,
    }
}); 
