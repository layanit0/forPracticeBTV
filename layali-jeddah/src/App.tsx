import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Star, Heart, Clock, MapPin, Sparkles, Gift, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { events, foodBooths, prayerTimes } from './data';

// --- Ambient Components ---

const StarsBackground = () => {
  const stars = useMemo(() => [...Array(50)].map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    duration: `${Math.random() * 3 + 2}s`,
  })), []);

  return (
    <div className="stars-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': star.duration,
          } as any}
        />
      ))}
    </div>
  );
};

// --- Sub-components ---

const SmartSuggestionBar = () => {
  const [suggestion, setSuggestion] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18 && hour < 21) {
      setSuggestion('حان وقت الإفطار: نوصي بزيارة أركان التمور وقهوة البلد');
    } else if (hour >= 21) {
      setSuggestion('أجواء ليلية ساحرة: لا تفوت العروض الفنية وحلويات "كنافة الشام"');
    } else {
      setSuggestion('استعد لليلة جميلة في البلد: تبدأ الفعاليات بعد صلاة المغرب');
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto mb-8 bg-lj-gold/5 border border-lj-gold/20 rounded-full px-6 py-2 flex items-center gap-3 backdrop-blur-sm"
    >
      <Sparkles size={16} className="text-lj-gold animate-pulse" />
      <span className="text-xs uppercase tracking-widest text-lj-gold/60 font-bold whitespace-nowrap">AI Ramadan Assistant:</span>
      <span className="text-sm font-medium">{suggestion}</span>
    </motion.div>
  );
};

const CrowdIndicator = ({ zone }: { zone: string }) => {
  const isCrowded = useMemo(() => Math.random() > 0.5, [zone]);
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className={`w-2 h-2 rounded-full ${isCrowded ? 'bg-red-500 animate-ping' : 'bg-green-500 animate-pulse'}`} />
      <span className="text-[10px] opacity-40 uppercase tracking-tighter">
        {isCrowded ? 'مزدحم جداً' : 'انسيابية عالية'}
      </span>
    </div>
  );
};

const Modal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-lj-bg border border-lj-gold/30 p-10 rounded-3xl max-w-md w-full text-center shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-lj-gold" />
          <Gift size={60} className="mx-auto text-lj-gold mb-6 animate-bounce" />
          <h2 className="text-3xl font-serif text-lj-gold mb-4">سحب السحور المحظوظ</h2>
          <p className="text-lj-gold/60 mb-8 leading-relaxed">
            سجل الآن للحصول على فرصة للفوز بوجبة سحور فاخرة لأربعة أشخاص في قلب جدة التاريخية.
          </p>
          <button 
            onClick={() => {
              confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#c5a059', '#ffffff', '#0d0905'] });
              onClose();
            }}
            className="w-full py-4 bg-lj-gold text-lj-bg font-bold rounded-xl hover:bg-lj-gold/90 transition-colors uppercase tracking-widest"
          >
            سجل الآن مجاناً
          </button>
          <button onClick={onClose} className="mt-6 text-lj-gold/30 hover:text-lj-gold transition-colors">إغلاق</button>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// --- Main Components ---

function App() {
  const [likedItems, setLikedItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleLike = (item: any) => {
    if (likedItems.find(i => i.id === item.id && i.type === item.type)) {
      setLikedItems(likedItems.filter(i => !(i.id === item.id && i.type === item.type)));
    } else {
      setLikedItems([...likedItems, item]);
      if (!isSidebarOpen) setIsSidebarOpen(true);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 100 } 
    }
  };

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 font-sans relative overflow-x-hidden">
      <StarsBackground />
      
      {/* Sidebar Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-8 right-8 z-40 p-4 bg-lj-gold/10 border border-lj-gold/30 rounded-2xl hover:bg-lj-gold/20 transition-all group"
      >
        <div className="relative">
          <Clock className="text-lj-gold" size={24} />
          {likedItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {likedItems.length}
            </span>
          )}
        </div>
      </button>

      {/* Sidebar - My Night Plan (Overlay) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.aside 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 glass z-50 p-8 flex flex-col border-l border-lj-gold/20"
            >
              <div className="flex items-center justify-between mb-10 border-b border-lj-gold/10 pb-6">
                <div className="flex items-center gap-3">
                  <Clock className="text-lj-gold" size={24} />
                  <h2 className="text-xl font-serif text-lj-gold">خطتي الليلة</h2>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-lj-gold/10 rounded-full text-lj-gold/40 hover:text-lj-gold transition-colors"
                >
                  <Trash2 size={20} className="hidden" /> {/* Placeholder for logic, using X below */}
                  <span className="text-2xl font-light">&times;</span>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                <AnimatePresence mode="popLayout">
                  {likedItems.length === 0 ? (
                    <div className="text-center mt-20">
                      <Sparkles className="mx-auto text-lj-gold/10 mb-4" size={48} />
                      <p className="text-lj-gold/20 italic">لم تضف أي فعاليات بعد..</p>
                    </div>
                  ) : (
                    likedItems.map((item) => (
                      <motion.div
                        key={`${item.type}-${item.id}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="p-4 bg-white/5 border border-lj-gold/10 rounded-xl flex items-center justify-between group"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-lj-gold">{item.title || item.name}</span>
                          <span className="text-[10px] opacity-40 uppercase tracking-tighter">
                            {item.time || `المنطقة ${item.zone}`}
                          </span>
                        </div>
                        <button onClick={() => toggleLike(item)} className="text-lj-gold/20 hover:text-red-400 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-auto pt-6 border-t border-lj-gold/10">
                <button className="w-full py-4 bg-lj-gold/10 border border-lj-gold/30 text-lj-gold text-xs font-bold rounded-xl hover:bg-lj-gold/20 transition-all tracking-widest uppercase">
                  مشاركة الجدول
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative">
        <header className="flex flex-col items-center py-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 divine-glow rounded-full -z-10" />
          <div className="flex gap-4 mb-4">
            <Star size={16} fill="#c5a059" className="text-lj-gold animate-pulse" />
            <Star size={24} fill="#c5a059" className="text-lj-gold animate-pulse" />
            <Star size={16} fill="#c5a059" className="text-lj-gold animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-8xl font-serif tracking-widest text-lj-gold mb-4 text-center">
            LAYALI JEDDAH
          </h1>
          <p className="text-xl opacity-60 font-light tracking-wide">ليالي جدة .. سحر رمضان في البلد</p>
        </header>

        <main className="max-w-7xl mx-auto px-4">
          <div className="border-y border-lj-gold/20 py-4 flex justify-around items-center mb-8">
            {prayerTimes.map((prayer, idx) => (
              <div key={prayer.name} className="flex items-center gap-8">
                <div className="flex flex-col items-center">
                  <span className="text-xs opacity-50 uppercase">صلاة {prayer.name}</span>
                  <span className="text-2xl font-bold">{prayer.time}</span>
                </div>
                {idx === 0 && <div className="h-8 w-px bg-lj-gold/20 mx-4" />}
              </div>
            ))}
          </div>

          <SmartSuggestionBar />

          <motion.section 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mb-24"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="h-10 w-1 bg-lj-gold" />
              <h2 className="text-2xl font-serif text-lj-gold/80">الفعاليات الرئيسية</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {events.map(event => {
                const isLiked = likedItems.find(i => i.id === event.id && i.type === 'event');
                return (
                  <motion.div
                    key={event.id}
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    className="bg-black/40 border border-lj-gold/10 p-10 rounded-3xl flex flex-col items-center text-center backdrop-blur-md relative group overflow-hidden"
                  >
                    <button 
                      onClick={() => toggleLike({...event, type: 'event'})}
                      className={`absolute top-6 left-6 p-2 rounded-full transition-all ${isLiked ? 'text-red-500 bg-red-500/10' : 'text-lj-gold/30 hover:text-lj-gold'}`}
                    >
                      <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                    </button>
                    <div className="p-6 bg-lj-gold/5 rounded-2xl mb-8 group-hover:scale-110 transition-transform">
                      <event.icon size={48} className="text-lj-gold" />
                    </div>
                    <h3 className="text-3xl font-bold mb-3">{event.title}</h3>
                    <p className="text-lj-gold/60 text-base mb-6 leading-relaxed">{event.description}</p>
                    <div className="flex items-center gap-2 text-lj-gold bg-lj-gold/10 px-4 py-2 rounded-full text-sm font-mono">
                      <Clock size={14} />
                      {event.time}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          <motion.section 
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="h-10 w-1 bg-lj-gold" />
              <h2 className="text-2xl font-serif text-lj-gold/80">أكشاك الطعام والضيافة</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {foodBooths.map(booth => {
                const isLiked = likedItems.find(i => i.id === booth.id && i.type === 'food');
                return (
                  <motion.div
                    key={booth.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="bg-black/20 border border-lj-gold/5 rounded-2xl overflow-hidden backdrop-blur-md relative group"
                  >
                    <div className={`h-1 w-full ${booth.color}`} />
                    <button 
                      onClick={() => toggleLike({...booth, type: 'food'})}
                      className={`absolute top-4 left-4 p-2 rounded-full transition-all ${isLiked ? 'text-red-500 bg-red-500/10' : 'text-lj-gold/10 hover:text-lj-gold group-hover:text-lj-gold/40'}`}
                    >
                      <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                    </button>
                    <div className="p-8 flex flex-col items-center">
                      <span className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">{booth.emoji}</span>
                      <h4 className="text-xl font-bold mb-2">{booth.name}</h4>
                      <div className="flex items-center gap-2 bg-lj-gold/5 px-3 py-1 rounded-full border border-lj-gold/10">
                        <MapPin size={10} className="text-lj-gold" />
                        <span className="text-xs text-lj-gold font-bold">منطقة {booth.zone}</span>
                      </div>
                      <CrowdIndicator zone={booth.zone} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </main>

        <footer className="mt-32 text-center pb-10">
          <p className="text-lj-gold/20 text-sm tracking-widest mb-4 uppercase">رمضان في جدة غير .. ٢٠٢٦ م</p>
          <div className="flex justify-center gap-6 opacity-20">
            <div className="h-px w-20 bg-lj-gold self-center" />
            <Star size={12} fill="currentColor" />
            <div className="h-px w-20 bg-lj-gold self-center" />
          </div>
        </footer>
      </div>

      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-10 bg-lj-gold text-lj-bg p-5 rounded-full shadow-2xl z-50 flex items-center gap-3 group"
      >
        <Gift className="group-hover:rotate-12 transition-transform" />
        <span className="hidden md:inline font-bold text-sm tracking-widest">سحب السحور</span>
      </motion.button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
