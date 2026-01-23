/**
 * RLHF Preference Game - Human Preference Alignment Simulator
 * 
 * PEDAGOGICAL GOAL: Demonstrate that a pre-trained model is fine-tuned
 * not by correcting responses, but by reinforcing which types of
 * responses are preferred by users.
 * 
 * KEY CONCEPT: The model doesn't learn new facts through this process.
 * It learns what TYPE of responses are preferred.
 */

// ============================================
// CONFIGURATION AND GLOBAL STATE
// ============================================

const RLHFGame = {
    // Current language
    lang: 'es',

    // Current round (1-indexed)
    currentRound: 1,
    totalRounds: 8,

    // Scenarios for the current game session
    scenarios: [],
    currentScenario: null,

    // Neural network state (represents the "model")
    network: {
        structure: [3, 4, 4, 2], // Input, Hidden1, Hidden2, Output
        weights: [],
        biases: [],
        initialSnapshot: { weights: [], biases: [] }
    },

    // Criteria scores - these evolve based on user preferences
    // Range: -10 to +10, starting at 0
    criteria: {
        clarity: 0,
        prudence: 0,
        conciseness: 0,
        warmth: 0
    },

    // Track which option was chosen
    selectedOption: null,

    // Game state
    gameComplete: false,

    // Animation timing
    adjustmentDelay: 1500
};

// ============================================
// TRANSLATIONS
// ============================================

const translations = {
    es: {
        // Criteria names
        clarity: 'Claridad',
        prudence: 'Prudencia',
        conciseness: 'Concisión',
        warmth: 'Cercanía',

        // Criteria descriptions for feedback
        clarityUp: '💡 Se refuerza la claridad',
        clarityDown: '💡 Se reduce la claridad',
        prudenceUp: '⚠️ Se refuerza la prudencia',
        prudenceDown: '⚠️ Se reduce la prudencia',
        concisenessUp: '✂️ Se refuerza la concisión',
        concisenessDown: '✂️ Se reduce la concisión',
        warmthUp: '❤️ Se refuerza la cercanía',
        warmthDown: '❤️ Se reduce la cercanía',

        // UI
        preferenceRecorded: 'Preferencia registrada',
        adjustingValues: 'Ajustando valores internos...',
        nextQuestion: 'Siguiente Pregunta ➡️',
        round: 'Ronda',
        modelFinetuned: 'Modelo Afinado',
        modelEvolution: 'Evolución del Modelo',
        initialState: 'Estado Inicial',
        finalState: 'Estado Final',
        yourProfile: 'Tu Perfil de Preferencias',
        keyMessage: 'El modelo no aprende nuevos hechos. Aprende qué tipo de respuestas son preferidas.',
        startOver: '🔄 Empezar de Nuevo',
        resetGame: '🔄 Reiniciar Juego',
        iPreferThis: 'Prefiero esta',
        choosePreference: 'Elige la respuesta que prefieres:',
        userQuestion: 'Pregunta del Usuario',
        generatedResponses: 'Respuestas Generadas',

        // Terminal messages
        terminalGameLoaded: 'Juego de Preferencias RLHF cargado.',
        terminalNewGame: 'Nuevo juego iniciado.',
        terminalPreferenceSelected: 'Preferencia seleccionada: Opción ',
        terminalCriteriaAdjusted: 'Criterios ajustados: ',
        terminalGameComplete: '🎯 Modelo afinado tras 8 rondas de preferencias.',
        terminalNetworkAdjusted: 'Valores de red ajustados.'
    },
    en: {
        // Criteria names
        clarity: 'Clarity',
        prudence: 'Prudence',
        conciseness: 'Conciseness',
        warmth: 'Warmth',

        // Criteria descriptions for feedback
        clarityUp: '💡 Clarity is reinforced',
        clarityDown: '💡 Clarity is reduced',
        prudenceUp: '⚠️ Prudence is reinforced',
        prudenceDown: '⚠️ Prudence is reduced',
        concisenessUp: '✂️ Conciseness is reinforced',
        concisenessDown: '✂️ Conciseness is reduced',
        warmthUp: '❤️ Warmth is reinforced',
        warmthDown: '❤️ Warmth is reduced',

        // UI
        preferenceRecorded: 'Preference recorded',
        adjustingValues: 'Adjusting internal values...',
        nextQuestion: 'Next Question ➡️',
        round: 'Round',
        modelFinetuned: 'Model Fine-tuned',
        modelEvolution: 'Model Evolution',
        initialState: 'Initial State',
        finalState: 'Final State',
        yourProfile: 'Your Preference Profile',
        keyMessage: 'The model doesn\'t learn new facts. It learns which types of responses are preferred.',
        startOver: '🔄 Start Over',
        resetGame: '🔄 Reset Game',
        iPreferThis: 'I prefer this',
        choosePreference: 'Choose the response you prefer:',
        userQuestion: 'User Question',
        generatedResponses: 'Generated Responses',

        // Terminal messages
        terminalGameLoaded: 'RLHF Preference Game loaded.',
        terminalNewGame: 'New game started.',
        terminalPreferenceSelected: 'Preference selected: Option ',
        terminalCriteriaAdjusted: 'Criteria adjusted: ',
        terminalGameComplete: '🎯 Model fine-tuned after 8 rounds of preferences.',
        terminalNetworkAdjusted: 'Network values adjusted.'
    }
};

// ============================================
// SCENARIOS DATABASE
// ============================================

const scenariosDB = {
    es: [
        {
            prompt: "¿Qué medicamento debería tomar para el dolor de cabeza?",
            responses: {
                A: {
                    text: "Te recomiendo tomar paracetamol o ibuprofeno. Ambos son efectivos para dolores de cabeza comunes. La dosis habitual es de 500-1000mg de paracetamol o 400mg de ibuprofeno cada 6-8 horas.",
                    traits: { clarity: 2, prudence: -1, conciseness: 1, warmth: 0 }
                },
                B: {
                    text: "Entiendo que el dolor de cabeza puede ser muy molesto. Aunque medicamentos como el paracetamol suelen ayudar, te sugiero consultar con un profesional de salud, especialmente si el dolor es frecuente o intenso. Cada persona es diferente y merece una evaluación personalizada.",
                    traits: { clarity: 0, prudence: 2, conciseness: -1, warmth: 2 }
                }
            }
        },
        {
            prompt: "¿Cómo funciona la inteligencia artificial?",
            responses: {
                A: {
                    text: "La IA funciona mediante algoritmos que procesan datos y aprenden patrones. Básicamente, se entrena con ejemplos hasta que puede hacer predicciones sobre datos nuevos. Es como enseñar a reconocer gatos mostrando miles de fotos de gatos.",
                    traits: { clarity: 2, prudence: 0, conciseness: 1, warmth: 1 }
                },
                B: {
                    text: "La inteligencia artificial es un campo amplio que abarca desde sistemas basados en reglas hasta redes neuronales profundas. Los modelos modernos utilizan técnicas de aprendizaje automático donde ajustan millones de parámetros basándose en datos de entrenamiento. Sin embargo, es importante entender que la IA actual tiene limitaciones significativas.",
                    traits: { clarity: 0, prudence: 2, conciseness: -2, warmth: 0 }
                }
            }
        },
        {
            prompt: "¿Es seguro invertir en criptomonedas?",
            responses: {
                A: {
                    text: "Las criptomonedas son inversiones de alto riesgo. Pueden generar ganancias importantes pero también pérdidas totales. Solo invierte dinero que puedas permitirte perder completamente.",
                    traits: { clarity: 1, prudence: 2, conciseness: 2, warmth: -1 }
                },
                B: {
                    text: "Invertir siempre conlleva riesgos, y las criptomonedas no son una excepción. Lo importante es que investigues bien, entiendas el mercado, y tomes decisiones informadas. Si necesitas orientación, considera hablar con un asesor financiero. ¡Mucha suerte en tu camino inversor!",
                    traits: { clarity: 0, prudence: 1, conciseness: -1, warmth: 2 }
                }
            }
        },
        {
            prompt: "¿Cuál es la mejor dieta para perder peso?",
            responses: {
                A: {
                    text: "No existe una 'mejor' dieta universal. La pérdida de peso depende de múltiples factores: metabolismo, estilo de vida, preferencias alimentarias. Lo más efectivo es crear un déficit calórico sostenible con alimentos que disfrutes. Consulta a un nutricionista para un plan personalizado.",
                    traits: { clarity: 1, prudence: 2, conciseness: 0, warmth: 0 }
                },
                B: {
                    text: "Reduce carbohidratos refinados, aumenta proteínas y verduras, y mantén un déficit de 500 calorías diarias. Esto genera una pérdida de aproximadamente 0.5kg por semana. Combínalo con ejercicio regular.",
                    traits: { clarity: 2, prudence: -1, conciseness: 2, warmth: -1 }
                }
            }
        },
        {
            prompt: "Mi hijo tiene fiebre, ¿qué debo hacer?",
            responses: {
                A: {
                    text: "Mantén a tu hijo hidratado y cómodo. Puedes darle paracetamol infantil siguiendo las indicaciones del envase según su peso. Si la fiebre supera 39°C, dura más de 3 días, o presenta otros síntomas preocupantes, acude al médico.",
                    traits: { clarity: 2, prudence: 1, conciseness: 1, warmth: 0 }
                },
                B: {
                    text: "Entiendo tu preocupación, es normal sentirse ansioso cuando nuestros pequeños están enfermos. Lo más importante ahora es mantener la calma. La fiebre es una respuesta natural del cuerpo. Asegúrate de que descanse, beba líquidos, y si tienes cualquier duda, no dudes en llamar a su pediatra. Confía en tu instinto de padre/madre.",
                    traits: { clarity: 0, prudence: 1, conciseness: -2, warmth: 3 }
                }
            }
        },
        {
            prompt: "¿Debería aprender a programar?",
            responses: {
                A: {
                    text: "Sí, aprender a programar desarrolla el pensamiento lógico y abre oportunidades laborales. Python es un buen lenguaje para empezar. Dedica 1 hora diaria durante 6 meses para ver resultados.",
                    traits: { clarity: 2, prudence: 0, conciseness: 2, warmth: 0 }
                },
                B: {
                    text: "Depende de tus objetivos y situación actual. La programación puede ser muy valiosa, pero no es para todos. ¿Qué te motiva a considerarlo? Si me cuentas más sobre tus intereses, podría orientarte mejor. Hay muchas formas de incorporar tecnología a tu vida sin necesariamente programar.",
                    traits: { clarity: 0, prudence: 2, conciseness: -1, warmth: 2 }
                }
            }
        },
        {
            prompt: "¿Por qué el cielo es azul?",
            responses: {
                A: {
                    text: "La luz solar contiene todos los colores. Al atravesar la atmósfera, las moléculas dispersan más la luz azul que otros colores. Esto se llama dispersión de Rayleigh. Por eso vemos el cielo azul durante el día.",
                    traits: { clarity: 2, prudence: 0, conciseness: 2, warmth: 0 }
                },
                B: {
                    text: "¡Qué buena pregunta! El fenómeno se llama dispersión de Rayleigh. Básicamente, cuando la luz del sol llega a nuestra atmósfera, choca con pequeñas moléculas de aire. La luz azul, por tener una longitud de onda más corta, se dispersa más que otros colores y llega a nuestros ojos desde todas direcciones. Es fascinante, ¿verdad? La física del color tiene muchas curiosidades.",
                    traits: { clarity: 1, prudence: 0, conciseness: -2, warmth: 2 }
                }
            }
        },
        {
            prompt: "¿Cómo puedo mejorar mi inglés?",
            responses: {
                A: {
                    text: "Practica diariamente: 30 min de escucha (podcasts, series), 30 min de lectura, y 15 min escribiendo. Usa apps como Anki para vocabulario. Busca un compañero de conversación online. La consistencia supera a la intensidad.",
                    traits: { clarity: 2, prudence: 0, conciseness: 2, warmth: 0 }
                },
                B: {
                    text: "Mejorar un idioma es un viaje personal y cada uno tiene su ritmo. Lo más importante es encontrar métodos que disfrutes: películas, música, conversaciones... No te presiones demasiado con la perfección. Los errores son parte del aprendizaje. ¿Hay algún aspecto específico del inglés que te cueste más? Así podría darte sugerencias más personalizadas.",
                    traits: { clarity: 0, prudence: 1, conciseness: -2, warmth: 3 }
                }
            }
        },
        {
            prompt: "¿Es malo usar el móvil antes de dormir?",
            responses: {
                A: {
                    text: "Usar el móvil antes de dormir puede afectar negativamente tu sueño. La luz azul suprime la melatonina y el contenido estimulante mantiene el cerebro activo. Intenta dejar el móvil 1 hora antes de acostarte.",
                    traits: { clarity: 2, prudence: 1, conciseness: 2, warmth: 0 }
                },
                B: {
                    text: "Hay evidencia de que las pantallas pueden afectar el sueño, aunque el impacto varía entre personas. Algunos se ven más afectados que otros. Lo importante es observar cómo te sientes tú. Si notas que te cuesta conciliar el sueño, podrías experimentar reduciendo el uso nocturno. No hay soluciones únicas para todos.",
                    traits: { clarity: 0, prudence: 2, conciseness: -1, warmth: 1 }
                }
            }
        },
        {
            prompt: "¿Cuánta agua debo beber al día?",
            responses: {
                A: {
                    text: "La recomendación general es 2 litros diarios, pero varía según peso, actividad física y clima. Una señal útil: si tu orina es amarillo claro, estás bien hidratado.",
                    traits: { clarity: 2, prudence: 0, conciseness: 2, warmth: 0 }
                },
                B: {
                    text: "Es difícil dar una cifra exacta porque depende de muchos factores: tu peso, cuánto ejercicio haces, el clima, tu dieta... Más que seguir una regla fija, escucha a tu cuerpo. La sed es una buena guía. Si tienes condiciones médicas específicas, lo mejor es consultar con tu médico. Cada cuerpo es único.",
                    traits: { clarity: 0, prudence: 2, conciseness: -2, warmth: 1 }
                }
            }
        }
    ],
    en: [
        {
            prompt: "What medication should I take for a headache?",
            responses: {
                A: {
                    text: "I recommend taking paracetamol or ibuprofen. Both are effective for common headaches. The usual dose is 500-1000mg of paracetamol or 400mg of ibuprofen every 6-8 hours.",
                    traits: { clarity: 2, prudence: -1, conciseness: 1, warmth: 0 }
                },
                B: {
                    text: "I understand headaches can be very bothersome. While medications like paracetamol often help, I'd suggest consulting a healthcare professional, especially if the pain is frequent or intense. Each person is different and deserves personalized evaluation.",
                    traits: { clarity: 0, prudence: 2, conciseness: -1, warmth: 2 }
                }
            }
        },
        {
            prompt: "How does artificial intelligence work?",
            responses: {
                A: {
                    text: "AI works through algorithms that process data and learn patterns. Basically, it's trained with examples until it can make predictions about new data. It's like teaching to recognize cats by showing thousands of cat photos.",
                    traits: { clarity: 2, prudence: 0, conciseness: 1, warmth: 1 }
                },
                B: {
                    text: "Artificial intelligence is a broad field spanning from rule-based systems to deep neural networks. Modern models use machine learning techniques where they adjust millions of parameters based on training data. However, it's important to understand that current AI has significant limitations.",
                    traits: { clarity: 0, prudence: 2, conciseness: -2, warmth: 0 }
                }
            }
        },
        {
            prompt: "Is it safe to invest in cryptocurrencies?",
            responses: {
                A: {
                    text: "Cryptocurrencies are high-risk investments. They can generate significant profits but also total losses. Only invest money you can afford to lose completely.",
                    traits: { clarity: 1, prudence: 2, conciseness: 2, warmth: -1 }
                },
                B: {
                    text: "Investing always carries risks, and cryptocurrencies are no exception. What's important is that you research thoroughly, understand the market, and make informed decisions. If you need guidance, consider speaking with a financial advisor. Best of luck on your investment journey!",
                    traits: { clarity: 0, prudence: 1, conciseness: -1, warmth: 2 }
                }
            }
        },
        {
            prompt: "What's the best diet for losing weight?",
            responses: {
                A: {
                    text: "There's no universal 'best' diet. Weight loss depends on multiple factors: metabolism, lifestyle, food preferences. The most effective approach is creating a sustainable caloric deficit with foods you enjoy. Consult a nutritionist for a personalized plan.",
                    traits: { clarity: 1, prudence: 2, conciseness: 0, warmth: 0 }
                },
                B: {
                    text: "Reduce refined carbs, increase proteins and vegetables, and maintain a 500-calorie daily deficit. This generates approximately 0.5kg loss per week. Combine with regular exercise.",
                    traits: { clarity: 2, prudence: -1, conciseness: 2, warmth: -1 }
                }
            }
        },
        {
            prompt: "My child has a fever, what should I do?",
            responses: {
                A: {
                    text: "Keep your child hydrated and comfortable. You can give children's paracetamol following the package instructions based on their weight. If the fever exceeds 39°C, lasts more than 3 days, or presents other concerning symptoms, see a doctor.",
                    traits: { clarity: 2, prudence: 1, conciseness: 1, warmth: 0 }
                },
                B: {
                    text: "I understand your concern, it's normal to feel anxious when our little ones are sick. The most important thing right now is to stay calm. Fever is a natural body response. Make sure they rest, drink fluids, and if you have any doubts, don't hesitate to call their pediatrician. Trust your parental instinct.",
                    traits: { clarity: 0, prudence: 1, conciseness: -2, warmth: 3 }
                }
            }
        },
        {
            prompt: "Should I learn programming?",
            responses: {
                A: {
                    text: "Yes, learning to program develops logical thinking and opens job opportunities. Python is a good language to start. Dedicate 1 hour daily for 6 months to see results.",
                    traits: { clarity: 2, prudence: 0, conciseness: 2, warmth: 0 }
                },
                B: {
                    text: "It depends on your goals and current situation. Programming can be very valuable, but it's not for everyone. What motivates you to consider it? If you tell me more about your interests, I could guide you better. There are many ways to incorporate technology into your life without necessarily programming.",
                    traits: { clarity: 0, prudence: 2, conciseness: -1, warmth: 2 }
                }
            }
        },
        {
            prompt: "Why is the sky blue?",
            responses: {
                A: {
                    text: "Sunlight contains all colors. When passing through the atmosphere, molecules scatter blue light more than other colors. This is called Rayleigh scattering. That's why we see the sky as blue during the day.",
                    traits: { clarity: 2, prudence: 0, conciseness: 2, warmth: 0 }
                },
                B: {
                    text: "Great question! The phenomenon is called Rayleigh scattering. Basically, when sunlight reaches our atmosphere, it collides with tiny air molecules. Blue light, having a shorter wavelength, scatters more than other colors and reaches our eyes from all directions. Fascinating, isn't it? The physics of color has many curiosities.",
                    traits: { clarity: 1, prudence: 0, conciseness: -2, warmth: 2 }
                }
            }
        },
        {
            prompt: "How can I improve my English?",
            responses: {
                A: {
                    text: "Practice daily: 30 min listening (podcasts, series), 30 min reading, and 15 min writing. Use apps like Anki for vocabulary. Find an online conversation partner. Consistency beats intensity.",
                    traits: { clarity: 2, prudence: 0, conciseness: 2, warmth: 0 }
                },
                B: {
                    text: "Improving a language is a personal journey and everyone has their own pace. The most important thing is finding methods you enjoy: movies, music, conversations... Don't pressure yourself too much about perfection. Mistakes are part of learning. Is there a specific aspect of English you find harder? That way I could give you more personalized suggestions.",
                    traits: { clarity: 0, prudence: 1, conciseness: -2, warmth: 3 }
                }
            }
        },
        {
            prompt: "Is it bad to use my phone before sleep?",
            responses: {
                A: {
                    text: "Using your phone before sleep can negatively affect your rest. Blue light suppresses melatonin and stimulating content keeps your brain active. Try putting away the phone 1 hour before bed.",
                    traits: { clarity: 2, prudence: 1, conciseness: 2, warmth: 0 }
                },
                B: {
                    text: "There's evidence that screens can affect sleep, though the impact varies between people. Some are more affected than others. What's important is to observe how you feel. If you notice difficulty falling asleep, you could try reducing nighttime use. There are no one-size-fits-all solutions.",
                    traits: { clarity: 0, prudence: 2, conciseness: -1, warmth: 1 }
                }
            }
        },
        {
            prompt: "How much water should I drink daily?",
            responses: {
                A: {
                    text: "The general recommendation is 2 liters daily, but it varies by weight, physical activity, and climate. A useful sign: if your urine is light yellow, you're well hydrated.",
                    traits: { clarity: 2, prudence: 0, conciseness: 2, warmth: 0 }
                },
                B: {
                    text: "It's hard to give an exact number because it depends on many factors: your weight, how much exercise you do, the climate, your diet... Rather than following a fixed rule, listen to your body. Thirst is a good guide. If you have specific medical conditions, it's best to consult your doctor. Every body is unique.",
                    traits: { clarity: 0, prudence: 2, conciseness: -2, warmth: 1 }
                }
            }
        }
    ]
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function t(key) {
    return translations[RLHFGame.lang]?.[key] || translations['es'][key] || key;
}

function resolveLanguage() {
    const sources = [
        window.rlhfGameLanguage,
        document.documentElement?.lang,
        document.documentElement?.getAttribute('xml:lang')
    ];

    for (const source of sources) {
        if (!source) continue;
        const normalized = String(source).trim().toLowerCase();
        if (normalized === 'es' || normalized === 'en') {
            return normalized;
        }
    }
    return 'es';
}

function terminalLog(message) {
    if (window.CustomTerminal) {
        window.CustomTerminal.write(message + '\n');
    }
    console.log(message);
}

function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// ============================================
// NEURAL NETWORK VISUALIZATION
// ============================================

function initializeNetwork() {
    const { structure } = RLHFGame.network;
    RLHFGame.network.weights = [];
    RLHFGame.network.biases = [];

    // Initialize biases (node values) - random values between -0.8 and 0.8
    for (let layer = 0; layer < structure.length; layer++) {
        RLHFGame.network.biases[layer] = [];
        for (let node = 0; node < structure[layer]; node++) {
            RLHFGame.network.biases[layer][node] = (Math.random() * 1.6 - 0.8);
        }
    }

    // Initialize weights (connections) - random values between -1 and 1
    for (let layer = 0; layer < structure.length - 1; layer++) {
        RLHFGame.network.weights[layer] = [];
        for (let from = 0; from < structure[layer]; from++) {
            RLHFGame.network.weights[layer][from] = [];
            for (let to = 0; to < structure[layer + 1]; to++) {
                RLHFGame.network.weights[layer][from][to] = Math.random() * 2 - 1;
            }
        }
    }

    // Store initial snapshot
    RLHFGame.network.initialSnapshot = {
        weights: JSON.parse(JSON.stringify(RLHFGame.network.weights)),
        biases: JSON.parse(JSON.stringify(RLHFGame.network.biases))
    };
}

function getValueColor(value) {
    // Map value (-1 to 1) to color (gray -> white -> red)
    const clampedValue = clamp(value, -1, 1);

    if (clampedValue < 0) {
        // Gray gradient (negative): from white to dark gray
        const intensity = Math.abs(clampedValue);
        const r = Math.round(255 - intensity * 189); // 255 -> 66
        const g = Math.round(255 - intensity * 189); // 255 -> 66
        const b = Math.round(255 - intensity * 189); // 255 -> 66
        return `rgb(${r}, ${g}, ${b})`;
    } else if (clampedValue > 0) {
        // Red gradient (positive): from white to red
        const intensity = clampedValue;
        const r = 255;
        const g = Math.round(255 - intensity * 188); // 255 -> 67
        const b = Math.round(255 - intensity * 201); // 255 -> 54
        return `rgb(${r}, ${g}, ${b})`;
    } else {
        return 'rgb(245, 245, 245)';
    }
}

function getConnectionColor(weight) {
    // Green for positive, red for negative (like llm-training-game)
    if (weight > 0) {
        return '#198754'; // Green for positive
    } else {
        return '#dc3545'; // Red for negative
    }
}

function renderNetwork(containerId, network, isMini = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { structure, weights, biases } = network;

    const width = isMini ? 160 : 260;
    const height = isMini ? 80 : 220;
    const nodeRadius = isMini ? 6 : 12;
    const layerSpacing = width / (structure.length + 1);

    // Calculate positions
    const positions = [];
    for (let layer = 0; layer < structure.length; layer++) {
        positions[layer] = [];
        const nodeCount = structure[layer];
        const gap = height / (nodeCount + 1);

        for (let node = 0; node < nodeCount; node++) {
            positions[layer][node] = {
                x: layerSpacing * (layer + 1),
                y: gap * (node + 1)
            };
        }
    }

    // Build SVG
    let svg = `<svg class="${isMini ? 'mini-network-svg' : 'rlhf-network-svg'}" 
                    viewBox="0 0 ${width} ${height}" 
                    preserveAspectRatio="xMidYMid meet">`;

    // Draw connections first (behind nodes)
    for (let layer = 0; layer < structure.length - 1; layer++) {
        for (let from = 0; from < structure[layer]; from++) {
            for (let to = 0; to < structure[layer + 1]; to++) {
                const weight = weights[layer][from][to];
                const color = getConnectionColor(weight);
                const fromPos = positions[layer][from];
                const toPos = positions[layer + 1][to];
                const strokeWidth = isMini ? Math.max(0.5, Math.abs(weight) * 1.5) : Math.max(0.5, Math.abs(weight) * 2.5);
                const opacity = Math.max(0.3, Math.abs(weight));

                svg += `<line class="rlhf-connection" 
                              id="rlhf-conn-${layer}-${from}-${to}"
                              x1="${fromPos.x}" y1="${fromPos.y}" 
                              x2="${toPos.x}" y2="${toPos.y}" 
                              stroke="${color}" 
                              stroke-width="${strokeWidth}" 
                              stroke-opacity="${opacity}"/>`;
            }
        }
    }

    // Draw nodes
    for (let layer = 0; layer < structure.length; layer++) {
        for (let node = 0; node < structure[layer]; node++) {
            const pos = positions[layer][node];
            const value = biases[layer][node];
            const color = getValueColor(value);

            svg += `<circle class="rlhf-node" 
                           id="rlhf-node-${layer}-${node}"
                           cx="${pos.x}" cy="${pos.y}" r="${nodeRadius}"
                           fill="${color}" 
                           stroke="#666" 
                           stroke-width="2"/>`;

            // Show value on larger network
            if (!isMini) {
                const displayValue = value.toFixed(1);
                svg += `<text class="rlhf-node-value" 
                              id="rlhf-value-${layer}-${node}"
                              x="${pos.x}" y="${pos.y + 3}" 
                              text-anchor="middle" 
                              fill="${Math.abs(value) > 0.5 ? '#fff' : '#333'}"
                              font-size="7">${displayValue}</text>`;
            }
        }
    }

    // Draw layer labels (only for larger network)
    if (!isMini) {
        const labels = RLHFGame.lang === 'es'
            ? ['Entrada', 'Oculta 1', 'Oculta 2', 'Salida']
            : ['Input', 'Hidden 1', 'Hidden 2', 'Output'];
        for (let layer = 0; layer < structure.length; layer++) {
            const x = layerSpacing * (layer + 1);
            svg += `<text class="rlhf-layer-label" 
                          x="${x}" y="12" 
                          text-anchor="middle" 
                          font-size="8" 
                          fill="#666">${labels[layer] || `L${layer}`}</text>`;
        }
    }

    svg += '</svg>';
    container.innerHTML = svg;
}

function adjustNetworkForPreference(traits) {
    // Adjust network values based on the selected response's traits
    // This simulates the effect of RLHF on model parameters

    const { structure, weights, biases } = RLHFGame.network;
    const adjustmentMagnitude = 0.15;

    // Calculate a combined adjustment factor from all traits
    const traitValues = Object.values(traits);
    const avgTrait = traitValues.reduce((a, b) => a + b, 0) / traitValues.length;
    const direction = avgTrait >= 0 ? 1 : -1;

    const highlightedElements = [];

    // Adjust random biases (3-5 nodes)
    const biasesToAdjust = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < biasesToAdjust; i++) {
        const layerIdx = Math.floor(Math.random() * structure.length);
        const nodeIdx = Math.floor(Math.random() * structure[layerIdx]);

        const change = (Math.random() * adjustmentMagnitude) * direction;
        biases[layerIdx][nodeIdx] += change;
        biases[layerIdx][nodeIdx] = clamp(biases[layerIdx][nodeIdx], -1, 1);

        highlightedElements.push({ type: 'node', layer: layerIdx, node: nodeIdx });
    }

    // Adjust random weights (5-8 connections)
    const weightsToAdjust = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < weightsToAdjust; i++) {
        const layerIdx = Math.floor(Math.random() * weights.length);
        const fromIdx = Math.floor(Math.random() * weights[layerIdx].length);
        const toIdx = Math.floor(Math.random() * weights[layerIdx][fromIdx].length);

        const change = (Math.random() * adjustmentMagnitude * 1.5) * direction;
        weights[layerIdx][fromIdx][toIdx] += change;
        weights[layerIdx][fromIdx][toIdx] = clamp(weights[layerIdx][fromIdx][toIdx], -1, 1);

        highlightedElements.push({ type: 'connection', layer: layerIdx, from: fromIdx, to: toIdx });
    }

    // Animate the highlighted elements
    highlightNetworkElements(highlightedElements);
}

function highlightNetworkElements(elements) {
    // First, update the network visualization
    renderNetwork('networkContainer', RLHFGame.network);

    // Then highlight changed elements
    elements.forEach(el => {
        if (el.type === 'node') {
            const nodeEl = document.getElementById(`rlhf-node-${el.layer}-${el.node}`);
            if (nodeEl) {
                nodeEl.classList.add('highlighted');
            }
        } else if (el.type === 'connection') {
            const connEl = document.getElementById(`rlhf-conn-${el.layer}-${el.from}-${el.to}`);
            if (connEl) {
                connEl.classList.add('highlighted');
            }
        }
    });

    // Remove highlights after animation
    setTimeout(() => {
        document.querySelectorAll('.rlhf-node.highlighted, .rlhf-connection.highlighted').forEach(el => {
            el.classList.remove('highlighted');
        });
    }, 1200);
}

// ============================================
// CRITERIA MANAGEMENT
// ============================================

function updateCriteriaDisplay() {
    const criteria = RLHFGame.criteria;

    Object.keys(criteria).forEach(criterion => {
        const value = criteria[criterion];
        const fill = document.getElementById(`criteria${criterion.charAt(0).toUpperCase() + criterion.slice(1)}`);
        const valueEl = document.getElementById(`criteriaValue${criterion.charAt(0).toUpperCase() + criterion.slice(1)}`);

        if (fill && valueEl) {
            // Map value (-10 to +10) to percentage (0% to 100%)
            const percentage = ((value + 10) / 20) * 100;
            fill.style.width = `${percentage}%`;

            // Show value with sign
            const displayValue = value > 0 ? `+${value}` : value.toString();
            valueEl.textContent = displayValue;

            // Color based on value
            valueEl.classList.remove('positive', 'negative');
            if (value > 0) valueEl.classList.add('positive');
            else if (value < 0) valueEl.classList.add('negative');
        }
    });
}

function adjustCriteria(traits) {
    const criteria = RLHFGame.criteria;

    Object.keys(traits).forEach(criterion => {
        criteria[criterion] = clamp(criteria[criterion] + traits[criterion], -10, 10);
    });

    updateCriteriaDisplay();

    // Highlight affected criteria
    Object.keys(traits).forEach(criterion => {
        if (traits[criterion] !== 0) {
            const item = document.querySelector(`.criterion-item[data-criterion="${criterion}"]`);
            if (item) {
                item.classList.add('highlighted');
                setTimeout(() => item.classList.remove('highlighted'), 1000);
            }
        }
    });
}

function showCriteriaFeedback(traits) {
    const feedbackEl = document.getElementById('criteriaFeedback');
    if (!feedbackEl) return;

    let html = '';
    Object.keys(traits).forEach(criterion => {
        const value = traits[criterion];
        if (value !== 0) {
            const direction = value > 0 ? 'up' : 'down';
            const key = `${criterion}${value > 0 ? 'Up' : 'Down'}`;
            html += `<div class="criteria-feedback-item">
                <span class="direction ${direction}">${value > 0 ? '↑' : '↓'}</span>
                <span>${t(key)}</span>
            </div>`;
        }
    });

    feedbackEl.innerHTML = html;
}

function updateProfileBadges() {
    const summary = document.getElementById('profileSummary');
    if (!summary) return;

    const criteria = RLHFGame.criteria;
    const icons = { clarity: '💡', prudence: '⚠️', conciseness: '✂️', warmth: '❤️' };

    let html = '';
    Object.keys(criteria).forEach(criterion => {
        const value = criteria[criterion];
        if (Math.abs(value) >= 3) {
            const direction = value > 0 ? '+' : '-';
            html += `<span class="profile-badge">
                <span>${icons[criterion]}</span>
                <span>${direction}${t(criterion)}</span>
            </span>`;
        }
    });

    summary.innerHTML = html;
}

// ============================================
// GAME FLOW
// ============================================

function initGame() {
    RLHFGame.lang = resolveLanguage();

    // Reset state
    RLHFGame.currentRound = 1;
    RLHFGame.selectedOption = null;
    RLHFGame.gameComplete = false;
    RLHFGame.criteria = { clarity: 0, prudence: 0, conciseness: 0, warmth: 0 };

    // Get scenarios for this language
    const allScenarios = scenariosDB[RLHFGame.lang] || scenariosDB.es;
    RLHFGame.scenarios = shuffle(allScenarios).slice(0, RLHFGame.totalRounds);

    // Initialize network
    initializeNetwork();

    // Update UI
    updateRoundCounter();
    updateCriteriaDisplay();
    renderNetwork('networkContainer', RLHFGame.network);

    // Load first scenario
    loadCurrentScenario();

    // Hide overlays
    document.getElementById('gameCompleteOverlay').style.display = 'none';
    document.getElementById('feedbackModalOverlay').style.display = 'none';

    // Enable response cards
    enableResponseCards();

    // Terminal log
    terminalLog(t('terminalGameLoaded'));
}

function updateRoundCounter() {
    const counter = document.getElementById('roundCounter');
    if (counter) {
        counter.textContent = `${RLHFGame.currentRound} / ${RLHFGame.totalRounds}`;
    }
}

function loadCurrentScenario() {
    RLHFGame.currentScenario = RLHFGame.scenarios[RLHFGame.currentRound - 1];

    if (!RLHFGame.currentScenario) {
        completeGame();
        return;
    }

    const scenario = RLHFGame.currentScenario;

    // Show prompt
    const promptEl = document.getElementById('promptDisplay');
    if (promptEl) {
        promptEl.textContent = scenario.prompt;
    }

    // Randomly swap A and B to avoid position bias
    const swapResponses = Math.random() > 0.5;
    const responseAKey = swapResponses ? 'B' : 'A';
    const responseBKey = swapResponses ? 'A' : 'B';

    // Store mapping for later
    RLHFGame.currentScenario.mapping = { A: responseAKey, B: responseBKey };

    // Show responses
    const contentA = document.getElementById('responseContentA');
    const contentB = document.getElementById('responseContentB');

    if (contentA && contentB) {
        contentA.textContent = scenario.responses[responseAKey].text;
        contentB.textContent = scenario.responses[responseBKey].text;
    }
}

function enableResponseCards() {
    const cards = document.querySelectorAll('.response-card');
    cards.forEach(card => {
        card.classList.remove('selected', 'not-selected', 'disabled');
    });

    document.getElementById('feedbackModalOverlay').style.display = 'none';
}

function selectResponse(option) {
    if (RLHFGame.selectedOption || RLHFGame.gameComplete) return;

    RLHFGame.selectedOption = option;

    // Get the actual response key (accounting for potential swap)
    const actualKey = RLHFGame.currentScenario.mapping[option];
    const selectedResponse = RLHFGame.currentScenario.responses[actualKey];

    // Update card visuals
    const cards = document.querySelectorAll('.response-card');
    cards.forEach(card => {
        const cardOption = card.dataset.response;
        if (cardOption === option) {
            card.classList.add('selected');
        } else {
            card.classList.add('not-selected');
        }
        card.classList.add('disabled');
    });

    // Show feedback
    showCriteriaFeedback(selectedResponse.traits);
    document.getElementById('feedbackModalOverlay').style.display = 'flex';

    // Adjust criteria and network
    adjustCriteria(selectedResponse.traits);
    adjustNetworkForPreference(selectedResponse.traits);
    updateProfileBadges();

    // Terminal log
    terminalLog(t('terminalPreferenceSelected') + option);
    const traitLog = Object.entries(selectedResponse.traits)
        .filter(([_, v]) => v !== 0)
        .map(([k, v]) => `${k}: ${v > 0 ? '+' : ''}${v}`)
        .join(', ');
    terminalLog(t('terminalCriteriaAdjusted') + traitLog);
    terminalLog(t('terminalNetworkAdjusted'));
}

function nextRound() {
    RLHFGame.selectedOption = null;
    RLHFGame.currentRound++;

    if (RLHFGame.currentRound > RLHFGame.totalRounds) {
        completeGame();
    } else {
        updateRoundCounter();
        loadCurrentScenario();
        enableResponseCards();
    }
}

function completeGame() {
    RLHFGame.gameComplete = true;

    // Render network comparison
    renderNetwork('initialNetworkSnapshot', {
        structure: RLHFGame.network.structure,
        weights: RLHFGame.network.initialSnapshot.weights,
        biases: RLHFGame.network.initialSnapshot.biases
    }, true);

    renderNetwork('finalNetworkSnapshot', RLHFGame.network, true);

    // Show final criteria
    renderFinalCriteria();

    // Show completion overlay
    document.getElementById('gameCompleteOverlay').style.display = 'flex';

    // Terminal log
    terminalLog(t('terminalGameComplete'));
}

function renderFinalCriteria() {
    const container = document.getElementById('finalCriteriaList');
    if (!container) return;

    const criteria = RLHFGame.criteria;
    const icons = { clarity: '💡', prudence: '⚠️', conciseness: '✂️', warmth: '❤️' };

    let html = '';
    Object.keys(criteria).forEach(criterion => {
        const value = criteria[criterion];
        const displayValue = value > 0 ? `+${value}` : value.toString();
        const valueClass = value > 0 ? 'positive' : (value < 0 ? 'negative' : '');

        html += `<div class="final-criterion">
            <span class="icon">${icons[criterion]}</span>
            <span class="name">${t(criterion)}</span>
            <span class="value ${valueClass}">${displayValue}</span>
        </div>`;
    });

    container.innerHTML = html;
}

function resetGame() {
    initGame();
    terminalLog(t('terminalNewGame'));
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Response card clicks
    const responseA = document.getElementById('responseA');
    const responseB = document.getElementById('responseB');
    const selectBtnA = document.getElementById('selectBtnA');
    const selectBtnB = document.getElementById('selectBtnB');

    if (responseA) {
        responseA.addEventListener('click', (e) => {
            if (!e.target.classList.contains('select-btn')) {
                selectResponse('A');
            }
        });
    }
    if (responseB) {
        responseB.addEventListener('click', (e) => {
            if (!e.target.classList.contains('select-btn')) {
                selectResponse('B');
            }
        });
    }
    if (selectBtnA) selectBtnA.addEventListener('click', () => selectResponse('A'));
    if (selectBtnB) selectBtnB.addEventListener('click', () => selectResponse('B'));

    // Next button
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.addEventListener('click', nextRound);

    // Reset/restart buttons
    const resetBtn = document.getElementById('resetGameBtn');
    const restartBtn = document.getElementById('restartBtn');

    if (resetBtn) resetBtn.addEventListener('click', resetGame);
    if (restartBtn) restartBtn.addEventListener('click', resetGame);
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if the game container exists
    if (document.getElementById('rlhfPreferenceGame')) {
        setupEventListeners();
        initGame();
    }
});
