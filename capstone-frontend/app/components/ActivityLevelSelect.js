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
                <Text>{item.levelName}</Text>
              </TouchableOpacity>
          </View>
            )});
        }

    return (
      apiData &&
        <View style={styles.container}>
            {levelElements}
            <Button onPress={onPrev} title="Prev"/>
            <Button onPress={onNext} title="Submit"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
      flexDirection: "coloumn",
      flexWrap: "wrap",
      alignItems: 'center',
      justifyContent: 'center'
    },
    item: {
      flex: 1,
      marginHorizontal: 10,
      marginTop: 5,
      padding: 5,
      backgroundColor: '#b5e5e6',
      fontSize: 24,
      width:150,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center'
    },
    selected_item: {
      flex: 1,
      marginHorizontal: 10,
      marginTop: 5,
      padding: 5,
      backgroundColor: '#4164cc',
      fontSize: 24,
      width:150,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center'
    },
  });

export default ActivityLevelSelect;