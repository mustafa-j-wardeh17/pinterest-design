'use client';
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
    const getColumnWidth = (): number => {
        const padding = 16; // Define padding (8px on each side)
        if (typeof window === 'undefined') return 350 + padding; // Default width for SSR
        if (window.innerWidth < 460) return 120 + padding; // less than sm
        if (window.innerWidth < 640) return 160 + padding; // less than sm
        if (window.innerWidth < 768) return 200 + padding; // sm
        if (window.innerWidth < 1024) return 250 + padding; // md
        if (window.innerWidth < 1280) return 300 + padding; // lg
        return 350 + padding; // xl
    };

    const [columnWidth, setColumnWidth] = useState(getColumnWidth());

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
        const updateColumnWidth = () => {
            setColumnWidth(getColumnWidth());
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', updateColumnWidth);
            updateColumnWidth(); // Initialize on mount
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', updateColumnWidth);
            }
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


    const calculateColumnCount = (): number => {
        if (typeof window === 'undefined') return 1; // Default to 1 column for SSR

        const containerWidth = window.innerWidth;
        return Math.max(Math.floor(containerWidth / columnWidth), 1); // Ensure at least one column
    };

    const renderImages = () => {
        const columnCount = calculateColumnCount();
        const columns: MetaImageProps[][] = Array.from({ length: columnCount }, () => []);

        metaImages.forEach((image) => {
            const shortestColumnIndex = columns.reduce((prev, curr, idx) => {
                const prevHeight = columns[prev].reduce((sum, img) => sum + (img.height / img.width) * columnWidth, 0);
                const currHeight = columns[idx].reduce((sum, img) => sum + (img.height / img.width) * columnWidth, 0);
                return prevHeight < currHeight ? prev : idx;
            }, 0);

            columns[shortestColumnIndex].push(image);
        });

        return columns.map((column, columnIndex) => (
            <div key={columnIndex} className='flex flex-col gap-4 '> {/* Add padding here */}
                {column.map((image, index) => {
                    const adjustedWidth = columnWidth - 16; // Adjust width by removing the padding
                    const height = (image.height / image.width) * adjustedWidth;
                    return (
                        <ImageCard
                            height={height}
                            columnWidth={adjustedWidth}
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
