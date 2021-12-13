import * as React from 'react';
import { View, Platform, Image, TouchableOpacity } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';
import { Container, Header, Title, Body, Text, Grid, Col, Content, Button, Row, Subtitle, Left, Right } from 'native-base';
import Video from 'react-native-video';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import { Col as EasyCol, Row as EasyRow, Grid as EasyGrid } from 'react-native-easy-grid';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from './HomeScreen.styles';

import DateUtil from '../../utils/DateUtil';
import { format, isSunday } from 'date-fns';
import { IRAIOLI2, RADIOICON, SAINTAUDIO, SAINTTEXT, SAINTVIDEO, READINGAUDIO, READINGTEXT, READINGVIDEO, TODAYICON, LPICON, LGICON, LRICON, LWICON, LROICON } from '../../images';
import { useEffect, useRef } from 'react';

export default function HomeScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [readingSelectedDate, setReadingSelectedDate] = React.useState<any>({});
  const [liturgyColor, setLiturgyColor] = React.useState<string>('green');
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [selectedFileType, setSelectedFileType] = React.useState<string>('audio');
  var markedDates = { [format(selectedDate, 'yyyy-MM-dd')]: { selected: true, selectedColor: liturgyColor } };

  const videoRef = useRef(null);

  useEffect(() => {
    async function init() {
      try {
        await DateUtil.getTodayReading(selectedDate);

        const jsonValue = await AsyncStorage.getItem("@irai-today");
        setReadingSelectedDate(JSON.parse(jsonValue))
        setLiturgyColor(JSON.parse(jsonValue).color);

      } catch (error) {
      } finally {
      }
    }
    init();
  }, []);

  function handleVideoStart() {
    console.log('started');
  }

  const shareIraiOli = {
    title: 'Sharing IraiOli',
    message: 'Catholic tamil online radio',
    url:
      Platform.OS === 'ios'
        ? 'https://apps.apple.com/sg/app/my-catholic-radio/id1475346348'
        : 'https://play.google.com/store/apps/details?id=com.supuwatha.mycatholicradiov2&hl=en_SG',
  };

  function handleShare() {
    Share.open(shareIraiOli);
  }

  const toggleModal = (selectedFileType?: string) => {
    if (setSelectedFileType !== null) {
      setSelectedFileType(selectedFileType);
    }
    setShowModal(!showModal);
  };

  async function handleDayPress(date: DateObject) {
    setSelectedDate(new Date(date.dateString));
    await DateUtil.getTodayReading(selectedDate);
    const jsonValue = await AsyncStorage.getItem("@irai-today");
    setReadingSelectedDate(JSON.parse(jsonValue))
    setLiturgyColor(JSON.parse(jsonValue).color);
  }


  const dailyAudio = (
    <Video
      ignoreSilentSwitch={'ignore'}
      paused={false}
      allowsExternalPlayback={true}
      resizeMode="contain"
      audioOnly={true}
      controls={true}
      fullscreen={false}
      source={{ uri: DateUtil.getAudioURL(selectedDate) }}
      ref={(ref) => {
        this.player = ref;
      }} // Store reference
      onBuffer={this.onBuffer} // Callback when remote video is buffering
      onError={this.videoError} // Callback when video cannot be loaded
      onPlaybackResume={handleVideoStart}

      playInBackground={true}
    />

  );

  const iraiOli = (
    <View style={{ flex: 1 }}>
      <View style={{ height: 150 }}></View>
      <EasyGrid>
        <EasyRow size={80}>
          <Image
            source={IRAIOLI2}
            style={{ flex: 1, justifyContent: 'center', resizeMode: 'contain', alignItems: 'center' }}
          ></Image>
        </EasyRow>
        <EasyRow size={20}>
          <Video
            paused={false}
            audioOnly={true}
            allowsExternalPlayback={true}
            fullscreen={false}
            source={{ uri: 'https://streamingv2.shoutcast.com/iraivarthai' }} // Can be a URL or a local file.
            ref={videoRef} // Store reference
            onBuffer={handleVideoStart} // Callback when remote video is buffering
            onError={handleVideoStart} // Callback when video cannot be loaded
            style={styles.backgroundVideo}
            playInBackground={true}
            controls={true}
          />
        </EasyRow>
      </EasyGrid>
    </View>
  );

  async function handleToday() {
    setSelectedDate(new Date());
    await DateUtil.getTodayReading(selectedDate);
    const jsonValue = await AsyncStorage.getItem("@irai-today");
    setReadingSelectedDate(JSON.parse(jsonValue))
    setLiturgyColor(JSON.parse(jsonValue).color);
  }

  function handleDetailNavigation(fileType: string) {
    navigation.navigate('Detail',
      {
        fileType: fileType,
        selectedDate: selectedDate,
        todayReading: readingSelectedDate
      });
  }

  function getLiturgyImage() {
    switch (liturgyColor) {
      case 'purple':
        return LPICON;
      case 'green':
        return LGICON;
      case 'red':
        return LRICON;
      case 'darkgoldenrod':
        return LWICON;
      case "pink":
        return LROICON;
    }
  }

  const orderOfMass = isSunday(selectedDate) && (
    <Row style={{ left: 0, padding: 10 }}>
      <Button style={{ width: '100%', justifyContent: 'center', backgroundColor: liturgyColor }} onPress={() => handleDetailNavigation("massText")}><Text style={{ color: liturgyColor === "pink" ? 'purple' : 'white' }}>Order of the Mass</Text></Button>
    </Row>
  )

  return (
    <Container>
      <Header style={{ backgroundColor: 'white', height: 100, margin: 5 }} >
      <View style={{ width: "100%" }}>
          <Row style={{ alignItems: "center" }}>
            <TouchableOpacity style={{}} onPress={handleToday}>
           
              <Image
                style={{ width: 50, height: 50 }}
                source={TODAYICON}
              ></Image>
              
            </TouchableOpacity>

            <Body>
              <View style={{ width: "100%", alignItems: "center" }}>
                <Title style={{ color: liturgyColor }}>இறைவார்த்தை</Title>
                <Subtitle style={{ color: liturgyColor }}>
                  Iraivarthai
                </Subtitle>
              </View>
            </Body>

            <Image
              style={{ width: 50, height: 50 }}
              source={getLiturgyImage()}
            ></Image>
          </Row>
        </View>
      </Header>

      <Calendar
        current={selectedDate}
        markedDates={markedDates}
        onDayPress={handleDayPress}
      ></Calendar>
      <Text style={{ paddingLeft: 10, textAlign: "center", fontSize: 14, color: liturgyColor }}>
        {readingSelectedDate.liturgicalReading}
      </Text>
      <Modal
        isVisible={showModal}
        style={{ marginTop: 20, backgroundColor: "black" }}
      >
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          {iraiOli}
          <View style={{ flexDirection: "row" }}>
            <Button
              style={{ width: "50%", justifyContent: "center" }}
              dark
              onPress={toggleModal}
            >
              <Text>Close</Text>
            </Button>
            <View style={{ width: 10 }}></View>
            <Button
              style={{ width: "47%", justifyContent: "center" }}
              dark
              onPress={handleShare}
            >
              <Text>Share</Text>
            </Button>
          </View>
        </View>
      </Modal>

      <Content padder contentContainerStyle={{ justifyContent: "center" }}>
        <Grid style={{ paddingTop: 30 }}>

        <Row>
            <Col style={styles.buttonColumn}>
              <TouchableOpacity
                style={{
                  ...styles.buttonContainer,
                  ...{ backgroundColor: liturgyColor },
                }}
                onPress={() => handleDetailNavigation("audio")}
              >
                <Image style={styles.buttonImage} source={READINGAUDIO}></Image>
              </TouchableOpacity>
              <Text style={styles.readingTitle}>AUDIO</Text>
            </Col>
            <Col style={styles.buttonColumn}>
              <TouchableOpacity
                style={{
                  ...styles.buttonContainer,
                  ...{ backgroundColor: liturgyColor },
                }}
                onPress={() => handleDetailNavigation("text")}
              >
                <Image style={styles.buttonImage} source={READINGTEXT}></Image>
              </TouchableOpacity>
              <Text style={styles.readingTitle}>TEXT</Text>
            </Col>
            <Col style={styles.buttonColumn}>
              <TouchableOpacity
                style={{
                  ...styles.buttonContainer,
                  ...{ backgroundColor: liturgyColor },
                }}
                onPress={() => handleDetailNavigation("video")}
              >
                <Image style={styles.buttonImage} source={READINGVIDEO}></Image>
              </TouchableOpacity>
              <Text style={styles.readingTitle}>VIDEO</Text>
            </Col>

            <Col style={styles.buttonColumn}>
              <TouchableOpacity
                style={{
                  ...styles.buttonContainer,
                  ...{ backgroundColor: liturgyColor },
                }}
                onPress={() => handleDetailNavigation("reflection")}
              >
                <Image style={styles.buttonImage} source={READINGAUDIO}></Image>
              </TouchableOpacity>
              <Text style={styles.readingTitle}>HOMILY</Text>
            </Col>
          </Row>

          {orderOfMass}

          <Row style={{ left: 0, paddingTop: 18 }}>
            <Col style={{ padding: 2 }}>
              <TouchableOpacity
                onPress={() => handleDetailNavigation("saintsAudio")}
              >
                <Image style={styles.logo} source={SAINTAUDIO}></Image>
              </TouchableOpacity>
              <Text style={styles.contentTitle}>SAINTS AUDIO</Text>
            </Col>

            <Col style={{ padding: 2 }}>
              <TouchableOpacity
                onPress={() => handleDetailNavigation("saintsText")}
              >
                <Image style={styles.logo} source={SAINTTEXT}></Image>
              </TouchableOpacity>
              <Text style={styles.contentTitle}>SAINTS TEXT</Text>
            </Col>

            <Col style={{ padding: 2 }}>
              <TouchableOpacity
                onPress={() => handleDetailNavigation("saintsVideo")}
              >
                <Image style={styles.logo} source={SAINTVIDEO}></Image>
              </TouchableOpacity>
              <Text style={styles.contentTitle}>SAINTS VIDEO</Text>
            </Col>

            <Col style={{ padding: 2 }}>
              <TouchableOpacity onPress={() => toggleModal("iraiOli")}>
                <Image style={styles.logo} source={RADIOICON}></Image>
              </TouchableOpacity>
              <Text style={styles.contentTitle}>RADIO</Text>
            </Col>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
}
