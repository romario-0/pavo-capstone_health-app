import { useContext, useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import { AuthenticationContext } from "../services/AuthenticationContext";
import ActivityLevelSelect from "./ActivityLevelSelect";
import GoalSelect from "./GoalSelect";
import UserDetailsForm from "./UserDetailsForm";

const MultipartForm = ({user}) => {

    const {updateUser} = useContext(AuthenticationContext);
    const [currentTab, setCurrentTab] = useState(0);
    const [formData, setFormData] = useState({
        goal : null,
        activityLevel: null
    });
    const [formErrors,setFormErrors]= useState({});
    
    useEffect(()=>{ setFormData(user);},[]);

    const updateData = (data) => {
        setFormErrors(validate(data));
        setFormData(prevState => ({...prevState, ...data}));
    }

    const submitForm = () => {
        if(Object.keys(formErrors).length ===0){
            Object.keys(formData).forEach((k) => {
                if(formData[k] == null || formData[k] == '' || formData[k] == undefined){
                    delete formData[k]
                }
            });

           updateUser(formData);
        }
    }

    const validate = (obj) => {
        const errors={};
        var reg = /^\d*(\d\.\d+)?$/;
        for (const [key, value] of Object.entries(obj)) {
            if(key != 'goal' && key != 'activityLevel'){
                if(!reg.test(value)){
                    errors[key]="Enter a proper number";
                }
            }
          }
       return errors;  
       }

    return (
         user && 
        <View>
            { (currentTab === 0) && <GoalSelect onSelect={updateData} onNext={() => setCurrentTab(1)} goal={formData.goal} />}
            { (currentTab === 1) && <UserDetailsForm formErrors={formErrors} onChange={updateData} onPrev={() => setCurrentTab(0)} onNext={() => setCurrentTab(2)} userDetails={formData} />}
            { (currentTab === 2) && <ActivityLevelSelect onSelect={updateData} onPrev={() => setCurrentTab(1)} onNext={submitForm} activityLevel={formData.activityLevel} />}
        </View> 
    );
}

export default MultipartForm;