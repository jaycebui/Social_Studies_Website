let audioCtx;

function playSound(f) {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    let o = audioCtx.createOscillator();
    let g = audioCtx.createGain();
    o.type = 'triangle'; // Ethereal chime type
    o.frequency.setValueAtTime(f, audioCtx.currentTime);
    g.gain.setValueAtTime(0, audioCtx.currentTime);
    g.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.05);
    g.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);
    o.connect(g);
    g.connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + 1);
}

// Attach listeners specifically to your classes
document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('new-france-gold-button')) {
        playSound(523); // High C chime
    } else if (e.target.classList.contains('new-france-link')) {
        playSound(392); // G chime
    }
});

// Edge/Chrome Audio Unlocker
window.addEventListener('mousedown', () => {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}, { once: true });