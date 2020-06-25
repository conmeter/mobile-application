import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, ListItem } from 'react-native-elements'
import Modal from 'react-native-modal'
import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../redux/actions/items'
import { Ionicons as Icon } from '@expo/vector-icons';
import Layout from '../constants/Layout';
import {roundToTwo} from '../constants/Utils'

const { width, height } = Layout.window
const Menu = (props) => {

    const dispatch = useDispatch()
    const { item, email, webs, navigation, cm, ...rest } = props
    if(item){
        if(webs){
            return (
                <Modal {...rest} style={styles.modal} >
                <View style={{flex:1}}>
                    <View style={styles.snapshot}>
                        <View style={styles.name}><Text style={styles.sub} numberOfLines={1} ellipsizeMode='tail'>{item.web_url}</Text></View>
                        <View style={styles.rating}><Text style={styles.sub} numberOfLines={1} ellipsizeMode='tail'>{roundToTwo(item.total_rating_value)}</Text></View>
                    </View>
                    <View style={{borderBottomWidth:1, borderBottomColor:Colors.border}}></View>
                    <View style={styles.options}>
                    <TouchableOpacity onPress={()=>{cm(); navigation.navigate('Report', {post_id:item.post_id})}}>
                        <ListItem
                            title="Report"
                            subtitle="Report this post"
                            leftIcon={<Icon name="md-alert" color="red" size={30}/>}
                            containerStyle={styles.item}
                            titleStyle={styles.title}
                            subtitleStyle={styles.subtitle}
                        />
                    </TouchableOpacity>
                    </View>
                    </View>
                </Modal>
        )
        }
        else{
            return (
                <Modal {...rest} style={styles.modal} >
                <View style={{flex:1}}>
                    <View style={styles.snapshot}>
                        <View style={styles.name}><Text style={styles.sub} numberOfLines={1} ellipsizeMode='tail'>{item.web_url}</Text></View>
                        <View style={styles.rating}><Text style={styles.sub} numberOfLines={1} ellipsizeMode='tail'>{roundToTwo(item.total_rating_value)}</Text></View>
                    </View>
                    <View style={{borderBottomWidth:1, borderBottomColor:Colors.border}}></View>
                    <View style={styles.options}>
                    <TouchableOpacity onPress={()=>{dispatch(deleteItem(item.post_id)); cm();}}>
                        <ListItem
                            title="Delete"
                            subtitle="This is permanent proceed with caution"
                            leftIcon={<Icon name="md-trash" color="red" size={30}/>}
                            containerStyle={styles.item}
                            titleStyle={styles.title}
                            subtitleStyle={styles.subtitle}
                        />
                    </TouchableOpacity>
                    </View>
                    </View>
                </Modal>
        )
        }
    
    }
    else{
        return null
    }
}

export default Menu

const styles= StyleSheet.create({
    modal:{
        backgroundColor : Colors.modal,   
        borderRadius:10,  
        borderWidth: 1,  
        borderColor: Colors.background,    
        marginTop: height*0.7,
        width: width*0.9,
        alignSelf:'center',
        padding:5,
        marginBottom:0
    },
    snapshot:{
        flex: 0.2,
        flexDirection: 'row',
    },
    options:{
        flex: 0.7,
    },
    name:{
        flex:0.5,
        alignItems:'flex-start'
    },
    rating:{
        flex:0.5,
        alignItems:'flex-end',
    },
    item:{
        backgroundColor: Colors.modal
    },
    title:{
        color: Colors.content
    },
    sub:{
        color: Colors.content
    },
    subtitle:{
        color: Colors.textMuted
    },
})