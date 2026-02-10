import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SingleBlog = ({ blog }) => {
  const { title, coverImage: image, excerpt: paragraph, tags, publishedAt: publishDate } = blog;
  return (
    <Card className="group overflow-hidden border-gray-100 shadow-sm transition hover:shadow-md">
      <Link
        href={`/blog/${blog.slug}`}
        className="relative block aspect-16/10 w-full overflow-hidden"
      >
        <Image src={image} alt={title} fill className="object-cover transition duration-300 group-hover:scale-105" />
        <Badge className="absolute right-4 top-4 z-20 capitalize">
          {tags[0]}
        </Badge>
      </Link>
      <CardContent className="p-6">
        <p className="mb-2 text-xs text-body-color">
          {new Date(publishDate).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
        <h3>
          <Link
            href={`/blog/${blog.slug}`}
            className="mb-3 block text-lg font-bold leading-snug text-gray-900 transition hover:text-primary"
          >
            {title.slice(0, 70)}{title.length > 70 ? "..." : ""}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-body-color">
          {paragraph}
        </p>
      </CardContent>
    </Card>
  );
};

export default SingleBlog;
