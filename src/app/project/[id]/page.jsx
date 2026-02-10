import Image from "next/image";
import { allProjects } from "contentlayer/generated";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import MarkdownRenderer from "@/components/Common/MarkdownRenderer";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = allProjects.find((project) => project.id === id);
  if (!project) {
    return { title: 'Project Not Found | Quantum HashLink' };
  }
  return {
    title: `${project.title} | Quantum HashLink`,
    description: project.description,
    keywords: project.seo?.keywords,
    alternates: {
      canonical: `https://quantum-hashlink.com/project/${project.id}`,
    },
    openGraph: {
      title: `${project.seo?.title || project.title} | Quantum HashLink`,
      description: project.seo?.description || project.description,
      url: `https://quantum-hashlink.com/project/${project.id}`,
      images: [
        {
          url: project.seo?.image || project.coverImage,
          alt: project.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.seo?.title || project.title} | Quantum HashLink`,
      description: project.seo?.description || project.description,
      images: [project.seo?.image || project.coverImage],
    },
  };
}

const ProjectDetail = async ({ params }) => {
  const { id } = await params;
  const project = allProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <section className="pb-[120px] pt-[150px] flex justify-center">
        <div className="container text-center">
          <h2 className="text-3xl font-bold">Project Not Found</h2>
          <p className="mt-4 text-body-color">The project you are looking for does not exist.</p>
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
                  {project.title}
                </h2>
                <div className="flex flex-wrap items-center justify-between border-b border-body-color/10 pb-4">
                  <div className="flex flex-wrap items-center">
                    <div className="mb-5 flex items-center">
                      <p className="mr-5 flex items-center gap-1 text-base font-medium text-body-color">
                        <CalendarDays className="size-4" />
                        {project.type || 'Project'}
                      </p>
                    </div>
                  </div>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    {project.excerpt || project.description}
                  </p>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative aspect-97/60 w-full sm:aspect-97/44">
                      <Image
                        src={project.coverImage || '/images/blog/blog-01.jpg'}
                        alt={project.title}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                  <MarkdownRenderer content={project.body.raw} />
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
  return allProjects.map((project) => ({ id: project.id }));
}

export default ProjectDetail;
