const TagButton = ({ href = "#0", text }) => {
  return (
    <a
      href={href}
      className="bg-gray-light rounded-xl mb-3 mr-3 inline-flex items-center justify-center px-4 py-2 text-sm text-black duration-300 hover:bg-primary hover:text-white"
    >
      {text}
    </a>
  );
};

export default TagButton;
