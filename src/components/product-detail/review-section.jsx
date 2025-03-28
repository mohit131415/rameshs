"use client"

import { useState } from "react"
import { HeritageCorner, HeritageDivider } from "./heritage-elements"
import ReviewForm from "./tabs/review-form"

const ReviewSection = ({ product }) => {
  const [showReviewForm, setShowReviewForm] = useState(false)

  const handleReviewSubmit = (reviewData) => {
    console.log("Review submitted:", reviewData)
    // Here you would typically send the review data to your backend
    setShowReviewForm(false)
    // Optionally show a success message or refresh reviews
  }

  return (
    <div className="relative">
      {/* Heritage corners */}
      <HeritageCorner className="absolute -top-3 -left-3" rotate={0} />
      <HeritageCorner className="absolute -top-3 -right-3" rotate={90} />
      <HeritageCorner className="absolute -bottom-3 -right-3" rotate={180} />
      <HeritageCorner className="absolute -bottom-3 -left-3" rotate={270} />

      <div className="border border-amber-200 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium text-amber-900">Customer Reviews</h2>
          {!showReviewForm && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-md text-sm font-medium transition-colors"
            >
              Write a Review
            </button>
          )}
        </div>

        {showReviewForm ? (
          <ReviewForm onSubmit={handleReviewSubmit} onCancel={() => setShowReviewForm(false)} />
        ) : (
          <>
            <div className="flex items-center mb-6">
              <div className="flex text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="ml-2 text-amber-900 font-medium">4.8 out of 5</p>
              <p className="ml-2 text-gray-500 text-sm">(42 reviews)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-amber-50 rounded-lg p-5 border border-amber-100">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <span className="text-xs w-8 text-gray-600">5★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <span className="text-xs w-8 text-right text-gray-600">75%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs w-8 text-gray-600">4★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: "18%" }}></div>
                    </div>
                    <span className="text-xs w-8 text-right text-gray-600">18%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs w-8 text-gray-600">3★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: "5%" }}></div>
                    </div>
                    <span className="text-xs w-8 text-right text-gray-600">5%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs w-8 text-gray-600">2★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: "2%" }}></div>
                    </div>
                    <span className="text-xs w-8 text-right text-gray-600">2%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs w-8 text-gray-600">1★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: "0%" }}></div>
                    </div>
                    <span className="text-xs w-8 text-right text-gray-600">0%</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-5 border border-amber-100">
                <h3 className="text-lg font-medium text-amber-900 mb-3">What Customers Love</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">Taste</span>
                    <div className="ml-2 h-2 bg-gray-200 rounded-full overflow-hidden flex-grow">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: "92%" }}></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-600">92%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">Quality</span>
                    <div className="ml-2 h-2 bg-gray-200 rounded-full overflow-hidden flex-grow">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: "88%" }}></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-600">88%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">Packaging</span>
                    <div className="ml-2 h-2 bg-gray-200 rounded-full overflow-hidden flex-grow">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-600">85%</span>
                  </div>
                </div>
              </div>
            </div>

            <HeritageDivider />

            <div className="mt-6 space-y-6">
              <div className="bg-white rounded-lg p-5 border border-amber-100 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-medium">
                      RS
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Rajesh Sharma</p>
                      <p className="text-xs text-gray-500">Verified Purchase • 2 months ago</p>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <h4 className="font-medium text-amber-900 mt-4 text-lg">Absolutely delicious!</h4>
                <p className="text-gray-700 mt-2">
                  The taste reminds me of the sweets my grandmother used to make. The packaging was beautiful and
                  perfect for gifting. Will definitely order again. The quality of ingredients is evident in every bite.
                </p>
                <div className="flex items-center mt-4 text-sm text-gray-500">
                  <button className="flex items-center hover:text-amber-700">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    Helpful (12)
                  </button>
                  <span className="mx-2">•</span>
                  <button className="hover:text-amber-700">Reply</button>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-amber-100 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-medium">
                      PP
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Priya Patel</p>
                      <p className="text-xs text-gray-500">Verified Purchase • 1 week ago</p>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4].map((star) => (
                      <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <h4 className="font-medium text-amber-900 mt-4 text-lg">Great quality sweets</h4>
                <p className="text-gray-700 mt-2">
                  Packaging was beautiful and perfect for gifting. Would have given 5 stars but delivery was slightly
                  delayed. The sweets themselves were excellent quality and tasted authentic. My family loved them.
                </p>
                <div className="flex items-center mt-4 text-sm text-gray-500">
                  <button className="flex items-center hover:text-amber-700">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    Helpful (5)
                  </button>
                  <span className="mx-2">•</span>
                  <button className="hover:text-amber-700">Reply</button>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-amber-100 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-medium">
                      AK
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Amit Kumar</p>
                      <p className="text-xs text-gray-500">Verified Purchase • 3 weeks ago</p>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <h4 className="font-medium text-amber-900 mt-4 text-lg">Perfect for special occasions</h4>
                <p className="text-gray-700 mt-2">
                  Ordered these sweets for a family celebration and they were a huge hit. The freshness and authentic
                  taste were remarkable. Will definitely be ordering again for future events.
                </p>
                <div className="flex items-center mt-4 text-sm text-gray-500">
                  <button className="flex items-center hover:text-amber-700">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    Helpful (8)
                  </button>
                  <span className="mx-2">•</span>
                  <button className="hover:text-amber-700">Reply</button>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button className="px-6 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-md text-sm font-medium transition-colors flex items-center">
                Load More Reviews
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ReviewSection

