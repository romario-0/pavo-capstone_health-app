import { Button, StyleSheet, View,Text } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.landingpage}>
            <Text style={styles.bt}>Health & Fitness</Text>
            <View style={styles.btn}>
            <Button  title='Sign in' onPress={() => navigation.navigate('SignIn')} />
            </View>
            <View style={styles.btn}>
            <Button  title='Sign up' onPress={() => navigation.navigate('SignUp')} />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    landingpage:{
        alignSelf:'stretch',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#36485f',
        paddingLeft: 20,
        paddingRight: 20,
        flex:1
    
    },
    btn:{width:180,
         marginBottom:20,
         backgroundColor:"#59cbbd",
        borderRadius:10},
    bt:{
        color:"#59cbbd",
        fontSize:35,
        fontWeight:600,
        marginBottom:20

        },
})
export default WelcomeScreen;