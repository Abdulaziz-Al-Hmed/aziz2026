// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const htmlElement = document.documentElement;
    
    // Default language
    let currentLang = 'en';
    
    // Language switching
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            
            if (selectedLang !== currentLang) {
                switchLanguage(selectedLang);
                currentLang = selectedLang;
                
                // Update active button
                langButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Update HTML direction
                if (selectedLang === 'ar') {
                    htmlElement.setAttribute('dir', 'rtl');
                    htmlElement.setAttribute('lang', 'ar');
                } else {
                    htmlElement.setAttribute('dir', 'ltr');
                    htmlElement.setAttribute('lang', 'en');
                }
            }
        });
    });
    
    function switchLanguage(lang) {
        const elements = document.querySelectorAll('[data-en], [data-ar]');
        
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
        
        // Handle placeholders
        const inputElements = document.querySelectorAll('[data-placeholder-en], [data-placeholder-ar]');
        inputElements.forEach(element => {
            const placeholder = element.getAttribute(`data-placeholder-${lang}`);
            if (placeholder) {
                element.setAttribute('placeholder', placeholder);
            }
        });
        
        // Handle select options
        const selectOptions = document.querySelectorAll('option[data-en], option[data-ar]');
        selectOptions.forEach(option => {
            const text = option.getAttribute(`data-${lang}`);
            if (text) {
                option.textContent = text;
            }
        });
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .pricing-card, .feature-item, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]') ? this.querySelector('input[type="tel"]').value : '';
            const company = this.querySelector('input[placeholder*="Company"], input[data-placeholder-en*="Company"]') ? this.querySelector('input[placeholder*="Company"], input[data-placeholder-en*="Company"]').value : '';
            const service = this.querySelector('select[title*="service"]').value;
            const budget = this.querySelector('select[title*="budget"]') ? this.querySelector('select[title*="budget"]').value : '';
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !service || !message) {
                const errorMessage = currentLang === 'ar' 
                    ? 'يرجى ملء جميع الحقول المطلوبة'
                    : 'Please fill in all required fields';
                showNotification(errorMessage, 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                const errorMessage = currentLang === 'ar' 
                    ? 'يرجى إدخال عنوان بريد إلكتروني صحيح'
                    : 'Please enter a valid email address';
                showNotification(errorMessage, 'error');
                return;
            }
            
            // Success message
            const successMessage = currentLang === 'ar' 
                ? 'شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.'
                : 'Thank you! Your message has been sent successfully. We will contact you soon.';
            
            showNotification(successMessage, 'success');
            this.reset();
        });
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    // Button click effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-btn, .pricing-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .nav-menu.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border-radius: 0 0 12px 12px;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
        
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Pricing plan selection
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        const button = card.querySelector('.pricing-btn');
        if (button) {
            button.addEventListener('click', function() {
                const planName = card.querySelector('h3').textContent;
                const amountElement = card.querySelector('.amount');
                const planPrice = amountElement ? amountElement.textContent : 'Custom';
                
                const message = currentLang === 'ar' 
                    ? `لقد اخترت خطة ${planName} (${planPrice}$/شهر). سيتواصل معك فريقنا قريباً!`
                    : `You selected the ${planName} plan ($${planPrice}/month). Our team will contact you soon!`;
                
                showNotification(message, 'success');
            });
        }
    });
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('featured')) {
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Stats counter animation
    const statsNumbers = document.querySelectorAll('.stat-number, .about-stat h3');
    
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const displayValue = Math.floor(current);
            const originalText = element.textContent;
            const suffix = originalText.replace(/[0-9]/g, '');
            element.textContent = displayValue + suffix;
        }, 20);
    }
    
    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Loading animation for server units
    const serverUnits = document.querySelectorAll('.server-unit.active');
    let currentUnit = 0;
    
    setInterval(() => {
        serverUnits.forEach(unit => unit.classList.remove('loading'));
        
        if (serverUnits[currentUnit]) {
            serverUnits[currentUnit].classList.add('loading');
        }
        
        currentUnit = (currentUnit + 1) % serverUnits.length;
    }, 2000);
});

// Preloader (optional)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loaded state styles
    const loadedStyles = document.createElement('style');
    loadedStyles.textContent = `
        body.loaded * {
            animation-play-state: running;
        }
        
        .server-unit.loading {
            overflow: hidden;
            position: relative;
        }
        
        .server-unit.loading::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.6), transparent);
            animation: loading 1.5s infinite;
        }
    `;
    document.head.appendChild(loadedStyles);
    
    // Handle suspended service buttons
    const suspendedButtons = document.querySelectorAll('.pricing-btn.suspended, .btn-table.suspended');
    suspendedButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show suspension message
            const message = currentLang === 'ar' ? 
                'نعتذر، هذه الخدمة معلقة مؤقتاً. يرجى المحاولة لاحقاً.' :
                'Sorry, this service is temporarily suspended. Please try again later.';
            
            // Create and show alert
            const alertDiv = document.createElement('div');
            alertDiv.className = 'suspension-alert';
            alertDiv.innerHTML = `
                <div class="alert-content">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>${message}</p>
                    <button class="close-alert">×</button>
                </div>
            `;
            
            // Style the alert
            alertDiv.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            `;
            
            const alertContent = alertDiv.querySelector('.alert-content');
            alertContent.style.cssText = `
                background: white;
                padding: 2rem;
                border-radius: 10px;
                text-align: center;
                max-width: 400px;
                margin: 0 1rem;
                position: relative;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            `;
            
            const icon = alertDiv.querySelector('i');
            icon.style.cssText = `
                font-size: 3rem;
                color: #ff6b6b;
                margin-bottom: 1rem;
            `;
            
            const text = alertDiv.querySelector('p');
            text.style.cssText = `
                font-size: 1.1rem;
                color: #333;
                margin: 1rem 0;
                line-height: 1.5;
            `;
            
            const closeBtn = alertDiv.querySelector('.close-alert');
            closeBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 15px;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #999;
                line-height: 1;
            `;
            
            // Add fadeIn animation
            const fadeInKeyframes = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
            `;
            
            if (!document.querySelector('#suspension-styles')) {
                const style = document.createElement('style');
                style.id = 'suspension-styles';
                style.textContent = fadeInKeyframes;
                document.head.appendChild(style);
            }
            
            document.body.appendChild(alertDiv);
            
            // Close alert functionality
            const closeAlert = () => {
                alertDiv.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    if (alertDiv.parentNode) {
                        alertDiv.parentNode.removeChild(alertDiv);
                    }
                }, 300);
            };
            
            closeBtn.addEventListener('click', closeAlert);
            alertDiv.addEventListener('click', function(e) {
                if (e.target === alertDiv) {
                    closeAlert();
                }
            });
            
            // Auto close after 5 seconds
            setTimeout(closeAlert, 5000);
        });
    });

    // Service Modal Functionality
    const serviceModal = document.getElementById('serviceModal');
    const closeModal = document.querySelector('.close-modal');
    const serviceItems = document.querySelectorAll('.service-item');

    // Service plans data
    const servicePlans = {
        'shared-hosting': {
            title: { en: 'Shared Hosting Plans', ar: 'خطط الاستضافة المشتركة' },
            description: { en: 'Affordable hosting solutions for personal websites and blogs', ar: 'حلول استضافة ميسورة التكلفة للمواقع الشخصية والمدونات' },
            plans: [
                {
                    name: { en: 'Starter', ar: 'مبتدئ' },
                    price: '$2.99',
                    features: { 
                        en: ['1 Website', '5GB Storage', '100GB Bandwidth', 'Free SSL', 'Email Support'],
                        ar: ['موقع واحد', '5GB تخزين', '100GB عرض نطاق', 'SSL مجاني', 'دعم بريد إلكتروني']
                    }
                },
                {
                    name: { en: 'Business', ar: 'تجاري' },
                    price: '$5.99',
                    popular: true,
                    features: { 
                        en: ['5 Websites', '20GB Storage', 'Unlimited Bandwidth', 'Free SSL', 'Priority Support'],
                        ar: ['5 مواقع', '20GB تخزين', 'عرض نطاق غير محدود', 'SSL مجاني', 'دعم أولوية']
                    }
                },
                {
                    name: { en: 'Pro', ar: 'محترف' },
                    price: '$9.99',
                    features: { 
                        en: ['Unlimited Websites', '50GB Storage', 'Unlimited Bandwidth', 'Free SSL + CDN', '24/7 Support'],
                        ar: ['مواقع غير محدودة', '50GB تخزين', 'عرض نطاق غير محدود', 'SSL مجاني + CDN', 'دعم 24/7']
                    }
                }
            ]
        },
        'business-email': {
            title: { en: 'Business Email Plans', ar: 'خطط البريد الإلكتروني التجاري' },
            description: { en: 'Professional email hosting with your domain', ar: 'استضافة بريد إلكتروني احترافية مع نطاقك' },
            plans: [
                {
                    name: { en: 'Basic Email', ar: 'بريد أساسي' },
                    price: '$1.99',
                    period: { en: '/mailbox/month', ar: '/صندوق بريد/شهر' },
                    features: { 
                        en: ['5GB Storage', 'POP3/IMAP/SMTP', 'Webmail Access', 'Spam Protection', 'Mobile Sync'],
                        ar: ['5GB تخزين', 'POP3/IMAP/SMTP', 'وصول بريد ويب', 'حماية الرسائل المزعجة', 'مزامنة الجوال']
                    }
                },
                {
                    name: { en: 'Business Email', ar: 'بريد تجاري' },
                    price: '$4.99',
                    popular: true,
                    period: { en: '/mailbox/month', ar: '/صندوق بريد/شهر' },
                    features: { 
                        en: ['25GB Storage', 'Calendar & Contacts', 'Advanced Spam Filter', 'Email Archiving', 'Priority Support'],
                        ar: ['25GB تخزين', 'تقويم وجهات اتصال', 'مرشح رسائل مزعجة متقدم', 'أرشفة البريد', 'دعم أولوية']
                    }
                },
                {
                    name: { en: 'Enterprise Email', ar: 'بريد مؤسسات' },
                    price: '$9.99',
                    period: { en: '/mailbox/month', ar: '/صندوق بريد/شهر' },
                    features: { 
                        en: ['Unlimited Storage', 'Advanced Security', 'Compliance Tools', 'Admin Console', '24/7 Support'],
                        ar: ['تخزين غير محدود', 'أمان متقدم', 'أدوات الامتثال', 'وحدة تحكم إدارية', 'دعم 24/7']
                    }
                }
            ]
        },
        'domain-registration': {
            title: { en: 'Domain Registration', ar: 'تسجيل النطاقات' },
            description: { en: 'Register your perfect domain name', ar: 'سجل اسم النطاق المثالي لك' },
            plans: [
                {
                    name: { en: '.com Domain', ar: 'نطاق .com' },
                    price: '$12.99',
                    period: { en: '/year', ar: '/سنة' },
                    features: { 
                        en: ['Free WHOIS Protection', 'DNS Management', 'Email Forwarding', 'Domain Locking', 'Auto-Renewal'],
                        ar: ['حماية WHOIS مجانية', 'إدارة DNS', 'إعادة توجيه البريد', 'قفل النطاق', 'تجديد تلقائي']
                    }
                },
                {
                    name: { en: '.net/.org Domain', ar: 'نطاق .net/.org' },
                    price: '$14.99',
                    period: { en: '/year', ar: '/سنة' },
                    features: { 
                        en: ['Free WHOIS Protection', 'DNS Management', 'Email Forwarding', 'Domain Locking', 'Auto-Renewal'],
                        ar: ['حماية WHOIS مجانية', 'إدارة DNS', 'إعادة توجيه البريد', 'قفل النطاق', 'تجديد تلقائي']
                    }
                },
                {
                    name: { en: 'Premium TLDs', ar: 'نطاقات مميزة' },
                    price: '$29.99',
                    popular: true,
                    period: { en: '/year', ar: '/سنة' },
                    features: { 
                        en: ['.shop, .online, .tech', 'Premium Support', 'Advanced DNS', 'Priority Registration', 'Transfer Protection'],
                        ar: ['.shop, .online, .tech', 'دعم مميز', 'DNS متقدم', 'تسجيل أولوية', 'حماية النقل']
                    }
                }
            ]
        },
        'ssl-certificates': {
            title: { en: 'SSL Certificates', ar: 'شهادات SSL' },
            description: { en: 'Secure your website with SSL encryption', ar: 'احم موقعك بتشفير SSL' },
            plans: [
                {
                    name: { en: 'Basic SSL', ar: 'SSL أساسي' },
                    price: '$9.99',
                    period: { en: '/year', ar: '/سنة' },
                    features: { 
                        en: ['Domain Validation', '256-bit Encryption', 'Browser Trust', 'Basic Support', '30-day Refund'],
                        ar: ['التحقق من النطاق', 'تشفير 256-بت', 'ثقة المتصفح', 'دعم أساسي', 'استرداد 30 يوم']
                    }
                },
                {
                    name: { en: 'Business SSL', ar: 'SSL تجاري' },
                    price: '$49.99',
                    popular: true,
                    period: { en: '/year', ar: '/سنة' },
                    features: { 
                        en: ['Organization Validation', '256-bit Encryption', 'Company Details', 'Priority Support', 'Warranty Included'],
                        ar: ['التحقق من المؤسسة', 'تشفير 256-بت', 'تفاصيل الشركة', 'دعم أولوية', 'ضمان مشمول']
                    }
                },
                {
                    name: { en: 'Extended SSL', ar: 'SSL موسع' },
                    price: '$199.99',
                    period: { en: '/year', ar: '/سنة' },
                    features: { 
                        en: ['Extended Validation', 'Green Address Bar', 'Maximum Trust', 'Premium Support', 'High Warranty'],
                        ar: ['التحقق الموسع', 'شريط عنوان أخضر', 'أقصى ثقة', 'دعم مميز', 'ضمان عالي']
                    }
                }
            ]
        }
    };

    // Open modal when service item is clicked
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service-name');
            const serviceData = servicePlans[serviceName];
            
            if (serviceData) {
                const title = document.getElementById('modalTitle');
                const description = document.getElementById('modalDescription');
                const plansContainer = document.getElementById('modalPlans');
                
                // Set title and description
                title.textContent = serviceData.title[currentLang];
                description.textContent = serviceData.description[currentLang];
                
                // Clear previous plans
                plansContainer.innerHTML = '';
                
                // Add plans
                serviceData.plans.forEach(plan => {
                    const planCard = document.createElement('div');
                    planCard.className = `pricing-card ${plan.popular ? 'popular' : ''}`;
                    
                    const period = plan.period ? plan.period[currentLang] : (currentLang === 'ar' ? '/شهر' : '/month');
                    
                    planCard.innerHTML = `
                        ${plan.popular ? `<div class="popular-badge">${currentLang === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}</div>` : ''}
                        <div class="pricing-header">
                            <h4>${plan.name[currentLang]}</h4>
                            <div class="price">
                                <span class="currency">$</span>
                                <span class="amount">${plan.price.replace('$', '')}</span>
                                <span class="period">${period}</span>
                            </div>
                        </div>
                        <ul class="pricing-features">
                            ${plan.features[currentLang].map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                        <button class="pricing-btn suspended">${currentLang === 'ar' ? 'الخدمة معلقة مؤقتاً' : 'Service Temporarily Suspended'}</button>
                    `;
                    
                    plansContainer.appendChild(planCard);
                });
                
                // Show modal
                serviceModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Add event listeners to new suspended buttons
                const newSuspendedBtns = plansContainer.querySelectorAll('.pricing-btn.suspended');
                newSuspendedBtns.forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        const message = currentLang === 'ar' ? 
                            'نعتذر، هذه الخدمة معلقة مؤقتاً. يرجى المحاولة لاحقاً.' :
                            'Sorry, this service is temporarily suspended. Please try again later.';
                        showNotification(message, 'error');
                    });
                });
            }
        });
    });

    // Close modal functionality
    function closeServiceModal() {
        serviceModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closeModal.addEventListener('click', closeServiceModal);

    window.addEventListener('click', function(e) {
        if (e.target === serviceModal) {
            closeServiceModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && serviceModal.style.display === 'block') {
            closeServiceModal();
        }
    });
});
