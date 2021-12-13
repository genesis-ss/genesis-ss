import React from 'react';
import { Image, Platform, View } from 'react-native';
import { Container, Text, Button } from 'native-base';
import Share from 'react-native-share';

import styles from './DetailScreen.styles';
import Video from 'react-native-video';
import DateUtil from '../../utils/DateUtil';
import WebView from 'react-native-webview';
import PDFView from 'react-native-view-pdf';
import { Col as EasyCol, Row as EasyRow, Grid as EasyGrid } from 'react-native-easy-grid';
import { IRAIOLI2 } from '../../images';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';

export default function DetailScreen(navigation) {
  const params = navigation.route.params;
  const [selectedDate] = React.useState<Date>(params.selectedDate);
  const [todayReading] = React.useState<any>(params.todayReading);
  const [paused, setPaused] = React.useState<Boolean>(true);
  const [isMassText, setIsMassText] = React.useState<Boolean>(false);
  const resourceType = 'url';

  const saintsResources = {
    file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
    url: DateUtil.getSaintsTextURL(selectedDate),
    base64: 'JVBERi0xLjMKJcfs...',
  };

  const massResources = {
    file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
    url: todayReading.massReading,
    base64: 'JVBERi0xLjMKJcfs...',
  };

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
      case 'massText':
        return massText;
    }
  }

  function handleVideoStart() {
    setPaused(true);
  }

  function handleShare() {
    const selectedFileType = params.fileType;

    if (selectedFileType == 'audio') {
      if (Platform.OS === 'ios') {
        sharePDFWithIOS(todayReading.dailyReading, 'audio/mp3');
      } else {
        sharePDFWithAndroid(todayReading.dailyReading, 'audio/mp3');
      }
    } else if (selectedFileType == 'text') {
      const options = {
        title: 'Iraivarthai reading in text ',
        message: 'Iraivarthai reading in text',
        url: DateUtil.getTextURL(selectedDate),
      };
      Share.open(options);
    } else if (selectedFileType === 'video') {
      const options = {
        title: 'Iraivarthai Video ',
        message: 'Iraivarthai video',
        url: todayReading.dailyReadingVideo,
      };
      Share.open(options);
    } else if (selectedFileType === 'saintsAudio') {
      const options = {
        title: 'Saints audio',
        message: 'Saints audio',
        url: DateUtil.getSaintsAudioURL(selectedDate),
      };
      Share.open(options);
    } else if (selectedFileType === 'saintsVideo') {
      const options = {
        title: 'Saints video',
        message: 'Saints video',
        url: DateUtil.getSaintsVideoURL(selectedDate),
      };
      Share.open(options);
    } else if (selectedFileType === 'saintsText') {
      const options = {
        title: 'Saints Text',
        message: 'Saints Text',
        url: DateUtil.getSaintsTextURL(selectedDate),
      };
      Share.open(options);
    } else if (selectedFileType === 'reflection') {
      const options = {
        title: 'Daily homily',
        message: 'Daily homily',
        url: todayReading.dailyReflection,
      };
      Share.open(options);
    }
  }

  function sharePDFWithIOS(fileUrl: string, type: string) {
    let filePath = null;
    let filename = '/iraivarthai.mp3';

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
    const configOptions = { fileCache: true, appendExt: 'mp3' };
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

  const poster = (params.fileType === 'audio' || params.fileType === 'reflection') && (
    <Image style={styles.videoPoster} source={{ uri: todayReading.dailyPoster }} resizeMode="contain" />
  );

  const dailyAudio = (
    <View style={styles.audioComponent}>
      <Video
        ignoreSilentSwitch={'ignore'}
        paused={false}
        allowsExternalPlayback={true}
        resizeMode="contain"
        audioOnly={true}
        controls={true}
        fullscreen={false}
        source={{ uri: todayReading.dailyReading }}
        ref={(ref) => {
          this.player = ref;
        }} // Store reference
        onBuffer={this.onBuffer} // Callback when remote video is buffering
        onError={this.videoError} // Callback when video cannot be loaded
        onPlaybackResume={handleVideoStart}
        style={styles.nativeVideoControls}
        playInBackground={true}
      />
    </View>
  );

  const dailyVideo = (
    <View style={styles.videoComponent}>
      <Video
        paused={false}
        allowsExternalPlayback={true}
        fullscreen={true}
        source={{ uri: DateUtil.getVideoURL(selectedDate) }} // Can be a URL or a local file.
        ref={(ref) => {
          this.player = ref;
        }} // Store reference
        onBuffer={this.onBuffer} // Callback when remote video is buffering
        onError={this.videoError} // Callback when video cannot be loaded
        style={styles.nativeVideoControls}
        controls={true}
      />
    </View>
  );

  const reading = params.fileType === 'text' && <WebView source={{ uri: DateUtil.getTextURL(selectedDate) }} />;

  const dailyText = (
    <View style={styles.audioComponent}>
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
        style={styles.nativeVideoControls}
        controls={true}
      />
    </View>
  );

  const dailyReflection = (
    <View style={styles.audioComponent}>
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
    </View>
  );

  const saintsAudio = (
    <View style={styles.audioComponent}>
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
    </View>
  );

  const saintText = params.fileType === 'saintsText' && (
    <PDFView
      fadeInDuration={250.0}
      style={{ flex: 1 }}
      resource={saintsResources[resourceType]}
      resourceType={resourceType}
      onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
      onError={() => console.log('Cannot render PDF', Error)}
    />
  );

  const saintsText = (
    <View style={styles.audioComponent}>
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
    <View style={styles.videoComponent}>
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
    </View>
  );

  const massText = params.fileType === 'massText' && (
    <PDFView
      fadeInDuration={250.0}
      style={{ flex: 1 }}
      resource={massResources[resourceType]}
      resourceType={resourceType}
      onLoad={() => setIsMassText(true)}
      onError={() => setIsMassText(false)}
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
            ref={(ref) => {
              this.player = ref;
            }} // Store reference
            onBuffer={this.onBuffer} // Callback when remote video is buffering
            onError={this.videoError} // Callback when video cannot be loaded
            style={styles.backgroundVideo}
            playInBackground={true}
            controls={true}
          />
        </EasyRow>
      </EasyGrid>
    </View>
  );

  return (
    <Container>
      {/* {poster}
        {showReading}
        {getFileType(params.fileType)} */}

      <View style={{ flexDirection: 'column', marginTop: 10, width: '100%', height: '100%' }}>
        <View
          style={{
            position: 'relative',
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            bottom: 0,
          }}
        >
          {getFileType(params.fileType)}
        </View>

        <View
          style={{
            height: 100,
            width: '100%',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Button style={{ width: '100%', justifyContent: 'center', borderRadius: 0 }} onPress={handleShare} dark>
              <Text>Share</Text>
            </Button>
          </View>
        </View>
        <View
          style={{
            marginTop: -60,
            height: '100%',
            width: '100%',
          }}
        >
          {poster}
          {reading}
          {saintText}
          {massText}
        </View>
      </View>
    </Container>
  );
}
