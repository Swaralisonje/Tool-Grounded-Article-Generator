'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateContent } from '@/lib/api';
import Navbar from '@/components/Navbar';
import ArticleRenderer from '@/components/ArticleRenderer';
import SeoPanel from '@/components/SeoPanel';

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const handleGenerate = async (extraPrompt = "") => {
    if (!query && !extraPrompt) return alert("Please enter a query");
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const payload = {
        query: extraPrompt ? `${query} (Update: ${extraPrompt})` : query,
        url_context: url
      };
      const data = await generateContent(payload, token);
      setResult(data);
    } catch (err) {
      alert("Error generating content. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const downloadHTML = () => {
    if (!result?.article_html) return;
    const blob = new Blob([result.article_html], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'generated-article.html';
    link.click();
  };

  if (!isAuthorized) return null;

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Hero Input Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-12">
          <div className="p-8 md:p-10 text-center border-b border-gray-100">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
              What do you want to <span className="text-indigo-600">write</span> today?
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Enter a topic and let our AI research, draft, and optimize your next article.
            </p>
          </div>

          <div className="p-6 md:p-8 bg-gray-50/50 space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
              <input
                className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-lg shadow-sm"
                placeholder="e.g., The future of EV batteries in 2025..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔗</span>
                </div>
                <input
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-700"
                  placeholder="Optional context URL (e.g., https://techcrunch.com/...)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <button
                onClick={() => handleGenerate()}
                disabled={loading}
                className="md:w-auto w-full px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:bg-indigo-300 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Generating...' : 'Generate Article'}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
            {/* Main Article Column */}
            <div className="lg:col-span-8 space-y-6">
              <ArticleRenderer
                htmlContent={result.article_html}
                onDownload={downloadHTML}
                onRegenerate={() => handleGenerate("Make this more appealing to a Gen Z audience")}
                isLoading={loading}
              />
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <SeoPanel metadata={result.seo_metadata} />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}