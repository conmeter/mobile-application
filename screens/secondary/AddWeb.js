import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Layout from '../../constants/Layout';
import { useDispatch } from 'react-redux';
import { addWeb } from '../../redux/actions/webs';
import Alerts from '../../components/Alerts';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
const { width, height } = Layout.window

const AddWeb = (props) => {

    const [url, setURL] = useState('')
    const [name, setName] = useState('')
    const [desc, setDESC] = useState('')
    const dispatch = useDispatch()

    const { navigation } = props

    navigation.setOptions({ headerTitle: "ADD WEBSITE", headerStyle: {backgroundColor: '#000000'}, 
    headerTitleStyle: { color: Colors.content, fontFamily: Fonts.logo, fontSize: 25 }, 
    headerTintColor: Colors.content});

    const _onSubmitPressed = () => {

        const payload = {url:url,name:name,desc:desc}
        dispatch(addWeb(payload))
      }


    return (
        <View style={styles.container}>
        <View style={styles.thanks_area}>
            <Text style={styles.sorry}>Thank you for your contribution</Text>
        </View>
        <View style={styles.web_add_area}>
            <TextInput style={styles.web_add} autoCorrect={false} autoCapitalize={'none'} onChangeText={ (text)=> {setURL(text)}} value={url} placeholder="URL of the website."/>
        </View>
        <View style={styles.web_add_area}>
            <TextInput style={styles.web_add} autoCorrect={false} onChangeText={ (text)=> {setName(text)}} value={name} placeholder="Name of the website."/>
        </View>
        <View style={styles.web_add_area}>
            <TextInput style={styles.web_add} onChangeText={ (text)=> {setDESC(text)}} value={desc} placeholder="Description of the website."/>
        </View>
        <View style={styles.submit_area}>
        <Button
        title="Submit"
        type="outline"
        buttonStyle={{ borderColor: Colors.border, borderWidth: 2 }}
        titleStyle={{ color: Colors.content }}
        onPress={_onSubmitPressed}
        />
        </View>
        <Alerts />
<Loader />
<Message />
        </View>
    )
    
}

export default AddWeb

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: Colors.background,
        justifyContent: 'center'
    },
    web_add:{
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.base,
        color: Colors.content,
        borderRadius: 10,
        height: height*0.05,
    },
    web_add_area:{
        padding: 10
    },
    submit_area:{
        padding: 10
     },
     sorry:{
         color: Colors.content,
         fontSize: 30
     },
     thanks_area:{
         alignItems: 'center',
         justifyContent:'center',
         paddingBottom: 10
     }
})