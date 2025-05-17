"use client";
import { enrollmentSchema } from "@/lib/enrollmentValidator";
import React, { useState } from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { BiMailSend } from "react-icons/bi";
import { LuLoaderCircle } from "react-icons/lu";

// Detailed courses data
const courses = [
  {
    id: "all",
    title: "Select a courese",
    description: "sleect the course to change the future",
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

export default function CourseEnrollment() {
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0].id);
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    contact: "",
    dob: "",
    address: "",
    education: "",
    courseType: "ONLINE",
  });
  const selectedCourse = courses.find((c) => c.id === selectedCourseId);
  const [loading, setLoading] = useState(false);
  const [sucessMsg, setSucessMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnroll = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);

    try {
      const parseResult = enrollmentSchema.safeParse(formData);
      if (!parseResult.success) {
        console.log("validation error");
        const errors = parseResult.error.flatten().fieldErrors;
        console.log(errors);
        setFieldErrors(errors);
        return;
      }
      console.log("parse results succeded");

      const rawResponse = await fetch("http://localhost:3000/api/enrollment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const response = await rawResponse.json();

      if (!response.status) {
        setErrorMsg(response.message);
        return;
      }

      if (response.status) {
        setSucessMsg(response.message || "You Are Done!");
        setFormData({
          name: "",
          course: "",
          contact: "",
          dob: "",
          address: "",
          education: "",
          courseType: "ONLINE",
        });
      }
    } catch (error) {
      setErrorMsg("Something Went Wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-4 bg-gray-100 pt-[120px] pb-[120px] px-4 lg:px-20">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">
          Course Enrollment
        </h1>
        <div className="flex flex-wrap -mx-4">
          {/* Form on Left */}
          <div className="w-full lg:w-[70%] px-4 mb-8 lg:mb-0">
            <form
              onSubmit={handleEnroll}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                {/* Course Select */}
                <div>
                  <label
                    htmlFor="course-select"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Course
                  </label>
                  <select
                    id="course-select"
                    value={selectedCourseId}
                    onChange={(e) => {
                      setFormData({ ...formData, course: e.target.value });
                      setSelectedCourseId(e.target.value);
                    }}
                    className="bg-gray-50 border border-pink-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                    required
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.course && (
                    <p className="text-red-700 pl-1">{fieldErrors.course[0]}</p>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-pink-300 focus:outline-none text-gray-900 text-sm rounded-lg  focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                    placeholder="John Doe"
                    required
                  />
                  {fieldErrors.name && (
                    <p className="text-red-700 pl-1">{fieldErrors.name[0]}</p>
                  )}
                </div>

                {/* Contact Number */}
                <div>
                  <label
                    htmlFor="contact"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="bg-gray-50 border border-pink-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                    placeholder="123-456-7890"
                    required
                  />
                  {fieldErrors.contact && (
                    <p className="text-red-700 pl-1">{fieldErrors.course[0]}</p>
                  )}
                </div>

                {/* Course Type */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Course Type
                  </label>
                  <div className="flex gap-4">
                    {["ONLINE", "PHYSICAL"].map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="courseType"
                          value={type}
                          checked={formData.courseType === type}
                          onChange={handleChange}
                          className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300"
                        />
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    ))}
                    {fieldErrors.courseType && (
                      <p className="text-red-700 pl-1">
                        {fieldErrors.courseType[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label
                    htmlFor="dob"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="bg-gray-50 border border-pink-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                    required
                  />
                  {fieldErrors.dob && (
                    <p className="text-red-700 pl-1">{fieldErrors.dob[0]}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="bg-gray-50 border border-pink-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                    placeholder="123 Main St, City"
                    required
                  />
                  {fieldErrors.address && (
                    <p className="text-red-700 pl-1">
                      {fieldErrors.address[0]}
                    </p>
                  )}
                </div>

                {/* Education */}
                <div>
                  <label
                    htmlFor="education"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Education
                  </label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="bg-gray-50 border border-pink-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                    placeholder="Bachelor's in Computer Science"
                    required
                  />
                  {fieldErrors.education && (
                    <p className="text-red-700 pl-1">
                      {fieldErrors.education[0]}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="text-white bg-gradient-to-r from-pink-400 to-pink-700 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center transition duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <LuLoaderCircle className="mr-2 animate-spin w-6 h-6" />
                ) : sucessMsg ? (
                  <IoCheckmarkDoneSharp className="text-green-900 mr-2 w-6 h-6" />
                ) : (
                  <BiMailSend className="mr-2 w-6 h-6" />
                )}
                {!loading
                  ? sucessMsg
                    ? sucessMsg
                    : "Enroll Now"
                  : "Loading..."}
              </button>
            </form>
          </div>

          {/* Card on Right */}
          <div className="w-full lg:w-[30%] px-4">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 overflow-hidden relative group">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-300 to-pink-600"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-100 opacity-20 group-hover:opacity-30 transition-all duration-500"></div>

              {/* Course content */}
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-3 text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {selectedCourse.title}
                </h2>

                <p className="text-gray-600 mb-6 text-base text-left leading-relaxed">
                  {selectedCourse.description}
                </p>

                <ul className="text-gray-700 mb-6 space-y-3 w-full text-left">
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
                    <span className="font-semibold text-sm">
                      Prerequisites:
                    </span>
                    <span className="text-sm">
                      {selectedCourse.prerequisites}
                    </span>
                  </li>

                  <li className="flex items-center justify-start gap-2">
                    {/* Clock‐face icon with hands at 3:00 */}
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

                <button className="hidden px-8 py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:from-pink-600 hover:to-pink-700 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50">
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2 inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
