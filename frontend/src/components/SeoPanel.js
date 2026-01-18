'use client';

export default function SeoPanel({ metadata }) {
  if (!metadata) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // Simple visual feedback could go here
  };

  const getKeywords = () => {
    const k = metadata.keywords;
    if (Array.isArray(k)) return k;
    if (typeof k === 'string') {
        if (k.includes(',')) return k.split(',').map(s => s.trim());
        return [k];
    }
    return [];
  };

  const keywordsList = getKeywords();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-indigo-50/50 px-6 py-4 border-b border-indigo-100/50">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>🎯</span> SEO Metadata
        </h3>
      </div>

      <div className="p-6 space-y-6">

        {/* Title */}
        <div className="group relative">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 block">
            Meta Title
          </label>
          <div
            onClick={() => handleCopy(metadata.meta_title)}
            className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium text-sm leading-snug cursor-pointer hover:border-indigo-300 hover:shadow-sm transition group-active:scale-[0.99]"
            title="Click to copy"
          >
            {metadata.meta_title || "N/A"}
          </div>
        </div>

        {/* Description */}
        <div className="group relative">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 block">
            Meta Description
          </label>
          <div
            onClick={() => handleCopy(metadata.description)}
            className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-sm leading-relaxed cursor-pointer hover:border-indigo-300 hover:shadow-sm transition group-active:scale-[0.99]"
            title="Click to copy"
          >
            {metadata.description || "N/A"}
          </div>
        </div>

        {/* Keywords */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5 block">
            Target Keywords
          </label>
          <div className="flex flex-wrap gap-2">
            {keywordsList.length > 0 ? (
              keywordsList.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100 transition cursor-default"
                >
                  #{tag}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400 italic">No keywords</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}