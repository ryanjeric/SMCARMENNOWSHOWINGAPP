import React from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

const ListItem = props => {
    return (
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Body>
                  <Text style={{flex:1,alignSelf:'center',fontSize:20,fontWeight:'bold'}}>{props.item.title}</Text>
                  <Text style={{flex:1,alignSelf:'center',fontSize:15}} note>PRICE: {props.item.price}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: props.item.image}} style={{height: 170, width: 120, flex: 1,alignSelf: 'center'}}/>
                <Text note style={{flex:1,alignSelf:'center',fontSize:20,paddingTop:15}}>
                  {props.item.mtrcb}
                </Text>
              </Body>
            </CardItem>
          </Card>
    );
}


export default ListItem;