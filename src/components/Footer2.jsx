const Footer2 = () => {
    return (
      <footer className="bg-black">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="" className="flex items-center">
                <img
                  className="w-30 h-10 ml-20"
                  src="https://www.logo.wine/a/logo/Tinder_(app)/Tinder_(app)-Flame-Logo.wine.svg"
                  alt="DevTinder Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">DevTinder</span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase text-white">My Social Link</h2>
                <ul className="text-gray-500 font-medium">
                  <li className="mb-4">
                    <a href="https://rupesh-jha-portfolio.netlify.app/" className="hover:underline">My Portfolio</a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/i-am-rupesh/" className="hover:underline">My Linkedin</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase text-white">Contact us</h2>
                <ul className="text-gray-500 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">Help And Support</a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">Contact Us</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase text-white">We Deliver To:</h2>
                <ul className="text-gray-500 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">Mumbai</a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">Pune</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024 <a href="#" className="hover:underline">DevTinder By Rupesh Jha</a>. All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              {/* Social icons */}
              {/* Replace # with actual social media links if available */}
              {[
                { label: "Facebook", icon: "facebook", svg: "M6.135 3H8V0H6.135a4.147 4.147..." },
                { label: "Discord", icon: "discord", svg: "M16.942 1.556a16.3 16.3..." },
                { label: "Twitter", icon: "twitter", svg: "M20 1.892a8.178 8.178..." },
                { label: "GitHub", icon: "github", svg: "M10 .333A9.911 9.911..." },
                { label: "Dribbble", icon: "dribbble", svg: "M10 0a10 10 0 1 0..." }
              ].map((item, idx) => (
                <a key={idx} href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5" aria-label={item.label}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d={item.svg} clipRule="evenodd" fillRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer2;
  