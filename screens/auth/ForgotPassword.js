import React, {useState} from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Input, Button, Icon } from 'react-native-elements'
import axios from 'axios'
import Layout from '../../constants/Layout'
import Alerts from '../../components/Alerts';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const { width, height } = Layout.window

const ForgotPassword = () => {

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
                <Input
                type="email"
                placeholder="Email"
                onChangeText= {emailChange}
                autoCapitalize="none"
                leftIcon={
                    <Icon
                    name='email'
                    size={24}
                    color='black'
                    />}/>
            </View>
            <View style={styles.submit}>
            <Button
                 icon={{
                        name: "arrow-forward",
                        size: 15,
                        color: "black"
                    }}
                title="Login"
                type="outline"
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
        width: width*0.8,
        paddingBottom: 20
    },
    submit:{
        width: width*0.8,
    }
})