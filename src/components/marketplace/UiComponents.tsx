// src/components/marketplace/UiComponents.tsx

"use client"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight, Loader2, ShieldCheck, Clock, MessageSquare, Aperture, X, FileText, Send } from 'lucide-react';

// --- MOCK DATA ---
const MockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Aperture {...props} />
);

const categories = [
  { name: 'Electronics', icon: MockIcon, sub: ['Laptops', 'Smartphones', 'Cameras'] },
  { name: 'Apparel', icon: MockIcon, sub: ['T-Shirts', 'Jeans', 'Jackets'] },
  { name: 'Home Goods', icon: MockIcon, sub: ['Furniture', 'Lighting', 'Decor'] },
  { name: 'Industrial', icon: MockIcon, sub: ['Machinery', 'Safety Gear', 'Tools'] },
  { name: 'Beauty & Health', icon: MockIcon, sub: ['Skincare', 'Makeup', 'Supplements'] },
];

type Product = {
  image: string;
  name: string;
  price: string;
  seller: string;
  certified: boolean;
};

const mockProduct: Product = {
    image: 'https://placehold.co/400x400/e2e8f0/64748b?text=Product',
    name: 'High-Quality Industrial Widget',
    price: '$199.99',
    seller: 'Global Exports LLC',
    certified: true,
};

export const jaipurTextiles = {
    name: "Jaipur Textiles & Co.",
    logo: MockIcon,
    verified: true,
    years: 8,
    staff: "50-100",
    revenue: "$2.5M - $5M",
    rating: "4.9/5",
    reviews: "200",
    capabilities: {
      onTimeDelivery: "98.2%",
      responseTime: "< 2h",
    },
    factoryImage: "https://placehold.co/600x800/e0f2fe/0ea5e9?text=Factory",
    products: [
        { name: "Hand-Blocked Silk", price: "$22/meter", image: "https://placehold.co/400x400/fecaca/b91c1c?text=Silk" },
        { name: "Organic Cotton", price: "$15/meter", image: "https://placehold.co/400x400/d1fae5/059669?text=Cotton" },
    ],
};
// --- END MOCK DATA ---


// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { stiffness: 100, damping: 12 },
  },
};

// --- ALL COMPONENTS ---

export const CategorySidebar = () => (
  <motion.div variants={itemVariants}>
    <Card className="bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg p-4 mr-[-20px]">
      <h3 className="font-bold text-lg text-slate-800 mb-4 px-2">Categories</h3>
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-1 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100/50 scrollbar-thumb-rounded-full"
      >
        {categories.map((category) => (
          <motion.div key={category.name} variants={itemVariants} className="relative group">
            <a href="#" className="flex items-center w-full text-left p-2 pr-1 rounded-lg text-slate-600 hover:bg-sky-100/70 hover:text-sky-700 transition-colors">
              <category.icon className="h-5 w-5 mr-3 flex-shrink-0" />
              <span className="flex-grow font-medium text-sm">{category.name}</span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </a>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, x: -10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute left-full top-0 w-64 ml-2 pl-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 z-10"
              >
                <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-xl shadow-xl p-4">
                  <h4 className="font-bold text-slate-800 mb-3">{category.name}</h4>
                  <div className="space-y-2">
                    {category.sub.map((subItem) => (
                      <a href="#" key={subItem} className="block text-sm text-slate-600 hover:text-sky-600 hover:underline">
                        {subItem}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.nav>
    </Card>
  </motion.div>
);

export const PromoCard = ({ title, subtitle, buttonText, image }: { title: string, subtitle: string, buttonText: string, image: string }) => (
  <motion.div variants={itemVariants}>
    <Card className="bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden group mr-[-20px] p-3">
      <div className="relative">
        <motion.img whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} src={image} className="w-full rounded-xl h-40 object-cover" alt="Promotion" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-white font-bold text-xl">{title}</h3>
          <p className="text-slate-200 text-sm">{subtitle}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold">{buttonText}</Button>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
);

export const ProductCard = ({ product }: { product: Product }) => (
  <motion.div variants={itemVariants} className="group h-full flex flex-col">
    <Card className="h-full flex flex-col bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <div className="overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-400 ease-in-out" />
      </div>
      <CardContent className="p-4 space-y-2 flex flex-col flex-grow">
        <h3 className="font-semibold text-slate-800 h-12">{product.name}</h3>
        <p className="text-lg font-bold text-sky-600">{product.price}</p>
        <div className="text-sm text-slate-500">
          Sold by <span className="text-slate-700 font-medium">{product.seller}</span>{" "}
          {product.certified && <Check className="inline-block h-4 w-4 ml-1 text-green-500" />}
        </div>
        <motion.div className="mt-auto" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full mt-auto bg-slate-800 text-white hover:bg-slate-900">Contact Supplier</Button>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
);

export const SimpleProductCard = ({ item }: { item: Product }) => (
  <Card className="bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
    <a href="#" className="block">
      <CardHeader className="p-0">
        <img src={item.image} alt={item.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-xs text-slate-500">Frequently searched</p>
        <h4 className="font-bold text-slate-800 truncate">{item.name}</h4>
      </CardContent>
    </a>
  </Card>
);

const ShimmerStyle = () => (
    <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes spin-pulse { 0% { transform: scale(0.95) rotate(0deg); opacity: 0.7; } 50% { transform: scale(1.05) rotate(180deg); opacity: 1; } 100% { transform: scale(0.95) rotate(360deg); opacity: 0.7; } }
        .shimmer-effect { position: relative; overflow: hidden; background-color: #e2e8f0; }
        .shimmer-effect::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 80%); animation: shimmer 1.5s infinite; }
        .typing-cursor { display: inline-block; width: 3px; height: 1.1em; background-color: #0ea5e9; margin-left: 4px; animation: blink 1s step-end infinite; vertical-align: bottom; }
        .gemini-svg { animation: spin-pulse 4s infinite linear; }
    `}</style>
);

const AnimatedStatusText = ({ text }: { text: string }) => {
    const [status, setStatus] = useState('shimmering');
    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => { setStatus('shimmering'); const t = setTimeout(() => setStatus('typing'), 600); return () => clearTimeout(t); }, [text]);
    useEffect(() => { if (status === 'typing') { setDisplayedText(''); let i = 0; const t = setInterval(() => { if (i < text.length) { setDisplayedText(p => p + text.charAt(i)); i++; } else { clearInterval(t); } }, 30); return () => clearInterval(t); } }, [status, text]);
    if (status === 'shimmering') return (<div className="w-64 h-6 rounded shimmer-effect"></div>);
    return (<span className="text-slate-900 font-semibold">{displayedText}<span className="typing-cursor"></span></span>);
};

const ProductCardSkeleton = () => (
    <div className="bg-white/80 border border-slate-200/80 rounded-xl overflow-hidden h-full flex flex-col">
        <div className="w-full h-32 md:h-40 shimmer-effect"></div>
        <div className="p-4 space-y-3 flex-grow">
            <div className="w-3/4 h-5 rounded shimmer-effect"></div>
            <div className="w-full h-4 rounded shimmer-effect"></div>
            <div className="w-1/2 h-4 rounded shimmer-effect"></div>
        </div>
    </div>
);

export const SearchProgress = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const searchSteps = [
    { text: "Analyzing your query...", skeletons: 0 }, { text: "Contacting sourcing AI...", skeletons: 2 }, { text: "Scanning global suppliers...", skeletons: 3 }, { text: "Generating product matches...", skeletons: 4 }, { text: "Fetching supplier details...", skeletons: 6 }, { text: "Compiling results...", skeletons: 7 }, { text: "Finalizing search results...", skeletons: 8 }, { text: "Search complete! Displaying results...", skeletons: 8 },
  ];
  useEffect(() => { const i = setInterval(() => setStepIndex(p => p >= searchSteps.length - 1 ? (clearInterval(i), p) : p + 1), 2200); return () => clearInterval(i); }, []);
  const currentStep = searchSteps[stepIndex];
  const allSkeletons = Array.from({ length: 8 });
  return (
    <>
      <ShimmerStyle />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="p-6 bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg text-left w-full">
        <div className="flex items-center gap-3 mb-4 h-7">
          <svg className="gemini-svg h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#gemini-gradient)"/>
            <defs><linearGradient id="gemini-gradient" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse"><stop stopColor="#4f46e5"/><stop offset="1" stopColor="#0ea5e9"/></linearGradient></defs>
          </svg>
          <AnimatedStatusText text={currentStep.text} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 min-h-[320px]">
          <AnimatePresence>
            {allSkeletons.slice(0, currentStep.skeletons).map((_, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease: "easeOut" }}><ProductCardSkeleton /></motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export const ManufacturerCard = ({ manufacturer, onChatNowClick, onCardClick }: { manufacturer: any, onChatNowClick: (m: any) => void, onCardClick: (m: any) => void }) => (
    <motion.div
      variants={itemVariants}
      onClick={() => onCardClick(manufacturer)}
      className="cursor-pointer"
    >
        <Card className="bg-white/60 border-slate-200/60 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 space-y-4 flex flex-col">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-lg shadow-inner"><manufacturer.logo className="h-8 w-8 text-slate-700" /></div>
                            <div>
                                <h3 className="font-bold text-xl text-slate-900">{manufacturer.name}</h3>
                                <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                                    {manufacturer.verified && <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-sky-500" /> Verified</span>}
                                    <span>{manufacturer.years} yrs</span><span>{manufacturer.staff} staff</span><span>{manufacturer.revenue}</span>
                                </div>
                            </div>
                        </div>
                        <div><a href="#" className="text-sm font-medium text-sky-600 hover:underline">{manufacturer.rating} ★ ({manufacturer.reviews}+ reviews)</a></div>
                        <div>
                            <h4 className="font-semibold text-slate-600 mb-2">Factory Capabilities</h4>
                            <ul className="space-y-1 text-sm text-slate-500">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> On-time delivery: <span className="font-bold text-slate-700">{manufacturer.capabilities.onTimeDelivery}</span></li>
                                <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-green-500" /> Response time: <span className="font-bold text-slate-700">{manufacturer.capabilities.responseTime}</span></li>
                            </ul>
                        </div>
                        <div className="flex items-center gap-2 pt-2 mt-auto">
                            <Button
                              variant="outline"
                              className="w-full text-slate-600 bg-white/50 hover:bg-slate-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                onChatNowClick(manufacturer);
                              }}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />Chat now
                            </Button>
                            <Button className="w-full">Contact us</Button>
                        </div>
                    </div>
                    <div className="w-full md:w-2/3 grid grid-cols-2 grid-rows-2 gap-4">
                        <div className="col-span-1 row-span-2 relative rounded-lg overflow-hidden group aspect-video"><motion.img whileHover={{ scale: 1.05 }} src={manufacturer.factoryImage} alt="Factory" className="w-full h-full object-cover transition-transform duration-300" /><div className="absolute inset-0 bg-black/20"></div></div>
                        {manufacturer.products.map((product: any) => (<a href="#" key={product.name} className="relative rounded-lg overflow-hidden group aspect-video"><img src={product.image} alt={product.name} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2"><p className="text-white text-xs font-bold">{product.name} <br /> {product.price}</p></div></a>))}
                    </div>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

type Message = { id: number; sender: 'user' | 'supplier'; type: 'text' | 'attachments'; content: string; attachments?: { name: string; type: string }[]; };
const smartQuestions = [ "What is your Minimum Order Quantity (MOQ)?", "Can you provide a quote for 500 meters of silk fabric?", "Do you offer product samples?", "What are your customization options?", ];

export const ChatPanel = ({ isOpen, onClose, manufacturer }: { isOpen: boolean, onClose: () => void, manufacturer: any | null }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    useEffect(() => { if (manufacturer) { setMessages([{ id: 1, sender: 'supplier', type: 'text', content: `Hello! I'm the digital assistant for ${manufacturer.name}. I can help with quotes, samples, and capabilities. How can I assist you today?` }]); } }, [manufacturer]);
    const handleSmartQuestionClick = (question: string) => {
        const userMessage: Message = { id: Date.now(), sender: 'user', type: 'text', content: question };
        setMessages(prev => [...prev, userMessage]);
        setTimeout(() => {
            let response: Message;
            if (question.includes("MOQ")) {
                 response = { id: Date.now() + 1, sender: 'supplier', type: 'attachments', content: "Our MOQ for Hand-Blocked Silk is 50 meters, and for Organic Cotton, it's 100 meters. Here are the detailed spec sheets for your reference:", attachments: [{ name: "silk_specs.pdf", type: "pdf" }, { name: "cotton_specs.pdf", type: "pdf" }] };
            } else {
                 response = { id: Date.now() + 1, sender: 'supplier', type: 'text', content: "I can certainly help with that. Could you please provide a few more details about your specific requirements?" };
            }
            setMessages(prev => [...prev, response]);
        }, 1200);
    };
    if (!manufacturer) return null;
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
                    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
                        <div className="flex-shrink-0 p-4 border-b border-slate-200 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <manufacturer.logo className="h-8 w-8 text-slate-700" />
                                <div><h3 className="font-bold text-slate-800">{manufacturer.name} <span className="text-green-500">✅</span></h3><p className="text-xs text-slate-500">Typically replies within 15 minutes</p></div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full"><X className="h-5 w-5 text-slate-500" /></Button>
                        </div>
                        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${msg.sender === 'user' ? 'bg-sky-500 text-white rounded-br-lg' : 'bg-slate-100 text-slate-700 rounded-bl-lg'}`}>
                                        <p className="text-sm">{msg.content}</p>
                                        {msg.type === 'attachments' && msg.attachments && (<div className="mt-2 space-y-2">{msg.attachments.map(att => (<div key={att.name} className="flex items-center gap-2 p-2 bg-slate-200/70 rounded-md"><FileText className="h-5 w-5 text-slate-600 flex-shrink-0" /><span className="text-sm font-medium text-slate-800 truncate">{att.name}</span></div>))}</div>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex-shrink-0 p-4 border-t border-slate-200 bg-white">
                            <div className="grid grid-cols-2 gap-2 mb-3">{smartQuestions.map(q => (<Button key={q} variant="outline" size="sm" className="h-auto whitespace-normal text-left justify-start text-sky-700 border-sky-200 bg-sky-50/50 hover:bg-sky-100" onClick={() => handleSmartQuestionClick(q)}>{q}</Button>))}</div>
                            <div className="relative"><input type="text" placeholder="Type a message..." className="w-full pr-12 pl-4 py-2 border border-slate-300 rounded-full focus:ring-2 focus:ring-sky-400 focus:outline-none" /><Button size="icon" className="absolute right-1 top-1 h-8 w-8 rounded-full"><Send className="h-4 w-4" /></Button></div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};