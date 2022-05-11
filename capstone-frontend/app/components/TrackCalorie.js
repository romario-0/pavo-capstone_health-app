import { useState } from "react";
import { TextInput, View, Text, Modal, StyleSheet, Pressable, ScrollView } from "react-native";
import CustomCalendar from "./CustomCalendar";
import CustomCalendarWeek from "./CustomCalendarWeek";
import MealCalorieCalculator from "./MealCalorieCalculator";

const TrackCalorie = () => {

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(`${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`);
  const [calorie, setCalorie] = useState('0'); 
  const [modalVisible, setModalVisible] = useState(false);

  const onDateSelect = (item) => {
    setSelectedDate(`${item.month}/${item.day}/${item.year}`);
    setCalorie(item.data);
  }

  return(
    <ScrollView>
      {
        <CustomCalendarWeek onSelect={onDateSelect} today={today} />
      }
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <MealCalorieCalculator getTotalCalorie={(data) => {setCalorie(data); setModalVisible(false);}} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Calculate from meal</Text>
      </Pressable>
      <Text>{selectedDate}</Text>
      <TextInput value={calorie} onChangeText={text=>setCalorie(text)} />
    </ScrollView>
  );
}

export default TrackCalorie;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});