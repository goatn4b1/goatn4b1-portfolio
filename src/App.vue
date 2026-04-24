<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from 'vue';
import emailjs from '@emailjs/browser';
import vi from './locales/vi.json';
import en from './locales/en.json';

const currentLocale = ref('vi');
const locales = { vi, en };
const translations = computed(() => locales[currentLocale.value]);
const $t = (key) => translations.value[key] || key;

const version = "3.6";
const terminalText = ref('');
const fullText = `> BOOTING GOATN4B1_OS... VERSION_${version}... [OK]`;
let index = 0;

const currentSlide = ref(0);
const totalSlides = 5;
const isScrolling = ref(false);
const isMobile = ref(false);

const checkMobile = () => {
    isMobile.value = window.innerWidth < 1024;
};

watch([currentLocale, translations], () => {
    document.title = `Goatn4b1 // ${$t('hero_role')}`;
}, { immediate: true });

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

const goToSlide = (i) => {
    if (isMobile.value) {
        const ids = ['home', 'stack', 'projects', 'services', 'contact'];
        const el = document.getElementById(ids[i]);
        if (el) {
            const offset = 80;
            const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    } else {
        if (i >= 0 && i < totalSlides) currentSlide.value = i;
    }
};

const handleScroll = (event) => {
    if (isMobile.value || isScrolling.value) return;
    if (event.deltaY > 0) {
        if (currentSlide.value < totalSlides - 1) {
            currentSlide.value++;
            triggerScrollLock();
        }
    } else {
        if (currentSlide.value > 0) {
            currentSlide.value--;
            triggerScrollLock();
        }
    }
};

const triggerScrollLock = () => {
    isScrolling.value = true;
    setTimeout(() => { isScrolling.value = false; }, 1000);
};

onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('wheel', handleScroll, { passive: false });
    const type = () => {
        if (index < fullText.length) {
            terminalText.value += fullText.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    };
    type();
});

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
    window.removeEventListener('wheel', handleScroll);
});

const techStack = {
    Frontend: ['HTML/CSS', 'BS4 / Tailwind', 'ReactJS', 'VueJS', 'Blade Engine'],
    Backend: ['PHP/Laravel', 'Node.js', 'NestJS'],
    Database: ['MySQL', 'PostgreSQL', 'Redis', 'MongoDB'],
    Tools: ['Git', 'Docker', 'Nginx']
};

const projects = [
    { id: 1, title: 'ShopPage Premium', category: 'E-commerce & Landing', tech: 'React, Tailwind' },
    { id: 2, title: 'Secure Admin Panel', category: 'System & Management', tech: 'Laravel, MySQL' },
    { id: 3, title: 'N4B1 Sentinel Bot', category: 'Automation & Tools', tech: 'Node.js, Discord.js' },
    { id: 4, title: 'Corporate Landing', category: 'E-commerce & Landing', tech: 'VueJS, Vite' },
    { id: 5, title: 'Enterprise CRM', category: 'System & Management', tech: 'NestJS, PostgreSQL' },
    { id: 6, title: 'Auto-Task Script', category: 'Automation & Tools', tech: 'Python, Docker' },
];

const services = computed(() => [
    { title: 'Landing Page Optimization', desc: currentLocale.value === 'vi' ? 'Xây dựng Landing Page tối ưu chuyển đổi, tốc độ tải trang cực nhanh.' : 'Building high-conversion Landing Pages.' },
    { title: 'Secure Management Systems', desc: currentLocale.value === 'vi' ? 'Thiết kế hệ thống Admin Panel bảo mật cao.' : 'Designing high-security Admin Panels.' },
    { title: 'API & Microservices', desc: currentLocale.value === 'vi' ? 'Phát triển hệ thống backend theo kiến trúc Clean Architecture.' : 'Developing backends with Clean Architecture.' },
    { title: 'System Architecture Design', desc: currentLocale.value === 'vi' ? 'Thiết kế cấu trúc dự án bền vững.' : 'Designing sustainable project structures.' }
]);
</script>

<template>
    <div id="app-root" class="bg-black text-hacker font-mono selection:bg-hacker selection:text-black">
        
        <!-- HEADER -->
        <nav class="fixed top-0 left-0 w-full z-[100] border-b border-hacker/20 bg-black/80 backdrop-blur-md">
            <div class="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                <div class="text-hacker font-bold tracking-tighter animate-pulse text-sm md:text-base cursor-pointer flex items-center" @click="goToSlide(0)">
                    <span class="w-2 h-2 bg-hacker rounded-full mr-2 shadow-[0_0_8px_#00FF41]"></span>
                    GOATN4B1_OS <span class="ml-2 text-[8px] bg-hacker text-black px-1">V{{ version }}</span>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="hidden lg:flex space-x-6 text-[10px] font-bold tracking-widest uppercase">
                        <button v-for="(n, i) in ['home', 'stack', 'projects', 'services', 'contact']" :key="n"
                                @click="goToSlide(i)" :class="currentSlide === i ? 'text-white' : 'text-hacker/60 hover:text-white'" class="transition-colors">
                            {{ $t('nav_' + n) }}
                        </button>
                    </div>
                    <div class="flex border border-hacker/30 rounded overflow-hidden">
                        <button @click="currentLocale = 'vi'" :class="currentLocale === 'vi' ? 'bg-hacker text-black' : 'text-hacker hover:bg-hacker/10'" class="px-2 py-1 text-[10px] font-bold border-none transition-all">VI</button>
                        <button @click="currentLocale = 'en'" :class="currentLocale === 'en' ? 'bg-hacker text-black' : 'text-hacker hover:bg-hacker/10'" class="px-2 py-1 text-[10px] font-bold border-l border-hacker/30 transition-all">EN</button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- BG -->
        <div class="pointer-events-none fixed inset-0 z-50"><div class="h-1 w-full bg-hacker/5 absolute animate-scanline"></div></div>
        <div class="fixed inset-0 pointer-events-none bg-[radial-gradient(rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>

        <!-- WRAPPER -->
        <div class="main-slider transition-transform duration-700 ease-in-out" 
             :style="!isMobile ? { transform: `translateY(-${currentSlide * 100}%)` } : { transform: 'none' }">
            
            <!-- SECTIONS -->
            <section v-for="(s, i) in ['home', 'stack', 'projects', 'services', 'contact']" :key="s" :id="s"
                     class="section-block w-full flex flex-col justify-center items-center px-6 lg:px-10 relative">
                
                <div class="max-w-7xl w-full" v-if="s === 'home'">
                    <div class="mb-4 text-hacker-dim opacity-70 text-xs md:text-sm">{{ terminalText }}<span class="animate-pulse">_</span></div>
                    <h1 class="font-black mb-4 uppercase leading-none tracking-tighter">
                        <span class="glitch-title block text-5xl md:text-8xl text-white" data-text="Goatn4b1">Goatn4b1</span>
                        <span class="block text-xl md:text-3xl text-hacker/60 mt-2">{{ $t('hero_role') }}</span>
                    </h1>
                    <p class="text-lg md:text-2xl text-hacker-dim max-w-3xl mb-10 border-l-4 border-hacker pl-6 italic leading-relaxed" v-html="$t('hero_slogan')"></p>
                    <button @click="goToSlide(4)" class="bg-hacker text-black px-8 py-3 font-black hover:bg-white transition-all text-sm shadow-[0_0_15px_#00FF4155]">{{ $t('cta_contact') }} >>></button>
                </div>

                <div class="max-w-7xl w-full" v-if="s === 'stack'">
                    <h2 class="text-2xl md:text-3xl font-bold mb-12 flex items-center"><span class="bg-hacker text-black px-2 mr-4">01</span> {{ $t('section_stack') }}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div v-for="(techs, group) in techStack" :key="group" class="border border-hacker/20 p-6 bg-black/40">
                            <h3 class="text-white font-bold mb-4 text-sm border-b border-hacker/10 pb-2">_{{ group.toUpperCase() }}</h3>
                            <ul class="grid grid-cols-2 gap-3">
                                <li v-for="t in techs" :key="t" class="flex items-center text-xs md:text-sm group-hover:text-white transition-colors">
                                    <span class="w-1.5 h-1.5 bg-hacker mr-3"></span> {{ t }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="max-w-7xl w-full" v-if="s === 'projects'">
                    <h2 class="text-2xl md:text-3xl font-bold mb-8 flex items-center"><span class="bg-hacker text-black px-2 mr-4">02</span> {{ $t('section_projects') }}</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div v-for="p in projects.slice(0, 6)" :key="p.id" class="border border-hacker/20 bg-black/40 overflow-hidden group">
                            <div class="aspect-video bg-black/60 flex items-center justify-center relative">
                                <span class="text-hacker/10 text-xl font-black italic">PRJ_{{ p.id }}</span>
                                <div class="absolute inset-0 bg-hacker/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <span class="bg-white text-black p-2 rounded-full cursor-pointer hover:bg-hacker transition-colors">🔗</span>
                                    <span class="bg-black text-white p-2 border border-hacker rounded-full cursor-pointer hover:bg-hacker transition-colors">📂</span>
                                </div>
                            </div>
                            <div class="p-4">
                                <div class="text-[8px] text-hacker-dim uppercase mb-1">{{ p.category }}</div>
                                <h3 class="text-sm font-bold text-white group-hover:text-hacker transition-colors">{{ p.title }}</h3>
                                <p class="text-[10px] text-hacker/60 italic">{{ p.tech }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="max-w-7xl w-full" v-if="s === 'services'">
                    <h2 class="text-2xl md:text-3xl font-bold mb-8 flex items-center"><span class="bg-hacker text-black px-2 mr-4">03</span> {{ $t('section_services') }}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div v-for="serv in services" :key="serv.title" class="p-6 border-l-2 border-hacker/30 bg-black/40">
                            <h3 class="text-lg md:text-xl font-bold text-white mb-3">_ {{ serv.title }}</h3>
                            <p class="text-hacker-dim text-sm leading-relaxed">{{ serv.desc }}</p>
                        </div>
                    </div>
                </div>

                <div class="max-w-7xl w-full flex flex-col justify-between h-full" v-if="s === 'contact'">
                    <div class="flex-1 flex flex-col justify-center">
                        <h2 class="text-2xl md:text-3xl font-bold mb-8 flex items-center"><span class="bg-hacker text-black px-2 mr-4">04</span> {{ $t('section_contact') }}</h2>
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                            <div class="flex flex-col justify-center space-y-4 lg:order-1 order-2">
                                <div class="space-y-4 text-xs md:text-sm text-hacker-dim">
                                    <p>GITHUB: <a href="https://github.com/goatn4b1" class="text-hacker hover:underline" target="_blank">github.com/goatn4b1</a></p>
                                    <p>EMAIL: <a href="mailto:goatn4b1@gmail.com" class="text-hacker hover:underline">goatn4b1@gmail.com</a></p>
                                </div>
                            </div>
                            <div class="lg:col-span-2 lg:order-2 order-1">
                                <form @submit.prevent="sendSignal" class="space-y-4 bg-hacker/5 p-6 border border-hacker/20">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input v-model="contactForm.email" required type="email" class="w-full bg-black/40 border border-hacker/30 p-2 text-sm text-hacker outline-none" placeholder="Email">
                                        <input v-model="contactForm.subject" type="text" class="w-full bg-black/40 border border-hacker/30 p-2 text-sm text-hacker outline-none" placeholder="Subject">
                                    </div>
                                    <textarea v-model="contactForm.message" required rows="3" class="w-full bg-black/40 border border-hacker/30 p-2 text-sm text-hacker outline-none" placeholder="Message"></textarea>
                                    <div v-if="sendStatus !== 'idle'" class="p-2 border border-hacker/30 text-[10px] italic bg-black/40">
                                        <span v-if="sendStatus === 'sending'">> SENDING_PACKETS...</span>
                                        <span v-if="sendStatus === 'success'">> SIGNAL_DELIVERED... [SUCCESS]</span>
                                        <span v-if="sendStatus === 'error'">> CONNECTION_TIMEOUT... [ERROR]</span>
                                    </div>
                                    <button :disabled="sendStatus === 'sending'" class="w-full bg-hacker text-black font-bold py-3 text-xs uppercase transition-all">
                                        {{ sendStatus === 'sending' ? 'Wait...' : $t('send_signal') }}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="w-full border-t border-hacker/10 py-6 mt-8">
                        <div class="flex justify-between items-center text-[10px] text-hacker-dim uppercase tracking-[0.2em]">
                            <span>&copy; 2026 GOATN4B1 // GOATN4B1_OS V.{{ version }}</span>
                            <span class="hidden md:inline">SYSTEM_STATUS: ACTIVE</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- PC DOTS -->
        <div v-if="!isMobile" class="fixed bottom-10 right-10 z-[100] flex flex-col gap-4">
            <button v-for="n in totalSlides" :key="n" @click="goToSlide(n-1)" :class="currentSlide === (n-1) ? 'bg-hacker w-8' : 'bg-hacker/20 w-4'" class="h-1 transition-all duration-300"></button>
        </div>
    </div>
</template>

<style>
/* Global */
html, body { margin: 0; padding: 0; background: black; width: 100%; min-height: 100%; }
#app-root { width: 100%; min-height: 100vh; }

/* Desktop Slider Logic */
@media (min-width: 1024px) {
    html, body { height: 100%; overflow: hidden; }
    #app-root { height: 100vh; overflow: hidden; }
    .main-slider { height: 100%; }
    .section-block { height: 100vh; flex-shrink: 0; }
}

/* Mobile Native Scroll Logic */
@media (max-width: 1023px) {
    html, body { height: auto !important; overflow-y: auto !important; overflow-x: hidden !important; }
    #app-root { height: auto !important; overflow-y: auto !important; }
    .main-slider { transform: none !important; height: auto !important; }
    .section-block { height: auto !important; min-height: 100vh; padding-top: 6rem; padding-bottom: 4rem; flex-shrink: unset; }
}

/* Glitch */
.glitch-title { position: relative; animation: glitch 3s infinite; }
.glitch-title::before, .glitch-title::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.3; }
.glitch-title::before { animation: glitch 4s infinite; color: #ff00c1; z-index: -1; clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%); }
.glitch-title::after { animation: glitch 2.5s infinite; color: #00fff9; z-index: -2; clip-path: polygon(0 75%, 100% 25%, 100% 100%, 0 100%); }

@keyframes glitch {
    0%, 14%, 100% { text-shadow: 0.05em 0 0 rgba(255,0,0,0.5), -0.05em -0.025em 0 rgba(0,255,0,0.5), -0.025em 0.05em 0 rgba(0,0,255,0.5); }
    15% { text-shadow: -0.05em -0.025em 0 rgba(255,0,0,0.5), 0.025em 0.025em 0 rgba(0,255,0,0.5), -0.05em -0.05em 0 rgba(0,0,255,0.5); }
}

::-webkit-scrollbar { width: 2px; }
::-webkit-scrollbar-thumb { background: #00FF41; }
</style>