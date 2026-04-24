<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import emailjs from '@emailjs/browser';
import vi from './locales/vi.json';
import en from './locales/en.json';

const currentLocale = ref('vi');
const locales = { vi, en };

const translations = computed(() => locales[currentLocale.value]);

const $t = (key) => {
    return translations.value[key] || key;
};

// Update document title
watch([currentLocale, translations], () => {
    document.title = `Goatn4b1 // ${$t('hero_role')}`;
}, { immediate: true });

const terminalText = ref('');
const fullText = "> BOOTING GOATN4B1_OS... VERSION_2.2.0_MAIL_ENABLED... [OK]";
let index = 0;

const currentSlide = ref(0);
const totalSlides = 5;
const isScrolling = ref(false);

// Mail Logic
const contactForm = ref({
    email: '',
    subject: '',
    message: ''
});
const sendStatus = ref('idle'); // idle, sending, success, error

const sendSignal = async () => {
    if (!contactForm.value.email || !contactForm.value.message) return;
    
    sendStatus.value = 'sending';
    
    try {
        // Chèn Public Key của bạn vào đây sau khi đăng ký EmailJS
        // emailjs.init("YOUR_PUBLIC_KEY");
        
        const templateParams = {
            from_email: contactForm.value.email,
            subject: contactForm.value.subject,
            message: contactForm.value.message,
            to_name: "Goatn4b1"
        };

        // Gửi qua EmailJS (Tôi để sẵn cấu trúc, bạn chỉ cần thay ID)
        // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
        
        // Giả lập gửi thành công (Vì chưa có ID thực tế)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        sendStatus.value = 'success';
        contactForm.value = { email: '', subject: '', message: '' };
        
        setTimeout(() => { sendStatus.value = 'idle'; }, 5000);
    } catch (error) {
        console.error('MAIL_ERROR:', error);
        sendStatus.value = 'error';
        setTimeout(() => { sendStatus.value = 'idle'; }, 5000);
    }
};

const goToSlide = (i) => {
    if (i >= 0 && i < totalSlides) {
        currentSlide.value = i;
    }
};

const handleScroll = (event) => {
    if (isScrolling.value) return;

    if (event.deltaY > 0) {
        if (currentSlide.value < totalSlides - 1) {
            goToSlide(currentSlide.value + 1);
            triggerScrollLock();
        }
    } else {
        if (currentSlide.value > 0) {
            goToSlide(currentSlide.value - 1);
            triggerScrollLock();
        }
    }
};

const triggerScrollLock = () => {
    isScrolling.value = true;
    setTimeout(() => {
        isScrolling.value = false;
    }, 1000); // 1 second cooldown
};

onMounted(() => {
    window.addEventListener('wheel', handleScroll, { passive: true });
    
    const type = () => {
        if (index < fullText.length) {
            terminalText.value += fullText.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    };
    type();
});

const activeCategory = ref('All');
const categories = ['All', 'E-commerce & Landing', 'System & Management', 'Automation & Tools'];

const projects = [
    { id: 1, title: 'ShopPage Premium', category: 'E-commerce & Landing', tech: 'React, Tailwind', link: '#', github: '#' },
    { id: 2, title: 'Secure Admin Panel', category: 'System & Management', tech: 'Laravel, MySQL', link: '#', github: '#' },
    { id: 3, title: 'N4B1 Sentinel Bot', category: 'Automation & Tools', tech: 'Node.js, Discord.js', link: '#', github: '#' },
    { id: 4, title: 'Corporate Landing', category: 'E-commerce & Landing', tech: 'VueJS, Vite', link: '#', github: '#' },
    { id: 5, title: 'Enterprise CRM', category: 'System & Management', tech: 'NestJS, PostgreSQL', link: '#', github: '#' },
    { id: 6, title: 'Auto-Task Script', category: 'Automation & Tools', tech: 'Python, Docker', link: '#', github: '#' },
];

const filteredProjects = computed(() => {
    const allText = currentLocale.value === 'vi' ? 'Tất cả' : 'All';
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
    { title: 'API & Microservices', desc: currentLocale.value === 'vi' ? 'Phát triển hệ thống backend theo kiến trúc Clean Architecture, đảm bảo tách biệt logic nghiệp vụ và dễ dàng kiểm thử.' : 'Developing backends with Clean Architecture, ensuring separated business logic and easy testability.' },
    { title: 'System Architecture Design', desc: currentLocale.value === 'vi' ? 'Thiết kế cấu trúc dự án bền vững, tối ưu hóa khả năng mở rộng và bảo trì lâu dài.' : 'Designing sustainable project structures, optimizing for long-term scalability and maintenance.' }
]);
</script>

<template>
    <div class="h-screen w-screen bg-black text-hacker font-mono selection:bg-hacker selection:text-black relative overflow-hidden">
        
        <!-- HEADER NAVIGATION -->
        <nav class="fixed top-0 left-0 w-full z-[100] border-b border-hacker/20 bg-black/80 backdrop-blur-md">
            <div class="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                <div class="text-hacker font-bold tracking-tighter animate-pulse text-sm md:text-base cursor-pointer flex items-center" @click="goToSlide(0)">
                    <span class="w-2 h-2 bg-hacker rounded-full mr-2 shadow-[0_0_8px_#00FF41]"></span>
                    GOATN4B1_OS
                </div>
                
                <div class="flex items-center space-x-8">
                    <div class="hidden md:flex space-x-6 text-[10px] lg:text-xs font-bold tracking-widest">
                        <button @click="goToSlide(0)" :class="currentSlide === 0 ? 'text-white' : 'hover:text-white'" class="transition-colors">{{ $t('nav_home') }}</button>
                        <button @click="goToSlide(1)" :class="currentSlide === 1 ? 'text-white' : 'hover:text-white'" class="transition-colors">{{ $t('nav_stack') }}</button>
                        <button @click="goToSlide(2)" :class="currentSlide === 2 ? 'text-white' : 'hover:text-white'" class="transition-colors">{{ $t('nav_projects') }}</button>
                        <button @click="goToSlide(3)" :class="currentSlide === 3 ? 'text-white' : 'hover:text-white'" class="transition-colors">{{ $t('nav_services') }}</button>
                        <button @click="goToSlide(4)" :class="currentSlide === 4 ? 'text-white' : 'hover:text-white'" class="transition-colors">{{ $t('nav_contact') }}</button>
                    </div>

                    <div class="flex items-center">
                        <div class="flex border border-hacker/30 rounded overflow-hidden">
                            <button @click="currentLocale = 'vi'" :class="currentLocale === 'vi' ? 'bg-hacker text-black' : 'text-hacker hover:bg-hacker/10'" class="px-2 py-1 text-[10px] font-bold transition-all border-none">VI</button>
                            <button @click="currentLocale = 'en'" :class="currentLocale === 'en' ? 'bg-hacker text-black' : 'text-hacker hover:bg-hacker/10'" class="px-2 py-1 text-[10px] font-bold transition-all border-l border-hacker/30 border-t-0 border-b-0 border-r-0">EN</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Background Effects -->
        <div class="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            <div class="h-1 w-full bg-hacker/5 absolute animate-scanline"></div>
        </div>
        <div class="fixed inset-0 pointer-events-none bg-[radial-gradient(rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:20px_20px] z-0 opacity-20"></div>

        <!-- SLIDER CONTAINER -->
        <div class="h-full w-full flex flex-col transition-transform duration-700 ease-in-out" 
             :style="{ transform: `translateY(-${currentSlide * 100}%)` }">
            
            <!-- 1. HERO SLIDE -->
            <section class="h-screen w-screen flex-shrink-0 flex flex-col justify-center px-6 max-w-7xl mx-auto relative pt-16">
                <div class="mb-4 text-hacker-dim opacity-70">{{ terminalText }}<span class="animate-pulse">_</span></div>
                
                <h1 class="font-black mb-4 md:mb-6 uppercase leading-none tracking-tighter relative group">
                    <span class="glitch-title block text-4xl md:text-7xl text-white relative z-10" data-text="Goatn4b1">
                        Goatn4b1
                    </span>
                    <span class="block text-xl md:text-3xl text-hacker/60 mt-2 relative z-10">
                        {{ $t('hero_role') }}
                    </span>
                </h1>

                <p class="text-xl md:text-2xl text-hacker-dim max-w-3xl mb-10 border-l-4 border-hacker pl-6 italic leading-relaxed" v-html="$t('hero_slogan')"></p>

                <div class="flex flex-wrap gap-4">
                    <button @click="goToSlide(4)" class="bg-hacker text-black px-10 py-4 font-black hover:bg-white transition-all duration-300 flex items-center group tracking-widest text-lg shadow-[0_0_20px_rgba(0,255,65,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                        {{ $t('cta_contact') }} <span class="ml-3 group-hover:translate-x-2 transition-transform">>>></span>
                    </button>
                </div>

                <!-- Visual 3D Block Placeholder -->
                <div class="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 w-64 h-64 border border-hacker/20 rotate-45 animate-pulse">
                    <div class="absolute inset-0 border border-hacker/40 translate-x-4 translate-y-4"></div>
                    <div class="absolute inset-0 flex items-center justify-center -rotate-45">
                        <span class="text-[10px] opacity-20 text-center uppercase tracking-[0.3em]">SECURE_INTERFACE</span>
                    </div>
                </div>
            </section>

            <!-- 2. TECH STACK SLIDE -->
            <section class="h-screen w-screen flex-shrink-0 flex flex-col justify-center items-center px-10 relative">
                <div class="max-w-7xl w-full">
                    <h2 class="text-3xl font-bold mb-12 flex items-center w-full">
                        <span class="bg-hacker text-black px-2 mr-4 text-xl">01</span> {{ $t('section_stack') }}
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                        <div v-for="(techs, group) in techStack" :key="group" 
                             class="border border-hacker/20 p-8 hover:border-hacker/50 transition-all group bg-black/40 relative overflow-hidden">
                            <div class="absolute top-0 right-0 bg-hacker/10 text-hacker text-[8px] px-2 py-1 font-bold tracking-widest uppercase">
                                {{ group === 'Backend' ? 'Entities_UseCases' : 'Implementation' }}
                            </div>
                            <h3 class="text-white font-bold mb-6 flex justify-between items-center border-b border-hacker/10 pb-4">
                                _{{ group.toUpperCase() }}
                                <span class="text-[10px] text-hacker opacity-50">SCALABLE</span>
                            </h3>
                            <ul class="grid grid-cols-2 gap-4">
                                <li v-for="t in techStack[group]" :key="t" class="flex items-center text-sm group-hover:text-white transition-colors">
                                    <span class="w-1.5 h-1.5 bg-hacker mr-3 shadow-[0_0_5px_#00FF41]"></span> {{ t }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 3. PROJECT SHOWCASE SLIDE -->
            <section class="h-screen w-screen flex-shrink-0 flex flex-col justify-center items-center px-10 relative">
                <div class="max-w-7xl w-full">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                        <div>
                            <h2 class="text-3xl font-bold mb-2 flex items-center">
                                <span class="bg-hacker text-black px-2 mr-4 text-xl">02</span> {{ $t('section_projects') }}
                            </h2>
                            <p class="text-hacker-dim text-xs italic tracking-widest opacity-60">> FILTRATION_ACTIVE: {{ activeCategory.toUpperCase() }}</p>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <button v-for="cat in (currentLocale === 'vi' ? ['Tất cả', ...categories.slice(1)] : categories)" :key="cat" 
                                    @click="activeCategory = cat"
                                    :class="activeCategory === cat || (activeCategory === 'All' && cat === 'Tất cả') || (activeCategory === 'Tất cả' && cat === 'All') ? 'bg-hacker text-black shadow-[0_0_10px_#00FF41]' : 'border border-hacker/30 text-hacker/60 hover:text-hacker hover:border-hacker'"
                                    class="px-3 py-1 text-[10px] font-bold uppercase transition-all duration-300">
                                {{ cat }}
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        <div v-for="p in filteredProjects.slice(0, 6)" :key="p.id" class="group relative bg-black/40 border border-hacker/20 overflow-hidden hover:border-hacker/60 transition-all duration-300">
                            <div class="aspect-[16/9] bg-black/60 flex items-center justify-center relative overflow-hidden">
                                <div class="absolute inset-0 bg-hacker/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 backdrop-blur-[2px]">
                                    <div class="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <a :href="p.link" target="_blank" class="bg-white text-black p-2 rounded-full hover:bg-hacker transition-colors">🔗</a>
                                        <a :href="p.github" target="_blank" class="bg-black text-white p-2 border border-hacker rounded-full hover:bg-hacker transition-colors">📂</a>
                                    </div>
                                </div>
                                <span class="text-hacker/10 text-3xl group-hover:scale-110 transition-transform duration-500 font-black">N4B1_PRJ_{{ p.id }}</span>
                                <div class="absolute bottom-0 left-0 w-full h-1 bg-hacker/20">
                                    <div class="h-full bg-hacker w-0 group-hover:w-full transition-all duration-700"></div>
                                </div>
                            </div>
                            <div class="p-4">
                                <div class="text-[9px] text-hacker-dim mb-1 uppercase tracking-[0.2em] opacity-50">{{ p.category }}</div>
                                <h3 class="text-base font-bold text-white mb-1 group-hover:text-hacker transition-colors">{{ p.title }}</h3>
                                <p class="text-[10px] text-hacker/60 italic">{{ p.tech }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 4. EXPERIENCE & SERVICES SLIDE -->
            <section class="h-screen w-screen flex-shrink-0 flex flex-col justify-center items-center px-10 relative">
                <div class="max-w-7xl w-full">
                    <h2 class="text-3xl font-bold mb-12 flex items-center">
                        <span class="bg-hacker text-black px-2 mr-4 text-xl">03</span> {{ $t('section_services') }}
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div v-for="s in services" :key="s.title" class="p-8 border-l-2 border-hacker/30 hover:border-hacker hover:bg-hacker/5 transition-all bg-black/40">
                            <h3 class="text-xl font-bold text-white mb-4">_ {{ s.title }}</h3>
                            <p class="text-hacker-dim text-sm leading-relaxed">{{ s.desc }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 5. CONTACT SLIDE -->
            <section class="h-screen w-screen flex-shrink-0 flex flex-col justify-center items-center px-10 relative">
                <div class="max-w-7xl w-full">
                    <h2 class="text-3xl font-bold mb-8 flex items-center">
                        <span class="bg-hacker text-black px-2 mr-4 text-xl">04</span> {{ $t('section_contact') }}
                    </h2>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        <!-- Contact Form -->
                        <form @submit.prevent="sendSignal" class="space-y-6">
                            <div>
                                <label class="block text-xs uppercase mb-2 opacity-50">Email_Address</label>
                                <input v-model="contactForm.email" required type="email" class="w-full bg-transparent border border-hacker/30 focus:border-hacker outline-none p-3 text-hacker transition-all" placeholder="user@target.com">
                            </div>
                            <div>
                                <label class="block text-xs uppercase mb-2 opacity-50">Subject_Line</label>
                                <input v-model="contactForm.subject" type="text" class="w-full bg-transparent border border-hacker/30 focus:border-hacker outline-none p-3 text-hacker transition-all" placeholder="Security Inquiry">
                            </div>
                            <div>
                                <label class="block text-xs uppercase mb-2 opacity-50">Message_Payload</label>
                                <textarea v-model="contactForm.message" required rows="4" class="w-full bg-transparent border border-hacker/30 focus:border-hacker outline-none p-3 text-hacker transition-all" placeholder="Enter your message..."></textarea>
                            </div>
                            
                            <!-- Status Terminal -->
                            <div v-if="sendStatus !== 'idle'" :class="sendStatus === 'error' ? 'text-red-500 border-red-500/30' : 'text-hacker border-hacker/30'" class="p-3 border text-xs bg-black/40 italic">
                                <span v-if="sendStatus === 'sending'">> SENDING_PACKETS... PLEASE_WAIT...</span>
                                <span v-if="sendStatus === 'success'">> SIGNAL_DELIVERED... ACCESS_GRANTED... [SUCCESS]</span>
                                <span v-if="sendStatus === 'error'">> CONNECTION_TIMEOUT... SIGNAL_LOST... [ERROR]</span>
                            </div>

                            <button :disabled="sendStatus === 'sending'" class="w-full bg-hacker text-black font-bold py-4 hover:bg-white disabled:bg-hacker/20 disabled:cursor-not-allowed transition-colors uppercase tracking-widest">
                                {{ sendStatus === 'sending' ? 'Sending...' : $t('send_signal') }}
                            </button>
                        </form>

                        <div class="flex flex-col justify-between">
                            <div class="space-y-8">
                                <div>
                                    <h4 class="text-white font-bold mb-4 uppercase">Direct_Access</h4>
                                    <div class="space-y-2 text-sm text-hacker-dim">
                                        <p>GITHUB: <a href="https://github.com/goatn4b1" target="_blank" class="text-hacker hover:underline">github.com/goatn4b1</a></p>
                                        <p>Email: <a href="mailto:goatn4b1@gmail.com" class="text-hacker hover:underline">goatn4b1@gmail.com</a></p>
                                        <p>DISCORD: <span class="text-hacker hover:underline">@goatn4b1</span></p>
                                    </div>
                                </div>
                                <div class="p-6 border border-dashed border-hacker/30 text-[10px] text-hacker-dim italic">
                                    &copy; 2026 GOATN4B1 // GOATN4B1_OS V.2.2.0 (MAIL_NODE)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- SLIDE CONTROLS (Floating) -->
        <div class="fixed bottom-10 right-10 z-[100] flex flex-col gap-4">
            <button v-for="n in totalSlides" :key="n" 
                    @click="goToSlide(n-1)"
                    :class="currentSlide === (n-1) ? 'bg-hacker w-8' : 'bg-hacker/20 w-4 hover:bg-hacker/50'"
                    class="h-1 transition-all duration-300"></button>
        </div>
    </div>
</template>

<style>
body {
    cursor: crosshair;
    overflow: hidden;
}

.glitch-title {
    position: relative;
    text-shadow: 0.02em 0 0 rgba(255, 0, 0, 0.4),
                -0.01em -0.02em 0 rgba(0, 255, 0, 0.4),
                0.01em 0.02em 0 rgba(0, 0, 255, 0.4);
    animation: glitch 3s infinite;
}

.glitch-title::before,
.glitch-title::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
}

.glitch-title::before {
    animation: glitch 4s infinite;
    clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
    transform: translate(-0.01em, -0.01em);
    color: #ff00c1;
    z-index: -1;
}

.glitch-title::after {
    animation: glitch 2.5s infinite;
    clip-path: polygon(0 75%, 100% 25%, 100% 100%, 0 100%);
    transform: translate(0.01em, 0.01em);
    color: #00fff9;
    z-index: -2;
}

@keyframes glitch {
    0% {
        text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                    -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                    -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
    }
    14% {
        text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                    -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                    -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
    }
    15% {
        text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                    0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                    -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    49% {
        text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                    0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                    -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    50% {
        text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                    0.05em 0 0 rgba(0, 255, 0, 0.75),
                    0 -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    99% {
        text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                    0.05em 0 0 rgba(0, 255, 0, 0.75),
                    0 -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    100% {
        text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
                    -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
                    -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
    }
}

/* Hide scrollbars for slides but keep scroll functionality */
.overflow-y-auto {
    scrollbar-width: none;
    -ms-overflow-style: none;
}
.overflow-y-auto::-webkit-scrollbar {
    display: none;
}
</style>