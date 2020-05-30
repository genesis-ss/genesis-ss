import * as React from 'react';
import { View, Platform } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';
import {
  Container,
  Header,
  Title,
  Body,
  Text,
  Grid,
  Col,
  Content,
  Button,
  Row,
  Subtitle,
  Right,
  Left,
  Spinner,
} from 'native-base';
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

  const shareOptions = {
    title: 'Sharing from Iraivarthai',
    message: 'Audio file',
    url: DateUtil.getAudioURL(selectedDate),
    social: Share.Social.WHATSAPP,
    whatsAppNumber: '+6598361426', // country code + phone number
    filename: 'dailyAudio', // only for base64 file in Android
  };

  function handleShare() {
    <Spinner></Spinner>;
    if (selectedFileType == 'audio') {
      sharePDFWithIOS(DateUtil.getAudioURL(selectedDate), 'audio/mp3');
    } else if (selectedFileType == 'text') {
      sharePDFWithIOS(DateUtil.getTextURL(selectedDate), 'application/pdf');
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
    <Video
      audioOnly={true}
      ignoreSilentSwitch={'ignore'}
      paused={false}
      allowsExternalPlayback={true}
      fullscreen={false}
      source={{ uri: DateUtil.getAudioURL(selectedDate) }} // Can be a URL or a local file.
      ref={(ref) => {
        this.player = ref;
      }} // Store reference
      poster={
        'https://ucd48222a28353bb20402f0ec07d.previews.dropboxusercontent.com/p/thumb/AA0FbozcfqSbndBRvKU095BAfs-_EwbiiN4UdML3Idb-VqPVq5NDMi3hc2F6PajNWL8DuOZi94Ajr3BfR8f9WyRt_LVIYMnoM1P0F3o7xpXZ5DqwC_hASLsD_z_mSCRz1IPgdw0u8h28Z_fcLw7VD6P1rN4_RtDWPePbymJQ0GTPr66ro2UIAl3kERQjR-DruhgwVWaoh_mMlTLyyvk8YW6XJWgDpHfTaltw5TGX8537fhi0l818UZ3Wj4EjzOhdJ_gTbBuSr2XfXaOCLp_ItnKYDAMpiZDnZHSPa99B_5vA6XKKRTlQj-p05w_ikKnqTN2Lmpa6L6W8qboRCrWoL-cexnDmUdWTmacTdzXrpsjRt7pUst9s3BT4_z8F4nH9t6JXqWCl3ERKsWULOZe0R1m5/p.jpeg?fv_content=true&size_mode=5'
      }
      onBuffer={this.onBuffer} // Callback when remote video is buffering
      onError={this.videoError} // Callback when video cannot be loaded
      onPlaybackResume={handleVideoStart}
      style={styles.backgroundVideo}
      playWhenInactive={true}
      playInBackground={true}
      controls={true}
    />
  );

  const dailyVideo = (
    <Video
      paused={false}
      poster={
        'https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/8c/42/a9/8c42a960-b717-1fa7-ed45-0b2d15081223/source/512x512bb.jpg'
      }
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
      poster="https://lh3.googleusercontent.com/mmEuTmCHCrX1FzNv7rTzcxEv5zQbZIbfocq-FKe18C84hgzrSlHguNolEzzz6lBH4i4"
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
      console.log(type);
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
          title: filePath,
          message: fileUrl,
          url: resp.path(),
        };

        await Share.open(shareOptions);

        // remove the image or pdf from device's storage
        await RNFS.unlink(filePath);
      });
  }

  return (
    <Container>
      <Header style={{ backgroundColor: 'green' }}>
        <Body>
          <Title style={{ color: 'white' }}>Iraivarthai - இறைவார்த்தை</Title>
          <Subtitle style={{ color: '#F6F6F6' }}>தமிழில் அன்றாட கத்தோலிக்க இறைவார்தை</Subtitle>
        </Body>
      </Header>

      <Calendar current={selectedDate} markedDates={markedDates} onDayPress={handleDayPress}></Calendar>

      <Modal isVisible={showModal} style={{ marginTop: 20 }}>
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          {getFileType(selectedFileType)}
          <View style={{ flexDirection: 'row' }}>
            <Button style={{ width: '50%', justifyContent: 'flex-start' }} dark onPress={toggleModal}>
              <Text>Close</Text>
            </Button>
            <View style={{ width: 10 }}></View>
            <Button
              disabled={
                selectedFileType === 'video' || selectedFileType === 'saintsVideo' || selectedFileType === 'iraiOli'
                  ? true
                  : false
              }
              style={{ width: '47%' }}
              dark={
                selectedFileType === 'video' || selectedFileType === 'saintsVideo' || selectedFileType === 'iraiOli'
                  ? false
                  : true
              }
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
                <Text style={{ fontSize: 10 }}>REFLECTION</Text>
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
                <Text style={{ fontSize: 14 }}>IRAIOLI (My Catholic Radio)</Text>
              </Button>
            </Col>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
}
