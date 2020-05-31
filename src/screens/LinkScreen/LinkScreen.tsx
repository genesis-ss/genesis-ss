import React from 'react';
import { View, Text, Image, ScrollView, Linking, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Container, Header, Title, Body, Content, Card, Icon, CardItem, Right, Left, Thumbnail } from 'native-base';
import {
  IRAIPUTHAHAM,
  FACEBOOK,
  IRAIVARTHAI,
  MISSAL,
  SAINTS,
  SOUNDCLOUD,
  TWITTER,
  YOUTUBE,
  SUPUWATHA,
  IRAIOLI,
  IRAIGEETHANGAL,
  THAVAGEETHANGAL,
} from '../../images';
import styles from './LinkScreen.styles';

export default function LinkScreen() {
  return (
    <Container>
      <Header style={{ backgroundColor: 'green' }}>
        <Body>
          <Title style={{ color: 'white' }}>Links</Title>
        </Body>
      </Header>

      <ScrollView>
        <Content>
          <Card>
            <CardItem
              style={styles.CardItem}
              button
              onPress={() => {
                Linking.openURL('https://www.iraivarthai.org');
              }}
            >
              <Left>
                <Thumbnail square source={IRAIVARTHAI}></Thumbnail>
                <Text style={styles.Text}>Iraivarthai - இறைவார்த்தை</Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button
              onPress={() => {
                Linking.openURL('https://www.supuwatha.org');
              }}
            >
              <Left>
                <Thumbnail square source={SUPUWATHA}></Thumbnail>

                <Text style={styles.Text}>Supuwatha</Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button
              onPress={() => {
                Linking.openURL('https://www.missal.org');
              }}
            >
              <Left>
                <Thumbnail square source={MISSAL}></Thumbnail>
                <Text style={styles.Text}>Missal</Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button
              onPress={() => {
                Linking.openURL('https://www.dailysaints.org');
              }}
            >
              <Left>
                <Thumbnail square source={SAINTS}></Thumbnail>

                <Text style={styles.Text}>Saints</Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button={true}
              onPress={() => {
                Linking.openURL(
                  Platform.OS === 'ios'
                    ? 'https://apps.apple.com/sg/app/iraiputhaham/id1019334920'
                    : 'https://play.google.com/store/apps/details?id=com.iraivarthai.iraiputhaham&hl=en',
                );
              }}
            >
              <Left>
                <Thumbnail square source={IRAIPUTHAHAM}></Thumbnail>
                <Text style={styles.Text}>Iraiputhaham - இறைப்புத்தகம் </Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button
              onPress={() => {
                Linking.openURL('https://www.youtube.com/user/Supuwatha');
              }}
            >
              <Left>
                <Thumbnail square source={YOUTUBE}></Thumbnail>

                <Text style={styles.Text}>Supuwatha Youtube</Text>
              </Left>
            </CardItem>

            <CardItem
              button
              style={styles.CardItem}
              onPress={() => {
                Linking.openURL('https://soundcloud.com/supuwatha');
              }}
            >
              <Left>
                <Thumbnail square source={SOUNDCLOUD}></Thumbnail>

                <Text style={styles.Text}>Supuwatha SoundCloud</Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button
              onPress={() => {
                Linking.openURL('https://twitter.com/supuwatha');
              }}
            >
              <Left>
                <Thumbnail square source={TWITTER}></Thumbnail>

                <Text style={styles.Text}>Supuwatha Twitter</Text>
              </Left>
            </CardItem>

            <CardItem
              button
              style={styles.CardItem}
              onPress={() => {
                Linking.openURL('https://m.facebook.com/SUPUWATHA');
              }}
            >
              <Left>
                <Thumbnail square source={FACEBOOK}></Thumbnail>

                <Text style={styles.Text}>Supuwatha Facebook</Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button
              onPress={() => {
                Linking.openURL('https://www.supuwatha.com/catholicradio/radio.html');
              }}
            >
              <Left>
                <Thumbnail square source={IRAIOLI}></Thumbnail>

                <Text style={styles.Text}>IraiOli Tamil radio web</Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button
              onPress={() => {
                Linking.openURL(
                  Platform.OS === 'ios'
                    ? 'https://apps.apple.com/sg/app/my-catholic-radio/id1475346348'
                    : 'https://play.google.com/store/apps/details?id=com.supuwatha.mycatholicradiov2&hl=en_SG',
                );
              }}
            >
              <Left>
                <Thumbnail square source={IRAIOLI}></Thumbnail>

                <Text style={styles.Text}>IraiOli Tamil radio mobile app</Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button
              onPress={() => {
                Linking.openURL('https://www.iraivarthai.org/thavageethangal/');
              }}
            >
              <Left>
                <Thumbnail square source={THAVAGEETHANGAL}></Thumbnail>

                <Text style={styles.Text}>Thavageethangal Hymns</Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button
              onPress={() => {
                Linking.openURL('https://www.iraivarthai.org/iraigeethangal/');
              }}
            >
              <Left>
                <Thumbnail square source={IRAIGEETHANGAL}></Thumbnail>

                <Text style={styles.Text}>Iraigeethangal Hymns</Text>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </ScrollView>
    </Container>
  );
}
