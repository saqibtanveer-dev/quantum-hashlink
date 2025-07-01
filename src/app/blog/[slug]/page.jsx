import Image from "next/image";
import { allBlogs } from "contentlayer/generated";

import { Metadata } from "next";
import { BiCalendarEdit } from "react-icons/bi";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = allBlogs.find((blog) => blog.slug === slug);
  return {
    title: `${blog.title} | Quantum HashLink`,
    description: blog.excerpt,
    keywords: blog.seo.keywords,
    openGraph: {
      title: `${blog.seo.title} | Quantum HashLink`,
      description: blog.seo.discription,
      url: blog.seo.image,
      images: [
        {
          url: blog.seo.image,
          alt: blog.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.seo.title} | Quantum HashLink`,
      description: blog.seo.description,
      images: [blog.seo.image],
    },
  };
}

const BlogDetail = async ({ params }) => {
  const { slug } = await params;
  const blog = allBlogs.find((blog) => blog.slug === slug);
  return (
    <>
      <section className="pb-[120px] pt-[150px] border-4 flex justify-center">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black sm:text-4xl sm:leading-tight">
                  {blog.title}
                </h2>
                <div className="flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                  <div className="flex flex-wrap items-center">
                    <div className="mb-5 flex items-center">
                      <p className="mr-5 flex items-center text-base font-medium text-body-color">
                        <BiCalendarEdit />
                        12 Jan 2024
                      </p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <Link
                      href="#0"
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                    >
                      Design
                    </Link>
                  </div>
                </div>
                <div>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <Image
                        src={`${blog.coverImage}`}
                        alt="cover image"
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          {...props}
                          className="text-3xl font-bold mt-8 mb-4 text-gray-900"
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          {...props}
                          className="text-2xl font-semibold mt-6 mb-3 text-gray-800"
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          {...props}
                          className="text-xl font-semibold mt-5 mb-2 text-gray-700"
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          {...props}
                          className="mb-4 leading-relaxed text-gray-700 text-lg"
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          {...props}
                          className="list-disc list-inside mb-4 space-y-1 text-lg"
                        />
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
                          className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-6"
                        />
                      ),
                      code: ({
                        node,
                        inline,
                        className,
                        children,
                        ...props
                      }) => {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline ? (
                          <pre className="bg-gray-900 text-white rounded-md p-4 my-4 overflow-x-auto">
                            <code
                              className={`language-${match?.[1] ?? ""}`}
                              {...props}
                            >
                              {children}
                            </code>
                          </pre>
                        ) : (
                          <code
                            className="bg-gray-200 px-1 py-0.5 rounded text-sm"
                            {...props}
                          >
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
                        <tr
                          {...props}
                          className="border-t border-gray-300 even:bg-gray-50"
                        />
                      ),
                      th: ({ node, ...props }) => (
                        <th
                          {...props}
                          className="border px-4 py-2 font-semibold"
                        />
                      ),
                      td: ({ node, ...props }) => (
                        <td {...props} className="border px-4 py-2" />
                      ),
                    }}
                  >
                    {blog.body.raw}
                  </Markdown>
                  ;
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function generateStaticParams() {
  return allBlogs.map((blog) => ({ slug: blog.slug }));
}

export default BlogDetail;
