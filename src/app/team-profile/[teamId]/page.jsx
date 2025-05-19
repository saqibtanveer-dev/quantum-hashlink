// components/TeamProfileCard.jsx
import { teamMembersCVData } from "@/data/teamMembersCVData";
import Image from "next/image";
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaCircle,
} from "react-icons/fa";

export default async function TeamProfileCard({ params }) {
  const teamId = params.teamId;
  const member = teamMembersCVData.find((m) => m.id.toString() === teamId);

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mt-24 mx-auto max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 px-6 py-6 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
  {/* Profile Image on top for mobile, left for larger screens */}
  <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 sm:mb-0">
    <Image
      src={member.image}
      alt={`Photo of ${member.name}`}
      layout="fill"
      objectFit="cover"
      className="grayscale-0"
    />
  </div>

  {/* Name, Role, and Icons */}
  <div className="text-center sm:text-left">
    <h1 className="text-2xl sm:text-3xl font-bold text-primary font-sans tracking-wide">
      {member.name}
    </h1>
    <p className="mt-1 text-base sm:text-lg text-primary-100 font-medium">
      {member.role}
    </p>
    <div className="mt-3 flex justify-center sm:justify-start flex-wrap gap-3">
      <a href={`tel:${member.contact.phone}`} className="text-primary hover:text-primary-700">
        <FaPhone className="h-5 w-5" />
      </a>
      <a href={`mailto:${member.contact.email}`} className="text-primary hover:text-primary-700">
        <FaEnvelope className="h-5 w-5" />
      </a>
      <a href={member.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-700">
        <FaLinkedin className="h-5 w-5" />
      </a>
      <a href={member.contact.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-700">
        <FaGithub className="h-5 w-5" />
      </a>
      <a href={member.contact.twitter} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-700">
        <FaTwitter className="h-5 w-5" />
      </a>
    </div>
  </div>
</div>


        <div className="px-8 py-10 space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Professional Summary
            </h2>
            <p className="text-gray-600 leading-relaxed text-justify">
              {member.summary}
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Education
            </h2>
            {member.education.map((edu, idx) => (
              <div
                key={idx}
                className="flex justify-between items-start border-l-4 border-primary pl-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">{edu.degree}</p>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.location}</p>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {edu.date}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Professional Experience
            </h2>
            {member.experience.map((exp, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">{exp.title}</p>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.location}</p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {exp.dateRange}
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="text-sm">
                      {resp}
                    </li>
                  ))}
                </ul>
                {idx < member.experience.length - 1 && (
                  <div className="flex items-center justify-center my-4">
                    <span className="h-px bg-primary/30 flex-grow"></span>
                    <FaCircle className="mx-2 text-primary/50 text-xs" />
                    <span className="h-px bg-primary/30 flex-grow"></span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
