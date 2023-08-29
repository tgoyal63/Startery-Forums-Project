import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-lg p-8 ring-2 ring-black bg-white shadow-lg w-1/3">
          <h1 className="text-2xl my-2 font-bold">
            Login to Startery Community Forum
          </h1>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="p-2 ring-1 ring-black rounded-lg"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="p-2 ring-1 ring-black rounded-lg"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="bg-rose-200 p-2 rounded-lg text-rose-600 w-full ring-2 shadow-lg ring-black/80"
            >
              Log In
            </button>
          </form>
          <div className="flex justify-between mt-4 text-sm">
            <Link
              className="text-rose-600 underline underline-offset-2"
              href="/register"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
