import React from 'react';
import { View, Text, Image, ScrollView, Linking, TouchableOpacity, SafeAreaView } from 'react-native';
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
            <CardItem>
              <Left>
                <Thumbnail square source={IRAIVARTHAI}></Thumbnail>
                <Text
                  style={styles.Text}
                  onPress={() => {
                    Linking.openURL('https://www.iraivarthai.org');
                  }}
                >
                  Iraivarthai
                </Text>
              </Left>
              <Right>
                <Icon
                  name="arrow-forward"
                  onPress={() => {
                    Linking.openURL('https://www.iraivarthai.org');
                  }}
                />
              </Right>
            </CardItem>

            <CardItem>
              <Left>
                <Thumbnail square source={SUPUWATHA}></Thumbnail>

                <Text
                  style={styles.Text}
                  onPress={() => {
                    Linking.openURL('https://www.supuwatha.org');
                  }}
                >
                  Supuwatha
                </Text>
              </Left>
              <Right>
                <Icon
                  name="arrow-forward"
                  onPress={() => {
                    Linking.openURL('https://www.supuwatha.org');
                  }}
                />
              </Right>
            </CardItem>

            <CardItem>
              <Left>
                <Thumbnail square source={MISSAL}></Thumbnail>

                <Text
                  style={styles.Text}
                  onPress={() => {
                    Linking.openURL('https://www.missal.org');
                  }}
                >
                  Missal
                </Text>
              </Left>
              <Right>
                <Icon
                  name="arrow-forward"
                  onPress={() => {
                    Linking.openURL('https://www.missal.org');
                  }}
                />
              </Right>
            </CardItem>

            <CardItem>
              <Left>
                <Thumbnail square source={SAINTS}></Thumbnail>

                <Text
                  style={styles.Text}
                  onPress={() => {
                    Linking.openURL('https://www.dailysaints.org');
                  }}
                >
                  Saints
                </Text>
              </Left>
              <Right>
                <Icon
                  name="arrow-forward"
                  onPress={() => {
                    Linking.openURL('https://www.dailysaints.org');
                  }}
                />
              </Right>
            </CardItem>

            <CardItem>
              <Left>
                <Thumbnail square source={IRAIPUTHAHAM}></Thumbnail>

                <Text
                  style={styles.Text}
                  onPress={() => {
                    Linking.openURL('https://www.iraiputhaham.org');
                  }}
                >
                  Iraiputhaham
                </Text>
              </Left>
              <Right>
                <Icon
                  name="arrow-forward"
                  onPress={() => {
                    Linking.openURL('https://www.iraiputhaham.org');
                  }}
                />
              </Right>
            </CardItem>

            <CardItem>
              <Left>
                <Thumbnail square source={YOUTUBE}></Thumbnail>

                <Text
                  style={styles.Text}
                  onPress={() => {
                    Linking.openURL('https://www.youtube.com/user/Supuwatha');
                  }}
                >
                  Supuwatha Youtube
                </Text>
              </Left>
              <Right>
                <Icon
                  name="arrow-forward"
                  onPress={() => {
                    Linking.openURL('https://www.youtube.com/user/Supuwatha');
                  }}
                />
              </Right>
            </CardItem>

            <CardItem>
              <Left>
                <Thumbnail square source={SOUNDCLOUD}></Thumbnail>

                <Text
                  style={styles.Text}
                  onPress={() => {
                    Linking.openURL('https://soundcloud.com/supuwatha');
                  }}
                >
                  Supuwatha SoundCloud
                </Text>
              </Left>
              <Right>
                <Icon
                  name="arrow-forward"
                  onPress={() => {
                    Linking.openURL('https://soundcloud.com/supuwatha');
                  }}
                />
              </Right>
            </CardItem>

            <CardItem>
              <Left>
                <Thumbnail square source={TWITTER}></Thumbnail>

                <Text
                  style={styles.Text}
                  onPress={() => {
                    Linking.openURL('https://twitter.com/supuwatha');
                  }}
                >
                  Supuwatha Twitter
                </Text>
              </Left>
              <Right>
                <Icon
                  name="arrow-forward"
                  onPress={() => {
                    Linking.openURL('https://twitter.com/supuwatha');
                  }}
                />
              </Right>
            </CardItem>

            <CardItem>
              <Left>
                <Thumbnail square source={FACEBOOK}></Thumbnail>

                <Text
                  style={styles.Text}
                  onPress={() => {
                    Linking.openURL('https://www.facebook.com/iraivarthai');
                  }}
                >
                  Supuwatha Facebook
                </Text>
              </Left>
              <Right>
                <Icon
                  name="arrow-forward"
                  onPress={() => {
                    Linking.openURL('https://www.facebook.com/iraivarthai');
                  }}
                />
              </Right>
            </CardItem>

            <CardItem>
              <Left>
                <Thumbnail square source={IRAIOLI}></Thumbnail>

                <Text
                  style={styles.Text}
                  onPress={() => {
                    Linking.openURL('https://www.supuwatha.com/catholicradio/radio.html');
                  }}
                >
                  IraiOli Tamil Radio Web
                </Text>
              </Left>
              <Right>
                <Icon
                  name="arrow-forward"
                  onPress={() => {
                    Linking.openURL('https://www.supuwatha.com/catholicradio/radio.html');
                  }}
                />
              </Right>
            </CardItem>

            <CardItem>
              <Left>
                <Thumbnail square source={THAVAGEETHANGAL}></Thumbnail>

                <Text
                  style={styles.Text}
                  onPress={() => {
                    Linking.openURL('https://www.iraivarthai.org/thavageethangal/');
                  }}
                >
                  Thavageethangal Hymns
                </Text>
              </Left>
              <Right>
                <Icon
                  name="arrow-forward"
                  onPress={() => {
                    Linking.openURL('https://www.iraivarthai.org/thavageethangal/');
                  }}
                />
              </Right>
            </CardItem>

            <CardItem>
              <Left>
                <Thumbnail square source={IRAIGEETHANGAL}></Thumbnail>

                <Text
                  style={styles.Text}
                  onPress={() => {
                    Linking.openURL('https://www.iraivarthai.org/iraigeethangal/');
                  }}
                >
                  Iraigeethangal Hymns
                </Text>
              </Left>
              <Right>
                <Icon
                  name="arrow-forward"
                  onPress={() => {
                    Linking.openURL('https://www.iraivarthai.org/iraigeethangal/');
                  }}
                />
              </Right>
            </CardItem>
          </Card>
        </Content>
      </ScrollView>
    </Container>
  );
}
