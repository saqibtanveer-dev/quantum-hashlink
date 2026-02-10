import Image from "next/image";
import { allBlogs } from "contentlayer/generated";

import { CalendarDays } from "lucide-react";
import MarkdownRenderer from "@/components/Common/MarkdownRenderer";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = allBlogs.find((blog) => blog.slug === slug);
  if (!blog) {
    return { title: 'Blog Not Found | Quantum HashLink' };
  }
  return {
    title: `${blog.title} | Quantum HashLink`,
    description: blog.excerpt,
    keywords: blog.seo?.keywords,
    alternates: {
      canonical: `https://quantum-hashlink.com/blog/${blog.slug}`,
    },
    openGraph: {
      title: `${blog.seo?.title || blog.title} | Quantum HashLink`,
      description: blog.seo?.description || blog.excerpt,
      url: `https://quantum-hashlink.com/blog/${blog.slug}`,
      images: [
        {
          url: blog.seo?.image || blog.coverImage,
          alt: blog.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.seo?.title || blog.title} | Quantum HashLink`,
      description: blog.seo?.description || blog.excerpt,
      images: [blog.seo?.image || blog.coverImage],
    },
  };
}

const BlogDetail = async ({ params }) => {
  const { slug } = await params;
  const blog = allBlogs.find((blog) => blog.slug === slug);

  if (!blog) {
    return (
      <section className="pb-[120px] pt-[150px] flex justify-center">
        <div className="container text-center">
          <h2 className="text-3xl font-bold">Blog Not Found</h2>
          <p className="mt-4 text-body-color">The blog post you are looking for does not exist.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pb-[120px] pt-[150px] flex justify-center">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black sm:text-4xl sm:leading-tight">
                  {blog.title}
                </h2>
                <div className="flex flex-wrap items-center justify-between border-b border-body-color/10 pb-4">
                  <div className="flex flex-wrap items-center">
                    <div className="mb-5 flex items-center">
                      <p className="mr-5 flex items-center gap-1 text-base font-medium text-body-color">
                        <CalendarDays className="size-4" />
                        {new Date(blog.publishedAt).toLocaleDateString("en-US", { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <span
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                    >
                      {blog.category || blog.tags?.[0] || 'General'}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative aspect-97/60 w-full sm:aspect-97/44">
                      <Image
                        src={`${blog.coverImage}`}
                        alt={blog.title}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                  <MarkdownRenderer content={blog.body.raw} />
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
