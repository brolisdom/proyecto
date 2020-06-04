if (window.innerWidth > 1024) {
    $(function () {
        $(".background").mgGlitch({
            destroy: false,
            glitch: true,
            scale: true,
            blend: true,
            blendModeType: 'hue',
            glitch1TimeMin: 1,
            glitch1TimeMax: 1000,
            glitch2TimeMin: 10,
            glitch2TimeMax: 800,
        });
        $(".bg-one").mgGlitch({
            destroy: false,
            glitch: true,
            scale: true,
            blend: true,
            blendModeType: 'hue',
            glitch1TimeMin: 1,
            glitch1TimeMax: 800,
            glitch2TimeMin: 10,
            glitch2TimeMax: 800,
        });
        $(".bg-about").mgGlitch({
            destroy: false,
            glitch: true,
            scale: true,
            blend: true,
            blendModeType: 'hue',
            glitch1TimeMin: 1,
            glitch1TimeMax: 800,
            glitch2TimeMin: 10,
            glitch2TimeMax: 800,
        });

    });
}
