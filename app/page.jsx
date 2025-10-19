import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import InteractiveSlider from "./components/InteractiveSlider";
import TextParagraph from "./components/TitleParagragh";
import { SLIDER_DATA } from "./data";
import { HERO_BANNER_DATA } from "./data";


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroBanner heroData={HERO_BANNER_DATA} />

      <TextParagraph
        title="Quality Products"
        paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <InteractiveSlider sliderData={SLIDER_DATA } />
    </div>
  );
}
