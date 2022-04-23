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
                    <Image style={styles.img} source={{uri: path+item.goalImg}}/>
                    <Text style={{ fontSize: 14, fontWeight:700, color:'#fff'}}>{item.goal}</Text>
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
        padding: 12,
        backgroundColor: 'rgb(54, 72, 95)',
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent: 'center'
      },
      item: {
        flex: "44%",
        marginHorizontal: 10,
        backgroundColor: 'rgb(32, 152, 152)',
        fontSize: 24,
        padding:12,
        width:150,
        height: 130,
        display:"flex",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10
      },
      selected_item: {
        flex: "44%",
        marginHorizontal: 10,
        backgroundColor: 'rgb(18, 209, 209)',
        fontSize: 24,
        padding:12,
        width:150,
        height: 130,
        display:"flex",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10
      },
      img:{
        width:60,
        height:60,
        marginLeft:"auto",
        marginHorizontal:"auto"
      }
    });
    
export default GoalScreen;