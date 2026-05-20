const quizData = [
    { 
        q: "Who was the Chief of Stadacona kidnapped by Jacques Cartier in 1536?", 
        a: ["Hiawatha", "Donnacona", "Agona", "Deganawida"], 
        c: 1,
        e: "Donnacona was the leader of the St. Lawrence Iroquois. Cartier took him to France to tell King Francis I about the riches of the 'Kingdom of Saguenay,' but Donnacona died in France."
    },
    { 
        q: "What were the 'Three Sisters' in Iroquois agriculture?", 
        a: ["Wheat, Barley, Rye", "Corn, Beans, Squash", "Potatoes, Corn, Tobacco", "Beans, Squash, Sunflowers"], 
        c: 1,
        e: "Corn, beans, and squash were grown together. The corn provides a stalk for beans to climb, while squash leaves act as mulch to keep the soil moist and prevent weeds."
    },
    { 
        q: "What was the primary material for the exterior of a Longhouse?", 
        a: ["Animal Skins", "Stone", "Elm or Cedar Bark", "Mud"], 
        c: 2,
        e: "The frames were made of flexible saplings, but the walls and roof were large sheets of elm or cedar bark, which were lightweight, durable, and waterproof."
    },
    { 
        q: "Which location corresponds to the ancient village of Hochelaga?", 
        a: ["Quebec City", "Montreal", "Ottawa", "Toronto"], 
        c: 1,
        e: "Hochelaga was a massive fortified village with over 50 longhouses located on the island of Montreal, visited by Cartier in 1535."
    },
    { 
        q: "Who held the power to choose or remove the Chiefs (Sachems)?", 
        a: ["The Warriors", "The Elder Men", "The Clan Mothers", "The Shaman"], 
        c: 2,
        e: "The Haudenosaunee are a matrilineal society. The Clan Mothers (eldest women) hold the political power to nominate leaders and remove those who do not serve the people well."
    },
    { 
        q: "What was 'Wampum' primarily used for?", 
        a: ["Currency", "Decoration", "Treaties and History", "Sacrifice"], 
        c: 2,
        e: "Wampum belts made of quahog shells were living documents. The patterns recorded the Great Law of Peace, historical events, and binding agreements between nations."
    },
    { 
        q: "How many nations were in the original Confederacy before 1722?", 
        a: ["Three", "Four", "Five", "Six"], 
        c: 2,
        e: "The original Five Nations were the Mohawk, Oneida, Onondaga, Cayuga, and Seneca. The Tuscarora joined later in 1722 to make it six."
    },
    { 
        q: "What was the primary means of water transportation?", 
        a: ["Dugout logs", "Birch-bark canoes", "Elm-bark canoes", "Rafts"], 
        c: 2,
        e: "While other groups used birch, the Iroquois were famous for larger, sturdier canoes made of elm bark, which were necessary for the rocky rivers of their territory."
    },
    { 
        q: "What happened to the St. Lawrence Iroquois by the year 1600?", 
        a: ["They moved to Florida", "They disappeared from the valley", "They founded New York", "They stopped farming"], 
        c: 1,
        e: "By the time Champlain arrived in 1603, the St. Lawrence Iroquois had vanished. They were likely dispersed by warfare or absorbed into the Haudenosaunee or Huron-Wendat."
    },
    { 
        q: "Which game was known as 'The Creator's Game'?", 
        a: ["Snowsnake", "Lacrosse", "The Bowl Game", "Wrestling"], 
        c: 1,
        e: "Lacrosse was played to please the Creator, to settle disputes between tribes, and to heal the sick. It was a spiritual and physical discipline."
    },
    { 
        q: "What was the main economic activity for Iroquois women?", 
        a: ["Hunting", "Trading furs", "Agriculture and gathering", "Canoe building"], 
        c: 2,
        e: "Women were the primary farmers, managing vast fields of corn. They also gathered medicinal herbs, maple sap, and berries, providing the bulk of the community's calories."
    },
    { 
        q: "Where was the 'Grand Council' of the Five Nations held?", 
        a: ["Montreal", "Onondaga", "Mohawk Valley", "Manhattan"], 
        c: 1,
        e: "Onondaga (near modern Syracuse, NY) was the central fire of the Confederacy. It is where the 50 Chiefs met to discuss matters of war, peace, and trade."
    },
    { 
        q: "What was the typical population of a large village like Hochelaga?", 
        a: ["100-200", "500-1,000", "1,500-3,000", "10,000+"], 
        c: 2,
        e: "Hochelaga was very densely populated. Cartier estimated about 1,500 to 3,000 people living in about 50 large longhouses."
    },
    { 
        q: "What was a major limitation of the St. Lawrence territory?", 
        a: ["Lack of wood", "Extreme winters and short growing seasons", "No water access", "Desert heat"], 
        c: 1,
        e: "The northern location meant farming was risky. One early frost could destroy the corn crop, making winter survival very difficult without stored food."
    },
    { 
        q: "Which artistic mask was used in medicinal ceremonies?", 
        a: ["The Totem Mask", "The False Face Mask", "The Wampum Mask", "The Feather Mask"], 
        c: 1,
        e: "False Face Masks were carved from living trees. They were used by the False Face Society in healing rituals to drive away spirits of disease."
    },
    { 
        q: "What was the primary transportation route between inland villages?", 
        a: ["Paved roads", "A network of forest trails", "Railways", "Horses and carriages"], 
        c: 1,
        e: "The Iroquois were famous for the 'Iroquois Trail,' a sophisticated network of paths that allowed runners to carry messages hundreds of miles in just a few days."
    },
    { 
        q: "The 'Thanksgiving Address' is a spiritual practice that acknowledges:", 
        a: ["Military victories", "European traders", "All elements of the natural world", "Individual wealth"], 
        c: 2,
        e: "Also called the 'Words that Come Before All Others,' it is a long prayer thanking everything from the water and grasses to the sun and stars."
    },
    { 
        q: "Which nation was known as the 'Keepers of the Eastern Door'?", 
        a: ["Seneca", "Mohawk", "Onondaga", "Oneida"], 
        c: 1,
        e: "The Mohawk were the easternmost tribe. They were responsible for guarding the Confederacy against groups coming from the Hudson River and the Atlantic."
    },
    { 
        q: "Why did Iroquois villages move every 10 to 20 years?", 
        a: ["Because of war", "Soil exhaustion and lack of firewood", "To follow bird migrations", "Religious commands"], 
        c: 1,
        e: "Large populations eventually used up all the nearby firewood and drained the soil of nutrients. Moving allowed the forest and land to regenerate."
    },
    { 
        q: "What was the 'Covenant Chain'?", 
        a: ["A silver chain necklace", "Alliances between the Iroquois and the British", "A type of longhouse lock", "A prison system"], 
        c: 1,
        e: "The Covenant Chain was a complex series of treaties between the Haudenosaunee and British colonies, symbolized by a silver chain that needed to be 'polished' through regular meetings."
    },
    { 
        q: "Which modern political system was influenced by the Haudenosaunee model?", 
        a: ["The US Constitution", "The French Monarchy", "The Roman Empire", "The Soviet Union"], 
        c: 0,
        e: "Benjamin Franklin and other founding fathers studied the Iroquois Confederacy as an example of how independent states could form a unified federal government."
    },
    { 
        q: "How were decisions made in the Grand Council?", 
        a: ["Majority vote", "Consensus (unanimous agreement)", "Dictatorship", "Combat"], 
        c: 1,
        e: "The Chiefs discussed until everyone agreed. If they couldn't reach a consensus, no action was taken. This ensured the unity of the five nations."
    },
    { 
        q: "Who was Hiawatha?", 
        a: ["A French explorer", "A Mohawk leader who helped form the Confederacy", "A St. Lawrence fisherman", "The first King of the Iroquois"], 
        c: 1,
        e: "Hiawatha was a grieving leader who met the Peacemaker. Together, they traveled to the five nations to spread the message of the Great Law of Peace."
    },
    { 
        q: "What was the main winter transportation method on land?", 
        a: ["Horse and carriage", "Snowshoes and sleds", "Canoes", "Travois"], 
        c: 1,
        e: "Snowshoes were essential for hunting and traveling in the deep snow of the Northeast, a technology adopted by European settlers later."
    },
    { 
        q: "What spiritual figure is the 'Sky Woman'?", 
        a: ["A French queen", "The central figure in the Iroquois creation story", "A famous warrior", "A type of constellation"], 
        c: 1,
        e: "The creation story tells of Sky Woman falling from the sky world and landing on a turtle's back, which became North America (Turtle Island)."
    },
    { 
        q: "The 'One Bowl, One Spoon' principle refers to:", 
        a: ["A shortage of food", "Sharing hunting grounds and resources peacefully", "A religious fasting ritual", "A style of pottery"], 
        c: 1,
        e: "It means that the land and its resources belong to everyone; we all eat from the same bowl with one spoon, so we must not fight over the food."
    },
    { 
        q: "Which nation was the 'Keeper of the Western Door'?", 
        a: ["Mohawk", "Seneca", "Onondaga", "Cayuga"], 
        c: 1,
        e: "The Seneca were the westernmost tribe. They guarded the Confederacy against groups coming from the Great Lakes and the Ohio Valley."
    },
    { 
        q: "What was the primary material for St. Lawrence Iroquois pottery?", 
        a: ["Local river clay", "Porcelain", "Soapstone", "Dried mud"], 
        c: 0,
        e: "They used local clay tempered with crushed stone or old pottery bits to make large, round-bottomed cooking jars that could sit in the fire."
    },
    { 
        q: "What are the 'Three Pillars' of the Great Law of Peace?", 
        a: ["Gold, Silver, Bronze", "War, Victory, Power", "Peace, Equity, and the Good Mind", "North, South, and West"], 
        c: 2,
        e: "These three concepts guide all decision-making: Peace (health of mind and body), Equity (justice), and the Good Mind (using reason to achieve peace)."
    },
    { 
        q: "How do the Haudenosaunee maintain continuity with the present?", 
        a: ["They no longer exist", "By maintaining the Grand Council and traditional ceremonies", "Moving back into bark longhouses", "Speaking only French"], 
        c: 1,
        e: "The Haudenosaunee Confederacy still exists today. The Grand Council still meets at Onondaga, and Clan Mothers still choose leaders on many territories."
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
        missedQuestionNumbers.push(qIdx + 1); // Store the human-readable number
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
        missedSection = `<p style="margin-top: 15px; font-weight: bold; color: #ffdb58;">
            Questions to Review: ${missedQuestionNumbers.join(", ")}
        </p>`;
    } else {
        missedSection = `<p style="margin-top: 15px; font-weight: bold; color: #48bb78;">
            Perfect! You have a deep understanding of Haudenosaunee history and culture.
        </p>`;
    }

    scoreText.innerHTML = `
        <h3>Final Score: ${finalScore} / ${quizData.length}</h3>
        <p>${Math.round((finalScore / quizData.length) * 100)}% Accuracy</p>
        ${missedSection}
    `;

    resultCard.scrollIntoView({ behavior: 'smooth' });
}

renderQuiz();