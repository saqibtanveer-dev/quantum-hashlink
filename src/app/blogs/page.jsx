import SingleBlog from "@/components/blog/SingleBlog";
import blogData from "@/components/blog/blogData";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { allBlogs } from 'contentlayer/generated'

export const metadata = {
  title: "Blog | Quantum HashLink",
  description: "Insights, tutorials, and updates from the Quantum HashLink team on software development, AI, and modern technology.",
  keywords: ['tech blog', 'software development blog', 'quantum hashlink blog', 'programming tutorials'],
  openGraph: {
    title: 'Blog | Quantum HashLink',
    description: 'Insights, tutorials, and updates from the Quantum HashLink team.',
    url: 'https://quantum-hashlink.com/blogs',
    type: 'website',
  },
};

const Blog = () => {
  const blogs = allBlogs;
  return (
    <>
      <section className="">
        <Breadcrumb
          pageName="Our Blog"
          description="Stay up to date with the latest insights, tutorials, and industry trends from the Quantum HashLink team."
        />

        <div className="container mx-auto pb-[120px] pt-[120px] px-4 lg:px-20 ">
          <div className="flex flex-wrap justify-center">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
