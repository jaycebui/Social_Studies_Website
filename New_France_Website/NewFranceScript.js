// --- GLOBAL REGISTRY ---
const markerRegistry = {};


document.addEventListener("DOMContentLoaded", function() {
    const map = L.map('map', { attributionControl: false, zoomControl: false }).setView([47.5, -70.0], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


    const markerLayer = L.layerGroup().addTo(map);
    let playInterval = null;
    let hasJustLeftEvent = false;
    let isWaiting = false;


    const slider = document.getElementById('timeline-slider');
    const playBtn = document.getElementById('play-btn');


    // --- ICONS ---
    const cityIcon = L.divIcon({
        html: `<div style="position: relative; width: 26px; height: 26px; display: flex; align-items: flex-end; justify-content: center;">
                 <div class="icon-inner-wrapper"></div>
                 <div style="background: #2b6cb0; width: 8px; height: 14px; border: 1.5px solid #1a365d; margin-right: -2px;"></div>
                 <div style="background: #2c5282; width: 10px; height: 20px; border: 1.5px solid #1a365d; position: relative; z-index: 2;">
                     <div style="width: 100%; height: 4px; background: #1a365d; position: absolute; top: -5px; clip-path: polygon(50% 0%, 0% 100%, 100% 100%);"></div>
                 </div>
                 <div style="background: #2b6cb0; width: 8px; height: 12px; border: 1.5px solid #1a365d; margin-left: -2px;"></div>
               </div>`,
        className: 'custom-icon', iconSize: [26, 26]
    });


    const castleIcon = L.divIcon({
        html: `<div class="icon-inner-wrapper">
                 <div style="position: relative; width: 20px; height: 20px;">
                    <div style="background: #475569; width: 18px; height: 15px; position: absolute; bottom: 0; border: 1.5px solid #1e293b;"></div>
                    <div style="position: absolute; top: 1px; left: 0; width: 4px; height: 4px; background: #475569; border: 1px solid #1e293b; border-bottom: none;"></div>
                    <div style="position: absolute; top: 1px; left: 7px; width: 4px; height: 4px; background: #475569; border: 1px solid #1e293b; border-bottom: none;"></div>
                    <div style="position: absolute; top: 1px; left: 14px; width: 4px; height: 4px; background: #475569; border: 1px solid #1e293b; border-bottom: none;"></div>
                 </div>
               </div>`,
        className: 'custom-icon', iconSize: [20, 20], iconAnchor: [10, 20]
    });


    const rubble1Icon = L.divIcon({
        html: `<div class="icon-inner-wrapper"><div style="position:relative; width:20px; height:15px; background:#64748b; transform:rotate(-10deg);"></div></div>`,
        className: 'custom-icon', iconSize: [20, 15], iconAnchor: [10, 15]
    });


    const rubble2Icon = L.divIcon({
        html: `<div class="icon-inner-wrapper"><div style="position:relative; width:22px; height:8px; background:#475569; border-radius:2px;"></div><div style="position:absolute; bottom:5px; left:2px; width:10px; height:5px; background:#334155; transform:rotate(20deg);"></div></div>`,
        className: 'custom-icon', iconSize: [22, 13], iconAnchor: [11, 13]
    });


    // --- 13 FULL EVENTS ---
    const majorEvents = {
        1534: { text: "Cartier claims Gaspé for France.", coords: [48.83, -64.48], zoom: 8 },
        1535: { text: "Cartier reaches villages of Stadacona & Hochelaga.", coords: [46.81, -71.21], zoom: 7 },
        1608: { text: "Champlain founds Quebec City.", coords: [46.81, -71.21], zoom: 11 },
        1642: { text: "Maisonneuve & Mance found Montreal.", coords: [45.50, -73.55], zoom: 11 },
        1663: { text: "Royal Government established; Filles du Roi arrive.", coords: [46.81, -71.20], zoom: 10 },
        1670: { text: "Hudson's Bay Company (HBC) founded.", coords: [51.27, -80.64], zoom: 6 },
        1682: { text: "La Salle reaches the Mississippi mouth.", coords: [29.15, -89.25], zoom: 7 },
        1701: { text: "Great Peace of Montreal; Detroit founded.", coords: [45.50, -73.55], zoom: 9 },
        1713: { text: "Treaty of Utrecht; France loses Acadia.", coords: [52.09, 5.12], zoom: 5 },
        1755: { text: "Fall of Fort Beauséjour and Le Grand Dérangement.", coords: [45.10, -64.20], zoom: 7 },
        1759: { text: "Battle of the Plains of Abraham.", coords: [46.802, -71.218], zoom: 14 },
        1760: { text: "The Fall of the Triple Lock (Richelieu Forts).", coords: [45.7, -72], zoom: 7.8 },
        1763: { text: "Treaty of Paris; New France ceded to Britain.", coords: [48.85, 2.35], zoom: 5 }
    };


    const places = [
        { pos: [29.95, -90.07], label: "New Orleans", start: 1718, end: 1763,type: "major", desc: "The Back Door", icon: cityIcon, file: "NF_Settlements.html" },
        { pos: [46.81, -71.21], label: "Quebec City", start: 1608, end: 1763,type: "major", icon: cityIcon, file: "NF_Settlements.html" },
        { pos: [45.50, -73.55], label: "Montreal", start: 1642, end: 1763,type: "major", icon: cityIcon, file: "NF_Settlements.html" },
        { pos: [46.34, -72.54], label: "Trois-Rivières", start: 1634, end: 1763,type: "major", icon: cityIcon, file: "NF_Settlements.html" },
        { pos: [46.75, -71.34], label: "Cap-Rouge", start: 1541, end: 1763,type: "major", icon: cityIcon, file: "NF_Settlements.html" },
        { pos: [46.88, -71.14], label: "Beauport", start: 1634, end: 1763,type: "major", icon: cityIcon, file: "NF_Settlements.html" },
        { pos: [45.43, -73.67], label: "Lachine", start: 1667, end: 1763,type: "major", icon: cityIcon, file: "NF_Settlements.html" },
        { pos: [45.50, -73.45], label: "Boucherville", start: 1667, end: 1763,type: "major", icon: cityIcon, file: "NF_Settlements.html" },
        { pos: [45.53, -73.51], label: "Longueuil", start: 1657, end: 1763,type: "major", icon: cityIcon, file: "NF_Settlements.html" },
        { pos: [46.86, -71.27], label: "Charlesbourg", start: 1660, end: 1763,type: "major", icon: cityIcon, file: "NF_Settlements.html" },
        { pos: [45.42, -73.50], label: "La Prairie", start: 1667, end: 1763,type: "major", icon: cityIcon, file: "NF_Settlements.html" },
        { pos: [45.83, -73.37], label: "Beauregard", start: 1670, end: 1763,type: "major", icon: cityIcon, file: "NF_Settlements.html" },
        { pos: [45.85, -73.23], label: "Varennes", start: 1672, end: 1763,type: "major", icon: cityIcon, file: "NF_Settlements.html" },
        { pos: [45.89, -59.97], label: "Louisbourg Town", start: 1713, end: 1758,type: "major", icon: cityIcon, file: "NF_Settlements.html" },
        { pos: [42.33, -83.04], label: "Detroit", start: 1701, end: 1760,type: "major", icon: cityIcon, file: "NF_Settlements.html" },
        { pos: [38.08, -90.15], label: "Fort de Chartres Village", start: 1720, end: 1763,type: "major", icon: cityIcon, file: "NF_Settlements.html" },
        { pos: [46.48, -84.33], label: "Sault Ste. Marie", start: 1668, end: 1763, icon: cityIcon,type: "major", file: "NF_Settlements.html" },
        { pos: [45.69, -73.63], label: "Terrebonne", start: 1707, end: 1763, icon: cityIcon,type: "major", file: "NF_Settlements.html" },
        { pos: [45.89, -59.98], label: "Fort Louisbourg", start: 1713, end: 1758,type: "minor", desc: "The Front Door To the St. Lawrence River", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [44.23, -76.48], label: "Fort Frontenac", start: 1673, end: 1758,type: "minor", desc: "The Back Door", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [40.44, -80.01], label: "Fort Duquesne", start: 1754, end: 1758,type: "minor", desc: "The Western Gateway", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [45.84, -64.29], label: "Fort Beauséjour", desc: "The East Door of Acadia", start: 1751, end: 1755,type: "minor", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [46.046, -73.114], label: "Fort Richelieu", desc: "The Side or Iroquois Door", start: 1642, end: 1760,type: "minor", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [45.448, -73.277], label: "Fort Chambly", desc: "The Inner Bolt of the Richelieu", start: 1665, end: 1760,type: "minor", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [45.302, -73.252], label: "Fort Saint-Jean", desc: "The Threshold of the Richelieu", start: 1666, end: 1760,type: "minor", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [43.26, -79.06], label: "Fort Niagara", start: 1678, end: 1759,type: "minor", desc: "The Deadbolt", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [42.33, -83.05], label: "Fort Detroit", start: 1701, end: 1760,type: "minor", desc: "The Sentry", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [38.08, -90.15], label: "Fort de Chartres", start: 1720, end: 1763,type: "minor", desc: "Upper Louisiana HQ", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [38.74, -87.52], label: "Fort Vincennes", start: 1732, end: 1763,type: "minor", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [41.32, -89.46], label: "Fort Saint-Louis", start: 1682, end: 1721,type: "minor", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [30.40, -88.82], label: "Fort Maurepas", start: 1699, end: 1763,type: "minor", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [29.93, -89.98], label: "Fort de la Boulaye", start: 1700, end: 1707,type: "minor", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [44.71, -65.61], label: "Fort Anne", start: 1636, end: 1713,type: "minor", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [49.97, -98.29], label: "Fort La Reine", start: 1738, end: 1760,type: "minor", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [53.15, -99.27], label: "Fort Bourbon", start: 1741, end: 1760,type: "minor", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [52.41, -100.05], label: "Fort Dauphin", start: 1741, end: 1760,type: "minor", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [41.94, -80.08], label: "Fort Le Boeuf", start: 1753, end: 1759,type: "minor", icon: castleIcon, file: "NF_Forts.html" },
        { pos: [41.39, -79.84], label: "Fort Machault", start: 1754, end: 1759,type: "minor", icon: castleIcon, file: "NF_Forts.html" }
    ];
    // --- HELPER: GET ANCHOR ID ---
    function getAnchorID(label) {
    // This turns "New Orleans" into "neworleans"
    return label.toLowerCase().replace(/\s+/g, '');
}




    window.places = places;
    window.majorEvents = majorEvents;


    window.markerStore = {};


    function getNewFrancePopulation(year) {
        const data = [
            { y: 1534, p: 0 }, { y: 1608, p: 28 }, { y: 1663, p: 2500 },
            { y: 1700, p: 15000 }, { y: 1730, p: 34000 }, { y: 1754, p: 55000 }, { y: 1763, p: 65000 }
        ];
        for (let i = 0; i < data.length - 1; i++) {
            const a = data[i], b = data[i + 1];
            if (year >= a.y && year <= b.y) {
                const t = (year - a.y) / (b.y - a.y);
                return Math.round(a.p + t * (b.p - a.p)).toLocaleString();
            }
        }
        return "65,000+";
    }

const eraDatabase = [
    {
        year: 1534,
        lifestyle: "St. Lawrence Iroquoians reside in sophisticated, fortified villages containing upwards of fifty longhouses. Their lifestyle is dictated by the agricultural cycles of the 'Three Sisters' (corn, beans, and squash), supplemented by seasonal migratory fishing trips to the Gaspé Peninsula to harvest Atlantic mackerel and seal.",
        entertainment: "Social life revolves around the Peach Stone game, a complex gambling ritual involving wooden bowls and carved pits, alongside highly competitive lacrosse matches that serve both as athletic training and a spiritual method for settling inter-village diplomatic disputes.",
        territory: "The fertile St. Lawrence Valley serves as a vital corridor dominated by the powerful confederacies of Stadacona and Hochelaga, who control access to the interior river systems and prime agricultural land along the northern shores.",
        governance: "A deeply rooted matrilineal social structure where Clan Mothers hold the ultimate authority to appoint and remove civil chiefs. Decisions are reached through long-form consensus-building sessions where the welfare of future generations is the primary concern."
    },
    {
        year: 1541,
        lifestyle: "The first French attempt at a permanent colony, Charlesbourg-Royal, is marked by extreme physical hardship. Settlers face the devastating effects of scurvy and must learn to navigate increasingly strained relations with the local Stadaconan people, who become wary of European territorial ambitions.",
        entertainment: "Daily activities are limited to survival tasks, though early chroniclers spend their evenings journaling, sketching the unfamiliar flora and fauna of the North American wilderness, and recording the linguistic patterns of the Indigenous people they encounter.",
        territory: "The French attempt to fortify the heights of Cap-Rouge, but the settlement is eventually abandoned due to the brutal sub-zero winters and the realization that the 'diamonds' and 'gold' found nearby were actually worthless quartz and iron pyrites.",
        governance: "A rigid military hierarchy led by Jean-François de La Rocque de Roberval, who holds a royal commission as Lieutenant-General, though his absolute authority is constantly undermined by the lack of food and the high mortality rate of his crew."
    },
    {
        year: 1603,
        lifestyle: "The 'Great Tabagie' at Tadoussac marks a turning point in history. Large summer trading camps emerge where Innu, Algonquin, and Etchemin families gather to trade high-quality furs for European metal goods like copper kettles, steel knives, and woolen blankets.",
        entertainment: "Diplomacy is conducted through grand 'Tabagies' or ceremonial feasts. These events involve hours of singing, the ritual smoking of tobacco in stone pipes, and the delivery of elaborate, poetic speeches by master orators from both French and Indigenous backgrounds.",
        territory: "The rocky shores of Tadoussac act as the primary strategic gateway for the North American fur trade, sitting at the intersection of the St. Lawrence and the deep Saguenay River, leading into the fur-rich northern interior.",
        governance: "Governance is defined by the formation of 'The Alliance of 1603,' an informal but binding diplomatic agreement where the French agree to support their Indigenous partners in exchange for the right to settle and trade on the land."
    },
    {
        year: 1608,
        lifestyle: "With the founding of Quebec, life is a desperate battle against the elements. Only a handful of men survive the first winter; they are saved only by Indigenous knowledge regarding 'Anneda' (conifer tea) to cure scurvy and the construction of semi-subterranean shelters to block the wind.",
        entertainment: "To combat the psychological toll of isolation and the dark winter months, Samuel de Champlain establishes the 'Order of Good Cheer.' Members take turns hunting for fresh game and organizing weekly themed banquets featuring music, poetry, and theatrical performances.",
        territory: "The French presence is condensed into a single wooden 'Habitation'—a combination of a fort, warehouse, and residence—built on the site of a former Iroquoian village at the base of the massive cliffs of Cape Diamond.",
        governance: "The colony is operated as a commercial venture. Private merchant companies hold the monopoly on furs, and Champlain acts as the local commander, balancing the needs of the investors in France with the survival of the men on the ground."
    },
    {
        year: 1627,
        lifestyle: "The Seigneurial System is officially introduced to organize society into a hierarchy. However, the land remains a dense, intimidating forest. New settlers, known as 'défricheurs,' spend their entire lives using hand tools to clear just a few acres of stubborn ancient timber.",
        entertainment: "As Catholic missions expand, religious music becomes a central pillar of life. The Jesuit priests introduce choir singing and liturgical dramas, using music as a bridge to communicate with the Wendat (Huron) people during the early mission years.",
        territory: "Cardinal Richelieu grants the Company of One Hundred Associates legal ownership of a massive territory stretching from the Florida coast to the Arctic Circle, though effective French control is still limited to a few riverside outposts.",
        governance: "The Company is granted a total monopoly on trade in exchange for the legal obligation to transport and settle 4,000 Catholic colonists, marking the transition from a trade-only outpost to a true settlement colony."
    },
    {
        year: 1642,
        lifestyle: "The founding of Ville-Marie (Montreal) is a purely religious endeavor. The early residents live a monastic lifestyle, balancing hours of manual labor with rigorous prayer. Every task, from building the hospital to planting crops, is dedicated to the conversion of Indigenous peoples.",
        entertainment: "Social life is deeply tied to the liturgical calendar. Religious processions, the ringing of church bells for the Angelus, and the early celebrations of Saint-Jean-Baptiste day provide the only breaks in the grueling schedule of frontier life.",
        territory: "Montreal is established as the westernmost point of French influence. It is a dangerous, isolated island outpost that serves as the frontline in the escalating 'Beaver Wars' against the Haudenosaunee Confederacy.",
        governance: "The Société de Notre-Dame de Montréal, a private group of religious devotees in France, provides the funding and leadership for the colony, operating independently of the main commercial companies in Quebec City."
    },
    {
        year: 1663,
        lifestyle: "The arrival of the 'Filles du Roi' (King's Daughters) brings a surge of domestic stability. Life shifts from a masculine, nomadic fur-trade culture to a sedentary, family-oriented society. Large families are the norm, and the sounds of children and domestic livestock fill the riverside farms.",
        entertainment: "The culture of the 'habitants' begins to diverge from France. Sunday Mass becomes the primary social event of the week, where neighbors gather to gossip and trade goods, while evening folk dancing becomes a staple of rural wedding celebrations.",
        territory: "New France becomes a Royal Province. Land distribution accelerates as the Crown grants new Seigneuries along the Richelieu River and both shores of the St. Lawrence to retired soldiers of the Carignan-Salières Regiment.",
        governance: "The Sovereign Council is established in Quebec, creating a tripartite balance of power between the Governor (military), the Intendant (administration/economy), and the Bishop (social/religious affairs), reporting directly to King Louis XIV."
    },
    {
        year: 1680,
        lifestyle: "A permanent 'Habitant' class is now firmly established. These farmers are remarkably self-sufficient, spinning their own wool, crafting their own furniture, and developing a diet rich in eels, peas, and wild game. They have adapted fully to the North American climate and geography.",
        entertainment: "Winter 'veillées' become the soul of the culture. During the long frozen months, families gather in kitchens to share fiddling music, rhythmic spoon-playing, and the recitation of long, complex oral legends that blend French tradition with wilderness themes.",
        territory: "The 'Chemin du Roy' is envisioned as a way to unify the disparate parishes. The landscape is now characterized by the 'ribbon farm' pattern—narrow strips of land that ensure every family has access to the river for transportation and water.",
        governance: "The role of the 'Captain of the Militia' becomes crucial. Chosen from among the most respected local farmers, he acts as the King's representative in the parish, reading royal decrees after Mass and organizing communal labor for road building."
    },
    {
        year: 1701,
        lifestyle: "Following the Great Peace of Montreal, a era of relative security begins. The constant threat of raids diminishes, allowing farmers to build homes further away from the safety of fortified walls and leading to a significant expansion of the agricultural frontier.",
        entertainment: "Montreal hosts massive diplomatic summits involving over 1,300 delegates from dozens of Indigenous nations. These events feature high-stakes gift exchanges, complex wampum ceremonies, and massive communal feasts that last for several weeks.",
        territory: "The 'Coureurs des Bois' and explorers push deep into the continent. A line of small trading posts and missions now connects the St. Lawrence heartland to the Great Lakes and the vast Mississippi River basin all the way to the Gulf of Mexico.",
        governance: "The Governor-General in Quebec acts as the 'Great Father' in a continental alliance system, mediating disputes between far-flung Indigenous nations to maintain the stability of the fur trade and the security of the French empire."
    },
    {
        year: 1734,
        lifestyle: "The cities of Quebec and Montreal undergo a massive architectural transformation. After several devastating fires, the Intendant mandates that all new urban buildings be constructed of stone with thick firewalls, giving the cities a permanent, European appearance.",
        entertainment: "Urban social life becomes more refined. The colonial elite host public balls, musical salons, and equestrian parades. In the winter, the frozen river becomes a playground for high-speed horse-drawn sleigh races and ice-fishing expeditions for Atlantic tomcod.",
        territory: "The 'Chemin du Roy' is finally completed, creating the first land-based highway in the colony. It is now possible to travel from Quebec to Montreal in just four days, fundamentally changing the speed of mail delivery and government communication.",
        governance: "A sophisticated legal culture develops. The 'Custom of Paris' is used to resolve complex land and inheritance disputes, and the Intendant’s palace in Quebec becomes the bustling hub of the colony’s judicial and financial administration."
    },
    {
        year: 1750,
        lifestyle: "The 'Canadien' identity reaches its peak. Because of their varied diet and active lifestyle, the settlers are generally taller and healthier than their counterparts in Europe. They are highly mobile, often working as both farmers in the summer and fur traders in the winter.",
        entertainment: "The colony is a place of loud, vibrant celebrations. Religious feast days are marked by bonfires and musket volleys, while urban taverns become centers of political debate, card playing, and the singing of increasingly rebellious 'Canadien' folk songs.",
        territory: "New France is at its greatest territorial extent, an immense arc of forts and missions stretching from the fortress of Louisbourg on the Atlantic to the Illinois country and the mouth of the Mississippi at New Orleans.",
        governance: "The society is highly militarized due to rising tensions with the British. Every able-bodied man between the ages of 16 and 60 is an active member of the local militia, training regularly to defend their specific Seigneurie from invasion."
    },
    {
        year: 1760,
        lifestyle: "The final years are defined by the hardships of the Seven Years' War. Food shortages are widespread as the British blockade cuts off supplies from France. The population is forced to focus entirely on military defense and the preservation of their homes and churches.",
        entertainment: "Public entertainment nearly vanishes, replaced by the somber rhythms of military life. The sound of church bells is often replaced by the sound of alarm drums and the constant whistling of artillery fire as the fortified cities endure prolonged sieges.",
        territory: "The French territory shrinks rapidly under British naval and land pressure. Following the fall of Quebec on the Plains of Abraham, the remaining French forces and the colonial government retreat to Montreal for a final stand.",
        governance: "Normal civil administration collapses and is replaced by British military rule. General James Murray and his officers take over the management of the colony, marking the end of the French regime and the beginning of a new era of occupation."
    }
];

function updateContentCards(currentYear) {
    // Finds the historical era that matches or is just before the current year
    let activeEra = eraDatabase[0];
    
    for (let i = 0; i < eraDatabase.length; i++) {
        if (currentYear >= eraDatabase[i].year) {
            activeEra = eraDatabase[i];
        }
    }

    // Targets the IDs in your HTML to inject the historical facts
    const lifestyleEl = document.getElementById('Lifestyle');
    const entertainmentEl = document.getElementById('Entertainment');
    const territoryEl = document.getElementById('Territory');
    const governanceEl = document.getElementById('Governance');

    if (lifestyleEl) lifestyleEl.innerText = activeEra.lifestyle;
    if (entertainmentEl) entertainmentEl.innerText = activeEra.entertainment;
    if (territoryEl) territoryEl.innerText = activeEra.territory;
    if (governanceEl) governanceEl.innerText = activeEra.governance;
}
    


    function updateDisplay(year, isNavJump = false) {
        const y = parseInt(year);
        const yearDisp = document.getElementById('year-display');
        const popDisp = document.getElementById('newFrancePopulation');
        if (yearDisp) yearDisp.innerText = y;
        if (popDisp) popDisp.innerText = getNewFrancePopulation(y);
        updateContentCards(year);


        if (majorEvents[y] && !isNavJump) {
            lastEventYear = y;
            hasJustLeftEvent = true;
            handleMajorEvent(y, majorEvents[y]);
            return;
        }
        refreshMarkers(y);
    }


    function refreshMarkers(y) {
        markerLayer.clearLayers();
        window.markerStore = {};
        places.forEach(p => {
            if (y >= p.start && y <= p.end) {
                const cleanID = getAnchorID(p.label);
                const m = L.marker(p.pos, { icon: p.icon }).addTo(markerLayer)
                    .bindPopup(`<strong>${p.label}</strong><br><a href="${p.file}#${cleanID}" target="_blank">History</a>`);
                window.markerStore[p.label] = m;
            }
        });
    }


    function handleMajorEvent(year, eventData) {
        if (!eventData || !eventData.coords) return;
        stopTimeline();
        map.stop();
        map.flyTo(eventData.coords, eventData.zoom, { duration: 1.5 });


        map.once('moveend', () => {
            refreshMarkers(year);
            setTimeout(() => {
                const popupOffset = (year === 1760) ? [-450, 40] : [0, 0];
                let popupContent = `<div style="text-align:center;"><h2>${year}</h2><p>${eventData.text}</p>`;
                if (year === 1760) {
                    popupContent += `<button onclick="replay1760()" style="margin-top:10px; cursor:pointer; background:#2b6cb0; color:white; border:none; padding:6px 12px; border-radius:4px;">↺ Replay Destruction</button>`;
                }
                popupContent += `</div>`;
                L.popup({ offset: popupOffset, closeButton: true })
                    .setLatLng(eventData.coords)
                    .setContent(popupContent)
                    .openOn(map);


                if (year === 1760) runTripleLockAnimation();
            }, 50);
        });
    }


    async function runTripleLockAnimation() {
        const fortNames = ["Fort Saint-Jean", "Fort Chambly", "Fort Richelieu"];
        for (const name of fortNames) {
            let targetMarker = window.markerStore[name];
            if (!targetMarker) continue;


            const markerEl = targetMarker.getElement();
            const wrapper = markerEl ? markerEl.querySelector('.icon-inner-wrapper') : null;


            if (targetMarker.getPopup()) {
                targetMarker.getPopup().options.offset = [60, 0];
                targetMarker.getPopup().update();
            }


            if (wrapper) wrapper.classList.add('wobble-animation');
            await new Promise(r => setTimeout(r, 1000));


            targetMarker.setIcon(rubble1Icon);
            await new Promise(r => setTimeout(r, 330));


            const cloudContainer = document.createElement('div');
            cloudContainer.className = 'dust-container';
            for (let i = 0; i < 3; i++) {
                const circle = document.createElement('div');
                circle.className = `dust-circle circle-${i}`;
                cloudContainer.appendChild(circle);
            }
            if (markerEl) markerEl.appendChild(cloudContainer);


            targetMarker.setIcon(rubble2Icon);
            await new Promise(r => setTimeout(r, 800));
            markerLayer.removeLayer(targetMarker);
        }
    }


    window.replay1760 = function() {
        refreshMarkers(1760);
        runTripleLockAnimation();
    };


    function runTimeline() {
        playBtn.innerText = "⏸ Stop Timeline";
        playInterval = setInterval(() => {
            let val = parseInt(slider.value);
            if (val < 1763) { slider.value = ++val; updateDisplay(val); } else { stopTimeline(); }
        }, 120);
    }


    function stopTimeline() {
        clearInterval(playInterval);
        playInterval = null;
        if (playBtn) playBtn.innerText = "▶ Play Timeline";
    }


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
                map.flyTo([47.5, -70.0], 5, { duration: 1.2 });
                runTimeline();
            }, 1000);
        } else { runTimeline(); }
    }


    window.resetTimeline = function() {
        stopTimeline();
        slider.value = 1534;
        updateDisplay(1534);
        map.setView([47.5, -70.0], 5);
        hasJustLeftEvent = false;
    };


    slider.oninput = (e) => {
        stopTimeline();
        updateDisplay(e.target.value);
    };


  window.navTo = function(type, id) {
    // 1. Scroll to the top of the page (where the map is)
    window.scrollTo({ top: 0, behavior: 'smooth' });

    stopTimeline();
    
    // 2. Sync the Slider value
    const targetYear = (type === 'event') ? parseInt(id) : places.find(p => p.label === id)?.start;
    if (targetYear) {
        slider.value = targetYear;
    }

    if (type === 'place') {
        const target = places.find(p => p.label === id);
        if (target) {
            updateDisplay(target.start, true); 
            
            // 3. Move the map
            map.flyTo(target.pos, 10, { duration: 1.5 });
            
            // 4. Open the popup once the map settles
            map.once('moveend', () => {
                if (window.markerStore[id]) {
                    window.markerStore[id].openPopup();
                }
            });
        }
    } else {
        // Handle Event Navigation
        updateDisplay(parseInt(id), true);
        handleMajorEvent(id, majorEvents[id]);
    }
};


    function initLists() {
    // 1. Sort and filter data based on 'type' property
    const minorSites = places.filter(p => p.type === "minor").sort((a, b) => a.label.localeCompare(b.label));
    const majorSites = places.filter(p => p.type === "major").sort((a, b) => a.label.localeCompare(b.label));


   window.globalSearch = function() {
    const term = document.getElementById('master-global-search').value.toLowerCase();
    const listIDs = ['master-minor-list', 'master-major-list', 'master-events-list'];
   
    listIDs.forEach(id => {
        const container = document.getElementById(id);
        if (!container) return;
       
        const items = container.getElementsByTagName('li');
        for (let li of items) {
            // Get text from the list item
            const text = li.textContent.toLowerCase();
            // Toggle visibility
            if (text.includes(term)) {
                li.style.display = ""; // Shows item
            } else {
                li.style.display = "none"; // Hides item
            }
        }
    });
};
   


    // 2. Populate Minor List
    const minorContainer = document.getElementById('master-minor-list');
    if (minorContainer) {
        minorContainer.innerHTML = `<ul>${minorSites.map(p => `
            <li>
                <span class="site-link" onclick="navTo('place', '${p.label.replace(/'/g, "\\'")}')">${p.label}</span>
                <a class="info-link" href="${p.file}#${getAnchorID(p.label)}" target="_blank">Info</a>
            </li>`).join('')}</ul>`;
    }


    // 3. Populate Major List
    const majorContainer = document.getElementById('master-major-list');
    if (majorContainer) {
        majorContainer.innerHTML = `<ul>${majorSites.map(p => `
            <li>
                <span class="site-link" onclick="navTo('place', '${p.label.replace(/'/g, "\\'")}')">${p.label}</span>
                <a class="info-link" href="${p.file}#${getAnchorID(p.label)}" target="_blank">Info</a>
            </li>`).join('')}</ul>`;
    }


    // 4. Populate Events List
    const eventContainer = document.getElementById('master-events-list');
    if (eventContainer) {
        eventContainer.innerHTML = `<ul>${Object.keys(majorEvents).map(yr => `
            <li>
                <span class="site-link" onclick="navTo('event', '${yr}')"><strong>${yr}</strong>: ${majorEvents[yr].text.substring(0, 20)}...</span>
                <a class="info-link" href="InformEvents.html#${yr}" target="_blank">Info</a>
            </li>`).join('')}</ul>`;
    }
    }


const searchBar = document.getElementById('master-global-search');
    if (searchBar) {
        searchBar.addEventListener('input', window.globalSearch);
        searchBar.addEventListener('search', window.globalSearch);
    }
initLists();




// Listen for typing
searchBar.addEventListener('input', window.globalSearch);


// Listen for the 'X' button click (the 'search' event)
searchBar.addEventListener('search', window.globalSearch);


updateDisplay(1534);
});

