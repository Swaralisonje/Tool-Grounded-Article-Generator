export default function ArticleRenderer({ htmlContent, onDownload, onRegenerate, isLoading }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span>📄</span> Generated Draft
        </h2>
        <button
          onClick={onDownload}
          className="text-sm font-medium text-gray-600 hover:text-indigo-600 bg-white border border-gray-200 hover:border-indigo-200 px-4 py-2 rounded-lg transition shadow-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Export HTML
        </button>
      </div>

      {/* Content Area */}
      <div className="p-8 lg:p-10">
        <div
          className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>

      {/* Footer Actions */}
      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <button
          onClick={onRegenerate}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-indigo-200 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition shadow-sm disabled:opacity-60"
        >
          {isLoading ? (
            <span className="animate-pulse">Rewriting...</span>
          ) : (
            <>
              <span className="text-lg">✨</span>
              <span>Regenerate for Gen Z Audience</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}