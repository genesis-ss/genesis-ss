import * as React from 'react';
import { View, Platform, Image } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';
import { Container, Header, Title, Body, Text, Grid, Col, Content, Button, Row, Subtitle } from 'native-base';
import Video from 'react-native-video';
import PDFView from 'react-native-view-pdf';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';

import styles from './HomeScreen.styles';

import DateUtil from '../../utils/DateUtil';
import { format } from 'date-fns';
import { POSTER } from '../../images';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [selectedFileType, setSelectedFileType] = React.useState<string>('audio');
  const [shouldShare, setShouldShare] = React.useState<boolean>(false);

  const markedDates = { [format(selectedDate, 'yyyy-MM-dd')]: { selected: true, selectedColor: 'green' } };
  const resourceType = 'url';

  const resources = {
    file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
    url: DateUtil.getTextURL(selectedDate),
    base64: 'JVBERi0xLjMKJcfs...',
  };
  const saintsResources = {
    file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
    url: DateUtil.getSaintsTextURL(selectedDate),
    base64: 'JVBERi0xLjMKJcfs...',
  };

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

  const shareOptions = {
    title: 'Sharing from Iraivarthai',
    message: 'Audio file',
    url: DateUtil.getAudioURL(selectedDate),
    social: Share.Social.WHATSAPP,
    whatsAppNumber: '+6598361426', // country code + phone number
    filename: 'dailyAudio', // only for base64 file in Android
  };

  function handleShare() {
    if (selectedFileType == 'audio') {
      if (Platform.OS === 'ios') {
        sharePDFWithIOS(DateUtil.getAudioURL(selectedDate), 'audio/mp3');
      } else {
        sharePDFWithAndroid(DateUtil.getAudioURL(selectedDate), 'audio/mp3');
      }
    } else if (selectedFileType == 'text') {
      if (Platform.OS === 'ios') {
        sharePDFWithIOS(DateUtil.getTextURL(selectedDate), 'application/pdf');
      } else {
        sharePDFWithAndroid(DateUtil.getAudioURL(selectedDate), 'application/pdf');
      }
    } else if (selectedFileType == 'iraiOli') {
      Share.open(shareIraiOli);
    }
  }
  const toggleModal = (selectedFileType?: string) => {
    if (setSelectedFileType !== null) {
      setSelectedFileType(selectedFileType);
    }
    setShowModal(!showModal);
  };

  function handleDayPress(date: DateObject) {
    setSelectedDate(new Date(date.dateString));
    //setShowModal(true);
  }

  let selectedContent = null;

  function getFileType(selectedFileType: string) {
    switch (selectedFileType) {
      case 'audio':
        return dailyAudio;
      case 'video':
        return dailyVideo;
      case 'text':
        return dailyText;
      case 'reflection':
        return dailyReflection;
      case 'saintsAudio':
        return saintsAudio;
      case 'saintsVideo':
        return saintsVideo;
      case 'saintsText':
        return saintsText;
      case 'iraiOli':
        return iraiOli;
    }
  }

  const dailyAudio = (
    <View style={{ flex: 1 }}>
      <Image
        source={{
          uri: 'https://supuwatha.org/web/TAMIL/IMAGE/2020/MAY/31.jpg',
          cache: 'only-if-cached',
        }}
        style={styles.poster}
      />

      <Video
        controls={true}
        audioOnly={true}
        ignoreSilentSwitch={'ignore'}
        paused={false}
        allowsExternalPlayback={true}
        fullscreen={false}
        source={{ uri: DateUtil.getAudioURL(selectedDate) }} // Can be a URL or a local file.
        ref={(ref) => {
          this.player = ref;
        }} // Store reference
        onBuffer={this.onBuffer} // Callback when remote video is buffering
        onError={this.videoError} // Callback when video cannot be loaded
        onPlaybackResume={handleVideoStart}
        style={styles.backgroundVideo}
        playInBackground={true}
      />
    </View>
  );

  const dailyVideo = (
    <Video
      paused={false}
      allowsExternalPlayback={true}
      fullscreen={false}
      source={{ uri: DateUtil.getVideoURL(selectedDate) }} // Can be a URL or a local file.
      ref={(ref) => {
        this.player = ref;
      }} // Store reference
      onBuffer={this.onBuffer} // Callback when remote video is buffering
      onError={this.videoError} // Callback when video cannot be loaded
      style={styles.backgroundVideo}
      controls={true}
    />
  );

  const dailyText = (
    <View style={{ flex: 1 }}>
      <PDFView
        fadeInDuration={250.0}
        style={{ flex: 1 }}
        resource={resources[resourceType]}
        resourceType={resourceType}
        onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
        onError={() => console.log('Cannot render PDF', Error)}
      />
      <Video
        paused={false}
        allowsExternalPlayback={true}
        fullscreen={false}
        resizeMode="cover"
        source={{ uri: DateUtil.getAudioURL(selectedDate) }} // Can be a URL or a local file.
        ref={(ref) => {
          this.player = ref;
        }} // Store reference
        onBuffer={this.onBuffer} // Callback when remote video is buffering
        onError={this.videoError} // Callback when video cannot be loaded
        style={styles.backgroundAudio}
        controls={true}
      />
    </View>
  );

  const dailyReflection = (
    <Video
      paused={false}
      allowsExternalPlayback={true}
      fullscreen={false}
      source={{ uri: DateUtil.getReflectionURL(selectedDate) }} // Can be a URL or a local file.
      ref={(ref) => {
        this.player = ref;
      }} // Store reference
      onBuffer={this.onBuffer} // Callback when remote video is buffering
      onError={this.videoError} // Callback when video cannot be loaded
      style={styles.backgroundVideo}
      playInBackground={true}
      controls={true}
    />
  );

  const saintsAudio = (
    <Video
      paused={false}
      allowsExternalPlayback={true}
      fullscreen={false}
      source={{ uri: DateUtil.getSaintsAudioURL(selectedDate) }} // Can be a URL or a local file.
      ref={(ref) => {
        this.player = ref;
      }} // Store reference
      onBuffer={this.onBuffer} // Callback when remote video is buffering
      onError={this.videoError} // Callback when video cannot be loaded
      style={styles.backgroundVideo}
      playInBackground={true}
      controls={true}
    />
  );

  const saintsText = (
    <View style={{ flex: 1 }}>
      <PDFView
        fadeInDuration={250.0}
        style={{ flex: 1 }}
        resource={saintsResources[resourceType]}
        resourceType={resourceType}
        onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
        onError={() => console.log('Cannot render PDF', Error)}
      />
      <Video
        paused={false}
        resizeMode="cover"
        audioOnly={true}
        allowsExternalPlayback={true}
        fullscreen={false}
        source={{ uri: DateUtil.getSaintsAudioURL(selectedDate) }} // Can be a URL or a local file.
        ref={(ref) => {
          this.player = ref;
        }} // Store reference
        onBuffer={this.onBuffer} // Callback when remote video is buffering
        onError={this.videoError} // Callback when video cannot be loaded
        style={styles.backgroundAudio}
        controls={true}
      />
    </View>
  );

  const saintsVideo = (
    <Video
      paused={false}
      allowsExternalPlayback={true}
      fullscreen={false}
      source={{ uri: DateUtil.getSaintsVideoURL(selectedDate) }} // Can be a URL or a local file.
      ref={(ref) => {
        this.player = ref;
      }} // Store reference
      onBuffer={this.onBuffer} // Callback when remote video is buffering
      onError={this.videoError} // Callback when video cannot be loaded
      style={styles.backgroundVideo}
      controls={true}
    />
  );

  const iraiOli = (
    <Video
      paused={false}
      audioOnly={true}
      allowsExternalPlayback={true}
      fullscreen={false}
      poster="https://www.supuwatha.com/images/iraioli.png"
      source={{ uri: 'https://streamingv2.shoutcast.com/iraivarthai' }} // Can be a URL or a local file.
      ref={(ref) => {
        this.player = ref;
      }} // Store reference
      onBuffer={this.onBuffer} // Callback when remote video is buffering
      onError={this.videoError} // Callback when video cannot be loaded
      style={styles.backgroundVideo}
      playInBackground={true}
      controls={true}
    />
  );

  selectedContent = dailyAudio;

  function sharePDFWithIOS(fileUrl: string, type: string) {
    let filePath = null;
    let file_url_length = fileUrl.length;
    let filename = null;

    if (type === 'application/pdf') {
      filename = '/iraivarthai.pdf';
    } else if (type === 'audio/mp3') {
      filename = '/iraivarthai.mp3';
    }

    const configOptions = {
      fileCache: true,
      path: RNFS.DocumentDirectoryPath + filename,
    };

    RNFetchBlob.config(configOptions)
      .fetch('GET', fileUrl)
      .then(async (resp) => {
        filePath = resp.path();

        const shareOptions = {
          subject: 'Iraivarthai',
          title: 'Sharing Iraivarthai',
          message: fileUrl,
          url: resp.path(),
        };

        await Share.open(shareOptions);

        // remove the image or pdf from device's storage
        await RNFS.unlink(filePath);
      });
  }

  function sharePDFWithAndroid(fileUrl: string, type: string) {
    let filePath = null;
    let file_url_length = fileUrl.length;
    const configOptions = { fileCache: true };
    RNFetchBlob.config(configOptions)
      .fetch('GET', fileUrl)
      .then((resp) => {
        filePath = resp.path();
        return resp.readFile('base64');
      })
      .then(async (base64Data) => {
        base64Data = `data:${type};base64,` + base64Data;
        await Share.open({ url: base64Data });
        // remove the image or pdf from device's storage
        await RNFS.unlink(filePath);
      });
  }

  return (
    <Container>
      <Header style={{ backgroundColor: 'green' }}>
        <Body>
          <Title style={{ color: 'white' }}>Iraivarthai - இறைவார்த்தை</Title>
          <Subtitle style={{ color: '#F6F6F6' }}>தமிழில் அன்றாட கத்தோலிக்க இறைவார்த்தை</Subtitle>
        </Body>
      </Header>

      <Calendar current={selectedDate} markedDates={markedDates} onDayPress={handleDayPress}></Calendar>

      <Modal isVisible={showModal} style={{ marginTop: 20, backgroundColor: 'black' }}>
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          {getFileType(selectedFileType)}
          <View style={{ flexDirection: 'row' }}>
            <Button style={{ width: '50%', justifyContent: 'flex-start' }} dark onPress={toggleModal}>
              <Text>Close</Text>
            </Button>
            <View style={{ width: 10 }}></View>
            <Button
              disabled={selectedFileType === 'video' || selectedFileType === 'saintsVideo' ? true : false}
              style={{ width: '47%' }}
              dark={selectedFileType === 'video' || selectedFileType === 'saintsVideo' ? false : true}
              onPress={handleShare}
            >
              <Text>Share</Text>
            </Button>
          </View>
        </View>
      </Modal>

      <Content padder contentContainerStyle={{ justifyContent: 'center' }}>
        <Text style={{ paddingLeft: 90 }}>Selected Date: {format(selectedDate, 'dd-MMM-yyyy')}</Text>

        <Grid style={{ paddingTop: 30 }}>
          <Row>
            <Col style={{ padding: 2 }}>
              <Button success onPress={() => toggleModal('audio')} style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 11 }}>AUDIO</Text>
              </Button>
            </Col>
            <Col style={{ padding: 2 }}>
              <Button success onPress={() => toggleModal('text')} style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 11 }}>TEXT</Text>
              </Button>
            </Col>
            <Col style={{ padding: 2 }}>
              <Button success onPress={() => toggleModal('video')} style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 11 }}>VIDEO</Text>
              </Button>
            </Col>
            <Col style={{ padding: 2 }}>
              <Button success onPress={() => toggleModal('reflection')} style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 11 }}>HOMILY</Text>
              </Button>
            </Col>
          </Row>
          <Row style={{ paddingTop: 10 }}>
            <Col style={{ padding: 2 }}>
              <Button info onPress={() => toggleModal('saintsAudio')} style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 11 }}>SAINTS AUDIO</Text>
              </Button>
            </Col>
            <Col style={{ padding: 2 }}>
              <Button info onPress={() => toggleModal('saintsText')} style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 11 }}>SAINTS TEXT</Text>
              </Button>
            </Col>
            <Col style={{ padding: 2 }}>
              <Button info onPress={() => toggleModal('saintsVideo')} style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 11 }}>SAINTS VIDEO</Text>
              </Button>
            </Col>
          </Row>
        </Grid>
        <Grid style={{ paddingTop: 10 }}>
          <Row>
            <Col style={{ padding: 2 }}>
              <Button primary onPress={() => toggleModal('iraiOli')} style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 14 }}>IRAIOLI / இறைஒலி (My Catholic Radio)</Text>
              </Button>
            </Col>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
}
