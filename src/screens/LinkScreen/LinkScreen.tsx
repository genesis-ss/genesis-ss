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
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

export default function LinkScreen() {

  async function openLink(url: string) {
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: 'green',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: 'white',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
      } else Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  }

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
              onPress={() => openLink('https://www.iraivarthai.org')}
            >
              <Left>
                <Thumbnail square source={IRAIVARTHAI}></Thumbnail>
                <Text style={styles.Text}>Iraivarthai - இறைவார்த்தை</Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button
              onPress={() => openLink('https://www.supuwatha.org')}
            >
              <Left>
                <Thumbnail square source={SUPUWATHA}></Thumbnail>

                <Text style={styles.Text}>Supuwatha</Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button
              onPress={() => openLink('https://www.missal.org')}
            >
              <Left>
                <Thumbnail square source={MISSAL}></Thumbnail>
                <Text style={styles.Text}>Missal</Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button
              onPress={() => openLink('https://www.dailysaints.org')}
            >
              <Left>
                <Thumbnail square source={SAINTS}></Thumbnail>

                <Text style={styles.Text}>Saints</Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button={true}
              onPress={() => openLink(
                Platform.OS === 'ios'
                  ? 'https://apps.apple.com/sg/app/iraiputhaham/id1019334920'
                  : 'https://play.google.com/store/apps/details?id=com.iraivarthai.iraiputhaham&hl=en',
              )}
            >
              <Left>
                <Thumbnail square source={IRAIPUTHAHAM}></Thumbnail>
                <Text style={styles.Text}>Iraiputhaham - இறைப்புத்தகம் </Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button
              onPress={() => openLink('https://www.youtube.com/user/Supuwatha')}
            >
              <Left>
                <Thumbnail square source={YOUTUBE}></Thumbnail>

                <Text style={styles.Text}>Supuwatha Youtube</Text>
              </Left>
            </CardItem>

            <CardItem
              button
              style={styles.CardItem}
              onPress={() => openLink('https://soundcloud.com/supuwatha')}
            >
              <Left>
                <Thumbnail square source={SOUNDCLOUD}></Thumbnail>

                <Text style={styles.Text}>Supuwatha SoundCloud</Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button
              onPress={() => openLink('https://twitter.com/supuwatha')}
            >
              <Left>
                <Thumbnail square source={TWITTER}></Thumbnail>

                <Text style={styles.Text}>Supuwatha Twitter</Text>
              </Left>
            </CardItem>

            <CardItem
              button
              style={styles.CardItem}
              onPress={() => openLink('https://m.facebook.com/SUPUWATHA')}
            >
              <Left>
                <Thumbnail square source={FACEBOOK}></Thumbnail>

                <Text style={styles.Text}>Supuwatha Facebook</Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button
              onPress={() => openLink('https://www.supuwatha.com/catholicradio/radio.html')}
            >
              <Left>
                <Thumbnail square source={IRAIOLI}></Thumbnail>

                <Text style={styles.Text}>IraiOli Tamil radio web</Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button
              onPress={() => openLink(
                Platform.OS === 'ios'
                  ? 'https://apps.apple.com/sg/app/my-catholic-radio/id1475346348'
                  : 'https://play.google.com/store/apps/details?id=com.supuwatha.mycatholicradiov2&hl=en_SG',
              )}
            >
              <Left>
                <Thumbnail square source={IRAIOLI}></Thumbnail>

                <Text style={styles.Text}>IraiOli Tamil radio mobile app</Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button
              onPress={() => openLink('https://www.iraivarthai.org/thavageethangal/')}
            >
              <Left>
                <Thumbnail square source={THAVAGEETHANGAL}></Thumbnail>

                <Text style={styles.Text}>Thavageethangal Hymns</Text>
              </Left>
            </CardItem>

            <CardItem
              style={styles.CardItem}
              button
              onPress={() => openLink('https://www.iraivarthai.org/iraigeethangal/')}
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
