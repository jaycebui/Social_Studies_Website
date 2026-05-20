document.addEventListener("DOMContentLoaded", function() {
    const map = L.map('map', { attributionControl: false, zoomControl: false }).setView([44.5, -76.0], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);




    const markerLayer = L.layerGroup().addTo(map);
    let playInterval = null;
    let lastEventYear = null;
    let hasJustLeftEvent = false;
    let isWaiting = false;
    let currentManualEvent = null;



    const slider = document.getElementById('timeline-slider');
    const playBtn = document.getElementById('play-btn');
    const backBtnElement = document.getElementById('back-popup-btn');




    // --- MID-SIZED ICONS (BETTER FOR TOUCH) ---
    const longhouseIcon = L.divIcon({
        html: `<div style="background: #5d4037; width: 28px; height: 12px; border-radius: 8px 8px 2px 2px; border: 1.5px solid #3e2723; position: relative;">
                 <div style="position: absolute; width: 5px; height: 5px; background: #2b1d1a; bottom: 0; left: 11px; border-radius: 1px 1px 0 0;"></div>
               </div>`,
        className: 'custom-icon', iconSize: [28, 12]
    });




    const castleIcon = L.divIcon({
        html: `<div style="position: relative; width: 20px; height: 20px;">
                 <div style="background: #475569; width: 18px; height: 15px; position: absolute; bottom: 0; border: 1.5px solid #1e293b;"></div>
                 <div style="position: absolute; top: 1px; left: 0; width: 4px; height: 4px; background: #475569; border: 1px solid #1e293b; border-bottom: none;"></div>
                 <div style="position: absolute; top: 1px; left: 7px; width: 4px; height: 4px; background: #475569; border: 1px solid #1e293b; border-bottom: none;"></div>
                 <div style="position: absolute; top: 1px; left: 14px; width: 4px; height: 4px; background: #475569; border: 1px solid #1e293b; border-bottom: none;"></div>
               </div>`,
        className: 'custom-icon', iconSize: [20, 20]
    });




    const councilIcon = L.divIcon({
        html: `<div style="background: radial-gradient(circle, #fcd34d, #dc2626); width: 18px; height: 18px; border-radius: 50%; border: 2px solid #fbbf24; box-shadow: 0 0 6px #f59e0b;"></div>`,
        className: 'custom-icon', iconSize: [18, 18]
    });




    // --- DATASETS ---
    const majorEvents = {
        1350: { text: "Villages consolidate into fortified settlements.", coords: [42.8, -76.5], zoom: 7 },
        1450: { text: "The Great Law of Peace unites the Five Nations.", coords: [42.99, -76.15], zoom: 9 },
        1534: { text: "First contact with Jacques Cartier.", coords: [46.81, -71.21], zoom: 10 },
        1609: { text: "Battle at Lake Champlain.", coords: [44.0, -73.4], zoom: 8 },
        1649: { text: "Beaver Wars: Dispersion of the Wendat (Hurons).", coords: [44.74, -79.83], zoom: 9 },
        1667: { text: "Establishment of Kentake (Kahnawake).", coords: [45.41, -73.68], zoom: 10 },
        1701: { text: "Great Peace of Montreal.", coords: [45.50, -73.55], zoom: 10 },
        1744: { text: "Treaty of Lancaster.", coords: [40.03, -76.30], zoom: 8 },
        1768: { text: "Treaty of Fort Stanwix.", coords: [43.21, -75.45], zoom: 10 },
        1779: { text: "Sullivan Expedition scorched-earth campaign.", coords: [42.5, -77.0], zoom: 8 },
        1784: { text: "Migration to Grand River and Tyendinaga.", coords: [44.18, -77.10], zoom: 7 }
    };




    const places = [
        { pos: [42.94, -77.44], label: "Ganondagan (Seneca)", start: 1300, end: 1687, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [42.99, -76.15], label: "Onondaga (Council Fire)", start: 1450, end: 1800, icon: councilIcon, file: "InformMajorSites.html" },
        { pos: [43.00, -75.54], label: "Oneida Castle", start: 1400, end: 1800, icon: castleIcon, file: "InformMajorSites.html" },
        { pos: [43.21, -75.45], label: "Fort Stanwix", start: 1758, end: 1800, icon: castleIcon, file: "InformMajorSites.html" },
        { pos: [44.18, -77.10], label: "Tyendinaga", start: 1784, end: 1800, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [43.11, -80.12], label: "Grand River", start: 1784, end: 1800, icon: councilIcon, file: "InformMajorSites.html" },
        { pos: [45.41, -73.68], label: "Kahnawake", start: 1667, end: 1800, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [45.42, -73.57], label: "Hochelaga", start: 1450, end: 1540, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [46.81, -71.21], label: "Stadacona", start: 1450, end: 1545, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [42.75, -73.68], label: "Fort Orange", start: 1624, end: 1800, icon: castleIcon, file: "InformMajorSites.html" },
        { pos: [45.01, -74.69], label: "Akwesasne", start: 1750, end: 1800, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [45.42, -74.07], label: "Kanehsatake", start: 1721, end: 1800, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [42.92, -76.79], label: "Cayuga Castle", start: 1450, end: 1779, icon: castleIcon, file: "InformMinorSites.html" },
        { pos: [42.91, -74.28], label: "Ossernenon", start: 1640, end: 1666, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [42.95, -74.50], label: "Kanatsiohare", start: 1730, end: 1779, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [42.12, -76.80], label: "Newtown", start: 1770, end: 1779, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [43.26, -79.06], label: "Fort Niagara", start: 1726, end: 1800, icon: castleIcon, file: "InformMajorSites.html" },
        { pos: [44.23, -76.48], label: "Fort Frontenac", start: 1673, end: 1800, icon: castleIcon, file: "InformMajorSites.html" },
        { pos: [42.66, -77.83], label: "Little Beard's Town", start: 1750, end: 1779, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [42.88, -78.87], label: "Buffalo Creek", start: 1780, end: 1800, icon: councilIcon, file: "InformMajorSites.html" },
        { pos: [42.48, -76.49], label: "Coreorgonel", start: 1750, end: 1779, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [41.25, -76.85], label: "Canadaseago", start: 1700, end: 1779, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [43.05, -75.01], label: "German Flatts", start: 1723, end: 1800, icon: castleIcon, file: "InformMajorSites.html" },
        { pos: [41.20, -75.90], label: "Wyoming Valley", start: 1740, end: 1778, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [44.40, -75.80], label: "Oswegatchie", start: 1748, end: 1800, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [43.65, -79.38], label: "Teiaiagon", start: 1660, end: 1687, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [43.45, -79.68], label: "Quinaouatoua", start: 1660, end: 1690, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [44.15, -77.40], label: "Kente", start: 1668, end: 1680, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [43.15, -77.60], label: "Totiakton", start: 1600, end: 1687, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [42.30, -75.30], label: "Oquaga", start: 1700, end: 1778, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [43.08, -75.20], label: "Oriska", start: 1750, end: 1777, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [43.20, -76.40], label: "Fort Oswego", start: 1727, end: 1800, icon: castleIcon, file: "InformMajorSites.html" },
        { pos: [41.30, -74.30], label: "Minisink", start: 1650, end: 1779, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [43.50, -73.50], label: "Fort William Henry", start: 1755, end: 1757, icon: castleIcon, file: "InformMajorSites.html" },
        { pos: [43.80, -73.40], label: "Fort Ticonderoga", start: 1755, end: 1800, icon: castleIcon, file: "InformMajorSites.html" },
        { pos: [42.50, -75.00], label: "Unadilla", start: 1700, end: 1778, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [44.00, -76.00], label: "Sackets Harbor", start: 1790, end: 1800, icon: castleIcon, file: "InformMajorSites.html" },
        { pos: [42.70, -73.20], label: "Schaghticoke", start: 1675, end: 1750, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [43.02, -76.25], label: "Ganentaa Mission", start: 1656, end: 1658, icon: castleIcon, file: "InformMajorSites.html" },
        { pos: [45.50, -73.60], label: "Lachine", start: 1667, end: 1800, icon: castleIcon, file: "InformMajorSites.html" },
        { pos: [42.10, -79.30], label: "Conewango", start: 1700, end: 1779, icon: longhouseIcon, file: "InformMinorSites.html" },
        { pos: [42.05, -76.50], label: "Chemung", start: 1750, end: 1779, icon: longhouseIcon, file: "InformMinorSites.html" }
    ];
    // --- HELPER: GET ANCHOR ID ---
    function getAnchorID(label) {
        let parts = label.split(' ');
        let id = (parts[0].toLowerCase() === 'fort' && parts.length > 1) ? parts[1] : parts[0];
        return id.replace(/[’'()]/g, "");
    }


    function getIroquoianPopulation(year) {
    const data = [
        { y: 1300, p: 38000 },
        { y: 1400, p: 47000 },
        { y: 1500, p: 55000 },
        { y: 1550, p: 45000 },
        { y: 1600, p: 30000 },
        { y: 1650, p: 12000 },
        { y: 1700, p: 10000 },
        { y: 1745, p: 12000 },
        { y: 1780, p: 8000 },
        { y: 1800, p: 6000 }
    ];


    for (let i = 0; i < data.length - 1; i++) {
        const a = data[i];
        const b = data[i + 1];


        if (year >= a.y && year <= b.y) {
            const t = (year - a.y) / (b.y - a.y);
            const pop = Math.round(a.p + t * (b.p - a.p));
            return pop.toLocaleString();
        }
    }


    return "Unknown";
}



function updateDisplay(year, isNavJump = false) {
    const y = parseInt(year);
    
    // 1. Update Numbers & Labels
    const yearDisp = document.getElementById('year-display');
    const popDisp = document.getElementById('iroquoisPopulation');
    if (yearDisp) yearDisp.innerText = y;
    if (popDisp) popDisp.innerText = getIroquoianPopulation(y);

    // 2. Info Card Text Logic
    const life = document.getElementById('Lifestyle');
    const ent  = document.getElementById('Entertainment');
    const terr = document.getElementById('Territory');
    const gov  = document.getElementById('Governance');

    if (life && ent && terr && gov) {
    if (y < 1450) {
        life.innerText = "During this era, the St. Lawrence Iroquois and ancestral Haudenosaunee transitioned into year-round agricultural settlements. They utilized the fertile floodplains of the St. Lawrence Valley and the Finger Lakes, relying on the 'Three Sisters' (corn, beans, and squash) as their primary food source. Natural resources were abundant; they harvested white cedar for longhouse frames and elm bark for siding. Men hunted deer and moose in the dense forests, while women gathered medicinal herbs and maple sap. Transportation was achieved via sturdy elm-bark canoes for navigating the Great Lakes and river systems, supplemented by an extensive network of forest trails for overland trade and travel.";
        
        ent.innerText = "Entertainment was deeply spiritual and community-focused. This period saw the rise of 'The Creator's Game' (Lacrosse), often played with hundreds of warriors to settle disputes or bring healing to the sick. In winter, communal storytelling served as the primary means of passing down history and moral lessons. Games of skill, such as the snowsnake—where a wooden pole was slid down a narrow ice track—were popular for building coordination. Cultural beliefs centered on animism, where every natural object, from stones to stars, possessed a spirit that required respect and acknowledgement through seasonal ceremonies and dances.";
        
        terr.innerText = "The St. Lawrence Iroquois established fortified villages like Stadacona (Quebec City) and Hochelaga (Montreal) along the river's edge. To the south, the Five Nations (Mohawk, Oneida, Onondaga, Cayuga, and Seneca) marked out distinct territories across central New York. These homelands were chosen for their proximity to freshwater and high ground for defense. The region provided essential raw materials: flint for arrowheads, clay for pottery, and vast timber for village construction. These territories were not just borders but sacred spaces connected by the 'Great Trail,' allowing for significant movement and communication between the growing tribal nations.";
        
        gov.innerText = "Governance was matrilineal and organized by clans, such as the Bear, Wolf, and Turtle. Clan Mothers held the authority to select and depose male leaders (Sachems), ensuring that decisions reflected the community's long-term welfare. Beliefs were rooted in the 'Thanksgiving Address,' a protocol that opened all meetings by expressing gratitude for the earth. Decision-making relied on consensus, where every member's voice was represented through their clan. This early system emphasized communal harmony over individual power, a precursor to the formal Confederacy that would later unify the nations under a shared spiritual and political framework.";

    } else if (y < 1609) {
        life.innerText = "By the 1500s, the Haudenosaunee lived in massive, fortified villages containing up to 50 longhouses. Agriculture reached a peak, with massive cornfields surrounding the settlements. Natural resources were managed with great care; bark remained the primary material for tools, transportation, and architecture. Transportation saw the perfection of the elm-bark canoe, which, while heavier than birch bark, was highly durable for the rocky rivers of their territory. The way of life was defined by the cycle of the seasons: spring fishing, summer agriculture, autumn hunting, and winter communal living, all centered on a philosophy of sustainability and deep connection to the land's bounty.";
        
        ent.innerText = "Ceremonial entertainment became highly codified during this unification period. The Peach Stone Game, representing the struggle between the twin creators, became a central ritual of the Midwinter Ceremony. Social dances, accompanied by water drums and turtle-shell rattles, reinforced the community's bond. Lacrosse continued to be a major cultural fixture, often referred to as a 'medicine game' played to please the Creator. Wampum belts, crafted from quahog shells, became essential for documenting treaties and stories, serving as both artistic expression and a complex record-keeping system for their expanding diplomatic reach.";

        terr.innerText = "This era marked the unification of the Five Nations territory into the 'Longhouse.' The Mohawk guarded the 'Eastern Door' (Hudson River) and the Seneca guarded the 'Western Door' (Lake Erie). The St. Lawrence Iroquois villages began to decline or merge with other groups during this time. The territory was a strategic stronghold, controlling major portages and waterways that connected the Atlantic coast to the interior of North America. This geography provided a natural defensive advantage and control over the distribution of resources like furs and flint, solidifying the Confederacy's status as a dominant power in the northeastern woodlands.";

        gov.innerText = "The Great Law of Peace was fully established, creating one of the world's oldest living democracies. The Grand Council of 50 Chiefs met at Onondaga to handle matters of war and peace, while local Clan Mothers maintained domestic control. This governance was built on the 'One Bowl, One Spoon' principle, emphasizing that the territory’s resources were for all to share without conflict. Their beliefs shifted toward the 'Good Mind'—the idea that collective peace and rational thought were the highest human achievements. This sophisticated political structure allowed the Confederacy to maintain a united front against external threats while preserving the cultural autonomy of each nation.";
    }
}

    // 3. Update Markers
    markerLayer.clearLayers();
    places.forEach(p => {
        if (y >= p.start && y <= p.end) {
            const cleanID = getAnchorID(p.label);
            L.marker(p.pos, { icon: p.icon }).addTo(markerLayer)
                .bindPopup(`
                    <div style="text-align: center;">
                        <strong style="font-size: 1rem; color: #2c5282;">${p.label}</strong><br>
                        <span style="color: #718096; font-size: 0.8rem;">Active: ${p.start} — ${p.end}</span>
                        <hr style="margin: 8px 0; border: 0; border-top: 1px solid #eee;">
                        <a href="${p.file}#${cleanID}" target="_blank" style="color: #2b6cb0; font-weight: bold; text-decoration: none; font-size: 0.85rem;">History & Structure</a>
                    </div>
                `);
        }
    });

    // 4. Auto-Popup Event Logic (Manual & Auto)
    if (majorEvents[y] && !isNavJump) {
        lastEventYear = y;
        hasJustLeftEvent = true;
        if (backBtnElement) backBtnElement.classList.add('hidden');
        
        // Trigger the visual event
        handleMajorEvent(y, majorEvents[y]);
    }
}



    function handleMajorEvent(year, eventData) {
        stopTimeline();
        map.flyTo(eventData.coords, eventData.zoom, { duration: 1.5 });
        map.once('moveend', () => {
            if (!playInterval) {
                L.popup().setLatLng(eventData.coords)
                    .setContent(`<div style="text-align:center;"><h2>${year}</h2><p>${eventData.text}</p><a href="InformEvents.html#${year}" target="_blank">View Event Details</a></div>`)
                    .openOn(map);
            }
        });
    }




    // --- NAVIGATION ---
    function normalizeLabel(str) {
    return str.toLowerCase().replace(/['’]/g, "");
}




    window.navTo = function(type, label) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        stopTimeline();
        let target = (type === 'event')
    ? majorEvents[label]
    : places.find(p => normalizeLabel(p.label) === normalizeLabel(label));




        if (!target) return;




        slider.value = (type === 'event') ? label : target.start;
        updateDisplay(slider.value, true);




        map.flyTo((type === 'event' ? target.coords : target.pos), (type === 'event' ? target.zoom : 9), { duration: 1.5 });
        map.once('moveend', () => {
            if (!playInterval) {
               const cleanID = (type === 'event') ? label : getAnchorID(target.label);
               const infoFile = (type === 'event') ? "InformEvents.html" : target.file;
               const content = (type === 'event')
                    ? `<h2>${label}</h2><p>${target.text}</p><a href="${infoFile}#${cleanID}" target="_blank">History</a>`
                    : `<div style="text-align:center;"><strong>${target.label}</strong><br><span style="font-size:0.8rem;">Active: ${target.start}-${target.end}</span><br><a href="${infoFile}#${cleanID}" target="_blank">History</a></div>`;
               L.popup().setLatLng((type === 'event' ? target.coords : target.pos)).setContent(content).openOn(map);
            }
        });
    };




    // --- BACK BUTTON LOGIC ---
    window.goToLastPopup = function() {
        if (!lastEventYear || isWaiting) return;
        isWaiting = true;
        const oldText = backBtnElement.innerText;
        backBtnElement.innerText = "Wait...";
        setTimeout(() => {
            isWaiting = false;
            backBtnElement.innerText = oldText;
            navTo('event', lastEventYear);
            hasJustLeftEvent = true;
            backBtnElement.classList.add('hidden');
        }, 1000);
    };
    // --- Open Popup Button For Manual Mode ---
    window.openManualPopup = function() {
    if (!currentManualEvent) return;
    
    const { year, data } = currentManualEvent;
    
    // Fly to the location and open the popup manually
    map.flyTo(data.coords, data.zoom);
    
    L.popup()
        .setLatLng(data.coords)
        .setContent(`
            <div style="text-align:center;">
                <h2>${year}</h2>
                <p>${data.text}</p>
                <a href="InformEvents.html#${year}" target="_blank">Full History</a>
            </div>
        `)
        .openOn(map);
};


    // --- PLAYBACK CONTROLS ---
    function runTimeline() {
        playBtn.innerText = "⏸ Stop Timeline";
        playInterval = setInterval(() => {
            let val = parseInt(slider.value);
            if (val < 1800) { slider.value = ++val; updateDisplay(val); } else { stopTimeline(); }
        }, 120);
    }




    function stopTimeline() { clearInterval(playInterval); playInterval = null; playBtn.innerText = "▶ Play Timeline"; }
   
    window.togglePlay = function() { (playInterval) ? stopTimeline() : startTimeline(); };




    function startTimeline() {
        if (playInterval || isWaiting) return;
        map.closePopup();
        if (hasJustLeftEvent) {
            isWaiting = true;
            playBtn.innerText = "Wait...";
            setTimeout(() => {
                isWaiting = false;
                hasJustLeftEvent = false;
                backBtnElement.classList.remove('hidden');
                map.flyTo([44.5, -76.0], 5, { duration: 1.2 });
                runTimeline();
            }, 1000);
        } else { runTimeline(); }
    }




    window.resetTimeline = function() {
        stopTimeline();
        slider.value = 1300;
        updateDisplay(1300);
        map.closePopup();
        map.setView([44.5, -76.0], 5);
        backBtnElement.classList.add('hidden');
        lastEventYear = null;
        hasJustLeftEvent = false;
    };




    slider.oninput = (e) => {
        stopTimeline();
        map.closePopup();
        if (hasJustLeftEvent) {
            backBtnElement.classList.remove('hidden');
            hasJustLeftEvent = false;
        }
        updateDisplay(e.target.value);
    };
    // --- SEARCH & LISTS ---
    window.globalSearch = function() {
        const term = document.getElementById('master-global-search').value.toLowerCase();
        const lists = ['master-minor-list', 'master-major-list', 'master-events-list'];
        lists.forEach(id => {
            const items = document.getElementById(id).getElementsByTagName('li');
            for (let i = 0; i < items.length; i++) {
                items[i].style.display = items[i].textContent.toLowerCase().includes(term) ? "" : "none";
            }
        });
    };




    // --- NEW: UNIVERSAL FILTER FUNCTION FOR INDIVIDUAL SEARCH BARS ---
    window.filterList = function(inputID, listID) {
    const input = document.getElementById(inputID);
    const term = input.value.toLowerCase(); // This will be "" when X is clicked
    const items = document.getElementById(listID).getElementsByTagName('li');
    
    for (let i = 0; i < items.length; i++) {
        // If term is "", all items will include it and show up again!
        if (items[i].textContent.toLowerCase().includes(term)) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
};

    function clearSearch(inputID, listID) {
    const input = document.getElementById(inputID);
    input.value = ""; // Empty the box
    input.focus();    // Put the cursor back in
    filterList(inputID, listID); // Refresh the list to show everything
}


    const minorSites = places.filter(p => p.icon === longhouseIcon).sort((a,b) => a.label.localeCompare(b.label));
    const majorSites = places.filter(p => p.icon !== longhouseIcon).sort((a,b) => a.label.localeCompare(b.label));
   
    document.getElementById('master-minor-list').innerHTML = `<ul>${minorSites.map(p => `
        <li><span class="site-link" onclick="navTo('place', \`${p.label}\`)"
>${p.label} <small>(${p.start}-${p.end})</small></span>
        <a class="info-link" href="InformMinorSites.html#${getAnchorID(p.label)}" target="_blank">Info</a></li>`).join('')}</ul>`;




    document.getElementById('master-major-list').innerHTML = `<ul>${majorSites.map(p => `
        <li><span class="site-link" onclick="navTo('place', \`${p.label}\`)"
>${p.label} <small>(${p.start}-${p.end})</small></span>
        <a class="info-link" href="InformMajorSites.html#${getAnchorID(p.label)}" target="_blank">Info</a></li>`).join('')}</ul>`;




    document.getElementById('master-events-list').innerHTML = `<ul>${Object.keys(majorEvents).map(yr => `
        <li><span class="site-link" onclick="navTo('event', '${yr}')"><strong>${yr}</strong>: ${majorEvents[yr].text.substring(0,18)}...</span>
        <a class="info-link" href="InformEvents.html#${yr}" target="_blank">Info</a></li>`).join('')}</ul>`;




    updateDisplay(1300);
});









