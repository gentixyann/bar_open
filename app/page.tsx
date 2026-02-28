import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MenuSection from "./components/MenuSection";
import AccessSection from "./components/AccessSection";
import ShopPhotosSection from "./components/ShopPhotosSection";
import ContactSection from "./components/ContactSection";
import NoteSection from "./components/NoteSection";
import Footer from "./components/Footer";

// Shop photos with Fisher-Yates shuffle
const allPhotos = [
  '/images/shop_photo/145316.jpg',
  '/images/shop_photo/145317.jpg',
  '/images/shop_photo/145318.jpg',
  '/images/shop_photo/145319.jpg',
  '/images/shop_photo/145320.jpg',
  '/images/shop_photo/145321.jpg',
  '/images/shop_photo/145322.jpg',
  '/images/shop_photo/145324.jpg',
  '/images/shop_photo/145325.jpg',
  '/images/shop_photo/145326.jpg',
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const shuffledPhotos = shuffleArray(allPhotos);
const photoGroup1 = shuffledPhotos.slice(0, 2);
const photoGroup2 = shuffledPhotos.slice(2, 4);
const photoGroup3 = shuffledPhotos.slice(4, 6);

export default function Home() {
  return (
    <>
      {/* ヒーロー: z-20 */}
      <div className="relative" style={{ zIndex: 20 }}>
        <HeroSection />
      </div>

      {/* 残りのセクション: z-[5] で PageBackground(z:3) より前面、背景は透明 */}
      <div className="text-foreground">
        <AboutSection />
        <ShopPhotosSection photos={photoGroup1} />
        <MenuSection />
        <ShopPhotosSection photos={photoGroup2} />
        <AccessSection />
        <ShopPhotosSection photos={photoGroup3} />
        <NoteSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}
