export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Login Page</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Username"
        />

        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
        />

        <button className="bg-blue-900 text-white w-full py-2">
          Login
        </button>
      </div>
    </div>
  );
}