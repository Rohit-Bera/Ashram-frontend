import { useGlobalContext } from '../context/LangContext';
import { BlogCard } from '../components/common/BlogCard';

interface BlogsPageProps {
  onToast: (msg: string) => void;
}

export function BlogsPage({ onToast }: BlogsPageProps) {
  const { blogs } = useGlobalContext();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Scriptural commentary</span>
        <h3 className="text-3xl font-serif text-amber-950 font-medium">Daily wisdom blog</h3>
        <p className="text-xs text-amber-800/80 leading-relaxed font-serif">
          Access simplified scientific essays on Japa meditation techniques, law of karma reactions, and active Bhagavad Gita chapter studies.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8 text-left">
        {blogs.map(art => (
          <div key={art.id}>
            <BlogCard article={art} variant="full" />
            <div className="border-t border-amber-100 pt-3 flex justify-between items-center text-[10px] mt-0">
              <span className="font-bold text-amber-700">Topic: Sound Vibration Philosophy</span>
              <button
                onClick={() => onToast('Article bookmark saved in your heart! chant Hari Bol.')}
                className="text-amber-600 font-bold hover:underline"
              >
                Love Article
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
