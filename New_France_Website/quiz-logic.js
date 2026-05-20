const quizData = [
    { 
        q: "In what year did Samuel de Champlain found the settlement of Quebec?", 
        a: ["1534", "1604", "1608", "1642"], 
        c: 2,
        e: "Quebec was founded in 1608. Champlain chose the site because of its strategic location at the narrowing of the St. Lawrence River, which allowed for better control of the fur trade."
    },
    { 
        q: "What was the primary economic motivation for the colonization of New France?", 
        a: ["Gold mining", "The Fur Trade", "Sugar plantations", "Fishing only"], 
        c: 1,
        e: "The demand for beaver felt hats in Europe drove the economy. Furs were obtained through alliances with Indigenous groups like the Huron-Wendat and the Innu."
    },
    { 
        q: "Who were the 'Filles du Roi' (King's Daughters)?", 
        a: ["French Princesses", "Female soldiers", "Young women sent to marry settlers", "Nuns who founded hospitals"], 
        c: 2,
        e: "Between 1663 and 1673, King Louis XIV sponsored about 800 young women to travel to New France to marry settlers and help increase the colony's population."
    },
    { 
        q: "What was the 'Seigneurial System'?", 
        a: ["A military rank", "A land distribution method", "A type of tax", "A religious ceremony"], 
        c: 1,
        e: "Land was divided into long, narrow strips along the St. Lawrence River. Seigneurs (landowners) granted these lots to habitants (farmers) who cleared the land and paid small dues."
    },
    { 
        q: "Which official was responsible for the daily administration, justice, and economy of the colony?", 
        a: ["The Governor", "The Intendant", "The Bishop", "The Captain of the Militia"], 
        c: 1,
        e: "The Intendant, such as Jean Talon, was the most powerful administrative official. While the Governor handled the military, the Intendant handled the 'people's business'."
    },
    { 
        q: "Who founded Ville-Marie (modern-day Montreal) in 1642?", 
        a: ["Samuel de Champlain", "Paul de Chomedey, Sieur de Maisonneuve", "Jacques Cartier", "Jean Talon"], 
        c: 1,
        e: "Maisonneuve and Jeanne Mance founded Montreal as a religious mission named Ville-Marie, intended to be a center for converting Indigenous people to Christianity."
    },
    { 
        q: "What was the name of the adventurous young men who traveled inland to trade furs without a license?", 
        a: ["Seigneurs", "Habitants", "Coureurs des bois", "Voyageurs"], 
        c: 2,
        e: "Meaning 'runners of the woods,' these men lived among Indigenous nations and were essential for the fur trade, though the government often considered them outlaws."
    },
    { 
        q: "In 1663, New France transitioned from a trading company rule to:", 
        a: ["British rule", "A democracy", "Royal Government", "Independence"], 
        c: 2,
        e: "Louis XIV took direct control, making New France a royal province. He established the Sovereign Council, which included the Governor, Intendant, and Bishop."
    },
    { 
        q: "Who was the first Bishop of New France?", 
        a: ["François de Laval", "Jean de Brébeuf", "Marguerite Bourgeoys", "Louis Jolliet"], 
        c: 0,
        e: "Bishop Laval arrived in 1659. He was responsible for the spiritual life of the colony and founded the Séminaire de Québec to train future priests."
    },
    { 
        q: "What was the main purpose of the 'Chemin du Roy' completed in 1737?", 
        a: ["A secret escape route", "A trade route to the US", "To connect Quebec, Trois-Rivières, and Montreal", "To transport timber"], 
        c: 2,
        e: "The Chemin du Roy was the first major road in New France, allowing travel between the three main cities in about four days by horse-drawn carriage."
    },
    { 
        q: "Which group of people were responsible for most of the exploration of the interior of North America?", 
        a: ["Seigneurs", "The British", "Voyageurs and Jesuits", "Filles du Roi"], 
        c: 2,
        e: "Voyageurs searched for new fur sources, while Jesuit missionaries traveled to remote areas to establish missions among Indigenous nations."
    },
    { 
        q: "What was the outcome of the 'Great Peace of Montreal' in 1701?", 
        a: ["The French left Canada", "A treaty between the French and 40 Indigenous nations", "A war with the British", "The founding of Quebec"], 
        c: 1,
        e: "This historic treaty ended decades of warfare between the Haudenosaunee (Iroquois) and the French, ensuring the safety of the colony’s fur trade."
    },
    { 
        q: "Why were Seigneurial lots long and narrow?", 
        a: ["To make farming harder", "To ensure every farm had river access", "Because the King ordered it", "To prevent forest fires"], 
        c: 1,
        e: "The river was the main highway. Narrow lots allowed as many families as possible to have access to water for transportation, fishing, and irrigation."
    },
    { 
        q: "Which fort was the main French stronghold on the Atlantic coast (Cape Breton)?", 
        a: ["Fort Frontenac", "Fort Detroit", "Louisbourg", "Fort Duquesne"], 
        c: 2,
        e: "Louisbourg was a massive, expensive fortress designed to protect the entrance to the St. Lawrence River and the valuable Atlantic fisheries."
    },
    { 
        q: "Jean Talon is famous for being the first Intendant to:", 
        a: ["Fight the British", "Build the first cathedral", "Perform a census and diversify the economy", "Discover the Mississippi"], 
        c: 2,
        e: "Talon conducted the first census in 1666 and tried to move the economy away from just furs by introducing crops, tanneries, and shipbuilding."
    },
    { 
        q: "What was the main role of the 'Governor General'?", 
        a: ["Collecting taxes", "Managing agriculture", "Military defense and relations with Indigenous nations", "Teaching at the Seminary"], 
        c: 2,
        e: "The Governor General was the King’s personal representative. He was usually a military officer responsible for security and diplomacy."
    },
    { 
        q: "The 'Seven Years' War' in North America is also known as:", 
        a: ["The War of 1812", "The French and Indian War", "The American Revolution", "The Fur War"], 
        c: 1,
        e: "In the American colonies, the conflict between France and Britain (1754–1763) is commonly called the French and Indian War."
    },
    { 
        q: "Which 1759 battle led to the fall of Quebec City?", 
        a: ["Battle of Carillon", "Battle of the Plains of Abraham", "Battle of Sainte-Foy", "Siege of Louisbourg"], 
        c: 1,
        e: "British forces under General Wolfe defeated French forces under General Montcalm on a field outside the city walls. Both generals died in the battle."
    },
    { 
        q: "What did the Treaty of Paris (1763) signify for New France?", 
        a: ["Expansion of the colony", "End of the Seigneurial system", "The transfer of New France to Britain", "The return of Quebec to France"], 
        c: 2,
        e: "Following the French defeat, the treaty officially ceded New France to Great Britain, though the French were allowed to keep their language and religion."
    },
    { 
        q: "Who were the 'Canadiens'?", 
        a: ["Visitors from France", "The French-speaking inhabitants born in the colony", "Indigenous allies", "British spies"], 
        c: 1,
        e: "By the 1700s, the settlers had developed a distinct identity separate from France. They called themselves 'Canadiens' and had adapted to the climate and geography."
    },
    { 
        q: "What was the 'Custom of Paris'?", 
        a: ["A fashion trend", "The legal system of New France", "A religious holiday", "A cooking style"], 
        c: 1,
        e: "It was a set of laws from France that governed civil matters like land ownership, inheritance, and marriage in the colony."
    },
    { 
        q: "What happened during the 'Great Deportation' of 1755?", 
        a: ["Fur traders were sent to France", "The British expelled the Acadian population", "The French left Montreal", "The Bishop was exiled"], 
        c: 1,
        e: "Acadians (French settlers in the Maritimes) were forcibly removed by the British because they refused to swear an unconditional oath of allegiance to Britain."
    },
    { 
        q: "Which crop was the staple of the Habitant diet?", 
        a: ["Corn", "Rice", "Wheat", "Tobacco"], 
        c: 2,
        e: "Unlike the Indigenous people who relied on corn, the French Habitants primarily grew wheat to make bread, which was the centerpiece of their diet."
    },
    { 
        q: "How did the 'Militia' system work in New France?", 
        a: ["Only noblemen served", "Professional soldiers only", "Every able-bodied man aged 16-60 was required to serve", "There was no military"], 
        c: 2,
        e: "The colony couldn't afford a massive standing army, so every parish had a militia to defend the land. The Captain of the Militia was a highly respected local leader."
    },
    { 
        q: "Who was the legendary explorer who reached the mouth of the Mississippi River in 1682?", 
        a: ["Cavelier de La Salle", "Jacques Cartier", "Jean Talon", "Samuel de Champlain"], 
        c: 0,
        e: "La Salle traveled the length of the Mississippi and claimed the entire valley for France, naming it Louisiana in honor of King Louis XIV."
    },
    { 
        q: "What was the 'Corvée'?", 
        a: ["A tax paid in fur", "Unpaid labor for public works (like roads)", "A religious feast", "A military uniform"], 
        c: 1,
        e: "Habitants were required to provide a certain number of days of unpaid labor each year to maintain roads and bridges on their Seigneurie."
    },
    { 
        q: "Which Catholic order was primarily responsible for education and healthcare in the colony?", 
        a: ["The Jesuits", "The Ursulines and Hospitalières", "The Franciscans", "The Templars"], 
        c: 1,
        e: "Religious orders of women, like the Ursulines (led by Marie de l'Incarnation), established the first schools and hospitals in the colony."
    },
    { 
        q: "What was the population of New France by 1760 (approximate)?", 
        a: ["10,000", "70,000", "500,000", "1,000,000"], 
        c: 1,
        e: "Despite its massive size, the population of New France was only about 70,000, while the British 13 Colonies had over 1.5 million people."
    },
    { 
        q: "The city of Trois-Rivières was founded primarily for:", 
        a: ["Agriculture", "The Fur Trade", "Fishing", "Shipbuilding"], 
        c: 1,
        e: "Founded in 1634, it was the second permanent French settlement. Its location at the mouth of the Saint-Maurice River made it a key fur trade post."
    },
    { 
        q: "What was the 'Coureur de bois' relationship with Indigenous groups?", 
        a: ["Strictly enemies", "They avoided each other", "They often lived with them and adopted their technology", "They were their masters"], 
        c: 2,
        e: "They relied on Indigenous survival skills, used snowshoes and canoes, and often married Indigenous women, creating the foundations of the Métis culture."
    }
];

let questionsAnswered = 0;
let finalScore = 0;
let missedQuestionNumbers = []; // Track specific question numbers (1-30)

function renderQuiz() {
    const wrapper = document.getElementById('questions-wrapper');
    quizData.forEach((data, index) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.id = `q-card-${index}`;
        
        card.innerHTML = `
            <div class="q-text">${index + 1}. ${data.q}</div>
            <div class="option-list" id="opt-list-${index}">
                ${data.a.map((opt, i) => `
                    <button class="opt-btn" onclick="handleChoice(${index}, ${i})">${opt}</button>
                `).join('')}
            </div>
            <div class="explanation" id="exp-${index}"></div>
        `;
        wrapper.appendChild(card);
    });
}

window.handleChoice = function(qIdx, choiceIdx) {
    const data = quizData[qIdx];
    const card = document.getElementById(`q-card-${qIdx}`);
    const buttons = document.querySelectorAll(`#opt-list-${qIdx} .opt-btn`);
    const expDiv = document.getElementById(`exp-${qIdx}`);
    
    buttons.forEach((btn, i) => {
        btn.disabled = true;
        btn.classList.add('disabled');
        if (i === data.c) btn.classList.add('correct');
        if (i === choiceIdx && i !== data.c) btn.classList.add('wrong');
    });

    if (choiceIdx === data.c) {
        finalScore++;
        card.classList.add('answered-correct');
        expDiv.innerHTML = `<strong>Correct!</strong> ${data.e}`;
        expDiv.className = 'explanation visible exp-correct';
    } else {
        card.classList.add('answered-wrong');
        missedQuestionNumbers.push(qIdx + 1); // Store the human-readable number (index + 1)
        expDiv.innerHTML = `<strong>Not quite.</strong> ${data.e}`;
        expDiv.className = 'explanation visible exp-wrong';
    }

    questionsAnswered++;
    if (questionsAnswered === quizData.length) {
        showFinalResult();
    }
};

function showFinalResult() {
    const resultCard = document.getElementById('final-result-card');
    const scoreText = document.getElementById('final-score-text');
    resultCard.style.display = 'block';

    let missedSection = "";
    if (missedQuestionNumbers.length > 0) {
        missedSection = `<p style="margin-top: 15px; color: #ffdb58;">
            Questions to Review: ${missedQuestionNumbers.join(", ")}
        </p>`;
    } else {
        missedSection = `<p style="margin-top: 15px; font-weight: bold; font-size: 1rem; color: #48bb78;">
            Perfect! You have mastered the history of New France.
        </p>`;
    }

    scoreText.innerHTML = `
        <h3>You scored ${finalScore} / ${quizData.length}</h3>
        <p>${Math.round((finalScore / quizData.length) * 100)}% Accuracy</p>
        ${missedSection}
    `;

    resultCard.scrollIntoView({ behavior: 'smooth' });
}

renderQuiz();