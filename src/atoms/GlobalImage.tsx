import {Image, ImageResizeMode} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SvgUri} from 'react-native-svg';
import clsx from 'clsx';

type GlobalImageProps = {
  uri: string;
  height?: number | '100%';
  width?: number | '100%';
  customClass?: string;
  resizeMode?: ImageResizeMode;
  alt?: string;
  defaultImage?: string;
  isFromUrl?: boolean;
  isSvg: boolean;
};

const GlobalImage = ({
  uri,
  alt = '',
  height,
  width,
  customClass,
  resizeMode = 'contain',
  defaultImage = '',
  isFromUrl = false,
  isSvg = false,
}: GlobalImageProps) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (isFromUrl) {
      setImageUrl({
        uri,
      });
    } else {
      setImageUrl(uri);
    }
  }, [uri]);

  return (
    <>
      {!isSvg ? (
        <Image
          className={clsx(customClass)}
          source={imageUrl}
          style={{height, width}}
          alt={alt}
          resizeMode={resizeMode}
        />
      ) : (
        <SvgUri
          uri={uri}
          width={width}
          height={height}
          className={clsx(customClass)}
        />
      )}
    </>
  );
};

export default GlobalImage;
