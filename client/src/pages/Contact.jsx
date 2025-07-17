import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const faqs = [
    { question: "What is AI?", answer: "AI stands for Artificial Intelligence, which refers to the simulation of human intelligence in machines. It enables them to perform tasks like problem-solving, learning, and decision-making." },
    { question: "How can I listen to your podcasts?", answer: "You can listen to our podcasts on various platforms like Spotify, Apple Podcasts, and our website." },
    { question: "Are your podcasts free to listen to?", answer: "Yes, all our podcasts are free to listen to with occasional premium content." },
    { question: "Can I download episodes to listen offline?", answer: "Yes, you can download episodes for offline listening on supported platforms." },
    { question: "How often do you release new episodes?", answer: "We release new episodes every Monday and Thursday." },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 2xl:p-28 flex flex-col md:flex-row gap-10">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2">
        <div className="flex items-center mb-6">
          <span className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-2">
            <span className="w-2 h-2 bg-black rounded-full"></span>
          </span>
          <h2 className="text-3xl font-semibold">Get in Touch with BlogXDev</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 rounded"
                placeholder="Enter First Name"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 rounded"
                placeholder="Enter Last Name"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 rounded"
                placeholder="Enter your Email"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 rounded"
                placeholder="Enter Phone Number"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 rounded h-24"
              placeholder="Enter your Message"
            ></textarea>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="mr-2"
            />
            <label>I agree with Terms of Use and Privacy Policy</label>
          </div>
          <button
            type="submit"
            className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-500"
          >
            Send
          </button>
        </form>
      </div>

      {/* Right Section - FAQ */}
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-semibold mb-6">Asked Question</h2>
        <p className="mb-4">
          If the question is not available on our FAQ section, feel free to
          contact us personally, we will resolve your respective doubts.
        </p>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 mb-4">
          Ask Question
        </button>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800 rounded">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-4 flex justify-between items-center"
              >
                <span>{faq.question}</span>
                <span>{openFaq === index ? "-" : "+"}</span>
              </button>
              {openFaq === index && (
                <div className="p-4 border-t border-gray-700">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;