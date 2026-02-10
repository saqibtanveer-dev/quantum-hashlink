import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";
import { allBlogs, Blog } from 'contentlayer/generated'

const FeaturedBlogs = () => {
  const blogs = allBlogs.slice(0, 3)
  return (
    <section id="blog" className="section-spacing">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionTitle
          subtitle="From Our Blog"
          title="Latest Insights"
          paragraph="Insights, tutorials, and thought leadership from the Quantum HashLink team on software development, AI, and modern technology."
          center
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <SingleBlog key={blog.slug} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
