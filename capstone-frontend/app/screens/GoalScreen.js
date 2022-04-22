import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import useFetch from '../services/Fetch';

const imageLink = 'https://2rdnmg1qbg403gumla1v9i2h-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2019/09/gainLoseWeight-1137100432-770x553-650x428.jpg';


const GoalScreen = () => {
    const [goal, setGoal] = useState('');    
      const {isLoading, apiData, serverError} = useFetch('goal/getGoal');
      let goalElements = null;

      const path = 'https://ultimate-health-app.herokuapp.com/goal/';

        if(apiData){
            console.log(apiData);
            goalElements = apiData.allGoals.map(item => {
                const selectedCss = goal === item.goal ? styles.selected_item : styles.item;
            return (
                <View style={selectedCss} key={item._id}>
                    <TouchableOpacity onPress={() => {setGoal(item.goal)}}>
                    <Image style={{height: 40, width: 40}} source={{uri: path+item.goalImg}}/>
                    <Text>{item.goal}</Text>
                    </TouchableOpacity>
                </View>
            )});
        }
    
      return ( apiData &&
        <View style={styles.container}>
            {goalElements}
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
    
export default GoalScreen;