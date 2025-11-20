const head = document.getElementById('floatingHead');
const container = document.querySelector('.character-container');

// --- SETTINGS ---
let stopPoint = 200; 
const scrollSpeed = 0.5; 
const zoomSpeed = 0.008; 
const maxScroll = 10000; 

function updateStopPoint() {
    if (window.innerWidth < 768) {
        stopPoint = 50; 
    } else {
        stopPoint = 200;
    }
}
updateStopPoint();

let currentScroll = 0;

function updateAnimation(delta) {
    currentScroll += delta * scrollSpeed;

    if (currentScroll < 0) currentScroll = 0;
    if (currentScroll > maxScroll) currentScroll = maxScroll;

    // --- PHASE 1: HEAD LIFT ---
    let headY = currentScroll;
    if (headY > stopPoint) headY = stopPoint;
    
    if (head) {
        head.style.transform = `translateY(-${headY}px)`;
    }

    // --- PHASE 2: INSTANT ZOOM & CIRCLE EXPANSION ---
    let zoomFactor = 1;
    let clipRadius = 150; 

    if (currentScroll > stopPoint) {
        const extraScroll = currentScroll - stopPoint;
        zoomFactor = 1 + (extraScroll * zoomSpeed); 
        
        // Hide head later
        if (zoomFactor > 3) {
            head.style.opacity = 0; 
        } else {
            head.style.opacity = 1;
        }

        // CIRCLE EFFECT
        if (container) {
            // Turn into a circle while zooming
            let radius = Math.min(50, extraScroll * 0.1); 
            
            // Turn back to square when it fills the screen (zoom > 5)
            if (zoomFactor > 5) {
                radius = Math.max(0, 50 - ((zoomFactor - 5) * 20));
            }
            
            container.style.borderRadius = `${radius}%`;
            
            // Important: Clipping needs overflow hidden
            if (radius > 0) {
                container.style.overflow = "hidden";
            } else {
                container.style.overflow = "visible";
            }
        }
    } else {
        // Reset
        if (container) {
            container.style.borderRadius = '0%';
            container.style.overflow = "visible";
        }
    }

    if (container) {
        container.style.transformOrigin = "center 43%"; 
        
        container.style.transform = `translate(-50%, -40%) scale(${zoomFactor})`;
    }
}

window.addEventListener('wheel', (e) => { updateAnimation(e.deltaY); });

let startY = 0;
window.addEventListener('touchstart', (e) => { startY = e.touches[0].clientY; });
window.addEventListener('touchmove', (e) => {
    const currentY = e.touches[0].clientY;
    updateAnimation((startY - currentY) * 0.4);
    startY = currentY;
});
window.addEventListener('resize', updateStopPoint);