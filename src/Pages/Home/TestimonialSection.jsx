import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

// Import required modules
import { EffectCards } from "swiper/modules";
import { ThemeContext } from "../../provider/ThemeProvider";

// Example testimonial data
const testimonials = [
  {
    name: "John Doe",
    quote:
      "This platform has changed my life. The tasks are easy to complete and the rewards are great!",
    imageUrl: "https://i.ibb.co/W2wT3F9/istockphoto-1364917563-170667a.jpg",
  },
  {
    name: "Jane Smith",
    quote:
      "I love using this site! It is so easy to find tasks that match my skills.",
    imageUrl:
      "https://i.ibb.co/7rXRS86/360-F-501045768-ZAX86cu51-IME2b-Yjldc02w-Vu-Q4-ZF49ri.jpg",
  },
  {
    name: "Alice Johnson",
    quote:
      "The best task platform I have ever used. Highly recommend to everyone!",
    imageUrl: "https://i.ibb.co/5Ktn7L4/1-intro-photo-final.jpg",
  },
];

const TestimonialSection = () => {
  const { theme } = useContext(ThemeContext); // Access the current theme

  // Conditional styling based on theme
  const sectionBg = theme === "light" ? "bg-gray-100" : "bg-gray-800";
  const textColor = theme === "light" ? "text-gray-900" : "text-white";
  const cardBg = theme === "light" ? "bg-white" : "bg-gray-700";
  const textMuted = theme === "light" ? "text-gray-600" : "text-gray-400";

  return (
    <section id="testimonials" className={`py-20 ${sectionBg}`}>
      <div className="container mx-auto">
        <h2 className={`text-3xl font-bold text-center mb-10 ${textColor}`}>
          What Our Users Say
        </h2>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="testimonial-slider"
          loop={true} // Add loop property for infinite loop
          autoplay={{ delay: 3000 }} // Add autoplay with 3 seconds delay between slides
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className={`${cardBg} p-8 rounded-lg shadow-md`}
            >
              <div className="flex flex-col items-center">
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h3 className={`text-xl font-semibold ${textColor}`}>
                  {testimonial.name}
                </h3>
                <p className={`mt-2 text-center ${textMuted}`}>
                  "{testimonial.quote}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
