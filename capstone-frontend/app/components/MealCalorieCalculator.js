import {Picker} from '@react-native-picker/picker';
import { useRef, useState } from 'react';
import { Button, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const mealList = [{mealId:1, mealName:'Chicken Soup', calorieCount:1688, ingredients:[{name:'chicken',measure:'1kg'}, {name:'salt',measure:'1 tablespoon'}]},
{mealId:2, mealName:'Mutton Keema', calorieCount:2684, ingredients:[{name:'chicken',measure:'1kg'}, {name:'salt',measure:'1 tablespoon'}]},
{mealId:3, mealName:'Vegetable Salad', calorieCount:1508, ingredients:[{name:'chicken',measure:'1kg'}, {name:'salt',measure:'1 tablespoon'}]},
{mealId:4, mealName:'Paneer Tikka', calorieCount:1987, ingredients:[{name:'chicken',measure:'1kg'}, {name:'salt',measure:'1 tablespoon'}]},
{mealId:5, mealName:'Chicken Curry', calorieCount:2454, ingredients:[{name:'chicken',measure:'1kg'}, {name:'salt',measure:'1 tablespoon'}]}];

const MealCalorieCalculator = ({getTotalCalorie}) => {

    const [calorieCount, setCalorieCount] = useState(0);
    const [selectedMealList, setSelectedMealList] = useState([]);
    const [selectedMealID, setSelectedMealID] = useState(mealList[0].mealId);
    let showList = null;

    const pickerRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    const handleAdd = () => {
        const meal = mealList.find(ele => ele.mealId == selectedMealID);
        setSelectedMealList([...selectedMealList, meal]);
        setCalorieCount(prev => prev+meal.calorieCount);
    }

    const handleRemove = (seletedID) => {
        const mealID = selectedMealList.findIndex(ele => ele.mealId == seletedID);
        const meal = selectedMealList[mealID];
        selectedMealList.splice(mealID, 1);
        setCalorieCount(prev => prev-meal.calorieCount);
    }

    const dropDownElements = mealList.map(item => (<Picker.Item key={item.mealId} label={item.mealName} value={item.mealId} />));
    

    if(selectedMealList.length > 0){
        showList = selectedMealList.map((item, index) => (<View key={index}>
                <Text>{item.mealName} : {item.calorieCount}</Text>
                <Ionicons name="ios-remove-circle-outline" size={24} color="black" onPress={() => handleRemove(item.mealId)} />
            </View>));
    }

    return (
        <View>
            {showList}
            <Picker
                ref={pickerRef}
                selectedValue={selectedMealID}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedMealID(itemValue)
                }>
                {dropDownElements}
            </Picker>
            <Button title='Add to List' onPress={handleAdd} />
            <Text> Total : {calorieCount}</Text>
            <Button title='Save' onPress={() => getTotalCalorie(calorieCount)} />
        </View>
    )
}

export default MealCalorieCalculator;