import { useRouter } from 'next/navigation';
import React from 'react'

function CourseCard({selectedCourse}) {
  const router = useRouter();

  const handleLearnMore = () => {
    router.push(`/course-details/${selectedCourse.id}`);
  };
  return (
    <div className="w-full h-screen  lg:w-[30%] px-4">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 overflow-hidden relative group">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-300 to-pink-600"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-100 opacity-20 group-hover:opacity-30 transition-all duration-500"></div>

              {/* Course content */}
              <div className="relative z-10">
                <h2 className="text-2xl text-left font-bold mb-3 text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
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

                <div className='text-left'>
                  <button 
                  className="px-8 py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50"
                  onClick={handleLearnMore}
                  >
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
  )
}

export default CourseCard