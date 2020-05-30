import { ROOT_URL } from '../constants';
import { format } from 'date-fns';

function getAudioURL(selectedDate: Date) {
  return ROOT_URL + 'AUDIO/' + format(selectedDate, 'yyyy/MMM/dd').toUpperCase() + '.mp3';
}

function getVideoURL(selectedDate: Date) {
  return ROOT_URL + 'VIDEO/' + format(selectedDate, 'yyyy/MMM/dd').toUpperCase() + '.mp4';
}

function getTextURL(selectedDate: Date) {
  return ROOT_URL + 'TEXT/' + format(selectedDate, 'yyyy/MMM/dd').toUpperCase() + '.pdf';
}

function getSaintsAudioURL(selectedDate: Date) {
  return ROOT_URL + 'SAINTS/AUDIO/' + format(selectedDate, 'MMM/dd').toUpperCase() + '.mp3';
}

function getSaintsVideoURL(selectedDate: Date) {
  return ROOT_URL + 'SAINTS/VIDEO/' + format(selectedDate, 'MMM/dd').toUpperCase() + '.mp4';
}

function getSaintsTextURL(selectedDate: Date) {
  return ROOT_URL + 'SAINTS/TEXT/' + format(selectedDate, 'MMM/dd').toUpperCase() + '.pdf';
}

function getReflectionURL(selectedDate: Date) {
  return ROOT_URL + 'REFLECTION/' + format(selectedDate, 'yyyy/MMM/dd').toUpperCase() + '.mp3';
}

//https://supuwatha.org/web/TAMIL/SAINTS/AUDIO/MAY/25.mp3

export default {
  getAudioURL,
  getVideoURL,
  getTextURL,
  getSaintsAudioURL,
  getSaintsVideoURL,
  getSaintsTextURL,
  getReflectionURL,
};
