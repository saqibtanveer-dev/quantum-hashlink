const SectionTitle = ({
  title,
  paragraph,
  center,
  subtitle,
}) => {
  return (
    <div
      className={`mb-12 w-full max-w-xl ${center ? "mx-auto text-center" : ""}`}
    >
      {subtitle && (
        <span className="mb-3 block text-sm font-semibold uppercase tracking-wider text-primary">
          {subtitle}
        </span>
      )}
      <h2 className="mb-4 text-3xl font-bold leading-tight! text-gray-900 sm:text-4xl">
        {title}
      </h2>
      {paragraph && (
        <p className="text-base leading-relaxed! text-body-color md:text-lg">
          {paragraph}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
