import React, { useState } from 'react';
import { StyleSheet, View , FlatList, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { Text, SearchBar, Card, ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Layout from '../constants/Layout';
import Loader from '../components/Loader';
import Message from '../components/Message';
const { width, height } = Layout.window
const ExploreScreen = (props) => {
    const [search, setSearch] = useState('')
    const oList = useSelector(state=>state.webs.items)
    const [webs, setWebs] = useState(useSelector(state=>state.webs.items))
    const { navigation } = props
    const filter_view = (text) =>
    {
        let newList = oList.filter(web => web.url.toLowerCase().indexOf(text.toLowerCase()) > -1 || web.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
        setWebs(newList);
    }
    return (
        <View style={styles.container}>
            <View>
            <SearchBar placeholder="Search" onChangeText={(text)=>{setSearch(text); filter_view(text);}} value={search} containerStyle={styles.search}/>
            </View>
            <View>
                <FlatList
                    data={webs}
                    renderItem={
                        ({item}) => (
                            <Card containerStyle={styles.card} >
            <TouchableOpacity onPress={ () => { navigation.navigate('Website', {webName:item.url}) }}>
                    <ListItem
                        key={item.url}
                        title={item.url}
                        containerStyle={{backgroundColor: Colors.base, borderWidth: 1, borderColor: Colors.border, borderRadius: 10}}
                        titleStyle={{color: Colors.content}}
                        chevron
                    />
           </TouchableOpacity>
           </Card>
                        )
                    }
                    keyExtractor={item => item.url}
                />
            </View>
            <View>
            <TouchableOpacity onPress={ () => { navigation.navigate('New') }}>
            <Card containerStyle={styles.card}>
            <ListItem
                key={"no_result"}
                title="No finding what you are looking for? Add it here."
                containerStyle={{backgroundColor: Colors.base, borderWidth: 1, borderColor: Colors.border, borderRadius: 10}}
                titleStyle={{color: Colors.content}}
                chevron
            />
            </Card>
            </TouchableOpacity>
            </View>
<Loader />
<Message />
        </View>
    )
}

export default ExploreScreen

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
      },
    search:{
        backgroundColor: Colors.background,
    },
  });