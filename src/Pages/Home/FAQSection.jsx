const FAQSection = () => {
    return (
      <section className="bg-base-200 py-8 px-4 mx-auto sm:py-16 sm:px-20">
        <div className="mb-8 lg:mb-16 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-500">
            Here are some common questions that might help you better understand how our platform works. If you have any further questions, feel free to reach out to us.
          </p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="faq-item text-center">
            <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-primary-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-gray-900">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 12h2v2h-2zm0 4h2v2h-2zm0-8h2v2h-2zm2 12h-2c-1.104 0-2-.896-2-2v-2c0-1.104.896-2 2-2h2c1.104 0 2 .896 2 2v2c0 1.104-.896 2-2 2zM5 3h14c1.104 0 2 .896 2 2v14c0 1.104-.896 2-2 2H5c-1.104 0-2-.896-2-2V5c0-1.104.896-2 2-2z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              What is this service about?
            </h3>
            <p className="text-gray-500">
              This service helps users to manage their tasks and projects efficiently. You can complete tasks, earn rewards, and track your progress in real time.
            </p>
          </div>
  
          <div className="faq-item text-center">
            <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-primary-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-gray-900">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 16h9m-9-4h9M9 20H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zM5 8V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4M5 8h4m4 0h4" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              How do I get started?
            </h3>
            <p className="text-gray-500">
              Simply sign up, and you can start creating your first project or task right away. Our platform is easy to navigate and user-friendly.
            </p>
          </div>
  
          <div className="faq-item text-center">
            <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-primary-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-gray-900">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10l7 7 7-7m-7 7V3" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              Is there a free trial?
            </h3>
            <p className="text-gray-500">
              Yes, we offer a 14-day free trial for new users to explore the platform's features and see if it's a good fit for their needs.
            </p>
          </div>
  
          <div className="faq-item text-center">
            <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-primary-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-gray-900">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              Can I cancel my account at any time?
            </h3>
            <p className="text-gray-500">
              Yes, you can cancel your account at any time through your account settings. If you have any questions, our support team is here to help.
            </p>
          </div>
  
          <div className="faq-item text-center">
            <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-primary-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-gray-900">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              How secure is my information?
            </h3>
            <p className="text-gray-500">
              We take your privacy seriously. All your data is encrypted, and we use secure payment gateways for any financial transactions.
            </p>
          </div>
  
          <div className="faq-item text-center">
            <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-primary-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-gray-900">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6h12M10 12h12M10 18h12M10 3V1H5v2H3v16h2v2h2v-2h12v2h2v-2h2V3h-2V1h-5v2H10z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              How do I get support?
            </h3>
            <p className="text-gray-500">
              You can get support 24/7 by visiting our support center or reaching out via email. We are always happy to assist you with any issues.
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default FAQSection;
  