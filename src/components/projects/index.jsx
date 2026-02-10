"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionTitle from "../Common/SectionTitle";

const projectsData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
    category: "Branding",
    title: "TechVision Brand Identity",
    href: "#",
  },
  {
    id: 2,
    image: "https://plus.unsplash.com/premium_photo-1683121716061-3faddf4dc504?w=500&auto=format&fit=crop&q=60",
    category: "Marketing",
    title: "Growth Analytics Dashboard",
    href: "#",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=500&auto=format&fit=crop&q=60",
    category: "Marketing",
    title: "E-Commerce Platform",
    href: "#",
  },
  {
    id: 4,
    image: "https://plus.unsplash.com/premium_photo-1661963212517-830bbb7d76fc?w=500&auto=format&fit=crop&q=60",
    category: "Development",
    title: "SaaS Management Portal",
    href: "#",
  },
  {
    id: 5,
    image: "https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?w=500&auto=format&fit=crop&q=60",
    category: "Design",
    title: "FinTech Mobile App UI",
    href: "#",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60",
    category: "Development",
    title: "AI Content Generator",
    href: "#",
  },
];

const categories = ["all", "branding", "design", "marketing", "development"];

const Projects = () => {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? projectsData
      : projectsData.filter((p) => p.category.toLowerCase() === active);

  return (
    <section id="projects" className="section-spacing">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionTitle
          subtitle="Our Work"
          title="Recent Projects"
          paragraph="A selection of projects we have delivered — from web platforms to mobile apps and custom enterprise solutions."
          center
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={active === cat ? "default" : "secondary"}
              size="sm"
              onClick={() => setActive(cat)}
              className="capitalize"
            >
              {cat === "all" ? "All Projects" : cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

const ProjectCard = ({ project }) => {
  const { image, category, title, href } = project;
  return (
    <Card className="group overflow-hidden border-gray-100 shadow-sm transition hover:shadow-md">
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <Badge className="absolute right-3 top-3 text-xs">{category}</Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="mb-3 text-lg font-bold text-gray-900">{title}</h3>
        <a
          href={href}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:underline"
        >
          View Details
          <ArrowRight className="size-4" />
        </a>
      </CardContent>
    </Card>
  );
};
