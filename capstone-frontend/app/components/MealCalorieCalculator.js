import {Picker} from '@react-native-picker/picker';
import { useContext, useRef, useState } from 'react';
import { Button, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MealContext } from '../services/MealContext';

const MealCalorieCalculator = ({getTotalCalorie}) => {

    const {userMeals} = useContext(MealContext);
    const [calorieCount, setCalorieCount] = useState(0);
    const [selectedMealList, setSelectedMealList] = useState([]);
    const [selectedMealID, setSelectedMealID] = useState();
    let showList = null;

    const pickerRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    const handleAdd = () => {
        const meal = userMeals.find(ele => ele.mealApiId == selectedMealID);
        setSelectedMealList([...selectedMealList, meal]);
        setCalorieCount(prev => prev+meal.totalCalorieCount);
    }

    const handleRemove = (seletedID) => {
        const mealID = selectedMealList.findIndex(ele => ele.mealApiId == seletedID);
        const meal = selectedMealList[mealID];
        selectedMealList.splice(mealID, 1);
        setCalorieCount(prev => prev-meal.totalCalorieCount);
    }

    const dropDownElements = userMeals.map(item => (<Picker.Item key={item.mealApiId} label={item.mealName} value={item.mealApiId} />));
    

    if(selectedMealList.length > 0){
        showList = selectedMealList.map((item, index) => (<View key={index}>
                <Text>{item.mealName} : {item.totalCalorieCount}</Text>
                <Ionicons name="ios-remove-circle-outline" size={24} color="black" onPress={() => handleRemove(item.mealApiId)} />
            </View>));
    }

    const hasMealList = userMeals.length > 0;

    return (
        <>
        {hasMealList &&
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
        </View>}
        {!hasMealList && <View><Text>No meals added</Text></View>}
        </>
    )
}

export default MealCalorieCalculator;