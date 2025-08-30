import CarouselPlaylist from "@/app/home/CarouselPlaylist/CarouselPlaylist";
import HomeOverview from "@/app/home/HomeOverview/HomeOverview";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {

	return (
		<div style={{backgroundColor: "black"}}>
			<HomeOverview />
			<CarouselPlaylist />
			<Footer />
		</div>
	);
}