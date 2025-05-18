import React from "react";
import { courses } from "../courseDetails"; // adjust path if needed

export default async function CourseDetailsPage({ params }) {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);

  const coursesMetaData = [
    {
      id: "all",
      title: "Select a course",
      description: "select the course to change the future",
      instructor: "Muhammad Jareer",
      price: "$",
      prerequisites: "",
      duration: "__",
    },
    {
      id: "python",
      title: "Python Programming",
      description:
        "Learn Python syntax, data structures, and fundamental programming concepts to build scripts and applications.",
      instructor: "Emily Clark",
      price: "$39.99",
      prerequisites: "Basic computer literacy",
      duration: "3-6 Months",
    },
    {
      id: "python-advanced",
      title: "Advanced Python",
      description:
        "Master decorators, generators, context managers, and asynchronous programming in Python.",
      instructor: "Michael Brown",
      price: "$59.99",
      prerequisites: "Python Programming",
      duration: "3-6 Months",
    },
    {
      id: "javascript",
      title: "JavaScript Fundamentals",
      description:
        "Understand core JavaScript concepts including ES6+, DOM manipulation, and event handling.",
      instructor: "Chris Martin",
      price: "$44.99",
      prerequisites: "Basic HTML & CSS",
      duration: "3-6 Months",
    },
    {
      id: "javascript-advanced",
      title: "Advanced JavaScript",
      description:
        "Explore advanced patterns such as closures, prototypes, async/await, and design patterns in JS.",
      instructor: "Sandra Lee",
      price: "$64.99",
      prerequisites: "JavaScript Fundamentals",
      duration: "3-6 Months",
    },
    {
      id: "mern-stack",
      title: "Web Development with MERN Stack",
      description:
        "Build full-stack applications using MongoDB, Express.js, React, and Node.js.",
      instructor: "David Kim",
      price: "$74.99",
      prerequisites: "JavaScript Fundamentals",
      duration: "3-6 Months",
    },
    {
      id: "react-django",
      title: "Web Dev: React + Django",
      description:
        "Combine React frontend with Django REST framework to create robust web applications.",
      instructor: "Aisha Patel",
      price: "$69.99",
      prerequisites: "JavaScript Fundamentals, Python Programming",
      duration: "3-6 Months",
    },
    {
      id: "nextjs",
      title: "Next.js Essentials",
      description:
        "Learn server-side rendering, dynamic routing, and API routes with Next.js.",
      instructor: "Robert Chen",
      price: "$54.99",
      prerequisites: "React for Beginners",
      duration: "3-6 Months",
    },
    {
      id: "machine-learning",
      title: "Machine Learning",
      description:
        "Introduction to machine learning algorithms, data preprocessing, and model evaluation using scikit-learn.",
      instructor: "Dr. Sarah Novak",
      price: "$89.99",
      prerequisites: "Python Programming, Basic Statistics",
      duration: "3-6 Months",
    },
    {
      id: "android-react-native",
      title: "Android Development with React Native",
      description:
        "Create cross-platform mobile applications using React Native and deploy them to Android devices.",
      instructor: "Linda Wu",
      price: "$79.99",
      prerequisites: "JavaScript Fundamentals",
      duration: "3-6 Months",
    },
    {
      id: "devops",
      title: "DevOps Practices",
      description:
        "Implement CI/CD pipelines, containerization with Docker, and infrastructure as code using Terraform.",
      instructor: "Jameson Lee",
      price: "$59.99",
      prerequisites: "Basic Linux, Version Control (Git)",
      duration: "3-6 Months",
    },
  ];

  const selectedCourse = coursesMetaData.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto mt-24 px-4 py-10">
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100">
          {/* Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-pink-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          {/* Message */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Course Not Found
          </h2>
          <p className="text-gray-600">
            The course you’re looking for doesn’t exist or may have been
            removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mt-24">
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl border border-gray-100 overflow-hidden relative group">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-300 to-pink-600" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-100 opacity-20 group-hover:opacity-30 transition-all duration-500" />

        {/* Course content */}
        <div className="relative z-10 w-full text-left">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {selectedCourse.title}
          </h1>
          <p className="text-gray-600 mb-6 text-base leading-relaxed">
            {selectedCourse.description}
          </p>

          <ul className="text-gray-700 mb-6 space-y-3 w-full">
            <li className="flex items-center justify-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-pink-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="font-semibold text-sm">Instructor:</span>
              <span className="text-sm">{selectedCourse.instructor}</span>
            </li>

            <li className="flex items-center justify-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-pink-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-semibold text-sm">Price:</span>
              <span className="font-semibold text-sm text-pink-600">
                {selectedCourse.price}
              </span>
            </li>

            <li className="flex items-center justify-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-pink-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-semibold text-sm">Prerequisites:</span>
              <span className="text-sm">
                {selectedCourse.prerequisites}
              </span>
            </li>

            <li className="flex items-center justify-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-pink-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 7v5l3 1"
                />
              </svg>
              <span className="font-semibold text-sm">Duration:</span>
              <span className="text-sm">{selectedCourse.duration}</span>
            </li>
          </ul>

          {Array.isArray(course.syllabus) && course.syllabus.length > 0 && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold mb-3 text-blue-700">
                12-Week Curriculum
              </h2>

              {/* Accordion wrapper */}
              <div className="space-y-2">
                {course.syllabus.map((weekObj) => {
                  // Unique ID for each radio input
                  const radioId = `accordion-week-${weekObj.week}`;

                  return (
                    <div key={weekObj.week} className="border rounded-lg overflow-hidden">
                      {/* Hidden radio button */}
                      <input
                        type="radio"
                        name="accordion"
                        id={radioId}
                        className="hidden peer"
                        // First week open by default
                        defaultChecked={weekObj.week === 1}
                      />

                      {/* Label acts as the clickable header */}
                      <label
                        htmlFor={radioId}
                        className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer peer-checked:bg-blue-100 transition-colors"
                      >
                        <span className="font-medium text-lg text-gray-800">
                          Week {weekObj.week}
                        </span>
                        <svg
                          className="w-5 h-5 text-gray-600 transform peer-checked:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </label>

                      {/* Content panel */}
                      <div className="max-h-0 overflow-hidden peer-checked:max-h-screen transition-[max-height] duration-300">
                        <ul className="p-4 bg-white list-disc list-inside space-y-1 text-gray-700 text-sm">
                          {weekObj.topics.map((topic, ti) => (
                            <li key={ti}>{topic}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
