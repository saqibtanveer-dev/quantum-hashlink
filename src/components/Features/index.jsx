import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <section id="features" className="section-spacing bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionTitle
          subtitle="Our Services"
          title="What We Deliver"
          paragraph="End-to-end technology services designed to accelerate your business growth, reduce operational costs, and give you a competitive edge."
          center
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature) => (
            <SingleFeature key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
