import { useState } from 'react';
import boysImage from '../assets/images/boys.jpg';

type ProductImageProps = {
  imageSrc: string;
  altText: string;
};

export default function ProductImage({ imageSrc, altText }: ProductImageProps) {
  const [image, setImage] = useState(imageSrc);

  const handleError = () => {
    setImage(boysImage); // Fallback image when error occurs
  };

  return <img src={image} alt={altText} onError={handleError} style={{ width: '50px', height: '50px', marginRight: '10px', objectFit: 'cover' }} />;
}
