import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({ blog }) => {
  const { title, coverImage: image, excerpt: paragraph, tags, publishedAt: publishDate } = blog;
  return (
    <>
      <div className="group relative overflow-hidden rounded-sm bg-white shadow-one duration-300 hover:shadow-two lg:min-h-[550px]">
        <Link
          href={`/blog/${blog.slug}`}
          className="relative block aspect-[37/22] w-full"
        >
          <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
            {tags[0]}
          </span>
          <Image src={image} alt="image" fill />
        </Link>   
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <Link
              href={`/blog/${blog.slug}`}
              className="mb-2 leading-normal h-16 overflow-y-hidden block text-xl font-bold text-black hover:text-primarysm:text-2xl"
            >
              {title.slice(0, 70)}{title.length > 70 ? '...' : ''}
            </Link>
          </h3>
          <p className="leading-normal h-12 overflow-y-hidden text-base font-medium text-body-color">
            {paragraph.slice(0, 110)}{paragraph.length > 110 ? '...' : ''}
          </p>
          <div className="flex items-center mt-6 border-t border-body-color border-opacity-10 pb-6 pt-2">
            <div className="inline-block self-end">
              <h4 className="mb-1 text-sm font-medium text-dark">
                Date
              </h4>
              <p className="text-xs text-body-color">{new Date(publishDate).toLocaleDateString("en-US", {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
