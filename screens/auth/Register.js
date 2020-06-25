import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Text, Button } from 'react-native-elements'
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Layout from '../../constants/Layout';
import Alerts from '../../components/Alerts';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { reg } from '../../redux/actions/auth';

const { width, height } = Layout.window;

const Register = (props) => {




    const { navigation } = props

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordDuplicate, setPasswordDuplicate] = useState('')
    const [dob, setDOB] = useState('')
    const dispatch = useDispatch()
    const reg_ck = useSelector(state => state.auth.reg)
    navigation.setOptions({ headerTitle: 'REGISTER', headerStyle: {backgroundColor: '#000000'}, 
    headerTitleStyle: { color: Colors.content, fontFamily: Fonts.logo, fontSize: 25 }, 
    headerTintColor: Colors.content});

    if(reg_ck){
        navigation.navigate('OTP')
    }

    const onSubmitPressed = () => {
        const payload = {name, email, password, phone, dob };
        dispatch(reg(payload));
    }

    return (
        <View style={styles.main}>
            <View style={styles.logo_area}>
                <Text style={styles.logo}>CM</Text>
            </View>
           <View style={styles.text_area}>
                <TextInput 
                style={styles.input} 
                placeholder="Name"
                onChangeText = {(text)=>{setName(text)}}
                value={name}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                keyboardAppearance={'dark'}
                returnKeyType={"next"}
                />
            </View>
            <View style={styles.text_area}>
                <TextInput 
                style={styles.input} 
                placeholder="Email"
                onChangeText = {(text)=>{setEmail(text)}}
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
                placeholder="Phone Number"
                onChangeText = {(text)=>{setPhone(text)}}
                value={phone}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                keyboardAppearance={'dark'}
                keyboardType={"phone-pad"}
                returnKeyType={"next"}
                autoCapitalize={'none'}
                />
            </View>
            <View style={styles.text_area}>
                <TextInput 
                style={styles.input} 
                placeholder="Password"
                onChangeText = {(text)=>{setPassword(text)}}
                value={password}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                keyboardAppearance={'dark'}
                secureTextEntry={true}
                returnKeyType={"next"}
                autoCapitalize={'none'}
                />
            </View>
            <View style={styles.text_area}>
                <TextInput 
                style={styles.input} 
                placeholder="Confirm password"
                onChangeText = {(text)=>{setPasswordDuplicate(text)}}
                value={passwordDuplicate}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                keyboardAppearance={'dark'}
                secureTextEntry={true}
                returnKeyType={"next"}
                autoCapitalize={'none'}
                />
            </View>
            <View style={styles.text_area}>
                <TextInput 
                style={styles.input} 
                placeholder="Enter DOB (YYYY-MM-DD)"
                onChangeText = {(text)=>{setDOB(text)}}
                value={dob}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                keyboardAppearance={'dark'}
                returnKeyType={"next"}
                autoCapitalize={'none'}
                />
            </View>
            <View style={styles.submit_area}>
                <Button
                title="REGISTER"
                type="outline"
                buttonStyle={{ borderColor: Colors.border, borderWidth: 2, width: width*0.9, borderRadius:10}}
                titleStyle={{ color: Colors.content }}
                onPress={onSubmitPressed}
                />
            </View>
            <Alerts />
<Loader />
<Message />
        </View>
    )
}

export default Register


const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor: Colors.background, 
        justifyContent: 'center', 
        alignItems: 'center'
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
     logo:{
        color: Colors.content,
        fontFamily: Fonts.logo,
        textAlign: 'center',
        fontSize: height*0.1
     },
})