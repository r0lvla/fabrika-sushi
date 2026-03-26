// ===== NAVIGATION =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== NAV SCROLL EFFECT =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.85)';
    }
});

// ===== LOAD MORE SETS =====
const setsMore = document.getElementById('setsMore');
const loadMoreBtn = document.getElementById('loadMoreSets');
let setsLoaded = 5; // Start after initial 5 shown
const setsPerPage = 8;
// Get actual set file names from the sets folder
const setsFiles = ['photo_0000','photo_0001','photo_0002','photo_0003','photo_0004','photo_0016','photo_0017','photo_0018','photo_0019','photo_0020','photo_0021','photo_0022','photo_0023','photo_0024','photo_0025','photo_0029','photo_0030','photo_0031','photo_0032','photo_0033','photo_0034','photo_0035','photo_0036','photo_0037','photo_0038','photo_0039','photo_0040','photo_0041','photo_0042','photo_0043','photo_0044','photo_0045','photo_0046','photo_0047','photo_0048','photo_0049','photo_0050','photo_0051','photo_0052','photo_0053','photo_0054','photo_0055','photo_0056','photo_0057','photo_0058','photo_0059','photo_0061','photo_0062','photo_0063','photo_0064','photo_0065','photo_0066','photo_0067','photo_0068','photo_0069','photo_0070','photo_0071','photo_0072','photo_0073','photo_0074','photo_0075','photo_0076','photo_0077','photo_0078','photo_0079','photo_0080','photo_0081','photo_0082','photo_0083','photo_0084','photo_0085','photo_0086','photo_0087','photo_0088','photo_0089','photo_0090','photo_0091','photo_0092','photo_0103','photo_0104','photo_0105','photo_0106','photo_0107','photo_0108','photo_0109','photo_0110','photo_0111','photo_0113','photo_0114','photo_0115','photo_0116','photo_0117','photo_0118','photo_0119','photo_0120','photo_0121','photo_0122','photo_0123','photo_0124','photo_0125','photo_0126','photo_0127','photo_0128','photo_0129','photo_0130','photo_0131','photo_0132','photo_0139','photo_0140','photo_0141','photo_0144','photo_0145','photo_0147','photo_0148','photo_0149','photo_0150','photo_0151','photo_0152','photo_0153','photo_0154','photo_0155','photo_0156','photo_0157','photo_0158','photo_0159','photo_0160','photo_0161','photo_0162','photo_0163','photo_0166','photo_0167','photo_0168','photo_0169','photo_0170','photo_0176','photo_0177','photo_0178','photo_0179','photo_0180'];
const totalSets = setsFiles.length;

loadMoreBtn.addEventListener('click', () => {
    const end = Math.min(setsLoaded + setsPerPage, totalSets);
    
    for (let i = setsLoaded; i < end; i++) {
        const fname = setsFiles[i];
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animation = 'fadeInUp 0.5s ease forwards';
        item.style.animationDelay = `${(i - setsLoaded) * 0.05}s`;
        item.style.opacity = '0';
        item.innerHTML = `
            <img src="img/sets/${fname}.jpg" alt="Набор" loading="lazy">
            <div class="gallery-overlay"><span>Набор</span></div>
        `;
        setsMore.appendChild(item);
    }
    
    setsLoaded = end;
    
    if (setsLoaded >= totalSets) {
        loadMoreBtn.style.display = 'none';
    }
});

// ===== INTERSECTION OBSERVER — ANIMATE ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-item, .promo-card, .location-card, .contact-card, .announcement-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.getElementById('nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PARALLAX FOR HERO =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero) {
        const scrolled = window.scrollY;
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - scrolled / 800;
    }
});

console.log('🍱 FABRIKA SUSHI — site loaded');

// ===== LIGHTBOX FOR ZOMBIE PHOTOS =====
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<span class="lightbox-close">&times;</span><img src="" alt="">';
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const isMobile = ('ontouchstart' in window) && window.matchMedia('(hover: none)').matches;

function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxImg.style.transform = '';
    lightboxImg.style.left = '';
    lightboxImg.style.top = '';
    pinchState.scale = 1; pinchState.x = 0; pinchState.y = 0;
    lightbox.style.display = 'flex';
    lightbox.offsetHeight;
    requestAnimationFrame(() => {
        lightbox.classList.add('active');
        // Mobile: start cropped in at 2x
        if (isMobile) {
            setTimeout(() => {
                pinchState.scale = 2;
                updateImgTransform();
            }, 350);
        }
    });
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
        lightboxImg.style.transform = '';
        lightboxImg.style.left = '';
        lightboxImg.style.top = '';
        pinchState.scale = 1; pinchState.x = 0; pinchState.y = 0;
    }, 400);
}

lightbox.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMobile && e.target === lightboxImg) return;
    closeLightbox();
});

lightboxImg.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMobile) return;
    closeLightbox();
});
lightboxClose.addEventListener('click', closeLightbox);

document.querySelectorAll('.promo-card-image img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// ===== MOBILE: PINCH ZOOM + PAN + DOUBLE TAP =====
const pinchState = { scale: 1, x: 0, y: 0, startScale: 1, startDist: 0, startX: 0, startY: 0, startPanX: 0, startPanY: 0, touching: false };

function getDist(t1, t2) { return Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY); }
function getCenter(t1, t2) { return { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 }; }
function updateImgTransform() { lightboxImg.style.transform = 'translate(' + pinchState.x + 'px,' + pinchState.y + 'px) scale(' + pinchState.scale + ')'; }
function resetIfSmall() { if (pinchState.scale <= 1) { pinchState.scale = 1; pinchState.x = 0; pinchState.y = 0; updateImgTransform(); } }

lightboxImg.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        pinchState.touching = true;
        pinchState.startX = e.touches[0].clientX;
        pinchState.startY = e.touches[0].clientY;
        pinchState.startPanX = pinchState.x;
        pinchState.startPanY = pinchState.y;
    } else if (e.touches.length === 2) {
        pinchState.startDist = getDist(e.touches[0], e.touches[1]);
        pinchState.startScale = pinchState.scale;
        var c = getCenter(e.touches[0], e.touches[1]);
        pinchState.startX = c.x; pinchState.startY = c.y;
    }
}, { passive: true });

lightboxImg.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (e.touches.length === 1 && pinchState.touching) {
        var dx = e.touches[0].clientX - pinchState.startX;
        var dy = e.touches[0].clientY - pinchState.startY;
        pinchState.x = pinchState.startPanX + dx;
        pinchState.y = pinchState.startPanY + dy;
        updateImgTransform();
    } else if (e.touches.length === 2) {
        var dist = getDist(e.touches[0], e.touches[1]);
        var c = getCenter(e.touches[0], e.touches[1]);
        pinchState.scale = Math.max(1, Math.min(5, pinchState.startScale * (dist / pinchState.startDist)));
        pinchState.x = c.x - pinchState.startX;
        pinchState.y = c.y - pinchState.startY;
        updateImgTransform();
    }
}, { passive: false });

lightboxImg.addEventListener('touchend', (e) => {
    if (e.touches.length === 0) {
        pinchState.touching = false;
        resetIfSmall();
    }
}, { passive: true });

// Double tap zoom toggle
var lastTap = 0;
lightboxImg.addEventListener('touchend', (e) => {
    var now = Date.now();
    if (now - lastTap < 300) {
        if (pinchState.scale > 1) {
            pinchState.scale = 2; pinchState.x = 0; pinchState.y = 0; // Reset to crop
        } else {
            pinchState.scale = 2;
        }
        updateImgTransform();
    }
    lastTap = now;
}, { passive: true });
