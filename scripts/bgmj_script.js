
(function () {

    var revealBack = document.getElementById('revealBack');
    var revealMid = document.getElementById('revealMid');
    var revealFront = document.getElementById('revealFront');
    // how far above their resting position each layer starts, in px
    var BACK_OFFSET = 250;
    var MID_OFFSET = 155;
    var FRONT_OFFSET = 50;

    // how much of the page's scroll range it takes to finish the drop
    // (1 = finishes exactly at the bottom of the page; 0.5 = finishes halfway down)
    var SCROLL_RANGE = 1;

    var ticking = false;

    function update() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var raw = docHeight > 0 ? scrollTop / (docHeight * SCROLL_RANGE) : 0;
        var progress = Math.max(0, Math.min(1, raw)); // 0 at top, 1 once settled

        var backY = BACK_OFFSET * (1 - progress); // starts at -OFFSET (up), eases to 0
        var midY = MID_OFFSET * (1 - progress);
        var frontY = FRONT_OFFSET * (1 - progress);

        revealBack.style.transform = 'translateY(-' + backY + 'px)';
        revealMid.style.transform = 'translateY(-' + midY + 'px)';
        revealFront.style.transform = 'translateY(-' + frontY + 'px)';
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });

    update();
})();