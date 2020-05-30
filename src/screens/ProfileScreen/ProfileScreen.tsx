import React from 'react';
import {Image, FlatList, Alert, TouchableOpacity, Linking} from 'react-native';
import {TOP_BANNER} from '../../images';
import {Container, Header, Title, Body, Text} from 'native-base';
import styles from './ProfileScreen.styles';

export default function ProfileScreen() {
  
  function handleButtonPress(item) {
    Linking.openURL(item.key);
  }

  return (
    <Container>
      <Header>
        <Body>
          <Title>About Us</Title>
        </Body>
      </Header>
      <Image style={styles.aboutUsLogo} source={TOP_BANNER}></Image>

      <FlatList 
        data={[
          {name: 'Tamil - www.iraivarthai.org', key: 'www.iraivarthai.org'},
          {name: 'Sinhala - www.supuwatha.org', key: 'https://www.supuwatha.org'},
          {name: 'English - www.missial.org', key: 'https://www.missal.org'},
          {name: 'Saints - www.dailysaints.org', key: 'https://www.dailysaints.org'},
          {name: 'Tamil - Iraigeethangal', key: 'https://www.iraivarthai.org/iraigeethangal'},
          {name: 'Tamil - Lent songs', key: 'https://www.iraivarthai.org/thavageethangal'},
        ]}
      renderItem={({item}) => 
      
      <TouchableOpacity onPress={ () => handleButtonPress(item)}>
      <Text style={styles.item}>{item.name}</Text>
    </TouchableOpacity>
    }
        ItemSeparatorComponent={this.renderSeparator}
      />
    </Container>
  );
}
