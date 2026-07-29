import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import PresidentMessage from "@/components/sections/PresidentMessage";
import BoardMembers from "@/components/sections/BoardMembers";
import AvenuesOfService from "@/components/sections/AvenuesOfService";
import EventsTimeline from "@/components/sections/EventsTimeline";
import Gallery from "@/components/sections/Gallery";
// import Testimonials from "@/components/sections/Testimonials";
// import Partners from "@/components/sections/Partners";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <PresidentMessage />
      <BoardMembers />
      <AvenuesOfService />
      <EventsTimeline />
      <Gallery />
      {/* <Testimonials /> */}
      {/* <Partners /> */}
      <Contact />
    </>
  );
}
