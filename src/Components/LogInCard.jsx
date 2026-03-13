import { NavLink } from "react-router-dom";

import { useForm } from "react-hook-form";

export function LogInCard() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <div className="w-[400px] h-[400px] bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-blue-600">Log In</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-[400px] flex flex-col items-center justify-center gap-4"
      >
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
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <div className="text-red-500 text-xs">{errors.email.message}</div>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label className="text-gray-700" htmlFor="password">
            Password:
          </label>
          <input
            className="border border-gray-200 rounded-2xl p-2  w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  "Password must contain at least one letter and one number",
              },
            })}
          />

          {errors.password && (
            <div className="text-red-500 text-xs">
              {errors.password.message}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 bg-blue-600 text-white px-5 py-2 rounded-2xl text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          {isSubmitting ? "loging in..." : "log in"}
        </button>

        <p>
          Don't have an account?
          <span className="ml-2">
            <NavLink to="/SignUp" className="text-blue-600">
              Sign Up
            </NavLink>
          </span>
        </p>
      </form>
    </div>
  );
}
