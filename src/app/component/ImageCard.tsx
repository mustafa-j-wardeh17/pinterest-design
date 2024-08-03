import Image from 'next/image';
import React, { useState } from 'react';

interface ImageCardProps {
    height: number;
    columnWidth: number;
    image: {
        src: string;
        alt: string;
    };
}

const ImageCard = ({ height, columnWidth, image }: ImageCardProps) => {
    const [hover, setHover] = useState(false);
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`relative rounded-xl overflow-hidden ${hover ? 'bg-gray-700' : 'bg-gray-900'}`}
            style={{ height: `${height}px`, width: `${columnWidth}px` }}
        >
            <Image
                src={image.src}
                alt={image.alt}
                width={columnWidth}
                height={height}
                layout="intrinsic"
                objectFit="cover"
            />
            <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 ${hover ? 'visible' : 'invisible'}`}>
                <h1 className="text-white">{image.alt}</h1>
            </div>
        </div>
    );
};

export default ImageCard;
