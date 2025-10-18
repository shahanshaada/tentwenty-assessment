export default function HomePage() {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-blue-50">
      <div className="bg-red p-12 rounded-3xl shadow-2xl max-w-2xl w-full border-t-8 border-accent">
        
        <div className="text-center mb-10">
          <h1 className="text-7xl font-extrabold mb-4 text-gray-900 tracking-tighter">
            Next.js Boilerplate
          </h1>
          <p className="text-2xl text-accent font-semibold">
            Ready to Build with JavaScript & Tailwind CSS
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <span className="text-xl text-primary font-mono w-1/4">Files</span>
            <p className="w-3/4 text-gray-700">6 files created (JS/JSX/CSS/MJS) for full setup.</p>
          </div>
          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <span className="text-xl text-primary font-mono w-1/4">Scripts</span>
            <p className="w-3/4 text-gray-700">Use <code className="font-mono text-sm bg-gray-300 p-1 rounded">npm run dev</code> to start.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
