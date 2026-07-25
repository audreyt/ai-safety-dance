// The poor man's jQuery
window.$ = (query, el=document)=>{
    return document.querySelector(query);
};
window.$all = (query, el=document)=>{
    return [...document.querySelectorAll(query)];
};

/////////////////////////////////////////////////////////////
// READING PREFERENCES //////////////////////////////////////
/////////////////////////////////////////////////////////////

// This block runs while <head> is still parsing, before <body> exists, so it
// writes onto <html>. That's the whole point: a reader who chose dark mode on
// the intro must not get a white flash on their way into chapter one.
window.ReadingPrefs = (()=>{

    const KEY = "aisafety.reading",
          DEFAULTS = {
              dark: window.matchMedia
                  ? window.matchMedia('(prefers-color-scheme: dark)').matches
                  : false,
              size: 18,
              font: "serif"
          };

    let prefs = {...DEFAULTS};
    try{
        // A reader in private mode, or one who blocks storage, still gets defaults.
        Object.assign(prefs, JSON.parse(window.localStorage.getItem(KEY) || "{}"));
    }catch(e){ /* no storage, no memory, no problem */ }

    const apply = ()=>{
        const html = document.documentElement;
        html.setAttribute("dark_mode", prefs.dark ? "yes" : "no");
        html.setAttribute("font_family", prefs.font);
        html.style.fontSize = prefs.size + "px";
    };
    apply();

    return {
        get: ()=> ({...prefs}),
        set(changes){
            Object.assign(prefs, changes);
            apply();
            try{ window.localStorage.setItem(KEY, JSON.stringify(prefs)); }catch(e){}
        },
        reset(){ this.set({...DEFAULTS, dark:false}); }
    };

})();

// TODO: not DOMContentLoaded??!??!?
window.addEventListener("DOMContentLoaded", ()=>{

    /////////////////////////////////////////////////////////////
    // SIDEBAR SHTUFF ///////////////////////////////////////////
    /////////////////////////////////////////////////////////////

    // SIDEBAR TABS
    // Each one toggles its respective sidebar panel
    $all("#sidebar_tabs > div").forEach( (tab)=>{
        let panelName = tab.id.slice(4); // after "tab_"
        tab.onclick = ()=>{
            document.body.setAttribute("sidebar_state", "open");
            if(currentPanelName == panelName){
                closePanel();
            }else{
                revealPanel(panelName);
            }
        };
    });

    // SIDEBAR PANELS
    let currentPanelName = '';
    // Reveal 'em
    let revealPanel = (panelName)=>{
        // Remember current one
        currentPanelName = panelName;
        // Open up
        document.body.setAttribute("sidebar_state", "open");
        // Hide all except one
        $all("#sidebar > div").forEach( (panelPage)=>{
            panelPage.style.display = 'none';
        });
        $(`#panel_${panelName}`).style.display = 'block';
        // Don't close plz
        startToClose = false;
    };
    // Close 'em
    let closePanel = ()=>{
        currentPanelName = '';
        document.body.setAttribute("sidebar_state", "closed");
    };
    // The overlay behind the panel, above content
    // Must mouse over it for >0.5s to count
    let closeCountdown = 0,
        startToClose = false;
    let startClosingMouseHandler = (event)=>{ // mouseover OR click
        closeCountdown = 100;
        startToClose = true;
    };
    $("#return_to_content").onmouseover = startClosingMouseHandler;
    $("#return_to_content").onclick = startClosingMouseHandler;
    $("#return_to_content").ontouchstart = startClosingMouseHandler;
    $("#return_to_content").onmouseleave = ()=>{
        startToClose = false;
    };
    setInterval(()=>{
        if(startToClose){
            if(closeCountdown<=0) closePanel();
            else closeCountdown-=10;
        }
    },10);

    // HACK: Catching scrolls on Table of Contents only
    let panel_toc = $("#panel_toc");
    panel_toc.addEventListener("scroll",(e)=>{
        e.stopPropagation();
    },true);
    // sidebar overflow hide
    // thx https://gist.github.com/kevsimpson/7309923
    panel_toc.onmouseover = ()=>{
        document.body.style.overflow = 'hidden';
    };
    panel_toc.onmouseout = ()=>{
        document.body.style.overflow = '';
    };

    // SIDEBAR: TABLE OF CONTENTS
    // Populate it! Each entry also becomes a scroll-spy section (see below).
    let allHeadings = $all("h1, h2, h3, h4, h5, h6");
    let tocHTML = "";
    let tocSections = []; // [{ anchor, link }] in document order

    if(allHeadings.length==0){
        $('#tab_toc').style.display = 'none';
    }else{

        // Add a fake h1 in the beginning!
        let fakeH1 = document.createElement('h1');
        fakeH1.innerText = $('title').innerText;
        fakeH1.style.display = 'none';
        $('#header').insertBefore(fakeH1, $('#header').firstChild);
        allHeadings.unshift(fakeH1);

        // For the rest, though...
        let anchored = [];
        let slugsUsed = {};
        tocHTML = '<ul id="toc_list">';
        allHeadings.forEach( (heading)=>{

            // IF IT'S A COLLAPSED NUTSHELL, SKIP.
            if(heading.innerText.trim()[0]==":") return;

            // Table of Contents link
            let headingText = heading.innerText,
                // Keep Unicode word characters (letters, numbers from any language)
                // Replace spaces with hyphens, remove punctuation, lowercase
                headingForURI = headingText
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, '-')                    // spaces to hyphens
                    .replace(/[^\p{L}\p{N}\-]/gu, '')        // keep letters, numbers, hyphens (Unicode-aware)
                    .replace(/-+/g, '-')                     // collapse multiple hyphens
                    .replace(/^-|-$/g, '');                  // trim hyphens from ends
            // Two headings can reduce to the same slug once emoji and punctuation
            // are stripped. Duplicate ids would send both links to the first one.
            slugsUsed[headingForURI] = (slugsUsed[headingForURI] || 0) + 1;
            if(slugsUsed[headingForURI] > 1) headingForURI += '-' + slugsUsed[headingForURI];
            // What heading hierarchy? that's the indentation! (1em for each past h2)
            let hierarchy = parseInt(heading.tagName[1]);
            if(hierarchy>2){
                let indent = (hierarchy-2);
                tocHTML += `<li style="padding-left:${indent}em">`;
            }else{
                tocHTML += '<li>';
            }
            tocHTML += `<a target='_self' class='black-link' href="#${headingForURI}">${headingText}</a>`;
            tocHTML += '</li>';

            // The id goes on the heading itself. It used to go on an empty <a>
            // inserted just before it — but that anchor sits at the tail of the
            // preceding section, so Nutshell swallowed every anchor that followed
            // a `:x` block when it collapsed them, breaking those links outright.
            heading.id = headingForURI;
            anchored.push(heading);

        });
        tocHTML += '</ul>';

        $('#panel_toc').innerHTML = tocHTML;

        // Both arrays were built by the same loop, so pair them by position.
        let tocLinks = $all('#toc_list > li > a');
        tocSections = anchored.map((heading, i)=>({ heading, link: tocLinks[i] }))
                              .filter(section=>section.link);

    }

    // READING CONTROLS
    // The panel is a *view* of ReadingPrefs, which already applied itself in <head>.
    const fontSizeLabel = $("#style_fontsize"),
          darkCheckbox = $("#style_dark_mode"),
          sizeSlider = $("#style_fontsize_slider");

    let syncPanelFromPrefs = ()=>{
        const prefs = ReadingPrefs.get();
        darkCheckbox.checked = prefs.dark;
        sizeSlider.value = prefs.size;
        fontSizeLabel.innerText = prefs.size + 'px';
        $(`input[value=${prefs.font}]`).checked = true;
    };
    let readPanelIntoPrefs = ()=>{
        ReadingPrefs.set({
            dark: darkCheckbox.checked,
            size: parseInt(sizeSlider.value),
            font: $all("input[name=style_font_family]").find(radio=>radio.checked).value
        });
        fontSizeLabel.innerText = ReadingPrefs.get().size + 'px';
    };

    $("#style_dark_mode_container").onclick = ()=>{
        darkCheckbox.checked = !darkCheckbox.checked;
        readPanelIntoPrefs();
    };
    sizeSlider.oninput = readPanelIntoPrefs;
    $all("input[name=style_font_family]").forEach(radio=>{
        radio.onclick = readPanelIntoPrefs;
    });
    $("#style_reset").onclick = ()=>{
        ReadingPrefs.reset();
        syncPanelFromPrefs();
    };

    syncPanelFromPrefs();

    ////////////////////////////////////////////////////////////
    // SCROLLY for NOT-FRONTPAGE pages /////////////////////////
    ////////////////////////////////////////////////////////////

    // RAF: parallax the splash image, and jitter the CRT scanlines + static.
    // Only while the header is actually on screen, and never for readers who
    // asked their OS for less motion — this used to burn a frame forever.
    const splash_image = $("#splash_image"),
          crt_lines = $("#crt_lines"),
          static_ = $("#static"),
          nb_crt_lines = $("#nb--crt_lines"),
          nb_static = $("#nb--static"),
          header = $("#header"),
          wantsMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let clicker = 0,
        crtY = 0,
        staticY = 0,
        animating = false;
    let animloop = ()=>{
        // Nothing here is visible once the header has scrolled away, so park the
        // loop instead of burning a frame every 16ms for the rest of the article.
        if(window.scrollY >= header.offsetHeight){
            animating = false;
            return;
        }
        splash_image.style.top = (window.scrollY*0.3)+"px";
        clicker++;
        if(clicker>3){
            clicker = 0;
            crtY += 5;
            staticY += 100 + Math.floor(Math.random()*100);
            crt_lines.style.backgroundPositionY = crtY+"px";
            if(nb_crt_lines) nb_crt_lines.style.backgroundPositionY = crtY+"px";
            static_.style.backgroundPositionY = staticY+"px";
            if(nb_static) nb_static.style.backgroundPositionY = staticY+"px";
        }
        requestAnimationFrame(animloop);
    };
    // Called again by the scroll engine when the header comes back into view.
    let startAnimloop = ()=>{
        if(animating || !wantsMotion) return;
        animating = true;
        requestAnimationFrame(animloop);
    };
    startAnimloop();



    ////////////////////////////////////////////////////////////
    // FOR POSTS: PUB DATE, FEETNOTES, READING TIME ////////////
    ////////////////////////////////////////////////////////////

    // All CONTENT links that go to "#" are self!
    $all('#content a').filter(a=>{
        let href = a.getAttribute('href');
        if(!href) return;
        return href[0]=="#"
    }).forEach(a=>{
        a.target = '_self';
    });

    // Footnotes: Littlefoot 'em, THEN hide with Nutshell
    littlefoot.littlefoot({
        activateOnHover: true,
        activateDelay: 0,
        hoverDelay: 0,
        dismissOnUnhover: true,
        buttonTemplate: `<button
            aria-label="Footnote <% number %>"
            class="littlefoot__button"
            id="<% reference %>"
        /><% number %></button>`
    });
    // Littlefoot wraparound bug:
    // Swap around print & hover footnotes, shift leftwards by whatever
    $all(".footnote-ref.littlefoot--print").forEach(printFootnote=>{
        const parentNode = printFootnote.parentNode,
              hoverFootnote = printFootnote.previousSibling,
              width = printFootnote.getBoundingClientRect().width;
        parentNode.insertBefore(printFootnote, hoverFootnote);
        hoverFootnote.style.marginLeft = (-width + 3) + "px";
    });

    // Make a : footnote header before hiding in Nutshell (if any exist)
    let footnotesDivider = $(".footnotes-sep");
    if(footnotesDivider){

        // Make that header
        let foo = document.createElement("h1");
        foo.innerHTML = ":x All Feetnotes";
        $(".footnotes-sep").after(foo);

        // Remove all "↩︎" links
        $all(".footnote-backref").forEach((back)=>{
            back.remove();
        });

    }
    Nutshell.start(); // either way, lol start!

    // READING TIME
    // Counting whitespace works for English prose and collapses for Chinese, where
    // the only spaces are the ones we put between 漢字 and Latin. Count the two
    // scripts separately: ~350 漢字/min matches the same reader doing ~180 wpm.
    const TEXT = $("#content").innerText,
          HANZI = (TEXT.match(/[\u3400-\u9fff\uf900-\ufaff]/g) || []).length,
          LATIN_WORDS = (TEXT.match(/[A-Za-z0-9][A-Za-z0-9'’.-]*/g) || []).length,
          // Lowballed on purpose: there are pictures, Orbits, Nutshells and feetnotes.
          READING_TIME_IN_MINUTES = Math.ceil(HANZI/350 + LATIN_WORDS/180);

    // THE SCROLL ENGINE
    // One rAF-throttled handler drives everything that depends on scroll position:
    // the clock, the progress bar, the sticky-nav shadow, the back-to-top button,
    // and which table-of-contents entry is highlighted.
    const HEADER_CONTENT_GAP = 48,
          CONTENT_FOOTER_GAP = 67;
    const CLOCK_SPRITESHEET_WIDTH = 12;

    const clockIcon = $("#clock_icon"),
          clockLabel = $("#clock_label"),
          progressBar = $("#reading_progress_bar"),
          chapterNav = $("#chapter_nav"),
          toTop = $("#to_top"),
          content = $("#content");

    // Section offsets are measured, not read every frame; re-measure whenever the
    // layout can have moved (fonts arriving, a Nutshell expanding, a resize).
    let sectionTops = [];
    let measure = ()=>{
        // A hidden heading (the fake h1, or one Nutshell has collapsed) has no box
        // and reports top 0. Left raw, that zero sorts before everything and pins
        // the highlight, so carry the previous offset forward instead.
        let previous = 0;
        sectionTops = tocSections.map(section=>{
            if(section.heading.offsetParent === null) return previous;
            previous = section.heading.getBoundingClientRect().top + window.scrollY;
            return previous;
        });
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

    let currentSection = -1;
    let onScroll = ()=>{

        const scrollY = window.scrollY,
              viewportHeight = document.body.clientHeight;

        // How far through the article are we? (0 at the top, 1 at the last line)
        let btmOfContent = header.getBoundingClientRect().height
                           + HEADER_CONTENT_GAP
                           + content.getBoundingClientRect().height
                           + CONTENT_FOOTER_GAP;
        let range = btmOfContent - viewportHeight,
            ratio = range > 0 ? scrollY / range : 0;
        if(ratio<0) ratio=0;
        if(ratio>1) ratio=1;

        // Clock face: 120 frames on a 12-wide spritesheet.
        let frame = Math.floor(ratio*119),
            y = Math.floor(frame/CLOCK_SPRITESHEET_WIDTH),
            x = frame % CLOCK_SPRITESHEET_WIDTH;
        clockIcon.style.backgroundPosition = `${x*-100}% ${y*-100}%`;

        let timeLeft = Math.ceil( (1-ratio)*READING_TIME_IN_MINUTES );
        clockLabel.innerHTML = (timeLeft==0) ? "🎉🎉🎉" : `~${timeLeft}m`;

        progressBar.style.width = (ratio*100) + "%";
        if(scrollY < header.offsetHeight) startAnimloop();
        chapterNav.classList.toggle("stuck", scrollY > header.offsetHeight);
        toTop.classList.toggle("on", scrollY > viewportHeight * 1.4);

        // Scroll-spy: the last section whose anchor is above the reading line.
        if(sectionTops.length){
            let line = scrollY + viewportHeight * 0.3,
                index = 0;
            for(let i=0; i<sectionTops.length; i++){
                if(sectionTops[i] <= line) index = i;
            }
            if(index !== currentSection){
                if(currentSection >= 0) tocSections[currentSection].link.removeAttribute("aria-current");
                currentSection = index;
                const link = tocSections[index].link;
                link.setAttribute("aria-current", "true");
                // A 24-entry contents list scrolls; keep the highlight visible in it.
                if(document.body.getAttribute("sidebar_state") === "open"){
                    link.scrollIntoView({ block:"nearest", behavior: wantsMotion ? "smooth" : "auto" });
                }
            }
        }

    };

    let queued = false;
    window.addEventListener("scroll", ()=>{
        if(queued) return;
        queued = true;
        requestAnimationFrame(()=>{ queued = false; onScroll(); });
    }, { passive:true });
    onScroll();

    toTop.onclick = ()=>{
        window.scrollTo({ top:0, behavior: wantsMotion ? "smooth" : "auto" });
    };

    ////////////////////////////////////////////////////////////
    // KEYBOARD ////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    // Chapter order, for ← and →. Derived from the nav so it cannot drift.
    const chapterLinks = $all("#chapter_nav_centered > a"),
          hereIndex = chapterLinks.findIndex(link=>link.querySelector("div[selected]"));

    document.addEventListener("keydown", (event)=>{

        if(event.metaKey || event.ctrlKey || event.altKey) return;

        // Orbit flashcards take typed answers, and the signup form takes an email.
        const target = event.target;
        if(target && target !== document.body){
            if(target.isContentEditable) return;
            if(/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
            if(target.closest && target.closest("orbit-prompt, orbit-reviewarea, [data-fillout-id]")) return;
        }

        switch(event.key){
            case "t": $("#tab_toc").click(); break;
            case "s": $("#tab_style").click(); break;
            case "Escape": closePanel(); break;
            case "ArrowLeft":
                if(hereIndex>0) chapterLinks[hereIndex-1].click();
                break;
            case "ArrowRight":
                if(hereIndex>=0 && hereIndex<chapterLinks.length-1) chapterLinks[hereIndex+1].click();
                break;
            default: return;
        }
        event.preventDefault();

    });

});
