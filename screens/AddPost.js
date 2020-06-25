import React, { useState } from 'react'
import { StyleSheet, View, TextInput, FlatList, SafeAreaView, ScrollView } from 'react-native'
import Colors from '../constants/Colors';
import { MenuProvider } from 'react-native-popup-menu';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
  } from 'react-native-popup-menu';
import { useSelector, useDispatch } from 'react-redux';
import { Text, ListItem, AirbnbRating, Button } from 'react-native-elements';
import { addItem } from '../redux/actions/items';
import { addCount } from '../redux/actions/mis';
import Layout from '../constants/Layout';
import Alerts from '../components/Alerts';
import Loader from '../components/Loader';
import Message from '../components/Message';
const { width, height } = Layout.window
const { SlideInMenu } = renderers

const AddPost = ({navigation}) => {

    const [web_url, setWebUrl] = useState('')
    const [review_text, setReviewText] = useState('')
    const [design_rating, setDesignRating] = useState(0)
    const [ui_rating, setUiRating] = useState(0)
    const [speed_rating, setSpeedRating] = useState(0)
    const [qoc_rating, setQocRating] = useState(0)
    const [reliability_rating, setReliabilityRating] = useState(0)
    const [compatibility_rating, setCompatibilityRating] = useState(0)
    const [support_rating, setSupportRating] = useState(0)
    const [trust_rating, setTrustRating] = useState(0)
    const dispatch = useDispatch()

    const webs = useSelector(state => state.webs.items)

    const _onSubmitPressed = () => {
        const payload = { 
            web_url: web_url,
            review_text: review_text,
            design_rating: design_rating,
            ui_rating: ui_rating,
            speed_rating: speed_rating,
            qoc_rating: qoc_rating,
            reliability_rating: reliability_rating,
            compatibility_rating: compatibility_rating,
            support_rating: support_rating,
            trust_rating: trust_rating,
            total_rating_value: 0
            } 
    
            dispatch(addItem(payload)); 
            dispatch(addCount());
            setWebUrl('');
            setReviewText('');
            setDesignRating(0);
            setUiRating(0);
            setSpeedRating(0);
            setQocRating(0);
            setReliabilityRating(0);
            setCompatibilityRating(0);
            setSupportRating(0);
            setTrustRating(0);
      }

    return (
        <MenuProvider >
        <SafeAreaView><ScrollView>
        <View style={styles.container}>
        <View style={styles.menu_area}>
        <Menu renderer={SlideInMenu} onSelect={value => setWebUrl(value.url)}>
            <MenuTrigger>
            <ListItem
            key={"select_site"}
            title={ web_url? web_url: 'Select the website'}
            containerStyle={{backgroundColor: Colors.base, borderWidth: 1, borderColor: Colors.border, borderRadius: 10}}
            titleStyle={{color: Colors.content}}
            rightIcon = {{ name: "arrow-drop-down", color: Colors.content }}
          />
            </MenuTrigger>
            <MenuOptions>
            <FlatList
                data={webs}
                renderItem={
                    ({item}) => (
                        <MenuOption text={item.url} value={item}/>
                    )
                }
                keyExtractor = { (item) => item.web_url }
                style={{ height: height*0.33, backgroundColor: "transparent"}}
            />
            </MenuOptions>
        </Menu>
        </View>
        <View style={styles.review_text_area}>
           <TextInput multiline style={styles.review_text} onChangeText={(text) => {setReviewText(text)}} value={review_text}/>
        </View>
        <View style={styles.rating_area}>
            <View style={styles.rate_container}>
            <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "OK", "Good",  "Amazing"]}
            defaultRating={design_rating}
            size={20}
            onFinishRating={(rate)=>{setDesignRating(rate)}}
            
            />
            <Text style={styles.rate_name}>Design</Text>
            </View>
            <View style={styles.rate_container}>
            <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "OK", "Good",  "Amazing"]}
            defaultRating={ui_rating}
            size={20}
            onFinishRating={(rate)=>{setUiRating(rate)}}
            />
            <Text style={styles.rate_name}>Interface</Text>
            </View>
            <View style={styles.rate_container}>
            <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "OK", "Good",  "Amazing"]}
            defaultRating={speed_rating}
            size={20}
            onFinishRating={(rate)=>{setSpeedRating(rate)}}
            />
            <Text style={styles.rate_name}>Speed</Text>
            </View>
            <View style={styles.rate_container}>
            <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "OK", "Good",  "Amazing"]}
            defaultRating={qoc_rating}
            size={20}
            onFinishRating={(rate)=>{setQocRating(rate)}}
            />
            <Text style={styles.rate_name}>Content</Text>
            </View>
            <View style={styles.rate_container}>
            <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "OK", "Good",  "Amazing"]}
            defaultRating={reliability_rating}
            size={20}
            onFinishRating={(rate)=>{setReliabilityRating(rate)}}
            />
            <Text style={styles.rate_name}>Reliability</Text>
            </View>
            <View style={styles.rate_container}>
            <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "OK", "Good",  "Amazing"]}
            defaultRating={compatibility_rating}
            size={20}
            onFinishRating={(rate)=>{setCompatibilityRating(rate)}}
            />
            <Text style={styles.rate_name}>Compatibility</Text>
            </View>
            <View style={styles.rate_container}>
            <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "OK", "Good",  "Amazing"]}
            defaultRating={support_rating}
            size={20}
            onFinishRating={(rate)=>{setSupportRating(rate)}}
            />
            <Text style={styles.rate_name}>Support</Text>
            </View>
            <View style={styles.rate_container}>
            <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "OK", "Good",  "Amazing"]}
            defaultRating={trust_rating}
            size={20}
            onFinishRating={(rate)=>{setTrustRating(rate)}}
            />
            <Text style={styles.rate_name}>Trust</Text>
            </View>
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
        
        </ScrollView>
        <Alerts />
<Loader />
<Message />
        </SafeAreaView>
        </MenuProvider>
    )
}

export default AddPost

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      maxHeight: height,
      maxWidth: width,
    },
    review_text:{
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.base,
        color: Colors.content,
        height: height*0.17,
        borderRadius: 10
    },

    rate_name:{
        color: Colors.content,
        fontSize: 17
    },
    rate_container:{
        alignItems:'center',
        width: width*0.4,
        justifyContent:'center',
    },
    rating_area: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        padding:10
     },
     review_text_area:{
         padding: 10
     },
     menu_area: {
         padding:10
     },
     submit_area:{
        padding: 10
     },

  });