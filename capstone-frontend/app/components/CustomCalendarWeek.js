import { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Button, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const dummyData = [{date : '04/26/2022', data : 2048}];
const defaultCalorie = 1908;
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const CustomCalendarWeek = ({onSelect}) => {

    const today = new Date();
    const [startDay, setStartDay] = useState(today.getDate());
    const [startMonth, setStartMonth] = useState(today.getMonth()+1);
    const [startYear, setStartYear] = useState(today.getFullYear());

    useEffect(() => { 
        subtractDays(today.getDay());
    },[])

    const subtractDays = (noOfDays) => {
        let days = startDay - noOfDays;
        if(days < 1){
            let month = startMonth;
            if(month == 1){
                month = 12;
            }else{
                month -= 1;
            }
            const daysInMonth = new Date(startYear,month,0).getDate();
            prevMonth();
            days += daysInMonth;
        }
        setStartDay(days);
    }

    const addDays = (noOfDays) => {
        const daysInMonth = new Date(startYear,startMonth,0).getDate();
        let days = startDay + noOfDays;
        if(days > daysInMonth){
            nextMonth();
            days -= daysInMonth;
        }
        setStartDay(days)
    }

    const nextMonth = () => {
        if(startMonth === 12){
            setStartMonth(1);
            setStartYear(prev => prev+1);
        }else{
            setStartMonth(prev => prev+1);
        } 
    }

    const prevMonth = () => {
        if(startMonth === 1){
            setStartMonth(12);
            setStartYear(prev => prev-1);
        }else{
            setStartMonth(prev => prev-1);
        }
    }


    const onNext = () => {
        console.log(startDay, startMonth, startYear);
        addDays(7);
    }

    const onPrev = () => {
        subtractDays(7);
    }

    const addLocalDays = (localDate, noOfDays) => {
        const daysInMonth = new Date(localDate.year,localDate.month,0).getDate();
        let days = localDate.day + noOfDays;
        if(days > daysInMonth){
            if(localDate.month == 12){
                localDate.month = 1;
                localDate.year += 1;
            }else{
                localDate.month += 1;
            }
            days -= daysInMonth;
        }
        localDate.day = days;
        return localDate;
    }

    const getWeekData = () => {
        const localWeek = [];
        if(startDay){
            let localDate = {day : startDay, month : startMonth, year : startYear};
            let k=0;
            
            for(let i=0; i<7;i++){
                let value = { day: localDate.day, month : localDate.month, year : localDate.year, data : defaultCalorie};
                if(dummyData.length > k){
                    const checkDate = new Date(dummyData[k].date);
                    if(checkDate.getDate() == localDate.day && (checkDate.getMonth()+1) == localDate.month && checkDate.getFullYear() == localDate.year){
                        value.data = dummyData[k].data;
                        k++;
                    }
                }
                localWeek.push(value);
                localDate = addLocalDays(localDate, 1);
            }
        }

        return localWeek;
    }

    const loadCalendar = () =>{
        const calendarElements = getWeekData().map((item, index) => (
            <TouchableOpacity style={{flex:1, margin:10, flexDirection:'column'}} key={index} onPress={() => onSelect(item)}>
                <View style={{backgroundColor:'#a9fcde'}}>
                    <Text>{item.day}</Text>
                    <Text>{monthNames[item.month-1]}</Text>
                    <Text>{item.year}</Text>
                    <Text>{item.data}</Text>
                </View>
            </TouchableOpacity>
        
        ));

        return calendarElements;
    };

    const calendarElements = loadCalendar();

    return (
    <SafeAreaView>
        <View>
            <Ionicons onPress={onPrev} name="chevron-back-circle-outline" size={24} color="black" />
            <Ionicons onPress={onNext} name="chevron-forward-circle-outline" size={24} color="black" />
        </View>
        <View style={{flex:1, flexDirection:'row'}}>
            {calendarElements}
        </View>
    </SafeAreaView>
    );
}


export default CustomCalendarWeek;