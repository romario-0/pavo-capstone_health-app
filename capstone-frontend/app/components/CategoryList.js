import { FlatList, View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image } from "react-native";
import useFetch from "../services/Fetch";

const Item = ({ title, itemImg, itemDescription }) => (
    <View style={styles.item}>
        <Image style={styles.img} source={{uri : itemImg}} />
        <Text style={{color:"#fff", fontSize:16, fontWeight:700 }} >{title}</Text>
    </View>
  );

const CategoryList = ({navigation}) => {

    const {apiData, isLoading, serverError} = useFetch('food/get-categories');
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={()=>handleSelect(item.strCategory)}>
          <Item title={item.strCategory} itemImg={item.strCategoryThumb} itemDescription={item.strCategoryDescription}/>
        </TouchableOpacity>
      );

      const handleSelect = (value) => {
        navigation.navigate('MealList',{value, type : 'CATEGORY'});
      }

    return(
        apiData &&
        <SafeAreaView style={styles.container}>
            <FlatList
                data={apiData.data.categories}
                renderItem={renderItem}
                keyExtractor={item => item.idCategory}
            />
      </SafeAreaView>
    );
}

export default CategoryList;

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
      minWidth:"80vw",
      marginTop:20,
      display:"flex",                                  
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:16
    },
    img:{
      width:50,
      height:50,
      marginLeft:"auto",
      marginHorizontal:"auto"
    }
  });