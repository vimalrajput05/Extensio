function GenerateExtension() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">
        Generate Extension
      </h1>

      <div className="bg-slate-800 p-6 rounded-xl max-w-3xl">
        <label className="block mb-3 text-lg">
          Extension Requirement
        </label>

        <textarea
          className="w-full h-48 p-4 rounded-lg bg-slate-700 outline-none"
          placeholder="Example: Create a Chrome extension that hides YouTube Shorts..."
        ></textarea>

        <button className="mt-6 px-6 py-3 bg-purple-600 rounded-lg font-bold">
          Generate Extension
        </button>
      </div>
    </div>
  );
}

export default GenerateExtension;