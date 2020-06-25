import React from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import { Card, ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/auth';
import Loader from '../components/Loader';
import Message from '../components/Message';

const SettingsScreen = (props) => {

    const {navigation} = props;
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <Card containerStyle={styles.card} >
            <TouchableOpacity onPress={ () => { dispatch(logout()) }}>
                    <ListItem
                        key={"logout"}
                        title={"Logout"}
                        containerStyle={{backgroundColor: Colors.base, borderWidth: 1, borderColor: Colors.border, borderRadius: 10}}
                        titleStyle={{color: Colors.content}}
                        chevron
                    />
           </TouchableOpacity>
           </Card>
           <Card containerStyle={styles.card} >
            <TouchableOpacity onPress={ () => { navigation.navigate('Report') }}>
                    <ListItem
                        key={"report"}
                        title={"Report an issue"}
                        containerStyle={{backgroundColor: Colors.base, borderWidth: 1, borderColor: Colors.border, borderRadius: 10}}
                        titleStyle={{color: Colors.content}}
                        chevron
                    />
           </TouchableOpacity>
           </Card>
<Loader />
<Message />
        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    card: {
        padding: 0,
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: "transparent"
      }
  });