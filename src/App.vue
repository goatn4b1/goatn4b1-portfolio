<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import emailjs from '@emailjs/browser';
import vi from './locales/vi.json';
import en from './locales/en.json';

const currentLocale = ref('vi');
const locales = { vi, en };
const translations = computed(() => locales[currentLocale.value]);
const $t = (key) => translations.value[key] || key;

// System Version
const version = "V.2.3.0";
const terminalText = ref('');
const fullText = `> BOOTING GOATN4B1_OS... VERSION_${version}_STABLE... NATIVE_SCROLL_ENABLED... [OK]`;
let index = 0;

// Update document title
watch([currentLocale, translations], () => {
    document.title = `Goatn4b1 // ${$t('hero_role')}`;
}, { immediate: true });

// Mail Logic
const contactForm = ref({ email: '', subject: '', message: '' });
const sendStatus = ref('idle');

const sendSignal = async () => {
    if (!contactForm.value.email || !contactForm.value.message) return;
    sendStatus.value = 'sending';
    try {
        const params = {
            from_name: contactForm.value.email,
            title: contactForm.value.subject || "No Subject",
            message: contactForm.value.message,
            to_name: "Goatn4b1"
        };
        await emailjs.send('service_md996e3', 'template_rx8bu1p', params, '0eBTftaF-Kf86IRKj');
        sendStatus.value = 'success';
        contactForm.value = { email: '', subject: '', message: '' };
        setTimeout(() => { sendStatus.value = 'idle'; }, 5000);
    } catch (error) {
        sendStatus.value = 'error';
        setTimeout(() => { sendStatus.value = 'idle'; }, 5000);
    }
};

const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
        const offset = 64; // Header height
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

onMounted(() => {
    const type = () => {
        if (index < fullText.length) {
            terminalText.value += fullText.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    };
    type();
});

// Content Data
const categories = ['All', 'E-commerce & Landing', 'System & Management', 'Automation & Tools'];
const activeCategory = ref('All');
const projects = [
    { id: 1, title: 'ShopPage Premium', category: 'E-commerce & Landing', tech: 'React, Tailwind' },
    { id: 2, title: 'Secure Admin Panel', category: 'System & Management', tech: 'Laravel, MySQL' },
    { id: 3, title: 'N4B1 Sentinel Bot', category: 'Automation & Tools', tech: 'Node.js, Discord.js' },
    { id: 4, title: 'Corporate Landing', category: 'E-commerce & Landing', tech: 'VueJS, Vite' },
    { id: 5, title: 'Enterprise CRM', category: 'System & Management', tech: 'NestJS, PostgreSQL' },
    { id: 6, title: 'Auto-Task Script', category: 'Automation & Tools', tech: 'Python, Docker' },
];
const filteredProjects = computed(() => {
    if (activeCategory.value === 'All' || activeCategory.value === 'Tất cả') return projects;
    return projects.filter(p => p.category === activeCategory.value);
});
const techStack = {
    Frontend: ['HTML/CSS', 'BS4 / Tailwind', 'ReactJS', 'VueJS', 'Blade Engine'],
    Backend: ['PHP/Laravel', 'Node.js', 'NestJS'],
    Database: ['MySQL', 'PostgreSQL', 'Redis', 'MongoDB'],
    Tools: ['Git', 'Docker', 'Nginx']
};
const services = computed(() => [
    { title: 'Landing Page Optimization', desc: currentLocale.value === 'vi' ? 'Xây dựng Landing Page tối ưu chuyển đổi, tốc độ tải trang cực nhanh.' : 'Building high-conversion Landing Pages with ultra-fast loading speeds.' },
    { title: 'Secure Management Systems', desc: currentLocale.value === 'vi' ? 'Thiết kế hệ thống Admin Panel bảo mật cao và hiệu năng ổn định.' : 'Designing high-security Admin Panels with stable performance.' },
    { title: 'API & Microservices', desc: currentLocale.value === 'vi' ? 'Phát triển hệ thống backend theo kiến trúc Clean Architecture.' : 'Developing backends with Clean Architecture.' },
    { title: 'System Architecture Design', desc: currentLocale.value === 'vi' ? 'Thiết kế cấu trúc dự án bền vững, tối ưu hóa khả năng mở rộng.' : 'Designing sustainable project structures.' }
]);
</script>

<template>
    <div class="min-h-screen bg-black text-hacker font-mono selection:bg-hacker selection:text-black">
        
        <!-- HEADER -->
        <nav class="fixed top-0 left-0 w-full z-[100] border-b border-hacker/20 bg-black/80 backdrop-blur-md">
            <div class="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                <div class="text-hacker font-bold tracking-tighter animate-pulse text-sm md:text-base cursor-pointer flex items-center" @click="scrollToSection('home')">
                    <span class="w-2 h-2 bg-hacker rounded-full mr-2 shadow-[0_0_8px_#00FF41]"></span>
                    GOATN4B1_OS <span class="ml-2 text-[8px] bg-hacker text-black px-1">{{ version }}</span>
                </div>
                
                <div class="flex items-center space-x-4 lg:space-x-8">
                    <div class="hidden lg:flex space-x-6 text-[10px] font-bold tracking-widest uppercase">
                        <button @click="scrollToSection('home')" class="hover:text-white transition-colors">00_{{ $t('nav_home') }}</button>
                        <button @click="scrollToSection('stack')" class="hover:text-white transition-colors">01_{{ $t('nav_stack') }}</button>
                        <button @click="scrollToSection('projects')" class="hover:text-white transition-colors">02_{{ $t('nav_projects') }}</button>
                        <button @click="scrollToSection('services')" class="hover:text-white transition-colors">03_{{ $t('nav_services') }}</button>
                        <button @click="scrollToSection('contact')" class="hover:text-white transition-colors">04_{{ $t('nav_contact') }}</button>
                    </div>
                    <div class="flex border border-hacker/30 rounded overflow-hidden">
                        <button @click="currentLocale = 'vi'" :class="currentLocale === 'vi' ? 'bg-hacker text-black' : 'text-hacker hover:bg-hacker/10'" class="px-2 py-1 text-[10px] font-bold transition-all border-none">VI</button>
                        <button @click="currentLocale = 'en'" :class="currentLocale === 'en' ? 'bg-hacker text-black' : 'text-hacker hover:bg-hacker/10'" class="px-2 py-1 text-[10px] font-bold transition-all border-l border-hacker/30 border-t-0 border-b-0 border-r-0">EN</button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- BACKGROUND EFFECTS -->
        <div class="pointer-events-none fixed inset-0 z-50 overflow-hidden"><div class="h-1 w-full bg-hacker/5 absolute animate-scanline"></div></div>
        <div class="fixed inset-0 pointer-events-none bg-[radial-gradient(rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:20px_20px] z-0 opacity-20"></div>

        <!-- CONTENT -->
        <main class="relative z-10">
            
            <!-- 1. HERO -->
            <section id="home" class="min-h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto relative pt-16">
                <div class="mb-4 text-hacker-dim opacity-70 text-xs md:text-sm">{{ terminalText }}<span class="animate-pulse">_</span></div>
                <h1 class="font-black mb-4 uppercase leading-none tracking-tighter">
                    <span class="glitch-title block text-5xl md:text-8xl text-white" :data-text="'Goatn4b1'">Goatn4b1</span>
                    <span class="block text-xl md:text-3xl text-hacker/60 mt-2">{{ $t('hero_role') }}</span>
                </h1>
                <p class="text-lg md:text-2xl text-hacker-dim max-w-3xl mb-10 border-l-4 border-hacker pl-6 italic leading-relaxed" v-html="$t('hero_slogan')"></p>
                <button @click="scrollToSection('contact')" class="w-fit bg-hacker text-black px-8 py-3 font-black hover:bg-white transition-all tracking-widest text-sm shadow-[0_0_15px_#00FF4155]">{{ $t('cta_contact') }} >>></button>
            </section>

            <!-- 2. STACK -->
            <section id="stack" class="min-h-screen flex flex-col justify-center items-center px-6 py-20 lg:px-10 max-w-7xl mx-auto">
                <h2 class="text-2xl md:text-3xl font-bold mb-12 flex items-center w-full">
                    <span class="bg-hacker text-black px-2 mr-4">01</span> {{ $t('section_stack') }}
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div v-for="(techs, group) in techStack" :key="group" class="border border-hacker/20 p-6 md:p-8 bg-black/40 hover:border-hacker/50 transition-all">
                        <h3 class="text-white font-bold mb-6 flex justify-between items-center text-sm md:text-base border-b border-hacker/10 pb-2">_{{ group.toUpperCase() }}</h3>
                        <ul class="grid grid-cols-2 gap-3">
                            <li v-for="t in techs" :key="t" class="flex items-center text-xs md:text-sm group-hover:text-white transition-colors">
                                <span class="w-1.5 h-1.5 bg-hacker mr-3"></span> {{ t }}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- 3. PROJECTS -->
            <section id="projects" class="min-h-screen flex flex-col justify-center items-center px-6 py-20 lg:px-10 max-w-7xl mx-auto">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4 w-full">
                    <h2 class="text-2xl md:text-3xl font-bold flex items-center">
                        <span class="bg-hacker text-black px-2 mr-4">02</span> {{ $t('section_projects') }}
                    </h2>
                    <div class="flex flex-wrap gap-2">
                        <button v-for="cat in (currentLocale === 'vi' ? ['Tất cả', ...categories.slice(1)] : categories)" :key="cat" 
                                @click="activeCategory = cat"
                                :class="activeCategory === cat || (activeCategory === 'All' && cat === 'Tất cả') || (activeCategory === 'Tất cả' && cat === 'All') ? 'bg-hacker text-black' : 'border border-hacker/30 text-hacker/60'"
                                class="px-3 py-1 text-[10px] font-bold uppercase transition-all">
                            {{ cat }}
                        </button>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    <div v-for="p in filteredProjects.slice(0, 6)" :key="p.id" class="group relative bg-black/40 border border-hacker/20 overflow-hidden">
                        <div class="aspect-video bg-black/60 flex items-center justify-center relative overflow-hidden">
                            <span class="text-hacker/10 text-2xl font-black italic">PRJ_{{ p.id }}</span>
                            <div class="absolute inset-0 bg-hacker/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <span class="bg-white text-black p-2 rounded-full cursor-pointer hover:bg-hacker transition-colors">🔗</span>
                                <span class="bg-black text-white p-2 border border-hacker rounded-full cursor-pointer hover:bg-hacker transition-colors">📂</span>
                            </div>
                        </div>
                        <div class="p-6">
                            <div class="text-[9px] text-hacker-dim uppercase tracking-widest mb-1">{{ p.category }}</div>
                            <h3 class="text-base font-bold text-white group-hover:text-hacker transition-colors">{{ p.title }}</h3>
                            <p class="text-[10px] text-hacker/60 italic mt-1">{{ p.tech }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 4. SERVICES -->
            <section id="services" class="min-h-screen flex flex-col justify-center items-center px-6 py-20 lg:px-10 max-w-7xl mx-auto">
                <h2 class="text-2xl md:text-3xl font-bold mb-12 flex items-center w-full">
                    <span class="bg-hacker text-black px-2 mr-4">03</span> {{ $t('section_services') }}
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div v-for="s in services" :key="s.title" class="p-6 md:p-8 border-l-2 border-hacker/30 bg-black/40 hover:bg-hacker/5 transition-all">
                        <h3 class="text-lg md:text-xl font-bold text-white mb-3">_ {{ s.title }}</h3>
                        <p class="text-hacker-dim text-sm leading-relaxed">{{ s.desc }}</p>
                    </div>
                </div>
            </section>

            <!-- 5. CONTACT -->
            <section id="contact" class="min-h-screen flex flex-col justify-center items-center px-6 py-20 lg:px-10 max-w-7xl mx-auto">
                <h2 class="text-2xl md:text-3xl font-bold mb-12 flex items-center w-full">
                    <span class="bg-hacker text-black px-2 mr-4">04</span> {{ $t('section_contact') }}
                </h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
                    <form @submit.prevent="sendSignal" class="space-y-6">
                        <div class="space-y-4">
                            <input v-model="contactForm.email" required type="email" class="w-full bg-transparent border border-hacker/30 p-3 text-sm text-hacker focus:border-hacker outline-none transition-all" placeholder="Email_Address">
                            <input v-model="contactForm.subject" type="text" class="w-full bg-transparent border border-hacker/30 p-3 text-sm text-hacker focus:border-hacker outline-none transition-all" placeholder="Subject_Line">
                            <textarea v-model="contactForm.message" required rows="4" class="w-full bg-transparent border border-hacker/30 p-3 text-sm text-hacker focus:border-hacker outline-none transition-all" placeholder="Message_Payload"></textarea>
                        </div>
                        <div v-if="sendStatus !== 'idle'" class="p-3 border border-hacker/30 text-[10px] italic bg-black/40">
                            <span v-if="sendStatus === 'sending'">> SENDING_PACKETS...</span>
                            <span v-if="sendStatus === 'success'">> SIGNAL_DELIVERED... [SUCCESS]</span>
                            <span v-if="sendStatus === 'error'">> CONNECTION_TIMEOUT... [ERROR]</span>
                        </div>
                        <button :disabled="sendStatus === 'sending'" class="w-full bg-hacker text-black font-black py-4 hover:bg-white text-sm tracking-widest uppercase transition-all disabled:opacity-50">
                            {{ sendStatus === 'sending' ? 'Sending...' : $t('send_signal') }}
                        </button>
                    </form>
                    <div class="flex flex-col justify-between py-2">
                        <div class="space-y-8">
                            <div>
                                <h4 class="text-white font-bold mb-4 uppercase text-sm tracking-widest">Direct_Access</h4>
                                <div class="space-y-3 text-sm text-hacker-dim">
                                    <p>GITHUB: <a href="https://github.com/goatn4b1" target="_blank" class="text-hacker hover:underline">github.com/goatn4b1</a></p>
                                    <p>EMAIL: <a href="mailto:goatn4b1@gmail.com" class="text-hacker hover:underline">goatn4b1@gmail.com</a></p>
                                    <p>DISCORD: <span class="text-hacker">@goatn4b1</span></p>
                                </div>
                            </div>
                            <div class="p-6 border border-dashed border-hacker/30 text-[10px] text-hacker-dim italic">
                                &copy; 2026 GOATN4B1 // GOATN4B1_OS V.2.3.0
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<style>
/* Global */
* { box-sizing: border-box; }
html { scroll-behavior: smooth; background-color: black; }
body { background-color: black; margin: 0; color: #00FF41; overflow-x: hidden; cursor: crosshair; }

/* Glitch */
.glitch-title { position: relative; animation: glitch 3s infinite; }
.glitch-title::before, .glitch-title::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.3; }
.glitch-title::before { animation: glitch 4s infinite; color: #ff00c1; z-index: -1; clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%); }
.glitch-title::after { animation: glitch 2.5s infinite; color: #00fff9; z-index: -2; clip-path: polygon(0 75%, 100% 25%, 100% 100%, 0 100%); }

@keyframes glitch {
    0%, 14%, 100% { text-shadow: 0.05em 0 0 rgba(255,0,0,0.5), -0.05em -0.025em 0 rgba(0,255,0,0.5), -0.025em 0.05em 0 rgba(0,0,255,0.5); }
    15% { text-shadow: -0.05em -0.025em 0 rgba(255,0,0,0.5), 0.025em 0.025em 0 rgba(0,255,0,0.5), -0.05em -0.05em 0 rgba(0,0,255,0.5); }
}

/* Hide scrollbar */
::-webkit-scrollbar { width: 0px; background: transparent; }
</style>