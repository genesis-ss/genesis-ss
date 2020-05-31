import React, { useRef, useState } from 'react';
import { Text, Linking, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Title, Body, Content, Badge } from 'native-base';

import YoutubePlayer from 'react-native-youtube-iframe';
import { Col, Row, Grid } from 'react-native-easy-grid';

import {
  LENT1,
  LENT2,
  LENT3,
  LENT4,
  LENT5,
  LENT6,
  LENT7,
  LENT8,
  LENT9,
  LENT10,
  LENT11,
  LENT12,
  LENT13,
  LENT14,
  LENT15,
  LENT16,
  LENT17,
  LENT18,
  LENT19,
  LENT20,
} from '../../images';
import styles from './LentScreen.styles';

export default function LentScreen() {
  const baseURL = 'https://supuwatha.com/web/TAMIL/PRAYERS/LENT/STATIONS';

  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function handleOpenUrl(fileName: string) {
    Linking.openURL(`${baseURL}${fileName}.pdf`);
  }
  return (
    <Container>
      <Header style={{ backgroundColor: '#800080' }}>
        <Body>
          <Title style={{ color: 'white' }}>Way of the cross</Title>
        </Body>
      </Header>
      <ScrollView>
        <YoutubePlayer
          ref={playerRef}
          playList={'PLZ8hlLfPlssKJf5q7VkTTGhc7iZVlXVMu'}
          height={220}
          videoId={'000HzUA9-FQ'}
          play={playing}
          onChangeState={(event) => console.log(event)}
          onReady={() => console.log('ready')}
          onError={(e) => console.log(e)}
          onPlaybackQualityChange={(q) => console.log(q)}
          volume={50}
          playbackRate={1}
          playerParams={{
            cc_lang_pref: 'us',
            showClosedCaptions: true,
          }}
        />

        <Content padder>
          <Text style={{ fontSize: 20, padding: 10 }}>Download way of the cross content in PDF format</Text>
          <Grid>
            <Row>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('01')}>
                  <Image style={styles.logo} source={LENT1}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>01</Text>
                </Badge>
              </Col>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('02')}>
                  <Image style={styles.logo} source={LENT2}></Image>
                </TouchableOpacity>

                <Badge style={styles.badge}>
                  <Text style={styles.title}>02</Text>
                </Badge>
              </Col>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('03')}>
                  <Image style={styles.logo} source={LENT3}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>03</Text>
                </Badge>
              </Col>

              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('04')}>
                  <Image style={styles.logo} source={LENT4}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>04</Text>
                </Badge>
              </Col>
            </Row>

            <Row>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('05')}>
                  <Image style={styles.logo} source={LENT5}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>05</Text>
                </Badge>
              </Col>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('06')}>
                  <Image style={styles.logo} source={LENT6}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>06</Text>
                </Badge>
              </Col>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('07')}>
                  <Image style={styles.logo} source={LENT7}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>07</Text>
                </Badge>
              </Col>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('08')}>
                  <Image style={styles.logo} source={LENT8}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>08</Text>
                </Badge>
              </Col>
            </Row>
            <Row>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('09')}>
                  <Image style={styles.logo} source={LENT9}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>09</Text>
                </Badge>
              </Col>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('10')}>
                  <Image style={styles.logo} source={LENT10}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>10</Text>
                </Badge>
              </Col>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('11')}>
                  <Image style={styles.logo} source={LENT11}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>11</Text>
                </Badge>
              </Col>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} xt onPress={() => handleOpenUrl('12')}>
                  <Image style={styles.logo} source={LENT12}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>12</Text>
                </Badge>
              </Col>
            </Row>
            <Row>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('13')}>
                  <Image style={styles.logo} source={LENT13}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>13</Text>
                </Badge>
              </Col>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('14')}>
                  <Image style={styles.logo} source={LENT14}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>14</Text>
                </Badge>
              </Col>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('15')}>
                  <Image style={styles.logo} source={LENT15}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>15</Text>
                </Badge>
              </Col>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('16')}>
                  <Image style={styles.logo} source={LENT16}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>16</Text>
                </Badge>
              </Col>
            </Row>
            <Row>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('17')}>
                  <Image style={styles.logo} source={LENT17}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>17</Text>
                </Badge>
              </Col>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('18')}>
                  <Image style={styles.logo} source={LENT18}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>18</Text>
                </Badge>
              </Col>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('19')}>
                  <Image style={styles.logo} source={LENT19}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>19</Text>
                </Badge>
              </Col>
              <Col size={25}>
                <TouchableOpacity style={styles.imageButton} onPress={() => handleOpenUrl('20')}>
                  <Image style={styles.logo} source={LENT20}></Image>
                </TouchableOpacity>
                <Badge style={styles.badge}>
                  <Text style={styles.title}>20</Text>
                </Badge>
              </Col>
            </Row>
          </Grid>
        </Content>
      </ScrollView>
    </Container>
  );
}
