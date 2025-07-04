"use client";
import { enrollmentSchema } from "@/lib/enrollmentValidator";
import React, { useState } from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { BiMailSend } from "react-icons/bi";
import { LuLoaderCircle } from "react-icons/lu";
import CourseCard from "./CourseCard";
import { coursesMetaData } from "@/data/coursesMetaData"; // Importing courses data

export default function CourseEnrollment() {
  const [selectedCourseId, setSelectedCourseId] = useState(
    coursesMetaData[0].id
  );
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    contact: "",
    dob: "",
    address: "",
    education: "",
    courseType: "ONLINE",
  });
  const selectedCourse = coursesMetaData.find((c) => c.id === selectedCourseId);
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
        const errors = parseResult.error.flatten().fieldErrors;
        setFieldErrors(errors);
        return;
      }
      const rawResponse = await fetch(`/api/enrollment`, {
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
                    {coursesMetaData.map((c) => (
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
                    placeholder="0300-1234567"
                    required
                  />
                  {fieldErrors.contact && (
                    <p className="text-red-700 pl-1">{fieldErrors.contact[0]}</p>
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

                {/* Course Select */}
                <div>
                  <label
                    htmlFor="course-select"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Gender
                  </label>
                  <select
                    id="gender-select"
                    value={selectedCourseId}
                    onChange={(e) => {
                      setFormData({ ...formData, gender: e.target.value });
                    }}
                    className="bg-gray-50 border border-pink-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                    required
                  >
                    {['Select a Gender', 'Male', 'Female'].map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.gender && (
                    <p className="text-red-700 pl-1">{fieldErrors.gender[0]}</p>
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
          <CourseCard selectedCourse={selectedCourse} />
        </div>
      </div>
    </section>
  );
}
