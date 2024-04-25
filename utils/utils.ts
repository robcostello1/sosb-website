import exp from 'constants';
import { Color } from 'three';

export const getDayNight = (time: number) => {
  const angle = ((time / 24) % 1) * Math.PI;

  return Math.pow(Math.cos(angle), 6);
};

export const getRandomColor = () =>
  new Color(Math.random(), Math.random(), Math.random());

const CLOUDFRONT_URL = "https://d190trwkq4jv03.cloudfront.net/public";

export const getStaticAsset = (path: string) => {
  return process.env.NODE_ENV === "production"
    ? `${CLOUDFRONT_URL}${path}`
    : path;
};

export const goFullscreen = (element: HTMLElement) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (
    // @ts-expect-error
    element.webkitRequestFullscreen
  ) {
    // @ts-expect-error
    element.webkitRequestFullscreen();
  } else if (
    // @ts-expect-error
    element.msRequestFullscreen
  ) {
    // @ts-expect-error
    element.msRequestFullscreen();
  }
};

export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (
    // @ts-expect-error
    document.webkitExitFullscreen
  ) {
    // @ts-expect-error
    document.webkitExitFullscreen();
  } else if (
    // @ts-expect-error
    document.msExitFullscreen
  ) {
    // @ts-expect-error
    document.msExitFullscreen();
  }
};
