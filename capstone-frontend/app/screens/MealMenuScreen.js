import { Button, View, Text } from "react-native";

const MealMenuScreen = ({navigation}) => {
    return (
        <View>
            <Text>Search By</Text>
            <Button onPress={() => navigation.navigate('CategoryList')} title={'Category'} />
            <Button onPress={() => navigation.navigate('IngredientList')} title={'Ingredient'} />
        </View>
        

    );
}

export default MealMenuScreen;