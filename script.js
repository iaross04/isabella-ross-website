// Wait for the page to load
window.addEventListener('load', () => {
    const path = document.getElementById('joao-path');
    const dot = document.getElementById('joao-dot');
    const svg = document.getElementById('preloader-svg');
    
    // Get the actual path length for accurate drawing
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength; // Start hidden
    
    // Animation Timeline
    const tl = gsap.timeline();
    
    // Step 1: Dot is already visible (from CSS)
    // Step 2: Draw the path (simulate writing "João" from the dot)
    tl.to(path, {
        strokeDashoffset: 0,
        duration: 2.5, // Time to "draw" the path
        ease: 'power1.inOut'
    })
    // Step 3: Fade out the dot (so it blends with the path)
    .to(dot, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
    }, "-=0.2") // Slight overlap with path drawing
    // Step 4: Move the entire SVG up
    .to(svg, {
        y: -100, // Move up by 100px (adjust for effect)
        duration: 0.8,
        ease: 'power2.out'
    })
    // Step 5: Fade out preloader (whole thing, including any remaining elements)
    .to('#preloader', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
            document.getElementById('preloader').style.display = 'none';
        }
    })
    // Step 6: Fade in main content
    .to('#main', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    }, "-=0.3"); // Overlap with preloader fade for smoothness
});