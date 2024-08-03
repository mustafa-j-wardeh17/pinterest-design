import Image from "next/image";
import PinterestLayout from "./component/PinterestLayout";

export default function Home() {
  const images = [
    {
      src: '/1.jpg',
      alt: 'Image 1',
    },
    {
      src: '/2.jpg',
      alt: 'Image 2',
    },
    {
      src: '/3.jpg',
      alt: 'Image 3',
    },
    {
      src: '/4.jpg',
      alt: 'Image 4',
    },
    {
      src: '/5.jpg',
      alt: 'Image 5',
    },
    {
      src: '/6.jpg',
      alt: 'Image 6',
    },
    {
      src: '/7.jpg',
      alt: 'Image 7',
    },
    {
      src: '/8.jpg',
      alt: 'Image 8',
    },
    {
      src: '/9.jpg',
      alt: 'Image 9',
    },
    {
      src: '/10.jpg',
      alt: 'Image 10',
    },
    {
      src: '/11.jpg',
      alt: 'Image 11',
    },
    {
      src: '/12.jpg',
      alt: 'Image 12',
    },

    {
      src: '/13.jpg',
      alt: 'Image 13',
    },
    {
      src: '/14.jpg',
      alt: 'Image 14',
    },
    {
      src: '/15.jpg',
      alt: 'Image 15',
    },
    {
      src: '/16.jpg',
      alt: 'Image 16',
    },
    {
      src: '/17.jpg',
      alt: 'Image 17',
    },
    {
      src: '/18.jpg',
      alt: 'Image 18',
    },
    {
      src: '/19.jpg',
      alt: 'Image 19',
    },
    {
      src: '/20.jpg',
      alt: 'Image 2',
    },
    {
      src: '/21.jpg',
      alt: 'Image 21',
    },
    {
      src: '/22.jpg',
      alt: 'Image 22',
    },
  ];
  return (
    <div className='flex pb-6 relative flex-col gap-6 items-center'>
      <div className="h-[90px] w-full bg-gradient-to-r from-indigo-500  to-purple-400 text-white md:text-[40px] text-[26px] font-bold font-sans flex items-center justify-center">
        <h1>Pinterest-like Image Gallery</h1>
      </div>
        <PinterestLayout images={images} />
    </div>
  );
}
