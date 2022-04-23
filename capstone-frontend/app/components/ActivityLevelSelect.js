import { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import useFetch from "../services/Fetch";

const levels = [
    {id: 1, name: 'Easy', description: 'Willing to put minimal effort', image : ''},
    {id: 2, name: 'Medium', description: 'Willing to put a little more effort', image : ''},
    {id: 3, name: 'Hard', description: 'Will do anything to get result', image : ''},
]

const ActivityLevelSelect = ({activityLevel, onSelect, onNext, onPrev}) => {

    const [description, setDescription] = useState('');

    let levelElements = null;

    const {isLoading, apiData, serverError} = useFetch('activity/getActivity');

        if(apiData){
          levelElements = apiData.allActivities.map(item => {
                const selectedCss = activityLevel === item.activitylevel ? styles.selected_item : styles.item;
            return (
              <View style={selectedCss} key={item._id}>
                <TouchableOpacity onPress={() => {onSelect({activityLevel : item.activitylevel})}}>
                <Text style={{ fontSize: 14, fontWeight:700, color:'#fff'}}>{item.levelName}</Text>
              </TouchableOpacity>
          </View>
            )});
        }

    return (
      apiData &&
        <View style={styles.container}>
            {levelElements}
            <View style={{display:"flex", flexDirection:"row", width:"85%", justifyContent:"space-between"}}> 
            <Button onPress={onPrev} title="Prev"/>
            <Button onPress={onNext} title="Submit"/>
            </View> 
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 26, 
      backgroundColor: 'rgb(54, 72, 95)',
      flexDirection: "column",
      flexWrap: "wrap",
      alignItems: 'center',
      justifyContent: 'center',
      minHeight:"90vh"
    },
    item: {
      marginBottom: "20px",
      backgroundColor: 'rgb(32, 152, 152)',
      fontSize: 24,
      padding:16,
      width:"85%",
      height:100,
      display:"flex",                                  
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:16
    },
    selected_item: {
      marginBottom: "20px",
        backgroundColor: 'rgb(18, 209, 209)',
        fontSize: 24,
        padding:16,
        width:"85%",
        height:100,
        display:"flex",                                    
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:16
    },
  });

export default ActivityLevelSelect;