import React from 'react';
import {Image, FlatList, Alert} from 'react-native';
import {TOP_BANNER} from '../../images';
import {Container, Header, Title, Body, Text} from 'native-base';
import styles from './ProfileScreen.styles';

export default function ProfileScreen() {
  //handling onPress action
  function getListViewItem(item) {
    Alert.alert(item.key);
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
          {key: 'Tamil - www.iraivarthai.org'},
          {key: 'Sinhala - www.supuwatha.org'},
          {key: 'English - www.missal.org'},
          {key: 'Saints - www.dailysaints.org'},
          {key: 'Iraigeethangal'},
          {key: 'Thavageethangal'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        ItemSeparatorComponent={this.renderSeparator}
      />
    </Container>
  );
}
