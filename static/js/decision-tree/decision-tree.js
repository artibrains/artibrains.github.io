// --- Translation System ---
const translations = {
    es: {
        appInitialized: "DT: Aplicación de Árbol de Decisión inicializada.",
        charactersSelected: "DT: {count} personajes seleccionados.",
        randomSelection: "DT: Selección aleatoria de {count} personajes.",
        trainingStarted: "DT: Iniciando entrenamiento del árbol...",
        treeCompleted: "DT: ¡Árbol de decisión construido con éxito!",
        resetApp: "DT: Aplicación reiniciada.",
        binaryModeEnabled: "DT: Modo Solo Sí/No activado.",
        binaryModeDisabled: "DT: Modo Solo Sí/No desactivado."
    },
    en: {
        appInitialized: "DT: Decision Tree application initialized.",
        charactersSelected: "DT: {count} characters selected.",
        randomSelection: "DT: Random selection of {count} characters.",
        trainingStarted: "DT: Starting tree training...",
        treeCompleted: "DT: Decision tree built successfully!",
        resetApp: "DT: Application reset.",
        binaryModeEnabled: "DT: Yes/No Only mode enabled.",
        binaryModeDisabled: "DT: Yes/No Only mode disabled."
    }
};

let dtLang = 'en';

function dt_t(key, params = {}) {
    const currentLang = window.decisionTreeLanguage || dtLang;
    let text = (translations[currentLang] && translations[currentLang][key]) || translations['en'][key] || key;
    Object.keys(params).forEach(k => {
        text = text.replace(`{${k}}`, params[k]);
    });
    return text;
}

function writeToTerminal(message) {
    if (window.CustomTerminal && typeof window.CustomTerminal.write === 'function') {
        window.CustomTerminal.write(message + "\n");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    dtLang = window.decisionTreeLanguage || 'en';
    console.log("Decision Tree Language detected:", dtLang);

    // --- VARIABLES GLOBALES Y CONSTANTES ---
    const allPeople = peopleData;
    const ATTRIBUTES = [
        "gafas", "gafas_de_sol", "sombrero", "color_pelo",
        "sexo", "barba", "color_ropa", "peinado"
    ];
    const BINARY_ATTRIBUTES = ["gafas", "gafas_de_sol", "sombrero", "barba"];
    const allBinaryQuestions = [];

    // Elementos del DOM
    const grid = document.getElementById('character-grid');
    const randomCountInput = document.getElementById('random-count');
    const randomSelectBtn = document.getElementById('random-select-btn');
    const trainBtn = document.getElementById('train-btn');
    const binaryQuestionsOnlyCheckbox = document.getElementById('binary-questions-only');
    const setupContainer = document.getElementById('setup-container');
    const trainingContainer = document.getElementById('training-container');
    const currentStepInfo = document.getElementById('current-step-info');
    const currentGroupDisplay = document.getElementById('current-group-display');
    const tooltip = document.getElementById('tooltip');
    const resetBtn = document.getElementById('reset-btn');
    const spinner = document.getElementById('spinner');
    const calculationDetails = document.getElementById('calculation-details');
    const trainingModal = document.getElementById('training-modal');

    // Controles del árbol
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomOutBtn = document.getElementById('zoom-out-btn');
    const fitBtn = document.getElementById('fit-btn');

    // Language detection & translation helpers
    const languageCode = (window.decisionTreeLanguage || document.documentElement.lang || navigator.language || 'es').toLowerCase();
    const isSpanish = languageCode.startsWith('es');
    const locale = isSpanish ? 'es' : 'en';

    const yesLabel = isSpanish ? 'Sí' : 'Yes';
    const noLabel = isSpanish ? 'No' : 'No';

    const attributeLabels = {
        gafas: { es: 'gafas', en: 'glasses' },
        gafas_de_sol: { es: 'gafas de sol', en: 'sunglasses' },
        sombrero: { es: 'sombrero', en: 'a hat' },
        color_pelo: { es: 'color de pelo', en: 'hair color' },
        sexo: { es: 'sexo', en: 'gender' },
        barba: { es: 'barba', en: 'a beard' },
        color_ropa: { es: 'color de ropa', en: 'clothing color' },
        peinado: { es: 'peinado', en: 'hairstyle' }
    };

    const valueTranslations = {
        'sí': { en: 'Yes' },
        'no': { en: 'No' },
        'hombre': { en: 'Man' },
        'mujer': { en: 'Woman' },
        'castaño': { en: 'Brown' },
        'negro': { en: 'Black' },
        'rubio': { en: 'Blond' },
        'pelirrojo': { en: 'Red' },
        'gris': { en: 'Gray' },
        'blanco': { en: 'White' },
        'azul': { en: 'Blue' },
        'verde': { en: 'Green' },
        'rojo': { en: 'Red' },
        'amarillo': { en: 'Yellow' },
        'morado': { en: 'Purple' },
        'naranja': { en: 'Orange' },
        'rosa': { en: 'Pink' },
        'beige': { en: 'Beige' },
        'marrón': { en: 'Brown' },
        'lila': { en: 'Lilac' },
        'turquesa': { en: 'Turquoise' },
        'dorada': { en: 'Gold' },
        'plateada': { en: 'Silver' },
        'no visible': { en: 'Not visible' },
        'no visible.': { en: 'Not visible' },
        'corto': { en: 'Short' },
        'largo': { en: 'Long' },
        'rizado': { en: 'Curly' },
        'ondulado': { en: 'Wavy' },
        'liso': { en: 'Straight' },
        'trenzas': { en: 'Braids' },
        'moño': { en: 'Bun' },
        'coleta': { en: 'Ponytail' },
        'recogido': { en: 'Updo' }
    };

    const categoricalPrefixes = {
        color_pelo: { es: 'El color de pelo', en: 'the hair color' },
        color_ropa: { es: 'El color de ropa', en: 'the clothing color' },
        peinado: { es: 'El peinado', en: 'the hairstyle' },
        sexo: { es: 'El sexo', en: 'the gender' }
    };

    const TEXT = {
        randomAlert: max => isSpanish ? `Por favor, introduce un número entre 2 y ${max}.` : `Please enter a number between 2 and ${max}.`,
        trainButton: count => {
            const base = isSpanish ? 'Entrenar Árbol' : 'Train Tree';
            if (count > 0) {
                return isSpanish ? `${base} (${count} pers.)` : `${base} (${count} people)`;
            }
            return base;
        },
        treeBuilding: isSpanish ? 'El árbol se está construyendo...' : 'The tree is being built...',
        leafFound: label => isSpanish ? `¡Hoja encontrada! Personaje: <strong>${label}</strong>` : `Leaf found! Character: <strong>${label}</strong>`,
        groupNotDivisible: isSpanish ? 'Grupo no divisible. Preguntando por cada personaje...' : 'Group cannot be divided. Asking about each character...',
        algorithmNote: () => isSpanish
            ? `<div class="special-note"><p><strong>Nota del Algoritmo:</strong> No quedan más atributos para diferenciar a este grupo. El sistema ahora preguntará por cada personaje individualmente para asegurar una clasificación completa.</p></div>`
            : `<div class="special-note"><p><strong>Algorithm Note:</strong> There are no remaining attributes to differentiate this group. The system will now ask about each character individually to ensure a complete classification.</p></div>`,
        finalQuestionNote: question => isSpanish
            ? `<div class="final-question-note"><p><strong>Pregunta Seleccionada:</strong> ${question}</p></div>`
            : `<div class="final-question-note"><p><strong>Selected Question:</strong> ${question}</p></div>`,
        bestQuestion: question => isSpanish ? `Mejor pregunta: <strong>${question}</strong>` : `Best question: <strong>${question}</strong>`,
        creatingBranch: (value, count) => isSpanish ? `Creando rama para "<strong>${value}</strong>" (${count} pers.)` : `Creating branch for "<strong>${value}</strong>" (${count} people)`,
        edgeLabel: (value, count) => isSpanish ? `${value}\n(${count} pers.)` : `${value}\n(${count} people)`,
        startLabel: isSpanish ? 'Inicio' : 'Start',
        completeMessage: () => isSpanish
            ? '<strong>¡Árbol de Decisión Completo!</strong> Puede hacer zoom y arrastrar el árbol.'
            : '<strong>Decision tree complete!</strong> You can zoom and drag the tree.',
        calcPrompt: () => isSpanish
            ? '<p>Selecciona personajes y entrena un árbol para ver los detalles aquí.</p>'
            : '<p>Select characters and train a tree to see the details here.</p>',
        binaryModeDescription: () => isSpanish
            ? `<p><strong>Modo Sí/No:</strong> Se elige la pregunta que genera la partición más equilibrada (menor diferencia entre el grupo 'Sí' y 'No').</p>`
            : `<p><strong>Yes/No mode:</strong> The question that produces the most balanced split (smallest difference between the "Yes" and "No" groups) is selected.</p>`,
        binaryHeaders: () => ({
            question: isSpanish ? 'Pregunta' : 'Question',
            difference: isSpanish ? 'Diferencia' : 'Difference',
            distribution: isSpanish ? 'Distribución' : 'Distribution'
        }),
        standardDescription: groupSize => isSpanish
            ? `<p>Para un grupo de <strong>${groupSize}</strong> personajes, se elige la pregunta que crea <strong>más subgrupos</strong>. Como desempate, se elige la que genera el <strong>subgrupo más pequeño</strong>.</p>`
            : `<p>For a group of <strong>${groupSize}</strong> characters, the algorithm chooses the question that creates the <strong>largest number of subgroups</strong>. As a tiebreaker, it picks the one that yields the <strong>smallest subgroup</strong>.</p>`,
        standardHeaders: () => ({
            attribute: isSpanish ? 'Atributo' : 'Attribute',
            groups: isSpanish ? 'Nº Grupos' : '# Groups',
            largest: isSpanish ? 'Mayor Grupo' : 'Largest Group',
            distribution: isSpanish ? 'Distribución' : 'Distribution'
        }),
        panelGroupHeading: size => isSpanish ? `Grupo Actual (${size} personajes)` : `Current Group (${size} characters)`,
        askCharacter: name => isSpanish ? `¿Es ${name}?` : `Is it ${name}?`,
        treeBuildingStatus: () => isSpanish ? 'El árbol se está construyendo...' : 'The tree is being built...',
        analyzingGroup: size => isSpanish ? `Analizando un grupo de ${size} personajes...` : `Analyzing a group of ${size} characters...`
    };

    function openTrainingModal() {
        if (!trainingModal) return;
        trainingModal.classList.remove('hidden');
        trainingModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    }

    function closeTrainingModal() {
        if (!trainingModal) return;
        trainingModal.classList.add('hidden');
        trainingModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }

    function capitalizeFirst(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function getAttributeLabel(attribute) {
        const labels = attributeLabels[attribute];
        if (!labels) {
            return attribute.replace(/_/g, ' ');
        }
        return labels[locale];
    }

    function formatValue(value) {
        if (value == null) return '';
        const normalized = value.toString();
        if (isSpanish) {
            return capitalizeFirst(normalized);
        }
        const entry = valueTranslations[normalized.trim().toLowerCase()];
        if (entry && entry.en) {
            return entry.en;
        }
        return capitalizeFirst(normalized);
    }

    function getBinaryQuestionText(attribute) {
        const templates = {
            gafas: { es: '¿Tiene gafas?', en: 'Does the character wear glasses?' },
            gafas_de_sol: { es: '¿Tiene gafas de sol?', en: 'Does the character wear sunglasses?' },
            sombrero: { es: '¿Tiene sombrero?', en: 'Does the character wear a hat?' },
            barba: { es: '¿Tiene barba?', en: 'Does the character have a beard?' }
        };
        const template = templates[attribute];
        if (template) {
            return template[locale];
        }
        const label = getAttributeLabel(attribute);
        return isSpanish ? `¿Tiene ${label}?` : `Does the character have ${label}?`;
    }

    function getCategoricalQuestionText(attribute, value) {
        const prefix = categoricalPrefixes[attribute];
        const valueLabel = formatValue(value);
        if (prefix) {
            return isSpanish ? `¿${prefix.es} es ${valueLabel}?` : `Is ${prefix.en} ${valueLabel}?`;
        }
        const attrLabel = getAttributeLabel(attribute);
        return isSpanish ? `¿${capitalizeFirst(attrLabel)} es ${valueLabel}?` : `Is the ${attrLabel} ${valueLabel}?`;
    }

    function translateEdgeValue(value) {
        return formatValue(value);
    }

    // Estado de la aplicación
    let selectedPeople = [];
    let treeElements = []; // Para Cytoscape
    let nodeIdCounter = 0;
    let cy; // Instancia de Cytoscape
    let trainingController = null; // Controlador para detener el entrenamiento

    // --- FUNCIONES DE INICIALIZACIÓN Y UI ---

    function init() {
        generateBinaryQuestions();
        renderCharacterGrid();
        setupEventListeners();
        if (trainBtn) {
            trainBtn.textContent = TEXT.trainButton(0);
        }
        writeToTerminal(dt_t('appInitialized'));
    }

    function generateBinaryQuestions() {
        // Preguntas de atributos binarios existentes
        BINARY_ATTRIBUTES.forEach(attr => {
            const questionText = getBinaryQuestionText(attr);
            allBinaryQuestions.push({ attribute: attr, value: 'sí', text: questionText });
        });

        // Generar preguntas binarias a partir de atributos categóricos
        Object.keys(categoricalPrefixes).forEach(attr => {
            const uniqueValues = [...new Set(allPeople.map(p => p[attr]))];
            uniqueValues.forEach(value => {
                const questionText = getCategoricalQuestionText(attr, value);
                allBinaryQuestions.push({
                    attribute: attr,
                    value: value,
                    text: questionText
                });
            });
        });
    }

    function renderCharacterGrid() {
        grid.innerHTML = '';
        allPeople.forEach((person, index) => {
            const card = document.createElement('div');
            card.className = 'character-card';
            card.dataset.id = index;
            card.innerHTML = `
                <img src="${person.imagen}" alt="${person.nombre}">
                <p>${person.nombre}</p>
            `;
            grid.appendChild(card);
        });
    }

    function setupEventListeners() {
        grid.addEventListener('click', handleCharacterClick);
        grid.addEventListener('mouseover', handleMouseOver);
        grid.addEventListener('mouseout', handleMouseOut);
        grid.addEventListener('mousemove', handleMouseMove);
        randomSelectBtn.addEventListener('click', handleRandomSelection);
        trainBtn.addEventListener('click', startTraining);
        resetBtn.addEventListener('click', resetApp);
        binaryQuestionsOnlyCheckbox.addEventListener('change', () => {
            if (trainingController) {
                trainingController.shouldStop = true;
            }
            resetTrainingView();
            trainBtn.disabled = selectedPeople.length < 2;
            const key = binaryQuestionsOnlyCheckbox.checked ? 'binaryModeEnabled' : 'binaryModeDisabled';
            writeToTerminal(dt_t(key));
        });

        // Event listeners para los controles del árbol
        zoomInBtn.addEventListener('click', () => {
            if (cy) cy.zoom(cy.zoom() * 1.2);
        });
        zoomOutBtn.addEventListener('click', () => {
            if (cy) cy.zoom(cy.zoom() / 1.2);
        });
        fitBtn.addEventListener('click', () => {
            if (cy) cy.fit(null, 50);
        });
    }

    function handleCharacterClick(e) {
        const card = e.target.closest('.character-card');
        if (!card) return;

        card.classList.toggle('selected');
        updateSelectionState();
    }

    function handleMouseOver(e) {
        const card = e.target.closest('.character-card');
        if (!card) return;

        const personId = parseInt(card.dataset.id, 10);
        const person = allPeople[personId];

        let tooltipContent = `<ul>`;
        ATTRIBUTES.forEach(attr => {
            const label = capitalizeFirst(getAttributeLabel(attr));
            const value = formatValue(person[attr]);
            tooltipContent += `<li><strong>${label}:</strong> ${value}</li>`;
        });
        tooltipContent += `</ul>`;

        tooltip.innerHTML = tooltipContent;
        tooltip.classList.remove('hidden');
    }

    function handleMouseOut() {
        tooltip.classList.add('hidden');
    }

    function handleMouseMove(e) {
        // Position tooltip relative to the page
        tooltip.style.left = `${e.pageX + 15}px`;
        tooltip.style.top = `${e.pageY + 15}px`;
    }

    function handleRandomSelection() {
        const count = parseInt(randomCountInput.value, 10);
        if (isNaN(count) || count < 2 || count > allPeople.length) {
            alert(TEXT.randomAlert(allPeople.length));
            return;
        }

        // Deseleccionar todo primero
        document.querySelectorAll('.character-card.selected').forEach(c => c.classList.remove('selected'));

        // Seleccionar aleatoriamente
        const shuffled = [...allPeople].sort(() => 0.5 - Math.random());
        const randomSelection = shuffled.slice(0, count);

        randomSelection.forEach(person => {
            const personIndex = allPeople.findIndex(p => p.nombre === person.nombre);
            const card = document.querySelector(`.character-card[data-id='${personIndex}']`);
            if (card) {
                card.classList.add('selected');
            }
        });

        updateSelectionState();
    }

    function updateSelectionState() {
        if (trainingController) {
            trainingController.shouldStop = true;
        }
        resetTrainingView();
        const selectedCards = document.querySelectorAll('.character-card.selected');
        selectedPeople = Array.from(selectedCards).map(card => {
            return allPeople[parseInt(card.dataset.id, 10)];
        });

        const count = selectedPeople.length;
        trainBtn.disabled = count < 2;
        trainBtn.textContent = TEXT.trainButton(count);
    }

    // Controls the training animation speed.
    // Default is tuned so a typical full tree build finishes in ~10s.
    if (window.dtSpeedFactor == null) {
        window.dtSpeedFactor = 10;
    }

    function sleep(ms) {
        const rawFactor = window.dtSpeedFactor;
        const factor = (typeof rawFactor === 'number' && isFinite(rawFactor) && rawFactor > 0) ? rawFactor : 10;
        const delay = Math.max(0, ms / factor);
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    // --- LÓGICA DEL ÁRBOL DE DECISIÓN ---

    function calculateBestSplit(people, attributes, useBinaryOnly) {
        if (useBinaryOnly) {
            // Lógica para la partición más equilibrada (modo Sí/No)
            let bestSplit = {
                question: null,
                balanceScore: Infinity,
                groups: {}
            };
            const allScores = [];

            attributes.forEach(q => {
                const groups = { 'sí': [], 'no': [] };
                people.forEach(person => {
                    if (person[q.attribute] === q.value) {
                        groups['sí'].push(person);
                    } else {
                        groups['no'].push(person);
                    }
                });

                const n_si = groups['sí'].length;
                const n_no = groups['no'].length;
                const isSplitPossible = n_si > 0 && n_no > 0;
                const balanceScore = isSplitPossible ? Math.abs(n_si - n_no) : Infinity;

                allScores.push({
                    questionText: q.text,
                    score: balanceScore,
                    distribution: { 'Sí': n_si, 'No': n_no }
                });

                if (isSplitPossible && balanceScore < bestSplit.balanceScore) {
                    bestSplit = { question: q, balanceScore, groups };
                }
            });

            allScores.sort((a, b) => a.score - b.score);
            if (bestSplit.question) {
                bestSplit.attribute = bestSplit.question.attribute;
            }
            return { bestSplit, allScores };

        } else {
            // Lógica original: maximizar grupos, minimizar el más grande
            let bestSplit = {
                attribute: null,
                score: -1,
                tieBreakerScore: Infinity,
                groups: {}
            };
            const allScores = [];

            attributes.forEach(attr => {
                const groups = {};
                people.forEach(person => {
                    const value = person[attr];
                    if (!groups[value]) groups[value] = [];
                    groups[value].push(person);
                });

                const numGroups = Object.keys(groups).length;
                const largestGroupSize = Math.max(...Object.values(groups).map(g => g.length));

                allScores.push({
                    attribute: attr,
                    score: numGroups,
                    tieBreaker: largestGroupSize,
                    distribution: Object.fromEntries(Object.entries(groups).map(([key, value]) => [key, value.length]))
                });

                const isSplitPossible = numGroups > 1;
                if (isSplitPossible) {
                    if (numGroups > bestSplit.score || (numGroups === bestSplit.score && largestGroupSize < bestSplit.tieBreakerScore)) {
                        bestSplit = { attribute: attr, score: numGroups, tieBreakerScore: largestGroupSize, groups };
                    }
                }
            });

            allScores.sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score;
                return a.tieBreaker - b.tieBreaker;
            });

            if (bestSplit.attribute) {
                const attributeLabel = capitalizeFirst(getAttributeLabel(bestSplit.attribute));
                bestSplit.question = { text: isSpanish ? `¿${attributeLabel}?` : `${attributeLabel}?` };
            }
            return { bestSplit, allScores };
        }
    }

    async function buildTreeRecursive(people, availableAttributes, nodeId, controller, useBinaryOnly) {
        if (controller.shouldStop) return;

        // --- Visualización del paso actual ---
        currentStepInfo.innerHTML = TEXT.analyzingGroup(people.length);
        currentGroupDisplay.innerHTML = people.map(p => `<img src="${p.imagen}" title="${p.nombre}">`).join('');
        await sleep(1500);
        if (controller.shouldStop) return;

        const currentNode = treeElements.find(el => el.data.id === nodeId);
        if (currentNode) {
            currentNode.data.decisionState = { people, availableAttributes, useBinaryOnly };
        }

        // --- Encontrar la mejor pregunta (split) ---
        const { bestSplit, allScores } = people.length > 1 ? calculateBestSplit(people, availableAttributes, useBinaryOnly) : { bestSplit: { attribute: null, question: null }, allScores: [] };

        // Note: Calculation details are not shown during training (they're in the hidden panel)
        // The modal shows simplified progress instead
        await sleep(1500); // Dar tiempo para ver el progreso antes de continuar
        if (controller.shouldStop) return;

        // --- Caso base: si el grupo es puro o no se puede dividir más ---
        const noMoreQuestions = !bestSplit.attribute;
        if (people.length <= 1 || noMoreQuestions) {
            if (people.length === 1) {
                const person = people[0];
                const label = person.nombre;
                currentStepInfo.innerHTML = TEXT.leafFound(label);
                await sleep(1000);
                if (controller.shouldStop) return;

                if (currentNode) {
                    currentNode.data.label = label;
                    currentNode.data.isLeaf = true;
                    currentNode.data.image = person.imagen;
                }
            } else { // Grupo no divisible con múltiples personas
                const personToAskAbout = people[0];
                const question = TEXT.askCharacter(personToAskAbout.nombre);

                currentStepInfo.innerHTML = TEXT.groupNotDivisible + '<br>' + question;

                await sleep(1500);
                if (controller.shouldStop) return;

                const remainingPeople = people.slice(1);

                if (currentNode) {
                    currentNode.data.label = question;
                }

                // "Sí" branch -> Leaf node for the person
                const yesNodeId = `node-${++nodeIdCounter}`;
                treeElements.push({ data: { id: yesNodeId, label: personToAskAbout.nombre, isLeaf: true, image: personToAskAbout.imagen } });
                treeElements.push({ data: { id: `edge-${nodeId}-${yesNodeId}`, source: nodeId, target: yesNodeId, label: yesLabel } });
                await sleep(1000);
                if (controller.shouldStop) return;

                // "No" branch -> Recursive call for the rest of the people
                const noNodeId = `node-${++nodeIdCounter}`;
                treeElements.push({ data: { id: noNodeId, label: '...' } });
                treeElements.push({ data: { id: `edge-${nodeId}-${noNodeId}`, source: nodeId, target: noNodeId, label: noLabel } });
                await sleep(1000);
                if (controller.shouldStop) return;

                // La llamada recursiva se encargará de los personajes restantes en una nueva rama.
                await buildTreeRecursive(remainingPeople, [], noNodeId, controller, useBinaryOnly);
            }
            return;
        }

        const question = bestSplit.question.text;
        currentStepInfo.innerHTML = TEXT.bestQuestion(question);
        await sleep(2000);
        if (controller.shouldStop) return;

        // Actualizar el nodo actual con la pregunta
        if (currentNode) {
            currentNode.data.label = question;
        }

        const attributeUsed = bestSplit.attribute;
        const remainingAttributes = availableAttributes.filter(attr => {
            return (typeof attr === 'string') ? attr !== attributeUsed : attr.attribute !== attributeUsed;
        });

        const groupsToIterate = bestSplit.groups;
        for (const value in groupsToIterate) {
            const group = groupsToIterate[value];
            const displayValue = translateEdgeValue(value);

            currentStepInfo.innerHTML = TEXT.creatingBranch(displayValue, group.length);
            await sleep(1500);
            if (controller.shouldStop) return;

            const childId = `node-${++nodeIdCounter}`;
            treeElements.push({ data: { id: childId, label: '...' } });

            const edgeLabel = TEXT.edgeLabel(displayValue, group.length);
            treeElements.push({ data: { id: `edge-${nodeId}-${childId}`, source: nodeId, target: childId, label: edgeLabel } });

            if (controller.shouldStop) return;

            await buildTreeRecursive(group, remainingAttributes, childId, controller, useBinaryOnly);
            if (controller.shouldStop) return;
        }
    }

    async function startTraining() {
        // Detener cualquier entrenamiento anterior y limpiar la vista
        if (trainingController) {
            trainingController.shouldStop = true;
        }
        resetTrainingView();

        // Desactivar el botón para evitar múltiples clics
        trainBtn.disabled = true;

        // Crear un nuevo controlador para esta sesión de entrenamiento
        const localController = { shouldStop: false };
        trainingController = localController;

        // Open the modal for training
        openTrainingModal();

        if (spinner) {
            spinner.classList.remove('hidden');
        }
        if (currentStepInfo) {
            currentStepInfo.innerHTML = TEXT.treeBuilding;
        }

        writeToTerminal(dt_t('trainingStarted'));

        // Resetear el árbol
        nodeIdCounter = 0;
        treeElements = [{
            data: { id: `node-${nodeIdCounter}`, label: TEXT.startLabel }
        }];

        const useBinaryOnly = binaryQuestionsOnlyCheckbox.checked;
        const attributesToUse = useBinaryOnly ? allBinaryQuestions : ATTRIBUTES;

        await buildTreeRecursive(selectedPeople, attributesToUse, `node-${nodeIdCounter}`, localController, useBinaryOnly);

        // Si el entrenamiento fue cancelado, no continuar.
        if (localController.shouldStop) {
            if (spinner) {
                spinner.classList.add('hidden');
            }
            closeTrainingModal();
            return;
        }

        // Marcar el entrenamiento como finalizado
        trainingController = null;
        if (spinner) {
            spinner.classList.add('hidden');
        }

        // Show completion message briefly
        currentStepInfo.innerHTML = TEXT.completeMessage();
        currentGroupDisplay.innerHTML = '';
        await sleep(500);

        // Close the modal
        closeTrainingModal();

        // Reset calculation details to show instructions
        if (calculationDetails) {
            calculationDetails.innerHTML = `<p>${isSpanish ? 'Haz clic en un nodo de pregunta para ver sus cálculos.' : 'Click a question node to see its calculations.'}</p>`;
        }

        // Initialize the tree visualization (this also handles showing the container)
        await initializeCytoscape();

        // Ensure the final tree is properly centered and fit
        if (cy) {
            cy.resize();
            cy.center();
            cy.fit(null, 50);
            writeToTerminal(dt_t('treeCompleted'));
        } else {
            console.error('🔴 Cytoscape instance is null after initialization!');
        }

        resetBtn.classList.remove('hidden');
    }

    function resetApp() {
        // Detener cualquier entrenamiento en curso
        if (trainingController) {
            trainingController.shouldStop = true;
            trainingController = null;
        }

        // Deseleccionar todas las cartas
        document.querySelectorAll('.character-card.selected').forEach(c => c.classList.remove('selected'));

        // Resetear estado
        selectedPeople = [];
        treeElements = [];
        nodeIdCounter = 0;

        // Ocultar y limpiar la vista de entrenamiento
        resetTrainingView();

        // Show setup container again
        setupContainer.classList.remove('hidden');
        trainingContainer.classList.add('hidden');

        // Actualizar el estado de los botones
        updateSelectionState();

        writeToTerminal(dt_t('resetApp'));
    }

    function resetTrainingView() {
        closeTrainingModal();
        trainingContainer.classList.add('hidden');
        if (spinner) {
            spinner.classList.add('hidden');
        }
        if (cy) {
            cy.destroy();
            cy = null;
        }
        calculationDetails.innerHTML = TEXT.calcPrompt();
        currentStepInfo.innerHTML = TEXT.treeBuilding;
        currentGroupDisplay.innerHTML = '';
        resetBtn.classList.add('hidden');
    }

    function updateCalculationPanel(people, scores, bestSplit, useBinaryOnly) {
        let panelContent;
        const groupSize = people.length;

        if (useBinaryOnly) {
            const headers = TEXT.binaryHeaders();
            let tableRows = scores.map(s => {
                const distribution = Object.entries(s.distribution).map(([key, val]) => `${formatValue(key)}: ${val}`).join(', ');
                const isBest = bestSplit.question && s.questionText === bestSplit.question.text;
                return `
                    <tr class="${isBest ? 'best-split' : ''}">
                        <td>${s.questionText}</td>
                        <td>${s.score === Infinity ? 'N/A' : s.score}</td>
                        <td>${distribution}</td>
                    </tr>
                `;
            }).join('');
            panelContent = `
                ${TEXT.binaryModeDescription()}
                <table>
                    <thead>
                        <tr>
                            <th>${headers.question}</th>
                            <th>${headers.difference}</th>
                            <th>${headers.distribution}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            `;
        } else {
            const headers = TEXT.standardHeaders();
            let tableRows = scores.map(s => {
                const distribution = Object.entries(s.distribution).map(([key, val]) => `${formatValue(key)}: ${val}`).join(', ');
                const isBest = s.attribute === bestSplit.attribute;
                return `
                    <tr class="${isBest ? 'best-split' : ''}">
                        <td>${capitalizeFirst(getAttributeLabel(s.attribute))}</td>
                        <td>${s.score}</td>
                        <td>${s.tieBreaker}</td>
                        <td>${distribution}</td>
                    </tr>
                `;
            }).join('');
            panelContent = `
                ${TEXT.standardDescription(groupSize)}
                <table>
                    <thead>
                        <tr>
                            <th>${headers.attribute}</th>
                            <th>${headers.groups}</th>
                            <th>${headers.largest}</th>
                            <th>${headers.distribution}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            `;
        }

        const miniaturesHTML = `
            <div class="panel-character-group">
                <h4>${TEXT.panelGroupHeading(groupSize)}</h4>
                <div class="miniatures-container">
                    ${people.map(p => `<img src="${p.imagen}" title="${p.nombre}">`).join('')}
                </div>
            </div>
        `;

        calculationDetails.innerHTML = panelContent + miniaturesHTML;
    }

    // --- LÓGICA DE VISUALIZACIÓN CYTOSCAPE.JS ---

    async function initializeCytoscape() {
        console.log('🟢 === initializeCytoscape called ===');

        // Ensure container is visible first
        trainingContainer.classList.remove('hidden');
        setupContainer.classList.add('hidden');

        // Force a reflow to ensure CSS is applied
        void trainingContainer.offsetHeight;

        // Wait a frame for the DOM to settle
        await new Promise(resolve => requestAnimationFrame(resolve));
        await new Promise(resolve => requestAnimationFrame(resolve));

        const cyContainer = document.getElementById('cy-container');
        console.log('🟢 cy-container exists:', !!cyContainer);
        console.log('🟢 cy-container dimensions:', cyContainer?.offsetWidth, 'x', cyContainer?.offsetHeight);

        if (!cyContainer) {
            console.error('🔴 ERROR: cy-container element not found!');
            return;
        }

        // Wait for container to have dimensions
        let attempts = 0;
        while ((cyContainer.offsetWidth === 0 || cyContainer.offsetHeight === 0) && attempts < 20) {
            console.log('🟡 Waiting for container dimensions, attempt', attempts + 1);
            await new Promise(resolve => setTimeout(resolve, 50));
            attempts++;
        }

        if (cyContainer.offsetWidth === 0 || cyContainer.offsetHeight === 0) {
            console.error('🔴 ERROR: cy-container has zero dimensions after waiting!');
            // Try to force dimensions
            cyContainer.style.minHeight = '600px';
            cyContainer.style.minWidth = '100%';
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        if (cy) {
            console.log('🟡 Destroying existing Cytoscape instance');
            cy.destroy();
            cy = null;
        }

        if (typeof window.cytoscape !== 'function') {
            console.error('🔴 ERROR: Cytoscape library is not available (window.cytoscape missing).');
            if (calculationDetails) {
                calculationDetails.innerHTML = `<p>${isSpanish ? 'Error: no se pudo cargar la librería de visualización.' : 'Error: visualization library failed to load.'}</p>`;
            }
            return;
        }

        // Normalize/validate elements to avoid blank renders due to invalid edges or duplicate nodes.
        const nodeById = new Map();
        const edges = [];
        for (const el of (treeElements || [])) {
            const id = el?.data?.id;
            if (!id) continue;
            const isEdge = el?.data?.source && el?.data?.target;
            if (isEdge) {
                edges.push(el);
            } else {
                nodeById.set(id, el);
            }
        }
        const validEdges = edges.filter(e => nodeById.has(e.data.source) && nodeById.has(e.data.target));
        const normalizedElements = [...nodeById.values(), ...validEdges];

        console.log('🟢 Creating Cytoscape instance with', normalizedElements.length, 'elements', `(nodes: ${nodeById.size}, edges: ${validEdges.length})`);

        if (nodeById.size === 0) {
            console.error('🔴 ERROR: No nodes available to render.');
            if (calculationDetails) {
                calculationDetails.innerHTML = `<p>${isSpanish ? 'No se generó ningún nodo para mostrar. Selecciona al menos 2 personajes y vuelve a entrenar.' : 'No nodes were generated to display. Select at least 2 characters and train again.'}</p>`;
            }
            return;
        }

        cy = window.cytoscape({
            container: cyContainer,
            elements: normalizedElements,
            style: [ // Estilos de los nodos y aristas
                {
                    selector: 'node',
                    style: {
                        'shape': 'round-rectangle',
                        'background-color': '#fff',
                        'border-color': '#000',
                        'border-width': 4,
                        'label': 'data(label)',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'width': 'label',
                        'height': 40,
                        'padding': '15px',
                        'font-size': '16px',
                        'font-weight': 'bold',
                        'color': '#000',
                        'text-wrap': 'wrap',
                        'text-max-width': '140px'
                    }
                },
                {
                    selector: 'node[?isLeaf]',
                    style: {
                        'background-image': 'data(image)',
                        'background-fit': 'cover',
                        'background-clip': 'node',
                        'border-width': 3,
                        'border-color': '#000',
                        'shape': 'rectangle',
                        'width': 80,
                        'height': 60,
                        'text-valign': 'bottom',
                        'text-margin-y': '5px',
                        'font-size': '11px',
                        'color': '#000',
                        'text-background-color': '#fff',
                        'text-background-opacity': 0.9,
                        'text-background-padding': '2px'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#aaa',
                        'target-arrow-color': '#aaa',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier',
                        'label': 'data(label)',
                        'font-size': '14px',
                        'color': '#333',
                        'text-background-color': '#fff',
                        'text-background-opacity': 1,
                        'text-background-padding': '3px',
                        'text-wrap': 'wrap'
                    }
                },
                {
                    selector: 'node.active',
                    style: {
                        'border-color': '#fbc02d',
                        'shadow-blur': 20,
                        'shadow-color': '#fbc02d',
                        'shadow-opacity': 0.8
                    }
                }
            ]
            // Layout will be run explicitly after initialization
        });

        cy.on('click', 'node', (event) => {
            const node = event.target;
            const decisionState = node.data('decisionState');

            if (decisionState && decisionState.people.length > 1) {
                const { bestSplit, allScores } = calculateBestSplit(decisionState.people, decisionState.availableAttributes, decisionState.useBinaryOnly);
                if (allScores.length > 0) {
                    updateCalculationPanel(decisionState.people, allScores, bestSplit, decisionState.useBinaryOnly);
                    cy.nodes().removeClass('active');
                    node.addClass('active');
                }
            }
        });

        console.log('🟢 Cytoscape instance created with', cy.nodes().length, 'nodes and', cy.edges().length, 'edges');

        if (cy.nodes().length === 0) {
            console.error('🔴 ERROR: Cytoscape created but contains zero nodes.');
            if (calculationDetails) {
                calculationDetails.innerHTML = `<p>${isSpanish ? 'Error al renderizar el árbol (0 nodos).' : 'Failed to render the tree (0 nodes).'} </p>`;
            }
            return;
        }

        // Run layout and wait for completion
        const rootExists = cy.$('#node-0').length > 0;
        const layout = cy.layout({
            name: 'breadthfirst',
            directed: true,
            padding: 50,
            spacingFactor: 1.75,
            avoidOverlap: true,
            nodeDimensionsIncludeLabels: true,
            grid: true,
            roots: rootExists ? '#node-0' : undefined,
            animate: false
        });

        // Run layout with promise
        await new Promise(resolve => {
            layout.on('layoutstop', resolve);
            layout.run();
        });

        // Center and fit after layout
        cy.resize();
        cy.center();
        cy.fit(cy.elements(), 50);

        console.log('🟢 Cytoscape initialized and fitted successfully');
    }

    // Iniciar la aplicación
    init();
});