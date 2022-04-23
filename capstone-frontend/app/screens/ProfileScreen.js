import { useContext } from "react";
import { AuthenticationContext } from "../services/AuthenticationContext";
import {useFetch} from '../services/Fetch';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

const ProfileScreen = () => {

    const {user} = useContext(AuthenticationContext);
    const path = 'https://ultimate-health-app.herokuapp.com/profilepic/';
    const profilePic = path + user.profilepic; 

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: profilePic}}/>
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.name}>{user.fullname}</Text>
                <Text style={styles.info}>{user.email}</Text>
                <Text style={styles.description}>{user.phone}</Text>
                <Text style={styles.description}>{user.gender}</Text>
              </View>
          </View>
        </View>
      );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  header:{
    backgroundColor: "rgb(87, 176, 176)",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});
