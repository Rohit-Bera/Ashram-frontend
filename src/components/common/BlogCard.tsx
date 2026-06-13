import { BlogArticle } from '../../types';
import { useGlobalContext } from '../../context/LangContext';

interface BlogCardProps {
  article: BlogArticle;
  onClick?: () => void;
  variant?: 'compact' | 'full';
}

export function BlogCard({ article, onClick, variant = 'compact' }: BlogCardProps) {
  const { t } = useGlobalContext();

  if (variant === 'full') {
    return (
      <div className="bg-white rounded-3xl border border-amber-100 p-6 shadow-sm space-y-4">
        <img
          src={article.imageUrl}
          alt={t(article.title)}
          className="w-full h-64 object-cover rounded-2xl"
          referrerPolicy="no-referrer"
        />
        <div>
          <span className="text-[10px] font-bold text-amber-600 tracking-wider block uppercase">{article.author}</span>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-950 leading-tight mt-1">{t(article.title)}</h2>
          <p className="text-[10px] text-amber-700 font-mono mt-0.5">{article.publishDate} · {article.readTime}</p>
        </div>
        <p className="text-xs text-amber-900 font-serif leading-relaxed italic bg-amber-50 p-4 border border-amber-100 rounded-xl">
          "{t(article.summary)}"
        </p>
        <p className="text-xs text-amber-950 font-serif leading-relaxed whitespace-pre-line pt-2">
          {t(article.content)}
        </p>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-amber-100 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4"
    >
      <img
        src={article.imageUrl}
        alt={t(article.title)}
        className="w-20 h-20 rounded-xl object-cover shrink-0 self-center"
        referrerPolicy="no-referrer"
      />
      <div className="flex flex-col justify-between">
        <div>
          <span className="text-[9px] text-amber-600 font-bold uppercase tracking-wider">{article.author}</span>
          <h4 className="text-xs sm:text-sm font-serif font-bold text-amber-950 line-clamp-1 mt-0.5">{t(article.title)}</h4>
          <p className="text-[11px] text-amber-830/80 mt-1 line-clamp-2 leading-relaxed">{t(article.summary)}</p>
        </div>
        <span className="text-[9px] text-amber-500 font-mono mt-2 block">{article.publishDate} · {article.readTime}</span>
      </div>
    </div>
  );
}
