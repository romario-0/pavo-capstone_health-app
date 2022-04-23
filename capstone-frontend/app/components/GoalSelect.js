import { StyleSheet, Text, TouchableOpacity, View, Image, Button } from 'react-native';
import useFetch from '../services/Fetch';

const GoalSelect = ({goal, onSelect, onNext}) => {
    //const [goal, setGoal] = useState('');    
      const {isLoading, apiData, serverError} = useFetch('goal/getGoal');
      let goalElements = null;

      const path = 'https://ultimate-health-app.herokuapp.com/goal/';

        if(apiData){
            goalElements = apiData.allGoals.map(item => {
                const selectedCss = goal === item.goal ? styles.selected_item : styles.item;
            return (
                <View style={selectedCss} key={item._id}>
                    <TouchableOpacity onPress={() => {onSelect({goal : item.goal})}}>
                    <Image style={styles.img} source={{uri: path+item.goalImg}}/>
                    <Text style={{ fontSize: 14, fontWeight:700, color:'#fff'}}>{item.goal}</Text>
                    </TouchableOpacity>
                </View>
            )});
        }
    
      return ( apiData &&
        <View style={styles.container}>
            {goalElements}
            <Button onPress={onNext} title="Next" />
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
        display:"flex",                                    
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:16
      },
      img:{
        width:50,
        height:50,
        marginLeft:"auto",
        marginHorizontal:"auto"
      }
    });
    
export default GoalSelect;