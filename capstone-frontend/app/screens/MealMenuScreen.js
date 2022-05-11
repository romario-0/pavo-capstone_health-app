import { Button, View, Text,StyleSheet } from "react-native";
import CategoryList from "../components/CategoryList";

const MealMenuScreen = ({navigation}) => {
    return (
       <CategoryList navigation={navigation} />
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      backgroundColor: 'rgb(54, 72, 95)',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text:{
        fontSize:21, 
        fontWeight:700,
        color:"rgb(87, 176, 176)",
        marginBottom:20
    },
    btn:{
        width:200,
        marginBottom:15
    }
})

export default MealMenuScreen;