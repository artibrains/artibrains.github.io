// --- Translations ---
const translations = {
    es: {
        appInitialized: "Tokenizador BPE: Aplicación inicializada.",
        loadingCorpus: "Tokenizador BPE: Cargando corpus desde archivo 'minermont.txt'...",
        corpusLoaded: "Tokenizador BPE: Corpus cargado con éxito ({chars} caracteres, {words} palabras).",
        corpusLoadError: "Tokenizador BPE: Error al cargar corpus.",
        corpusCleared: "Tokenizador BPE: Corpus limpiado.",
        trainingStarted: "Tokenizador BPE: Iniciando entrenamiento con tamaño máximo de vocabulario: {size}",
        trainingProgress: "Tokenizador BPE: Entrenamiento en progreso... {progress}% completado ({current}/{total} fusiones)",
        trainingComplete: "Tokenizador BPE: Entrenamiento completado. Vocabulario final: {size} tokens, {merges} fusiones realizadas.",
        tokenizing: "Tokenizador BPE: Tokenizando frase: '{sentence}'",
        tokenizationResult: "Tokenizador BPE: Resultado de tokenización: {tokens} tokens generados.",
        showingMoreVocab: "Tokenizador BPE: Mostrando más vocabulario (ahora {count} tokens visibles).",
        training: "Entrenando...",
        trainButton: "3. Entrenar BPE",
        corpusLoadedStatus: "Texto de 'minermont.txt' cargado. ¡Ya puedes entrenar!",
        httpError: "HTTP error! status: {status}. Asegúrate de que 'minermont.txt' existe.",
        corpusPlaceholder: "No se pudo cargar 'minermont.txt'. Por favor, pega tu texto aquí."
    },
    en: {
        appInitialized: "BPE Tokenizer: Application initialized.",
        loadingCorpus: "BPE Tokenizer: Loading corpus from 'minermont.txt' file...",
        corpusLoaded: "BPE Tokenizer: Corpus loaded successfully ({chars} characters, {words} words).",
        corpusLoadError: "BPE Tokenizer: Error loading corpus.",
        corpusCleared: "BPE Tokenizer: Corpus cleared.",
        trainingStarted: "BPE Tokenizer: Starting training with maximum vocabulary size: {size}",
        trainingProgress: "BPE Tokenizer: Training in progress... {progress}% complete ({current}/{total} merges)",
        trainingComplete: "BPE Tokenizer: Training completed. Final vocabulary: {size} tokens, {merges} merges performed.",
        tokenizing: "BPE Tokenizer: Tokenizing sentence: '{sentence}'",
        tokenizationResult: "BPE Tokenizer: Tokenization result: {tokens} tokens generated.",
        showingMoreVocab: "BPE Tokenizer: Showing more vocabulary (now {count} tokens visible).",
        training: "Training...",
        trainButton: "3. Train BPE",
        corpusLoadedStatus: "Text from 'minermont.txt' loaded. Ready to train!",
        httpError: "HTTP error! status: {status}. Make sure 'minermont.txt' exists.",
        corpusPlaceholder: "Could not load 'minermont.txt'. Please paste your text here."
    }
};

// Helper function to get translated text
function t(key, params = {}) {
    const lang = window.tokenizerLanguage || 'es';
    let text = translations[lang]?.[key] || translations['es'][key] || key;

    // Replace parameters in the text
    Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
    });

    return text;
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias al DOM ---
    const corpusInput = document.getElementById('corpus-input');
    const clearCorpusBtn = document.getElementById('clear-corpus-btn');
    const maxVocabSizeInput = document.getElementById('max-vocab-size');
    const trainBtn = document.getElementById('train-bpe-btn');
    const statusBox = document.getElementById('status-box');
    const trainingResultsDiv = document.getElementById('training-results');
    const mergeLogPre = document.getElementById('merge-log');
    const finalVocabDiv = document.getElementById('final-vocab');
    const vocabControlsDiv = document.getElementById('vocab-controls');
    const showMoreVocabBtn = document.getElementById('show-more-vocab-btn');
    const tokenizationSection = document.getElementById('tokenization-section');
    const sentenceInput = document.getElementById('sentence-input');
    const tokenizeBtn = document.getElementById('tokenize-btn');
    const tokenizedOutputDiv = document.getElementById('tokenized-output');

    // --- Estado Global ---
    let orderedMerges = [];
    let sortedVocabWithFreq = [];
    let displayedVocabCount = 0;
    const INITIAL_VOCAB_DISPLAY = 51;
    const VOCAB_INCREMENT = 51;

    // Log initialization
    if (window.CustomTerminal) {
        window.CustomTerminal.write(t('appInitialized') + "\n");
    }

    // --- Funciones ---

    const showStatus = (message, type = 'error') => { statusBox.textContent = message; statusBox.className = `status-box ${type}`; statusBox.style.display = 'block'; };
    const hideStatus = () => { statusBox.style.display = 'none'; };
    const updateUIState = (isTraining) => {
        trainBtn.disabled = isTraining;
        trainBtn.textContent = isTraining ? t('training') : t('trainButton');
        corpusInput.disabled = isTraining;
        maxVocabSizeInput.disabled = isTraining;
    };

    const loadDefaultCorpus = () => {
        if (window.CustomTerminal) {
            window.CustomTerminal.write(t('loadingCorpus') + "\n");
        }
        fetch('/files/minermont.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error(t('httpError', { status: response.status }));
                }
                return response.text();
            })
            .then(text => {
                corpusInput.value = text.trim();
                if (window.CustomTerminal) {
                    const words = text.trim().split(/\s+/).length;
                    window.CustomTerminal.write(t('corpusLoaded', { chars: text.length, words: words }) + "\n");
                }
                showStatus(t('corpusLoadedStatus'), 'info');
            })
            .catch(error => {
                console.error("Error al cargar 'minermont.txt':", error);
                if (window.CustomTerminal) {
                    window.CustomTerminal.write(t('corpusLoadError') + " " + error.message + "\n");
                }
                showStatus(error.message, 'error');
                corpusInput.placeholder = t('corpusPlaceholder');
            });
    };

    const displayFinalVocabulary = () => {
        const vocabToShow = sortedVocabWithFreq.slice(0, displayedVocabCount);
        finalVocabDiv.innerHTML = `<ul>${vocabToShow.map(([token, freq]) =>
            `<li>${token.replace(/</g, '<').replace(/>/g, '>')} <span class="freq-count">${freq}</span></li>`
        ).join('')}</ul>`;
        if (displayedVocabCount < sortedVocabWithFreq.length) {
            vocabControlsDiv.style.display = 'block';
        } else {
            vocabControlsDiv.style.display = 'none';
        }
    };

    const getWordFrequencies = (text) => {
        const words = text.trim().toLowerCase().split(/\s+/);
        const frequencies = {};
        for (const word of words) { if (word) { const wordWithSuffix = word + '</w>'; frequencies[wordWithSuffix] = (frequencies[wordWithSuffix] || 0) + 1; } }
        return frequencies;
    };

    const getPairStats = (wordFrequencies) => {
        const stats = {};
        for (const word in wordFrequencies) {
            const symbols = word.split(' ');
            const count = wordFrequencies[word];
            for (let i = 0; i < symbols.length - 1; i++) {
                const pair = `${symbols[i]} ${symbols[i + 1]}`;
                stats[pair] = (stats[pair] || 0) + count;
            }
        }
        return stats;
    };

    const mergePair = (pairToMerge, wordFrequencies) => {
        const newFrequencies = {};
        const [p1, p2] = pairToMerge.split(' ');
        const regex = new RegExp(`(?<!\\S)${p1.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')} ${p2.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}(?!\\S)`, 'g');
        const newSymbol = p1 + p2;
        for (const word in wordFrequencies) {
            const newWord = word.replace(regex, newSymbol);
            newFrequencies[newWord] = wordFrequencies[word];
        }
        return newFrequencies;
    };

    const runBpeTraining = () => {
        const corpusText = corpusInput.value;
        const maxVocabSize = parseInt(maxVocabSizeInput.value, 10);
        if (!corpusText || isNaN(maxVocabSize)) throw new Error("Por favor, introduce un texto y un tamaño de vocabulario válido.");

        let wordFrequencies = getWordFrequencies(corpusText);
        let alphabet = new Set();
        for (const word in wordFrequencies) {
            for (const char of word) alphabet.add(char);
        }
        let vocab = [...alphabet];
        orderedMerges = [];
        let splitWordFrequencies = {};
        for (const word in wordFrequencies) {
            splitWordFrequencies[word.split('').join(' ')] = wordFrequencies[word];
        }
        if (maxVocabSize < vocab.length) throw new Error(`El tamaño de vocabulario solicitado (${maxVocabSize}) es menor que el de caracteres únicos (${vocab.length}).`);
        let mergeLog = `Vocabulario base (${vocab.length} tokens).\nEntrenando hasta ${maxVocabSize} tokens...\n\n`;

        while (vocab.length < maxVocabSize) {
            const stats = getPairStats(splitWordFrequencies);
            if (Object.keys(stats).length === 0) { mergeLog += `\nNo hay más pares para fusionar.`; break; }
            const bestPairKey = Object.keys(stats).reduce((a, b) => stats[a] > stats[b] ? a : b);
            splitWordFrequencies = mergePair(bestPairKey, splitWordFrequencies);
            const newSymbol = bestPairKey.replace(' ', '');
            vocab.push(newSymbol);
            orderedMerges.push(bestPairKey.split(' '));
            mergeLog += `Fusión ${orderedMerges.length}: [${bestPairKey}] -> "${newSymbol}" (Vocab: ${vocab.length}/${maxVocabSize})\n`;
        }

        const finalTokenFrequencies = {};
        for (const token of vocab) { finalTokenFrequencies[token] = 0; }
        for (const splitWord in splitWordFrequencies) {
            const tokensInWord = splitWord.split(' ');
            const count = splitWordFrequencies[splitWord];
            for (const token of tokensInWord) {
                if (finalTokenFrequencies.hasOwnProperty(token)) {
                    finalTokenFrequencies[token] += count;
                }
            }
        }

        sortedVocabWithFreq = Object.entries(finalTokenFrequencies).sort(([, freqA], [, freqB]) => freqB - freqA);

        mergeLogPre.textContent = mergeLog;
        displayedVocabCount = INITIAL_VOCAB_DISPLAY;
        displayFinalVocabulary();
        trainingResultsDiv.style.display = 'block';
        tokenizationSection.classList.remove('section-disabled');
    };

    const displayTokens = (tokens) => {
        tokenizedOutputDiv.innerHTML = '';
        tokens.forEach(tokenStr => {
            const tokenEl = document.createElement('span');
            tokenEl.className = 'token';
            if (tokenStr.endsWith('</w>')) {
                if (tokenStr === '</w>') {
                    tokenEl.textContent = '[FIN]';
                    tokenEl.title = "Token de fin de palabra (representa un espacio)";
                } else {
                    tokenEl.textContent = tokenStr.replace('</w>', '');
                    tokenEl.classList.add('token-final');
                }
            } else {
                tokenEl.textContent = tokenStr;
            }
            tokenizedOutputDiv.appendChild(tokenEl);
        });
    };

    // --- Manejadores de Eventos ---
    trainBtn.addEventListener('click', () => {
        const maxVocabSize = parseInt(maxVocabSizeInput.value);
        if (window.CustomTerminal) {
            window.CustomTerminal.write(t('trainingStarted', { size: maxVocabSize }) + "\n");
        }
        updateUIState(true);
        hideStatus();
        trainingResultsDiv.style.display = 'none';
        tokenizationSection.classList.add('section-disabled');
        setTimeout(() => {
            try {
                runBpeTraining();
                const trainingMsg = t('trainingComplete', {
                    size: sortedVocabWithFreq.length,
                    merges: orderedMerges.length
                });
                if (window.CustomTerminal) {
                    window.CustomTerminal.write(trainingMsg + "\n");
                }
                showStatus(`¡Entrenamiento completado! Vocabulario de ${sortedVocabWithFreq.length} tokens generado.`, 'success');
            } catch (e) {
                showStatus(`Error: ${e.message}`, 'error'); console.error(e);
            } finally {
                updateUIState(false);
            }
        }, 10);
    });

    clearCorpusBtn.addEventListener('click', () => {
        corpusInput.value = '';
        corpusInput.focus();
        hideStatus();
        if (window.CustomTerminal) {
            window.CustomTerminal.write(t('corpusCleared') + "\n");
        }
    });

    showMoreVocabBtn.addEventListener('click', () => {
        displayedVocabCount += VOCAB_INCREMENT;
        displayFinalVocabulary();
        if (window.CustomTerminal) {
            window.CustomTerminal.write(t('showingMoreVocab', { count: displayedVocabCount }) + "\n");
        }
    });

    tokenizeBtn.addEventListener('click', () => {
        const sentence = sentenceInput.value.trim().toLowerCase();
        if (!sentence) { alert("Por favor, introduce una frase para tokenizar."); return; }
        if (window.CustomTerminal) {
            window.CustomTerminal.write(t('tokenizing', { sentence: sentence }) + "\n");
        }
        const words = sentence.split(/\s+/);
        let allTokens = [];
        for (const word of words) {
            if (!word) continue;
            let wordTokens = [...word, '</w>'];
            for (const pairToMerge of orderedMerges) {
                let newWordTokens = [];
                let i = 0;
                while (i < wordTokens.length) {
                    if (i < wordTokens.length - 1 && wordTokens[i] === pairToMerge[0] && wordTokens[i + 1] === pairToMerge[1]) {
                        newWordTokens.push(pairToMerge[0] + pairToMerge[1]);
                        i += 2;
                    } else {
                        newWordTokens.push(wordTokens[i]);
                        i++;
                    }
                }
                wordTokens = newWordTokens;
            }
            allTokens = allTokens.concat(wordTokens);
        }
        if (window.CustomTerminal) {
            window.CustomTerminal.write(t('tokenizationResult', { tokens: allTokens.length }) + "\n");
        }
        displayTokens(allTokens);
    });

    // --- Ejecución Inicial ---
    loadDefaultCorpus();
});