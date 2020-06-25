import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Text, Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Layout from '../../constants/Layout';
import { otpGen, ckOTP } from '../../redux/actions/auth';
const { width, height } = Layout.window;

const OTP = (props) => {

    const { navigation } = props
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(otpGen());
    },[])

    navigation.setOptions({ headerTitle: 'OTP', headerStyle: {backgroundColor: '#000000'}, 
    headerTitleStyle: { color: Colors.content, fontFamily: Fonts.logo, fontSize: 25 }, 
    headerTintColor: Colors.content});
    
    const [otp, setOTP] = useState(null);

    const submit = () =>{
        const payload = {otp}
        dispatch(ckOTP(payload));
    }

    return (
        <View style={styles.container}>
         <View style={styles.sorry_area}>
            <Text style={styles.sorry}>Enter the OTP</Text>
        </View>
            <View style={styles.text_area}>
                <TextInput 
                style={styles.input} 
                placeholder="Enter OTP"
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                keyboardAppearance={'dark'}
                keyboardType={"number-pad"}
                returnKeyType={"next"}
                autoCapitalize={'none'}
                value={otp}
                onChangeText = {(text)=>{setOTP(text)}}
                />
            </View>
            <View style={styles.submit_area}>
                <Button
                title="LOGIN"
                type="outline"
                buttonStyle={{ borderColor: Colors.border, borderWidth: 2, width: width*0.9, borderRadius:10}}
                titleStyle={{ color: Colors.content }}
                onPress= {submit}
                />
            </View>
        </View>
    )
}

export default OTP

const styles = StyleSheet.create({
    container:{
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
     
     sorry:{
        color: Colors.content,
        fontSize: 30
    },
})
