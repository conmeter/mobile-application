import React, { useEffect, useState, Fragment } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Rating, Avatar, Text } from 'react-native-elements';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../constants/Layout';
import { roundToTwo } from '../../constants/Utils';
import { LinearGradient } from 'expo-linear-gradient';
import CustomModal from '../../components/CustomModal';
import Modal from 'react-native-modal';
import Menu from '../../components/Menu';
import { getWebDetails, removeWebDetails } from '../../redux/actions/webs';
import { vibratePhone } from '../../constants/Utils'

const { width, height } = Layout.window
const WebScreen = (props) => {
    const dispatch = useDispatch()
    const { navigation } = props
    const webName = props.route.params.webName
    navigation.setOptions({ headerTitle: webName, headerStyle: {backgroundColor: '#000000'}, 
    headerTitleStyle: { color: Colors.content, fontFamily: Fonts.text, fontSize: 25 }, 
    headerTintColor: Colors.content});
    dispatch(getWebDetails(webName));
    
    
    const [showFull, setShowFull] = useState(false)
    const [item, setItem] = useState(null)
    const [fullView, setFullView] = useState(false)
    const [seeOptions, setSeeOptions] = useState(false)
    const close_modal = () => {setSeeOptions(false)}
    const web = useSelector(state => state.webs.webs)
    const posts = useSelector(state => state.webs.posts)
    const webtotal = useSelector(state => state.webs.totals)

    useEffect(()=>{
        
        return () => {
            dispatch(removeWebDetails())
        }
    },[])

    const c_uid = useSelector(state=>state.auth.user.id)

    const redirect = (wURL, user_id) => {
        setFullView(false)
        setSeeOptions(false)
        if(wURL)
        {navigation.navigate('Website', {webName:wURL})}
        else
        {
            if(c_uid === user_id){
                navigation.navigate('User')
            }
            else{
            navigation.navigate('Profile', {user_id:user_id})
            }
        }
    }

    const expansion = () =>{
        return(
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.data}>
            <Text style={styles.sub}>Design</Text>
            <Rating
            tintColor="#000000"
            readonly 
            ratingBackgroundColor={Colors.modal}
            startingValue={webtotal.average_d}
            />
        </View>
        <View style={styles.data}>
            <Text style={styles.sub}>UI</Text>
            <Rating
            tintColor="#000000"
            readonly 
            ratingBackgroundColor={Colors.modal}
            startingValue={webtotal.average_ui}
            />
        </View>
        <View style={styles.data}>
            <Text style={styles.sub}>Speed</Text>
            <Rating
            tintColor="#000000"
            readonly 
            ratingBackgroundColor={Colors.modal}
            startingValue={webtotal.average_spe}
            />
        </View>
        <View style={styles.data}>
            <Text style={styles.sub}>Content</Text>
            <Rating
            tintColor="#000000"
            readonly 
            ratingBackgroundColor={Colors.modal}
            startingValue={webtotal.average_q}
            />
        </View>
        <View style={styles.data}>
            <Text style={styles.sub}>Reliability</Text>
            <Rating
            tintColor="#000000"
            readonly 
            ratingBackgroundColor={Colors.modal}
            startingValue={webtotal.average_r}
            />
        </View>
        <View style={styles.data}>
            <Text style={styles.sub}>Compatibility</Text>
            <Rating
            tintColor="#000000"
            readonly 
            ratingBackgroundColor={Colors.modal}
            startingValue={webtotal.average_c}
            />
        </View>
        <View style={styles.data}>
            <Text style={styles.sub}>Support</Text>
            <Rating
            tintColor="#000000"
            readonly 
            ratingBackgroundColor={Colors.modal}
            startingValue={webtotal.average_su}
            />
        </View>
        <View style={styles.data}>
            <Text style={styles.sub}>Trust</Text>
            <Rating
            tintColor="#000000"
            readonly 
            ratingBackgroundColor={Colors.modal}
            startingValue={webtotal.average_tr}
            />
        </View>
        </View>
        )
    }



    
    return (
        <LinearGradient style={{flex:1}} colors={Colors.webGradient}>
        <CustomModal 
        item={item} 
        webs
        redirect={redirect}
        isVisible={fullView} 
        onBackButtonPress={()=>{setFullView(false)}} 
        onBackdropPress={()=>{setFullView(false)}} 
        />
        <Menu 
        item={item}
        webs
        cm={close_modal}
        navigation={navigation}
        isVisible={seeOptions}
        onBackButtonPress={()=>{setSeeOptions(false)}} 
        onBackdropPress={()=>{setSeeOptions(false)}} 
        />
        <Modal 
        isVisible={showFull} 
        onBackButtonPress={()=>{setShowFull(false)}} 
        onBackdropPress={()=>{setShowFull(false)}} 
        style={{flex:1, backgroundColor: Colors.modal}}
        >{expansion()}</Modal>
        <View style={styles.user}>
            <View style={styles.pic}>
            <Avatar
                source={{
                    uri: "https://logo.clearbit.com/"+web.url,
                }}
                rounded
                size="large"
            />
            </View>
            <View style={styles.info}>
                <View style={styles.name}>
                    <Text style={styles.name_text} numberOfLines={2} ellipsizeMode='tail'>{web.name}</Text>
                </View>
                <View style={styles.count}>
                    <View style={styles.c}>
                    <Text style={styles.subtext}>{web.url}</Text>
                    </View>
                </View>
            </View>
        </View>
        <View style={styles.additional}>
            <Text style={styles.subtext} numberOfLines={1} ellipsizeMode='tail'>{web.desc}</Text>
        </View>
        <View style={styles.total}>
        <TouchableOpacity onPress={()=>{setShowFull(true)}}>
        <View style={styles.card_all} >
                <Text style={styles.name_text}>Total Rating: {webtotal.average_t_r}</Text>
                <Text style={styles.value}>Click for individual rating</Text>
        </View>
        </TouchableOpacity>
        </View>
        <View style={styles.posts}>
        
        
        <FlatList data={posts} numColumns={2}
                renderItem={({item})=>(
                 <TouchableOpacity onPress={()=>{ setItem(item); setFullView(true); }} onLongPress={()=>{ setItem(item); setSeeOptions(true); vibratePhone(100);}}>
                    <View style={styles.card} >
                        <View style={styles.web_name}>
                            <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{item.user_email__name}</Text>
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

export default WebScreen



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
    card_all:{
       width: width*0.95,
       height: height*0.12,
       borderRadius: 5,
       backgroundColor: Colors.background,
       margin: 10,
       alignItems: 'center',
       justifyContent: 'center',
       alignContent: 'center',
       overflow: 'hidden',
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
        flex:0.55,
        alignItems: 'center',
    },
    additional:{
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    total: {
        flex:0.15
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
        fontSize: 30,
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
    sub: {
        color: Colors.textMuted,
        fontSize: 15
    },
    data:{
        alignItems: 'center',
        justifyContent: 'center',
        padding:4
    },
  });