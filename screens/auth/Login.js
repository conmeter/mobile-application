import React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/auth';
import { Button, Text, Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Layout from '../../constants/Layout';
import Alerts from '../../components/Alerts';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const { width, height } = Layout.window;

export default function Login(props) {

    const { navigation } = props

    navigation.setOptions({ headerTitle: 'LOGIN', headerStyle: {backgroundColor: '#000000'}, 
    headerTitleStyle: { color: Colors.content, fontFamily: Fonts.logo, fontSize: 25 }, 
    headerTintColor: Colors.content});

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const emailChange = (email) => {
        setEmail(email);
    }
    
    const passwordChange = (password) => {
        setPassword(password);
    }

    const _onSubmitPressed = () => {
        dispatch(login(email, password));
    }
    
    

    return (
        <View style={styles.main}>
        <View style={{flex:0.8, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.logo_area}>
                <Text style={styles.logo}>CM</Text>
            </View>
            <View style={styles.text_area}>
                <TextInput 
                style={styles.input} 
                placeholder="Email"
                onChangeText = {(text)=>{emailChange(text)}}
                value={email}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                keyboardAppearance={'dark'}
                keyboardType={"email-address"}
                returnKeyType={"next"}
                autoCapitalize={'none'}
                />
            </View>
            <View style={styles.text_area}>
                <TextInput 
                style={styles.input} 
                placeholder="Password"
                onChangeText = {(text)=>{passwordChange(text)}}
                value={password}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                keyboardAppearance={'dark'}
                returnKeyType={"done"}
                secureTextEntry={true}
                autoCapitalize={'none'}
                />
            </View>
            <View style={styles.reset}>
                <TouchableOpacity onPress={()=>{ navigation.navigate("ForgotPassword") }}>
                <Text style={styles.info}>Forgot you password? Click here to reset it.</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.submit_area}>
                <Button
                title="LOGIN"
                type="outline"
                buttonStyle={{ borderColor: Colors.border, borderWidth: 2, width: width*0.9, borderRadius:10}}
                titleStyle={{ color: Colors.content }}
                onPress={_onSubmitPressed}
                />
            </View>
        </View>
            <View style={{flex:0.2}}>
                <TouchableOpacity onPress={()=>{ navigation.navigate("Register") }}>
                    <Text style={styles.info}>Not yet a user? Click here to register.</Text>
                </TouchableOpacity>
            </View>
            <Alerts />
            <Loader />
            <Message />
        </View>
    )
}


const styles = StyleSheet.create({
main: {
    flex:1,
    backgroundColor: Colors.background,
    
},
input:{
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.base,
    color: Colors.content,
    borderRadius: 10,
    height: height*0.05,
    width: width*0.9,
    padding: 10
},
text_area: {
    padding: 10
},
submit_area:{
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
 },
 info:{
    color: Colors.content,
    fontSize: height*0.015,
    textAlign: 'center'
 },
 reset: {
     paddingTop: 15,
     paddingBottom: 15
 },
 logo:{
    color: Colors.content,
    fontFamily: Fonts.logo,
    textAlign: 'center',
    fontSize: height*0.1
 },
})