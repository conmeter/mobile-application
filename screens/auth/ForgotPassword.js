import React, {useState} from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import axios from 'axios'
import Layout from '../../constants/Layout'
import Alerts from '../../components/Alerts';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

const { width, height } = Layout.window

const ForgotPassword = (props) => {
    const { navigation } = props

    navigation.setOptions({ headerTitle: 'FORGOT PASSWORD', headerStyle: {backgroundColor: '#000000'}, 
    headerTitleStyle: { color: Colors.content, fontFamily: Fonts.logo, fontSize: 25 }, 
    headerTintColor: Colors.content});

    const [email, setEmail] = useState('');

    const emailChange = (email) => {
        setEmail(email)
    }
    const _onChangePressed = () => {
        const payload = { email: email } 
    axios
      .post(`/api/v2/users/reset_password/`, payload)
    }

    return (
        <View style={styles.main}>
            <View style={styles.email}>
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
            <View style={styles.submit}>
            <Button
                title="Next"
                type="outline"
                buttonStyle={{ borderColor: Colors.border, borderWidth: 2, width: width*0.9, borderRadius:10}}
                titleStyle={{ color: Colors.content }}
                onPress={() => _onChangePressed()}
                />
            </View>

            <Alerts />
<Loader />
<Message />

        </View>
    )
}

export default ForgotPassword


const styles = StyleSheet.create({
    main: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    email:{
        padding: 10,
        paddingBottom: 40,
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
})