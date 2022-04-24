import { FlatList, View, Text, TouchableOpacity } from "react-native";
import useFetch from "../services/Fetch";

const Item = ({ title }) => (
    <View >
      <Text >{title}</Text>
    </View>
  );

const IngredientList = ({navigation}) => {

    const {apiData, isLoading, serverError} = useFetch('food/get-ingredients');
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={()=>handleSelect(item.strIngredient)}>
          <Item title={item.strIngredient} />
        </TouchableOpacity>
      );

      const handleSelect = (value) => {
        navigation.navigate('MealList',{value, type : 'INGREDIENT'});
      }

    return(
        apiData &&
        <FlatList
        data={apiData.data.meals}
        renderItem={renderItem}
        keyExtractor={item => item.idIngredient}
      />
    );
}

export default IngredientList;