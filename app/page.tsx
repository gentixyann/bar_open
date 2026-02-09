import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MenuSection from "./components/MenuSection";
import AccessSection from "./components/AccessSection";
import ShopPhotosSection from "./components/ShopPhotosSection";
import ContactSection from "./components/ContactSection";
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
  '/images/shop_photo/145323.jpg',
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

// Shuffle photos once at module level
const shuffledPhotos = shuffleArray(allPhotos);
const photoGroup1 = shuffledPhotos.slice(0, 3);
const photoGroup2 = shuffledPhotos.slice(3, 6);
const photoGroup3 = shuffledPhotos.slice(6, 9);

export default function Home() {
  return (
    <div className="bg-black text-gray-300">
      <Header />
      <HeroSection />
      <AboutSection />
      <ShopPhotosSection photos={photoGroup1} />
      <MenuSection />
      <ShopPhotosSection photos={photoGroup2} />
      <AccessSection />
      <ShopPhotosSection photos={photoGroup3} />
      <ContactSection />
      <Footer />
    </div>
  );
}
