import SingleBlog from "@/components/blog/SingleBlog";
import blogData from "@/components/blog/blogData";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { allBlogs } from 'contentlayer/generated'

export const metadata = {
  title: "Blog Page | Quantum HashLink like to post quality and useful content",
};

const Blog = () => {
  const blogs = allBlogs;
  return (
    <>
      <section className="">
        <Breadcrumb
          pageName="Blog Grid"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
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
