import { useContext } from "react";
import { AuthenticationContext } from "../services/AuthenticationContext";
import { StyleSheet,View,FlatList, SafeAreaView, Text } from 'react-native';

const HomeScreen = () => {
    const {user} = useContext(AuthenticationContext);

  
    return (
        <SafeAreaView>
            <View style={styles.home}>
                <View style={styles.card}>
                <Text>{user.fullname}</Text>
                </View>
            <FlatList >
            </FlatList>
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
   home:{
    alignSelf:'stretch',
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:30,
    paddingRight:30
   },
   card:{
       width:"100%",
       height:125,
       marginTop:15,
       backgroundColor: 'rgb(87, 176, 176)',
       borderRadius:10,
       alignItems:'center',
       justifyContent:'center',
       fontSize:28,
       fontWeight:700
   }
})

export default HomeScreen;