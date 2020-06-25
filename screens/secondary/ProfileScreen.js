import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../constants/Layout';
import { roundToTwo } from '../../constants/Utils';
import { LinearGradient } from 'expo-linear-gradient';
import CustomModal from '../../components/CustomModal';
import Menu from '../../components/Menu';
import { getProfile, removeProfile } from '../../redux/actions/profiles'
import { vibratePhone } from '../../constants/Utils'

const { width, height } = Layout.window

const UserScreen = (props) => {

    const user_id = props.route.params.user_id
    const dispatch = useDispatch()
    
    useEffect(()=>{

        dispatch(getProfile(user_id))

        return () => {
            dispatch(removeProfile())
        }

    },[])

    const [item, setItem] = useState(null)
    const [fullView, setFullView] = useState(false)
    const [seeOptions, setSeeOptions] = useState(false)
    const close_modal = () => {setSeeOptions(false)}
    const posts = useSelector(state => state.profile.posts)
    const user = useSelector(state => state.profile.user)
    const count = useSelector(state => state.profile.count)
    const likes = useSelector(state => state.profile.likes)
    const {navigation} = props
    if(!user){
        return null
    }

    navigation.setOptions({ headerTitle: user.name.toUpperCase().split(' ').map(i => i.charAt(0)), headerStyle: {backgroundColor: '#000000'}, 
    headerTitleStyle: { color: Colors.content, fontFamily: Fonts.logo, fontSize: 25 }, 
    headerTintColor: Colors.content});

    
    const redirect = (wURL, user) => {
        setFullView(false)
        setSeeOptions(false)
        if(wURL)
        {navigation.navigate('Website', {webName:wURL})}
        else
        {navigation.navigate('Website', {user_id:user})}
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
        isVisible={seeOptions}
        onBackButtonPress={()=>{setSeeOptions(false)}} 
        onBackdropPress={()=>{setSeeOptions(false)}} 
        />
        <View style={styles.user}>
            <View style={styles.pic}>
            <Avatar
                source={{
                    uri: user.image,
                }}
                showEditButton
                rounded
                size="large"
            />
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