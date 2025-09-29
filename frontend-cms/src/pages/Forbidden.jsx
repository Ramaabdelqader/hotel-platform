export default function Forbidden() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
      <p className="text-gray-600 mb-6 max-w-md">You don’t have permission to view this page.</p>
      <a href="/" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">
        Back to Home
      </a>
    </div>
  );
}
