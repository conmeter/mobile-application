
import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../redux/actions/items';
import { getItems as getWebs } from '../redux/actions/webs';
import { getCount, getLikes, getNotifications, getTops, setLoader } from '../redux/actions/mis';
import { Text, Avatar, ListItem, Card } from 'react-native-elements';
import Layout from '../constants/Layout';
import Loader from '../components/Loader';
import Message from '../components/Message';
const { width, height } = Layout.window
export default function HomeScreen(props) {

  const { navigation } = props
  const dispatch = useDispatch()
  React.useEffect(()=>{
    dispatch(setLoader());
    dispatch(getWebs());
    dispatch(getItems());
    dispatch(getCount());
    dispatch(getLikes());
    dispatch(getTops());
    dispatch(getNotifications());
    dispatch(setLoader());
  },[])
  const user = useSelector(state => state.auth.user)
  const notifications = useSelector(state => state.mis.notifications)
  const tops = useSelector(state => state.mis.tops)
  const today = new Date();
  const date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+ today.getFullYear();
  const days= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const day = days[today.getDay()]
  if(!user){return null}

  return (
    <View style={styles.container}>
    <SafeAreaView>
    <ScrollView>
    <View style={styles.greeting}>
    <View style={styles.msg}><Text style={styles.wel}>Welcome</Text><Text style={styles.name}>{ user.name.toUpperCase().split(' ').map(i => i.charAt(0)) }</Text></View>
    <View style={styles.avatar}>
    <TouchableOpacity onPress={()=>{navigation.navigate('User')}}>
    <Avatar
      rounded
      source={{
        uri: user.image,
      }}
      size="large"
    />
    </TouchableOpacity>
    </View>
    </View>
    <View>
      <View style={styles.date_card}>
        <Text style={styles.today}>{date}</Text>
        <Text style={styles.today}>{day}</Text>
      </View>
    </View>
    <View style={styles.notification_card}>
    { notifications? 
        <View>
          <ListItem
            key={"notifications"}
            title={"Notifications"}
            containerStyle={styles.list_head}
            titleStyle={{color: Colors.content}}
            subtitleStyle={{color: Colors.textMuted}}
          />
          {notifications.map((item) =>
          (
           <ListItem
            key={Math.random().toString()+item.head}
            title={item.head}
            subtitle={item.body+"\n"+(item.date.toString().slice(0,10))}
            containerStyle={styles.list}
            titleStyle={{color: Colors.content}}
            subtitleStyle={{color: Colors.textMuted}}
          />
          ))}
          
        </View>: <View/>
      }
    </View>
    <View style={styles.tops_card}>
    { tops["top_day"] ?
     
     <View>
           <ListItem
             key={"top_day_title"}
             title={"Top Website of the day"}
             containerStyle={styles.list_head}
            titleStyle={{color: Colors.content}}
            subtitleStyle={{color: Colors.textMuted}}
           />
            <TouchableOpacity onPress={ () => { navigation.navigate('Website', {webName:tops["top_day"]["web_url"]}) } }>
            <ListItem
             key={"top_day"}
             title={tops["top_day"]["web_url"]}
             containerStyle={styles.list}
            titleStyle={{color: Colors.textMuted}}
             chevron
           />
           </TouchableOpacity>
   </View> : <View/>
       }
       { tops["top_week"] ?
       
   <View>
           <ListItem
             key={"top_week_title"}
             title={"Top website of the week"}
             containerStyle={styles.list_head}
            titleStyle={{color: Colors.content}}
            subtitleStyle={{color: Colors.textMuted}}
           />
           <TouchableOpacity onPress={ () => { navigation.navigate('Website', {webName:tops["top_week"]["web_url"]}) } }>
            <ListItem
             key={"top_week"}
             title={tops["top_week"]["web_url"]}
             containerStyle={styles.list}
            titleStyle={{color: Colors.textMuted}}
             chevron
           />
           </TouchableOpacity>
   </View>: <View/>
       }
       { tops["top_all_time"] ?
      
   <View>
           <ListItem
             key={"top_all_time_title"}
             title={"Top website of all time"}
             containerStyle={styles.list_head}
            titleStyle={{color: Colors.content}}
            subtitleStyle={{color: Colors.textMuted}}
           />
            <TouchableOpacity onPress={ () => { navigation.navigate('Website', {webName:tops["top_all_time"]["web_url"]}) } }>
            <ListItem
             key={"top_all_time"}
             title={tops["top_all_time"]["web_url"]}
             chevron
             containerStyle={styles.list}
            titleStyle={{color: Colors.textMuted}}
           />
            </TouchableOpacity>
   </View>: <View/>
       }
    </View>
    </ScrollView>
<Loader />
<Message />
    </SafeAreaView>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding:5
  },
  name:{
    color: Colors.content,
    fontSize: 43,
    fontFamily: 'disolve'
  },
  wel:{
    color: Colors.content,
    fontSize: 43,
  },
  greeting:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  avatar:{
    flex:0.3,
    alignItems: 'center',
  },
  msg: {
    flex:0.7,
  },
  date_card:{
    backgroundColor: Colors.base,
    alignItems: 'center',
    borderRadius: 30,
    width: width,
    alignSelf: 'center',
    elevation: 1,
    borderColor: Colors.border,
    borderWidth: 1,
    margin: 15
  },
  today:{
    color: Colors.content,
    fontSize: 25,
  },
  list: {
    backgroundColor: 'transparent'
  },
  list_head: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderColor: Colors.background,
  },
  notification_card: {
    backgroundColor: Colors.base,
    borderRadius: 30,
    width: width,
    alignSelf: 'center',
    elevation: 1,
    borderColor: Colors.border,
    borderWidth: 1,
    margin: 15
  },
  tops_card:{
    backgroundColor: Colors.base,
    borderRadius: 30,
    width: width,
    alignSelf: 'center',
    elevation: 1,
    borderColor: Colors.border,
    borderWidth: 1,
    margin: 15
  },
});
