import { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

const UserDetailsForm = ({userDetails, onChange, onNext, onPrev, formErrors}) => {

    return (
        <View style={styles.formStyle}>
        <Text style={styles.header}>User Details</Text>
        <Text style={styles.label}>Height</Text>
      <TextInput style={styles.textinput} 
                keyboardType='numeric'
                 placeholder=" Enter Height"
                 name="height"
                 value={userDetails.height}
                 onChangeText={text=>onChange({height : text})}/> 
        <Text style={styles.error}>{formErrors.height}</Text>
        
        <Text style={styles.label}>Weight</Text>
        <TextInput style={styles.textinput} 
                keyboardType='numeric'
                 placeholder="Weight"
                 name=" Enter weight"
                 value={userDetails.weight}
                 onChangeText={text=>onChange({weight : text})}/> 
        <Text style={styles.error}>{formErrors.weight}</Text>
        
        <Text style={styles.label}>Neck</Text>
        <TextInput style={styles.textinput} 
                keyboardType='numeric'
                 placeholder="Neck"
                 name="Enter neck"
                 value={userDetails.neck}
                 onChangeText={text=>onChange({neck : text})}/> 
        <Text style={styles.error}>{formErrors.neck}</Text>
       
       <Text style={styles.label}>Waist</Text>
        <TextInput style={styles.textinput} 
                keyboardType='numeric'
                 placeholder="waist"
                 name="Enter waist"
                 value={userDetails.waist}
                 onChangeText={text=>onChange({waist : text})}/> 
        <Text style={styles.error}>{formErrors.waist}</Text>
        
        <Text style={styles.label}>Hip</Text>
        <TextInput style={styles.textinput} 
                keyboardType='numeric'
                 placeholder="Enter Hip"
                 name="hip"
                 value={userDetails.hip}
                 onChangeText={text=>onChange({hip : text})}/> 
        <Text style={styles.error}>{formErrors.hip}</Text>

     <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
     <Button onPress={onPrev} title="Prev"/>
      <Button onPress={onNext} title="Next"/>
     </View>
        
     </View>   
    )    
}

export default UserDetailsForm;

const styles = StyleSheet.create({ 
    formStyle: {
      backgroundColor: '#36485f',
      paddingLeft: 60,
      paddingRight: 60,
      flex:1,
      minHeight:"90vh"
    },
    header:{
        fontSize:24,
        fontWeight:"bold",
        color:"#fff",
        textAlign:"center",
        width:"70%",
        marginHorizontal:  "auto",
        marginTop:20,
        marginBottom:20,
        borderBottomColor:"#199187",
        borderBottomWidth:1
    },
    label:{
      fontSize:16,
      fontWeight:"bold",
      color:"rgb(93,236,224)",
      paddingBottom:5, 
  },
    textinput:{
      alignSelf:'stretch',
      height:40,
      marginBottom:40,
      color:"#fff",
      outlineStyle:"none",
      borderBottomColor:"#f8f8f8",
      borderBottomWidth:1,
      paddingLeft:20
          
    },
      error:{
      color:"red",
      marginRight:'auto',
      fontsize:21,
      marginTop:-20
  
      },
  });