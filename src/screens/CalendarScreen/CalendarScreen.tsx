import React from 'react';
import { Image, Dimensions } from 'react-native';
import { Container, Header, Title, Body, Content } from 'native-base';
import { format } from 'date-fns';

export default function CalendarScreen() {
  const { width, height } = Dimensions.get('window');

  const calendarURL = `https://supuwatha.com/web/ENGLISH/CALENDAR/${format(new Date(), 'MMM').toUpperCase()}.png`;

  return (
    <Container>
      <Header style={{ backgroundColor: 'green' }}>
        <Body>
          <Title style={{ color: 'white' }}>Saint Names</Title>
        </Body>
      </Header>
      <Content>
        <Image
          resizeMode={'contain'}
          style={{
            maxHeight: height,
            maxWidth: width,
            width: width,
            height: height,
          }}
          source={{ uri: calendarURL }}
        />
      </Content>
    </Container>
  );
}
