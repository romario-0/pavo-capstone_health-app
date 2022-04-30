import { Button, View, Text,StyleSheet } from "react-native";

const MealMenuScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.tex}>Search By</Text>
            <View style={styles.btn}>
            <Button onPress={() => navigation.navigate('CategoryList')} title={'Category'} />
            </View>
            <View style={styles.btn}>
            <Button onPress={() => navigation.navigate('IngredientList')} title={'Ingredient'} />
            </View>
        </View>
        

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      backgroundColor: 'rgb(54, 72, 95)',
      flexDirection: "column",
      flexWrap: "wrap",
      alignItems: 'center',
      justifyContent: 'center'
    },
    tex:{
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