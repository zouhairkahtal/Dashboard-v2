import { NavLink } from "react-router-dom";

export function SignUpCard() {
  return (
    <div className="w-[400px]  h-[550px] bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Sign Up</h1>

      <form className="w-full  flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-gray-700" htmlFor="email">
            Email:
          </label>
          <input
            className="border border-gray-200 rounded-2xl p-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>    
        
        <div className="flex flex-col gap-2 ">
          <label className="text-gray-700" htmlFor="name">
            name:
          </label>
          <input
            className="border border-gray-200 rounded-2xl p-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <label className="text-gray-700" htmlFor="password">
            password:
          </label>
          <input
            className="border border-gray-200 rounded-2xl p-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="password"
            id=" password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <label className="text-gray-700" htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            className="border border-gray-200 rounded-2xl p-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-600 "
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Enter your confirm password"
          />
        </div>
        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white px-5 py-2 rounded-2xl text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Sign Up
        </button>

        <p>
          You have an account?
          <span className="ml-2">
            <NavLink to="/LogIn" className="text-blue-600">
              Log In
            </NavLink>
          </span>
        </p>
      </form>
    </div>
  );
}
