import React from 'react';
import { Image, Linking, ScrollView } from 'react-native';
import { TOP_BANNER, WHATSAPP, WHATSAPP_SUBSCRIPTION } from '../../images';
import { Container, Header, Title, Body, Text, Card, CardItem, Left, Thumbnail, Button } from 'native-base';
import Share from 'react-native-share';

import styles from './AboutusScreen.styles';

export default function AboutusScreen() {
  const [links, setLinks] = React.useState<[]>([]);

  const shareOptions = {
    title: 'Share Iraivarthai via',
    message: 'Daily Scripture readings in tamil',
    url: 'https://apps.apple.com/sg/app/iraivarthai/id928927691',
  };

  function handleButtonPress(item) {
    Linking.openURL(item.key);
  }

  return (
    <Container>
      <Header style={{ backgroundColor: 'green' }}>
        <Body>
          <Title style={{ color: 'white' }}>About Us</Title>
        </Body>
      </Header>

      <ScrollView>
        <Card style={{ borderRadius: 10, padding: 10, shadowRadius: 10 }}>
          <Image source={TOP_BANNER} style={styles.aboutUsLogo} />
          <CardItem>
            <Left>
              <Thumbnail source={WHATSAPP} />
              <Body>
                <Text>We are on WhatsApp & Viber</Text>
                <Text note>Daily tamil reading on the go</Text>
              </Body>
            </Left>
          </CardItem>

          <CardItem>
            <Body>
              <Image source={WHATSAPP_SUBSCRIPTION} style={styles.aboutUsLogo} />
              <Button
                dark
                full
                onPress={() => {
                  Linking.openURL('https://chat.whatsapp.com/JnapEc1oODtDhJ7OPNs996');
                }}
              >
                <Text>WhatsApp Subscription 👈 tap here</Text>
              </Button>
              <Text style={{ flex: 1, height: 10 }}>-</Text>
              <Button
                danger
                full
                onPress={() => {
                  Linking.openURL('https://invite.viber.com/?g=e98P3DlPZEDXZ2VWcwuP6zpnJiYBQcoH');
                }}
              >
                <Text>Viber Subscription 👈 tap here</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
        <Card style={{ borderRadius: 10, padding: 10, shadowRadius: 10 }}>
          <CardItem>
            <Body>
              <Button
                info
                full
                onPress={() => {
                  Share.open(shareOptions);
                }}
              >
                <Text>Share this app</Text>
              </Button>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={{ paddingTop: 10 }}>If you have any questions, write to us... iSupuwatha@gmail.com</Text>
            </Body>
          </CardItem>
        </Card>
      </ScrollView>
    </Container>
  );
}
