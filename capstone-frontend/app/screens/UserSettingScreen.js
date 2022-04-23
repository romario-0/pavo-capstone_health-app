import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import MultipartForm from "../components/MultipartForm";
import { AuthenticationContext } from "../services/AuthenticationContext";

const UserSettingScreen = () => {
    
   const {userToken} = useContext(AuthenticationContext);
   const [user, setUser] = useState();
   const path = 'https://ultimate-health-app.herokuapp.com/';

   useEffect(()=>{
    if(userToken != null){
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'authorization' : `Bearer ${userToken}` }
        };
        fetch(path+'user/userGet', requestOptions).then(res => res.json()).then(async data => {
          if(data.userDetail != undefined && data.userDetail != null){
            setUser(data.userDetail);
          }else{
            console.log(data.message);
          }
        });
      }
   },[]);

    return (
        <View>
            {user && <MultipartForm user={user} />}
        </View>
    );
}

export default UserSettingScreen;