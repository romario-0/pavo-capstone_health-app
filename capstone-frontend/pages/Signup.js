import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity,onPress, View } from 'react-native';

export default function Signup() {
  return (
    <View style={styles.signupform}>
      <Text style={styles.header}>Signup!</Text>
      <TextInput style={styles.textinput} placeholder="Enter Email"/>
      <TextInput style={styles.textinput} placeholder="Enter Mobile Number"/>
      <TextInput style={styles.textinput} placeholder="Create Password"/>
      <TextInput style={styles.textinput} placeholder="Confirm Password"/>
      <TouchableOpacity style={styles.sign} > 
        <Text style={styles.signtext}>Sign Up</Text>
      </TouchableOpacity>  
      <StatusBar style="auto" /> 
    </View>
  ); 
} 

const styles = StyleSheet.create({ 
  signupform: {
    alignSelf:'stretch'
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
