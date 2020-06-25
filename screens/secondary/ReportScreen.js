import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Layout from '../../constants/Layout';
import { useDispatch } from 'react-redux';
import { addReport } from '../../redux/actions/mis';

const { width, height } = Layout.window

const ReportScreen = (props) => {

    const { navigation } = props
    const params = props.route.params
    const [report_text, setReportText] = useState('')
    const [report_head, setReportHead] = useState('')
    const dispatch = useDispatch()

    navigation.setOptions({ headerTitle: "REPORT", headerStyle: {backgroundColor: '#000000'}, 
    headerTitleStyle: { color: Colors.content, fontFamily: Fonts.logo, fontSize: 25 }, 
    headerTintColor: Colors.content});

    const _onSubmitPressed = () => {

        
            const payload = 
           params? { 
                post_id: params.post_id,
                issue_head: report_head,
                issue_body: report_text
            }: { 
                issue_head: report_head,
                issue_body: report_text
                }
        

        dispatch(addReport(payload));
        setReportHead('');
        setReportText('');
        navigation.goBack();
      }


    return (
        <View style={styles.container}>
        <View style={styles.sorry_area}>
            <Text style={styles.sorry}>Sorry for the inconvenience</Text>
        </View>
        <View style={styles.report_head_area}>
            <TextInput style={styles.report_head} onChangeText={ (text)=> {setReportHead(text)}} value={report_head} placeholder="Subject"/>
        </View>
        <View style={styles.report_text_area}>
           <TextInput multiline style={styles.report_text} onChangeText={(text) => {setReportText(text)}} value={report_text} placeholder="Issue"/>
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
        </View>
    )
    
}

export default ReportScreen

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: Colors.background,
        justifyContent: 'center'
    },
    report_text:{
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.base,
        color: Colors.content,
        height: height*0.17,
        borderRadius: 10
    },
    report_text_area:{
        padding: 10
    },
    report_head:{
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.base,
        color: Colors.content,
        borderRadius: 10,
        height: height*0.05,
    },
    report_head_area:{
        padding: 10
    },
    submit_area:{
        padding: 10
     },
     sorry:{
         color: Colors.content,
         fontSize: 30
     },
     sorry_area:{
         alignItems: 'center',
         justifyContent:'center',
         paddingBottom: 10
     }
})