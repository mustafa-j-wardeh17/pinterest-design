'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ImageCard from './ImageCard';

interface ImageProps {
    src: string;
    alt: string;
}

interface MetaImageProps extends ImageProps {
    width: number;
    height: number;
}

const PinterestLayout = ({ images }: { images: ImageProps[] }) => {
    const [metaImages, setMetaImages] = useState<MetaImageProps[]>([]);
    const [columnCount, setColumnCount] = useState(1);

    useEffect(() => {
        const fetchImages = async () => {
            const imageMetadata = await Promise.all(
                images.map(async (image) => {
                    const metadata = await getImageMetadata(image.src);
                    return {
                        ...image,
                        width: metadata.width,
                        height: metadata.height,
                    };
                })
            );
            setMetaImages(imageMetadata);
        };

        fetchImages();
    }, [images]);

    useEffect(() => {
        const updateColumnCount = () => {
            const containerWidth = window.innerWidth;
            const columnWidth = getColumnWidth();
            setColumnCount(Math.max(Math.floor(containerWidth / columnWidth), 1)); // Ensure at least one column
        };

        window.addEventListener('resize', updateColumnCount);
        updateColumnCount(); // Initialize on mount

        return () => {
            window.removeEventListener('resize', updateColumnCount);
        };
    }, []);

    const getImageMetadata = (src: string): Promise<{ width: number; height: number }> => {
        return new Promise((resolve) => {
            const img = new window.Image();
            img.src = src;
            img.onload = () => {
                resolve({ width: img.width, height: img.height });
            };
        });
    };

    const getColumnWidth = (): number => {
        if (window.innerWidth < 640) return 160; // less than sm
        if (window.innerWidth < 768) return 200; // sm
        if (window.innerWidth < 1024) return 250; // md
        if (window.innerWidth < 1280) return 300; // lg
        return 350; // xl
    };

    const renderImages = () => {
        const columns: MetaImageProps[][] = Array.from({ length: columnCount }, () => []);

        metaImages.forEach((image) => {
            const shortestColumnIndex = columns.reduce((prev, curr, idx) => {
                const prevHeight = columns[prev].reduce((sum, img) => sum + (img.height / img.width) * getColumnWidth(), 0);
                const currHeight = columns[idx].reduce((sum, img) => sum + (img.height / img.width) * getColumnWidth(), 0);
                return prevHeight < currHeight ? prev : idx;
            }, 0);

            columns[shortestColumnIndex].push(image);
        });

        return columns.map((column, columnIndex) => (
            <div key={columnIndex} className='flex flex-col gap-4'>
                {column.map((image, index) => {
                    const columnWidth = getColumnWidth();
                    const height = (image.height / image.width) * columnWidth;
                    return (
                        <ImageCard
                            height={height}
                            columnWidth={columnWidth}
                            image={image}
                            key={index}
                        />
                    );
                })}
            </div>
        ));
    };

    return (
        <div className='flex gap-4 justify-center'>
            {renderImages()}
        </div>
    );
};

export default PinterestLayout;
