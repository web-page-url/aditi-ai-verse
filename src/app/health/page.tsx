export default function HealthCheck() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">✅ Deployment Successful</h1>
        <p className="text-gray-600">The application is running correctly on Vercel.</p>
        <div className="mt-4 text-sm text-gray-500">
          <p>Build Time: {new Date().toISOString()}</p>
        </div>
      </div>
    </div>
  );
}