import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import logo from './image/images.jpg';
import axios from 'axios';
import ListItem from './components/ListItem';
import { Thumbnail, Container,Content, Spinner, Text } from 'native-base';
import SyncStorage from 'sync-storage';

const styles = StyleSheet.create({
  container: { paddingTop:20,justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 25, color: 'darkslateblue',alignSelf: 'center' },
  img: { width: 100, height: 100,alignSelf: 'center' },
  headline: {fontSize:15, color: 'darkslateblue',paddingTop:10, alignSelf: 'center'},
  notice: {fontSize:15,color:'red',paddingBottom:10,alignSelf: 'center'}
})

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      data: []
    }
  }

  async componentDidMount(){
    // CHECK IF DATE NOW HAS DATA
    const xx = await SyncStorage.init();
    console.log('AsyncStorage is ready!', xx);

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const dateNow = mm + '/' + dd + '/' + yyyy; // WHy not just use moment.js bru?
    const dateNowStorage = SyncStorage.get('dateNow');

    if(dateNowStorage == dateNow){
      const localData = SyncStorage.get('data');
      console.log('--DATA FROM LOCAL STORAGE');
      this.setState({data:localData});
    }else{
      axios.get('https://nodejs-scrap-api.herokuapp.com/').then(res => {
        const data = res.data;
        SyncStorage.set('data', data);
        SyncStorage.set('dateNow', dateNow);
        console.log('--DATA FROM API');
        this.setState({data});
      });
    }
  }

  render() {
    const {data} = this.state;
    if(data.length!=0){
      return(
        <Container style={styles.container}>
          <Content>
              <Thumbnail square large source={logo} style={styles.img} />
              <Text style={styles.text}>NOW SHOWING!!!</Text>
              <Text style={styles.headline}>{data.showingDate}</Text>
              <Text style={styles.notice}>Schedules are subject to change without prior notice.</Text>
              {data.movies.map((value, index) => {
                return <ListItem key={index} item={value} />
              })}
              <Text style={styles.notice}>-Rj-</Text>
          </Content>
        </Container>
      )
    }else{
      return(
        <Container>
          <View style={styles.container}>
            <Image source={logo} style={styles.img} />
          </View>
          <Content>
            <Text style={styles.text}>Loading please wait...</Text>
            <Spinner color='blue' />
          </Content>
        </Container>
      )
    }
  }
}