import { View, Text, Image, ScrollView, Button,StyleSheet } from "react-native";
import useFetch from "../services/Fetch";

const MealRecipe = ({navigation, route}) => {
    let ingredientList = [];
    let recipe = null;
    const {foodID} = route.params;
    const {apiData, isLoading, serverError} = useFetch(`food/get-recipe?foodID=${foodID}`);
    if(apiData){
    recipe = apiData.data.meals[0];
    
    if(recipe){
        const regex = /[a-z]/ig
        for(let i=1; i<=20; i++){
            if(regex.test(recipe[`strIngredient${i}`])){
                ingredientList.push({ ingredient : recipe[`strIngredient${i}`], measure : recipe[`strMeasure${i}`]});
            }
        }
    }
    }

    const ingredientElements = ingredientList.map(item => (
        <Text>{item.ingredient} : {item.measure}</Text>
    ))

    const handleAddToList = () => {
        
    }

    return (
    apiData &&
    <ScrollView >
        <View style={styles.container}>
        <Image style={{height:150, width: 320, marginBottom:8}} source={{uri : recipe.strMealThumb}} />
        <Text style={{color:"rgb(10, 248, 248)", fontSize:18, fontWeight:700, marginBottom:14}}>{recipe.strMeal}</Text>
        <Button title={'Add to My list'} onPress={handleAddToList} />
        <View style={{marginTop:"20px"}}>
            <Text style={{color:"rgb(87, 176, 176)", fontSize:15, fontWeight:700, marginBottom:20}}><Text style={{color:'#fff'}}>Category :</Text> {recipe.strCategory}</Text>
            <Text style={{color:'rgb(87, 176, 176)', marginBottom:9}}>Ingredients</Text>
            <View style={{color:"rgb(249, 245, 245)"}}>
                
                {ingredientElements}
            </View>
            <Text style={{color:'rgb(87, 176, 176)', marginTop:20, marginBottom:9}}>Instructions :</Text>
            <Text style={{color:"rgb(249, 245, 245)"}}> {recipe.strInstructions}</Text>

            <Text style={{color:'rgb(87, 176, 176)', marginTop:20, marginBottom:9}}>Youtube Link :</Text> 
            <Text style={{color:"rgb(249, 245, 245)"}}> {recipe.strYoutube}</Text>
        </View>
        </View>
    </ScrollView>
    );
}

export default MealRecipe;

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
})