import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import MenuSection from "./components/sections/MenuSection";
import AccessSection from "./components/sections/AccessSection";
import ShopPhotosSection from "./components/sections/ShopPhotosSection";
import ContactSection from "./components/sections/ContactSection";
import NoteSection from "./components/sections/NoteSection";
import Footer from "./components/sections/Footer";
import PageBackground from "./components/animations/PageBackground";
import { shuffleArray } from "./utils/shuffle";

const allPhotos = [
  "/images/shop_photo/145316.jpg",
  "/images/shop_photo/145317.jpg",
  "/images/shop_photo/145318.jpg",
  "/images/shop_photo/145319.jpg",
  "/images/shop_photo/145320.jpg",
  "/images/shop_photo/145321.jpg",
  "/images/shop_photo/145322.jpg",
  "/images/shop_photo/145324.jpg",
  "/images/shop_photo/145325.jpg",
  "/images/shop_photo/145326.jpg",
];

const shuffledPhotos = shuffleArray(allPhotos);
const photoGroup1 = shuffledPhotos.slice(0, 2);
const photoGroup2 = shuffledPhotos.slice(2, 4);
const photoGroup3 = shuffledPhotos.slice(4, 6);

export default function Home() {
  return (
    <>
      {/* 全画面背景糸: fixed z-3, TOP以外で表示 */}
      <PageBackground />

      {/* ヒーロー: z-20 でキャンバスを隠す */}
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
