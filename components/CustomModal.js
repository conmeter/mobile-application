import React from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal';
import { Rating, AirbnbRating, Text } from 'react-native-elements';
import Colors from '../constants/Colors';
import { roundToTwo } from '../constants/Utils';

const CustomModal = (props) => {

    const { item, redirect, webs, ...rest } = props
    return (
        <Modal {...rest} style={styles.modal} 
        propagateSwipe
        >
        { item?
        <View style={{flex:1}}>
        <ScrollView>
            <View style={styles.url}><Text style={styles.head} numberOfLines={1} ellipsizeMode='tail'>{webs ? item.user_email__name:item.web_url}</Text></View>
            <View style={styles.meta}>
            <Text style={styles.sub} numberOfLines={1} eipsizeMode='tail'>Posted on {item.date_posted.slice(0,10)}</Text>
            {webs?<TouchableOpacity onPress={()=>{redirect(null,item.user_email__id)}}><Text style={styles.sub} numberOfLines={1} ellipsizeMode='tail'>Visit user's page</Text></TouchableOpacity>
            :<TouchableOpacity onPress={()=>{redirect(item.web_url, null)}}><Text style={styles.sub} numberOfLines={1} ellipsizeMode='tail'>Visit {item.web_url}'s page</Text></TouchableOpacity>
            }
            </View>
            <View style={styles.total}><Text style={styles.rate} numberOfLines={1} ellipsizeMode='tail'>{roundToTwo(item.total_rating_value)}</Text></View>
            <View style={styles.review}><Text style={styles.review_text}>{item.review_text}</Text></View>
            <View style={styles.ratings}>
                <View style={styles.data}>
                    <Text style={styles.sub}>Design</Text>
                    <Rating
                    
                    
                    tintColor="#000000"
                    readonly
                    
                    ratingBackgroundColor={Colors.modal}
                    startingValue={item.design_rating}
                    />
                </View>
                <View style={styles.data}>
                    <Text style={styles.sub}>UI</Text>
                    <Rating
                    
                    
                    tintColor="#000000"
                    readonly
                    
                    ratingBackgroundColor={Colors.modal}
                    startingValue={item.ui_rating}
                    />
                </View>
                <View style={styles.data}>
                    <Text style={styles.sub}>Speed</Text>
                    <Rating
                    
                    
                    tintColor="#000000"
                    readonly
                    
                    ratingBackgroundColor={Colors.modal}
                    startingValue={item.speed_rating}
                    />
                </View>
                <View style={styles.data}>
                    <Text style={styles.sub}>Content</Text>
                    <Rating
                    
                    
                    tintColor="#000000"
                    readonly
                    
                    ratingBackgroundColor={Colors.modal}
                    startingValue={item.qoc_rating}
                    />
                </View>
                <View style={styles.data}>
                    <Text style={styles.sub}>Reliability</Text>
                    <Rating
                    
                    
                    tintColor="#000000"
                    readonly
                    
                    ratingBackgroundColor={Colors.modal}
                    startingValue={item.reliability_rating}
                    />
                </View>
                <View style={styles.data}>
                    <Text style={styles.sub}>Compatibility</Text>
                    <Rating
                    
                    
                    tintColor="#000000"
                    readonly
                    
                    ratingBackgroundColor={Colors.modal}
                    startingValue={item.compatibility_rating}
                    />
                </View>
                <View style={styles.data}>
                    <Text style={styles.sub}>Support</Text>
                    <Rating
                    
                    
                    tintColor="#000000"
                    readonly
                    
                    ratingBackgroundColor={Colors.modal}
                    startingValue={item.support_rating}
                    />
                </View>
                <View style={styles.data}>
                    <Text style={styles.sub}>Trust</Text>
                    <Rating
                    
                    
                    tintColor="#000000"
                    readonly
                    
                    ratingBackgroundColor={Colors.modal}
                    startingValue={item.trust_rating}
                    />
                </View>
                
            </View>
            </ScrollView>
        </View> : <View/>
        }
        </Modal>
    )
}

export default CustomModal

const styles= StyleSheet.create({
    modal:{
        flex:1,
        backgroundColor: Colors.modal,
    },
    url :{
        alignItems: 'center',
        justifyContent: 'center'
    },
    meta: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    total:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    review: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    head:{
        color: Colors.content,
        fontSize: 35
    },
    sub: {
        color: Colors.textMuted,
        fontSize: 15
    },
    rate: {
        color: Colors.content,
        fontSize: 120
    },
    review_text: {
        color: Colors.content,
        fontSize: 20
    },
    ratings:{
      flex: 1,
      justifyContent: "center",
    },
    data:{
        alignItems: 'center',
        justifyContent: 'center',
    },
})