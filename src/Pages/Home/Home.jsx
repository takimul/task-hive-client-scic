import { Helmet } from "react-helmet";
import FAQSection from "./FAQSection";
import Features from "./Features";
import HeroSection from "./HeroSection";
import TestimonialSection from "./TestimonialSection";
import UsersCard from "./UsersCard";
import WorkSection from "./WorkSection";
import SuccessStoriesSection from "./SuccessStoriesSection";
import TaskOfTheMonthSection from "./TaskOfTheMonthSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <HeroSection></HeroSection>
      <Features></Features>
      <WorkSection></WorkSection>
      <UsersCard></UsersCard>
      <TestimonialSection></TestimonialSection>
      <SuccessStoriesSection></SuccessStoriesSection>
      <TaskOfTheMonthSection></TaskOfTheMonthSection>
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;
