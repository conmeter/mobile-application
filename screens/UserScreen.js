import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../constants/Layout';
import { roundToTwo } from '../constants/Utils';
import { LinearGradient } from 'expo-linear-gradient';
import CustomModal from '../components/CustomModal';
import Menu from '../components/Menu';
import { vibratePhone } from '../constants/Utils';
import  * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { changeProfilePic as cPP } from '../redux/actions/auth';
import Loader from '../components/Loader';
import Message from '../components/Message';
const { width, height } = Layout.window

const UserScreen = (props) => {

    const [item, setItem] = useState(null)
    const [fullView, setFullView] = useState(false)
    const [seeOptions, setSeeOptions] = useState(false)
    const close_modal = () => {setSeeOptions(false)}
    const posts = useSelector(state => state.items.items)
    const user = useSelector(state => state.auth.user)
    const count = useSelector(state => state.mis.count)
    const likes = useSelector(state => state.mis.likes)
    const {navigation} = props
    const dispatch = useDispatch()

    const changeProfilePic = async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if(status != 'granted'){
                alert('required')
            }
            else{
                try{
                    console.log('here')
                    let result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.All,
                        allowsEditing: true,
                    });
                    if(!result.cancelled){
                        dispatch(cPP(result.uri))
                    }
                }
                catch(E){
                    console.log(E);
                }
            }
       
    }

    if(!user){
        return null
    }
    const redirect = (wURL, user) => {
        setFullView(false)
        setSeeOptions(false)
        if(wURL)
        {navigation.navigate('Website', {webName:wURL})}
        else
        {navigation.navigate('Profile', {user_id:user})}
    }

    return (
        <LinearGradient style={{flex:1}} colors={Colors.userGradient}>
        <CustomModal 
        item={item} 
        isVisible={fullView} 
        onBackButtonPress={()=>{setFullView(false)}} 
        onBackdropPress={()=>{setFullView(false)}} 
        redirect={redirect}
        />
        <Menu 
        item={item}
        cm={close_modal}
        useNativeDriver={true}
        isVisible={seeOptions}
        onBackButtonPress={()=>{setSeeOptions(false)}} 
        onBackdropPress={()=>{setSeeOptions(false)}} 
        />
        <View style={styles.user}>
            <View style={styles.pic}>
            <TouchableOpacity onPress={changeProfilePic}>
            <Avatar
                source={{
                    uri: user.image,
                }}
                showEditButton
                rounded
                size="large"
            />
            </TouchableOpacity>
            </View>
            <View style={styles.info}>
                <View style={styles.name}>
                    <Text style={styles.name_text} numberOfLines={1} ellipsizeMode='tail'>{user.name}</Text>
                </View>
                <View style={styles.count}>
                    <View style={styles.c}>
                    <Text style={styles.subtext} numberOfLines={1} ellipsizeMode='tail'>{count? count: 0}</Text>
                    <Text style={styles.subtext}>Posts</Text>
                    </View>
                    <View style={styles.c}>
                    <Text style={styles.subtext} numberOfLines={1} ellipsizeMode='tail'>{likes? likes:0}</Text>
                    <Text style={styles.subtext}>Likes</Text>
                    </View>
                </View>
            </View>
        </View>
        <View style={styles.additional}>
            <Text style={styles.subtext} numberOfLines={1} ellipsizeMode='tail'>Born on: {user.dob}</Text>
            <Text style={styles.subtext} numberOfLines={1} ellipsizeMode='tail'>Member since: {user.date_joined.slice(0,10)}</Text>
        </View>
        <View style={styles.posts}>
        
        
        <FlatList data={posts} numColumns={2}
                renderItem={({item})=>(
                 <TouchableOpacity onPress={()=>{ setItem(item); setFullView(true); }} onLongPress={()=>{ setItem(item); setSeeOptions(true); vibratePhone(100);}}>
                    <View style={styles.card} >
                        <View style={styles.web_name}>
                            <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{item.web_url}</Text>
                        </View>
                        <View style={styles.rating}>
                            <Text style={styles.value}>{roundToTwo(item.total_rating_value)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                )}
                keyExtractor={item => item.post_id}
                contentContainerStyle={{flexDirection: 'column'}}
                
        />       
        
        </View>
<Loader />
<Message />
        </LinearGradient>
    )
}

export default UserScreen


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: "center",
    },
    card: {
       width: width*0.42,
       height: height*0.12,
       borderRadius: 5,
       backgroundColor: Colors.background,
       margin: 10,
       alignItems: 'center',
       justifyContent: 'center',
       alignContent: 'center',
       overflow: 'hidden',
       padding:5
    },
    web_name: {
        flex:0.5,
        alignItems: 'center',
       justifyContent: 'center',
    },
    rating: {
        flex:0.5,
        alignItems: 'center',
       justifyContent: 'center',
    },
    title: {
        color:Colors.content,
        fontSize: 13,
        fontFamily: Fonts.text
    },
    user:{
        flex:0.2,
        flexDirection: 'row'
    },
    posts:{
        flex:0.7,
        alignItems: 'center',
    },
    additional:{
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    pic: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    info:{
        flex:0.7,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    name_text: {
        color:Colors.content,
        fontSize: 20,
    },
    count : {
        flexDirection: 'row'
    },
    c: {
        flex:0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subtext:{
        color:Colors.content,
        fontSize: 15,
    },
    value: {
        color: Colors.textMuted,
    },
  });