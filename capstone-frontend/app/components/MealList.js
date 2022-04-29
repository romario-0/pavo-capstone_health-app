import { FlatList, View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import useFetch from "../services/Fetch";

const Item = ({ title, mealImg, mealID }) => (
    <View style={styles.item}>
        <Image style={styles.img} source={{uri : mealImg}} />
        <Text style={{color:"#fff", fontSize:16, fontWeight:700 }}>{title}</Text>
    </View>
  );

const MealList = ({navigation, route}) => {
    const {value, type} = route.params;
    const {apiData, isLoading, serverError} = useFetch(`food/get-meals?value=${value}&type=${type}`);
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={()=>handleSelect(item.idMeal)}>
            <Item title={item.strMeal} mealImg={item.strMealThumb} mealID={item.idMeal}/>
        </TouchableOpacity>
      );

      const handleSelect = (foodID) => {
        navigation.navigate('MealRecipe',{foodID});
      }

    return(
        apiData &&
        <SafeAreaView style={styles.container}>
            <FlatList
            data={apiData.data.meals}
            renderItem={renderItem}
            keyExtractor={item => item.idMeal}
        />
      </SafeAreaView>
    );
}

export default MealList;

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
      backgroundColor: 'rgb(32, 152, 152)',
      fontSize: 24,
      padding:16,
      width:"80%",
      marginTop:20, 
      display:"flex",                                  
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:16,
      marginLeft:"auto",
      marginHorizontal:"auto"
    },
    img:{
      width:50,
      height:50,
      marginLeft:"auto",
      marginHorizontal:"auto"
    }
  });