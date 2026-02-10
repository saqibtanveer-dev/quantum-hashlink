import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownComponents = {
  h1: ({ node, ...props }) => (
    <h1 {...props} className="text-3xl font-bold mt-8 mb-4 text-gray-900" />
  ),
  h2: ({ node, ...props }) => (
    <h2 {...props} className="text-2xl font-semibold mt-6 mb-3 text-gray-800" />
  ),
  h3: ({ node, ...props }) => (
    <h3 {...props} className="text-xl font-semibold mt-5 mb-2 text-gray-700" />
  ),
  p: ({ node, ...props }) => (
    <p {...props} className="mb-4 leading-relaxed text-gray-700 text-lg" />
  ),
  ul: ({ node, ...props }) => (
    <ul {...props} className="list-disc list-inside mb-4 space-y-1 text-lg" />
  ),
  ol: ({ node, ...props }) => (
    <ol
      {...props}
      className="list-decimal list-inside mb-4 space-y-1 text-lg"
    />
  ),
  li: ({ node, ...props }) => (
    <li {...props} className="ml-2 text-gray-600 text-lg" />
  ),
  blockquote: ({ node, ...props }) => (
    <blockquote
      {...props}
      className="border-l-4 border-primary pl-4 italic text-gray-700 my-6"
    />
  ),
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline ? (
      <pre className="bg-gray-900 text-white rounded-md p-4 my-4 overflow-x-auto">
        <code className={`language-${match?.[1] ?? ""}`} {...props}>
          {children}
        </code>
      </pre>
    ) : (
      <code className="bg-gray-200 px-1 py-0.5 rounded text-sm" {...props}>
        {children}
      </code>
    );
  },
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto">
      <table
        {...props}
        className="w-full table-auto border-collapse border border-gray-300 my-6"
      />
    </div>
  ),
  thead: ({ node, ...props }) => (
    <thead {...props} className="bg-gray-100 text-left" />
  ),
  tbody: ({ node, ...props }) => <tbody {...props} />,
  tr: ({ node, ...props }) => (
    <tr {...props} className="border-t border-gray-300 even:bg-gray-50" />
  ),
  th: ({ node, ...props }) => (
    <th {...props} className="border px-4 py-2 font-semibold" />
  ),
  td: ({ node, ...props }) => (
    <td {...props} className="border px-4 py-2" />
  ),
};

const MarkdownRenderer = ({ content }) => {
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {content}
    </Markdown>
  );
};

export default MarkdownRenderer;
