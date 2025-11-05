document.addEventListener('DOMContentLoaded', () => {

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

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function openTrainingModal() {
        console.log('openTrainingModal called, trainingModal exists:', !!trainingModal);
        if (!trainingModal) {
            console.error('Training modal element not found!');
            return;
        }
        trainingModal.classList.remove('hidden');
        trainingModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        console.log('Modal classes:', trainingModal.className);
    }

    function closeTrainingModal() {
        console.log('closeTrainingModal called');
        if (!trainingModal) return;
        trainingModal.classList.add('hidden');
        trainingModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        console.log('Modal closed');
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

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
        console.log('Opening training modal...');
        openTrainingModal();

        if (spinner) {
            spinner.classList.remove('hidden');
        }
        if (currentStepInfo) {
            currentStepInfo.innerHTML = TEXT.treeBuilding;
        }
        console.log('Modal opened, starting tree building...');

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
            console.log("Training aborted by user.");
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
        await sleep(1000);

        // Close the modal
        console.log('🔴 [CRITICAL] Closing modal...');
        closeTrainingModal();

        // Show the training container with the final tree
        console.log('🔴 [CRITICAL] Showing training container...');
        setupContainer.classList.add('hidden');
        trainingContainer.classList.remove('hidden');

        // Wait for DOM to settle and initialize the tree
        await sleep(200);

        console.log('🔴 [CRITICAL] Training container hidden status:', trainingContainer.classList.contains('hidden'));
        console.log('🔴 [CRITICAL] Training container display:', window.getComputedStyle(trainingContainer).display);
        console.log('🔴 [CRITICAL] cy-container element:', document.getElementById('cy-container'));
        console.log('🔴 [CRITICAL] Initializing Cytoscape with', treeElements.length, 'elements...');

        // Reset calculation details to show instructions
        if (calculationDetails) {
            calculationDetails.innerHTML = `<p>${isSpanish ? 'Haz clic en un nodo de pregunta para ver sus cálculos.' : 'Click a question node to see its calculations.'}</p>`;
        }

        await initializeCytoscape();

        // Ensure the final tree is properly centered and fit
        if (cy) {
            console.log('🟢 Cytoscape instance exists after initialization, double-checking fit...');
            cy.resize();
            cy.center();
            cy.fit(null, 50);
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

        // Actualizar el estado de los botones
        updateSelectionState();
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
        console.log('🟢 Training container exists:', !!trainingContainer);
        console.log('🟢 Training container has hidden class:', trainingContainer?.classList.contains('hidden'));

        if (trainingContainer && trainingContainer.classList.contains('hidden')) {
            console.error('🔴 ERROR: Training container is hidden, cannot initialize Cytoscape!');
            return;
        }

        console.log('🟢 Training container is visible, proceeding with initialization');

        const cyContainer = document.getElementById('cy-container');
        console.log('🟢 cy-container exists:', !!cyContainer);
        console.log('🟢 cy-container dimensions:', cyContainer?.offsetWidth, 'x', cyContainer?.offsetHeight);

        if (!cyContainer) {
            console.error('🔴 ERROR: cy-container element not found!');
            return;
        }

        if (cyContainer.offsetWidth === 0 || cyContainer.offsetHeight === 0) {
            console.error('🔴 ERROR: cy-container has zero dimensions!', {
                offsetWidth: cyContainer.offsetWidth,
                offsetHeight: cyContainer.offsetHeight,
                clientWidth: cyContainer.clientWidth,
                clientHeight: cyContainer.clientHeight
            });
            return;
        }

        if (cy) {
            console.log('🟡 Destroying existing Cytoscape instance');
            cy.destroy();
        }

        console.log('🟢 Creating Cytoscape instance with', treeElements.length, 'elements');
        console.log('🟢 First 3 elements:', JSON.stringify(treeElements.slice(0, 3), null, 2));

        cy = cytoscape({
            container: cyContainer,
            elements: treeElements,
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

        console.log('🟢 Cytoscape instance created successfully');
        console.log('🟢 cy object:', cy);
        console.log('🟢 Number of nodes:', cy.nodes().length);
        console.log('🟢 Number of edges:', cy.edges().length);

        // Log node positions BEFORE centering
        cy.nodes().forEach(node => {
            console.log(`🟢 Node ${node.id()} position BEFORE:`, node.position());
        });

        // Log viewport info
        console.log('🟢 Cytoscape pan BEFORE:', cy.pan());
        console.log('🟢 Cytoscape zoom BEFORE:', cy.zoom());
        console.log('🟢 Cytoscape extent BEFORE:', cy.extent());

        // Run layout explicitly and wait for completion
        console.log('🟡 Running layout...');
        const layout = cy.layout({
            name: 'breadthfirst',
            directed: true,
            padding: 50,
            spacingFactor: 1.75,
            avoidOverlap: true,
            nodeDimensionsIncludeLabels: true,
            grid: true,
            roots: '#node-0',
            animate: false  // Disable animation for immediate rendering
        });

        layout.run();

        // Wait for layout to complete
        console.log('🟡 Waiting for layout to complete...');
        await new Promise(resolve => {
            layout.on('layoutstop', resolve);
        });

        console.log('🟡 Layout completed, now centering and fitting...');
        cy.center();
        cy.fit(null, 50);

        // Log node positions AFTER
        cy.nodes().forEach(node => {
            console.log(`🟢 Node ${node.id()} position AFTER:`, node.position());
        });

        console.log('🟢 After fit - pan:', cy.pan());
        console.log('🟢 After fit - zoom:', cy.zoom());
        console.log('🟢 After fit - extent:', cy.extent());

        console.log('🟢 === initializeCytoscape completed ===');
    }

    // Iniciar la aplicación
    init();
});