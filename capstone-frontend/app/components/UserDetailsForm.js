import { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

const UserDetailsForm = ({userDetails, onChange, onNext, onPrev, formErrors}) => {

    return (
        <View style={styles.formStyle}>
      <TextInput style={styles.textinput} 
                keyboardType='numeric'
                 placeholder="Height"
                 name="height"
                 value={userDetails.height}
                 onChangeText={text=>onChange({height : text})}/> 
        <Text style={styles.error}>{formErrors.height}</Text>
        
        <TextInput style={styles.textinput} 
                keyboardType='numeric'
                 placeholder="Weight"
                 name="weight"
                 value={userDetails.weight}
                 onChangeText={text=>onChange({weight : text})}/> 
        <Text style={styles.error}>{formErrors.weight}</Text>

        <TextInput style={styles.textinput} 
                keyboardType='numeric'
                 placeholder="Neck"
                 name="neck"
                 value={userDetails.neck}
                 onChangeText={text=>onChange({neck : text})}/> 
        <Text style={styles.error}>{formErrors.neck}</Text>

        <TextInput style={styles.textinput} 
                keyboardType='numeric'
                 placeholder="waist"
                 name="waist"
                 value={userDetails.waist}
                 onChangeText={text=>onChange({waist : text})}/> 
        <Text style={styles.error}>{formErrors.waist}</Text>

        <TextInput style={styles.textinput} 
                keyboardType='numeric'
                 placeholder="Hip"
                 name="hip"
                 value={userDetails.hip}
                 onChangeText={text=>onChange({hip : text})}/> 
        <Text style={styles.error}>{formErrors.hip}</Text>  
    
        <Button onPress={onPrev} title="Prev"/>
        <Button onPress={onNext} title="Next"/>
    </View>
    )    
}

export default UserDetailsForm;

const styles = StyleSheet.create({ 
    formStyle: {
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
      error:{
      color:"red",
      marginRight:'auto',
      fontsize:21,
      marginTop:-20
  
      },
  });