/* ============================================
   LA CASA DE PAPEL - JAVASCRIPT
   ============================================ */

// ========== VARIÁVEIS GLOBAIS ==========
let currentQ = 0;
let quizScore = 0;
let answered = false;
let galeriaIdx = 0;
let filteredGal = [...galleryImages];
let selIdx = -1;

// Verifica se uma URL é de vídeo
function isVideoUrl(url) {
    return /\.(mp4|webm|ogg)$/i.test(url);
}

// ========== OBJETO DE RENDERIZAÇÃO ==========
const render = {
    /**
     * Renderiza a galeria de personagens
     * 
     * Cada personagem é exibido em um card com imagem, nome, codinome,
     * descrição curta, papel na série e um botão para ver mais detalhes.
     */
    personagens() {
        document.getElementById('personagensGrid').innerHTML = characters.map(c => ` 
            <div class="personagem-card">
                <img src="${encodeURI(c.image)}" alt="${c.name}">
                <div class="personagem-info">
                    <div class="personagem-name">${c.name}</div>
                    <div class="personagem-codename">"${c.codeName}"</div>
                    <div class="personagem-description">${c.description}</div>
                    <div class="personagem-footer">
                        <span class="personagem-role">${c.role}</span>
                        <button class="personagem-btn" onclick="openCharModal('${c.id}')">
                            Ver mais
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    /**
     * Renderiza a seção de roubos
     */
    heists() { // Roubos se referindo aos heists da série de crime
        let html = heists.map((h, i) => `
            <div class="heist-item">
                <img src="${encodeURI(h.image)}" alt="${h.name}">
                <div class="heist-content">
                    <span class="heist-badge">Temporadas ${h.seasons}</span>
                    <h2>${h.name}</h2>
                    <p class="heist-description">${h.description}</p>
                    <div class="heist-details">
                        <div class="heist-detail-card">
                            <div class="heist-detail-label">Local</div>
                            <div class="heist-detail-value">${h.location}</div>
                        </div>
                        <div class="heist-detail-card">
                            <div class="heist-detail-label">Ano</div>
                            <div class="heist-detail-value">${h.year}</div>
                        </div>
                        <div class="heist-detail-card">
                            <div class="heist-detail-label">Duração</div>
                            <div class="heist-detail-value">${h.duration}</div>
                        </div>
                        <div class="heist-detail-card">
                            <div class="heist-detail-label">Valor</div>
                            <div class="heist-detail-value" style="color: var(--yellow);">${h.amount}</div>
                        </div>
                    </div>
                    <div class="heist-target">
                        <div class="heist-target-label">Alvo</div>
                        <div class="heist-target-value">${h.target}</div>
                    </div>
                </div>
            </div>
        `).join(''); // Junta os cards de roubos em uma string

        // Adiciona tabela de comparação
        html += `
            <div style="margin-top: 2rem;">
                <h2 style="text-align: center; margin-bottom: 2rem;">Comparação dos Roubos</h2>
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Aspecto</th>
                            <th>Primeiro Roubo</th>
                            <th>Segundo Roubo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Alvo</strong></td>
                            <td>Fábrica de Moeda</td>
                            <td>Banco da Reserva Federal</td>
                        </tr>
                        <tr>
                            <td><strong>Valor</strong></td>
                            <td>2,4 bilhões</td>
                            <td>90 bilhões</td>
                        </tr>
                        <tr>
                            <td><strong>Dificuldade</strong></td>
                            <td>Moderada</td>
                            <td>Extrema</td>
                        </tr>
                        <tr>
                            <td><strong>Perdas</strong></td>
                            <td>Berlim</td>
                            <td>Nairóbi e outros</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('heistsContainer').innerHTML = html;
    },

    /**
     * Renderiza a timeline
     */
    timeline() {
        const types = {
            event: 'Evento',
            heist: 'Roubo',
            death: 'Morte',
            twist: 'Reviravolta'
        };

        document.getElementById('timelineContainer').innerHTML = `
            <div class="timeline-container">
                <div class="timeline-line"></div>
                <div class="timeline-events">
                    ${timelineEvents.map(e => `
                        <div class="timeline-event">
                            <div class="timeline-dot"></div>
                            <div class="timeline-card">
                                <div class="timeline-date">${e.date}</div>
                                <h3 class="timeline-title">${e.title}</h3>
                                <p class="timeline-description">${e.description}</p>
                                <span class="timeline-badge ${e.type}">
                                    ${types[e.type]}
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    /**
     * Renderiza a galeria de fotos
     */
    galeria() {
        this.galeriaFilters();
        this.galeriaGrid();
    },

    /**
     * Renderiza os filtros da galeria
     */
    galeriaFilters() {
        const cats = ['todos', 'personagens', 'locais', 'cenas'];
        document.getElementById('galeriaFilters').innerHTML = cats.map(c => `
            <button data-cat="${c}" class="filter-btn ${c === 'todos' ? 'active' : ''}" 
                    onclick="filterGal('${c}', this)">
                ${c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
        `).join('');
    },

    /**
     * Renderiza o grid de fotos da galeria
     */
    galeriaGrid() {
        const gridHtml = filteredGal.map((i, idx) => `
            <div class="galeria-item" onclick="openGalModal(${idx})">
                ${isVideoUrl(i.image)
                    ? `<video class="galeria-thumb" src="${encodeURI(i.image)}" muted playsinline loop preload="metadata"></video>`
                    : `<img src="${encodeURI(i.image)}" alt="${i.title}">`}
                <div class="galeria-overlay">
                    <div class="galeria-title">${i.title}</div>
                    <div class="galeria-category">${i.category}</div>
                </div>
            </div>
        `).join('');

        const gridEl = document.getElementById('galeriaGrid');
        gridEl.innerHTML = gridHtml;

        // Play video thumbnails on hover (muted) and reset on leave
        gridEl.querySelectorAll('.galeria-thumb').forEach(v => {
            v.addEventListener('mouseenter', () => { try { v.play(); } catch(e){} });
            v.addEventListener('mouseleave', () => { try { v.pause(); v.currentTime = 0; } catch(e){} });
        });
    },

    /**
     * Renderiza o quiz
     */
    quiz() {
        const q = quizQuestions[currentQ];
        
        if (!q) {
            return this.score();
        }

        const prog = ((currentQ + 1) / quizQuestions.length) * 100;
        let html = `
            <div class="quiz-card">
                <div class="quiz-header">
                    <div class="quiz-progress">
                        <span class="quiz-progress-label">
                            Pergunta ${currentQ + 1}/${quizQuestions.length}
                        </span>
                        <div class="quiz-progress-bar">
                            <div class="quiz-progress-fill" style="width: ${prog}%"></div>
                        </div>
                    </div>
                </div>

                <div class="quiz-question">${q.question}</div>

                <div class="quiz-options">
        `;

        q.options.forEach((o, i) => {
            let cls = 'quiz-option';
            if (answered) {
                if (i === q.correct) {
                    cls += ' correct';
                } else if (i === selIdx && i !== q.correct) {
                    cls += ' incorrect';
                }
            }

            html += `
                <button class="${cls}" 
                        ${answered ? 'disabled' : ''} 
                        ${answered ? '' : `onclick="answerQ(${i})"`}>
                    <span>${o}</span>
                    ${answered && i === q.correct ? '<span>✓</span>' : ''}
                    ${answered && selIdx === i && i !== q.correct ? '<span>✗</span>' : ''}
                </button>
            `;
        });

        html += `</div>`;

        if (answered) {
            html += `
                <div class="quiz-explanation">
                    <div class="quiz-explanation-label">Explicação:</div>
                    <div class="quiz-explanation-text">${q.explanation}</div>
                </div>
                <button class="btn btn-primary" style="width: 100%;" onclick="nextQ()">
                    ${currentQ === quizQuestions.length - 1 ? 'Ver Resultado' : 'Próxima Pergunta'} →
                </button>
            `;
        }

        html += `</div>`;
        document.getElementById('quizContainer').innerHTML = html;
    },

    /**
     * Renderiza a tela de resultado do quiz
     */
    score() {
        const pct = (quizScore / quizQuestions.length) * 100;
        const msgs = {
            100: 'Perfeito! Você é um verdadeiro fã! 🎯',
            80: 'Excelente! Conhece bem a série! 🌟',
            60: 'Bom! Conhece bastante! 👍',
            40: 'Não está mal! Reveja episódios! 📺',
            0: 'Continue explorando! 🔍'
        };

        let msg = msgs[0];
        for (let k in msgs) {
            if (pct >= k) {
                msg = msgs[k];
                break;
            }
        }

        document.getElementById('quizContainer').innerHTML = `
            <div class="quiz-card">
                <div class="quiz-score">
                    <div class="quiz-score-number">${quizScore}/${quizQuestions.length}</div>
                    <div class="quiz-score-percentage">${pct.toFixed(0)}% de acertos</div>
                    <p class="quiz-score-message">${msg}</p>
                    <div class="quiz-buttons">
                        <button class="btn btn-primary" onclick="restartQuiz()">
                            🔄 Tentar Novamente
                        </button>
                        <button class="btn btn-secondary" onclick="scrollTo('home')">
                            Voltar ao Início
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
};

// ========== FUNÇÕES UTILITÁRIAS ==========

/**
 * Scroll suave para uma seção
 */
function scrollTo(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Abre o modal de personagem
 */
function openCharModal(id) {
    const c = characters.find(x => x.id === id);
    if (!c) return;

    document.getElementById('modalBody').innerHTML = `
        <div class="modal-character">
            <img src="${encodeURI(c.image)}" style="height: 500px;" alt="${c.name}">
            <div class="modal-character-info">
                <h2>${c.name}</h2>
                <div class="modal-character-codename">"${c.codeName}"</div>
                
                <div class="modal-character-detail">
                    <h3>Ator</h3>
                    <p>${c.actor}</p>
                </div>

                <div class="modal-character-detail">
                    <h3>Papel</h3>
                    <span class="modal-character-role">${c.role}</span>
                </div>

                <div class="modal-character-detail">
                    <h3>Sobre</h3>
                    <p>${c.description}</p>
                </div>

                <button class="btn btn-secondary" style="width: 100%; margin-top: 1rem;" 
                        onclick="closeModal()">
                    Fechar
                </button>
            </div>
        </div>
    `;

    document.getElementById('characterModal').classList.add('active');
}

/**
 * Fecha o modal de personagem
 */
function closeModal() {
    document.getElementById('characterModal').classList.remove('active');
}

/**
 * Filtra a galeria por categoria
 */
function filterGal(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
    });
    if (btn) {
        btn.classList.add('active');
    } else {
        const fallback = document.querySelector(`.filter-btn[data-cat="${cat}"]`);
        if (fallback) fallback.classList.add('active');
    }

    filteredGal = cat === 'todos'
        ? [...galleryImages]
        : galleryImages.filter(i => i.category === cat);

    galeriaIdx = 0;
    render.galeriaGrid();
}

/**
 * Abre o modal de galeria
 */
function openGalModal(idx) {
    galeriaIdx = idx;
    updateGalModal();
    document.getElementById('galeriaModal').classList.add('active');
}

/**
 * Fecha o modal de galeria
 */
function closeGaleriaModal() {
    // pause any playing modal video before closing
    const container = document.getElementById('modalMedia');
    if (container) {
        const vid = container.querySelector('#modalVideo');
        if (vid) {
            try { vid.pause(); vid.currentTime = 0; } catch (e) {}
        }
    }

    document.getElementById('galeriaModal').classList.remove('active');
}

/**
 * Atualiza a imagem do modal de galeria
 */
function updateGalModal() {
    const i = filteredGal[galeriaIdx];
    const container = document.getElementById('modalMedia');

    // pausa video anterior
    if (container) {
        const prev = container.querySelector('video');
        if (prev) {
            try { prev.pause(); prev.currentTime = 0; } catch (e) {}
        }
    }

        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
        if (isVideoUrl(i.image)) {
            // se o usuário prefere menos movimento, não autoplay
            if (prefersReduced) {
                container.innerHTML = `
                    <video id="modalVideo" controls controlslist="nodownload" muted playsinline style="width:100%; max-height:70vh; display:block;">
                        <source src="${encodeURI(i.image)}" type="video/mp4">
                        Seu navegador não suporta vídeo.
                    </video>
                `;
            } else {
                container.innerHTML = `
                    <video id="modalVideo" controls controlslist="nodownload" autoplay muted playsinline style="width:100%; max-height:70vh; display:block;">
                        <source src="${encodeURI(i.image)}" type="video/mp4">
                        Seu navegador não suporta vídeo.
                    </video>
                `;
                // play video
                const v = container.querySelector('#modalVideo');
                if (v) {
                    try { v.play(); } catch (e) {} // iginora erros de play
                }
            }
            // Ensure the controlsList property is set for browsers that support the API
            const modalVid = container.querySelector('#modalVideo');
            if (modalVid && typeof modalVid.controlsList !== 'undefined') {
                try { modalVid.controlsList = 'nodownload'; } catch (e) {}
            }
    } else {
        container.innerHTML = `<img id="modalImage" src="${encodeURI(i.image)}" alt="${i.title}" style="width:100%; max-height:70vh; object-fit:contain; display:block;">`;
    }

    document.getElementById('modalImageInfo').innerHTML = `
        <h3>${i.title}</h3>
        <p>${i.category}</p>
    `;
}

/**
 * Navega para a imagem anterior na galeria
 */
function previousImage() {
    galeriaIdx = galeriaIdx === 0 ? filteredGal.length - 1 : galeriaIdx - 1;
    updateGalModal();
}

/**
 * Navega para a próxima imagem na galeria
 */
function nextImage() {
    galeriaIdx = galeriaIdx === filteredGal.length - 1 ? 0 : galeriaIdx + 1;
    updateGalModal();
}

/**
 * Responde uma pergunta do quiz
 */
function answerQ(idx) {
    if (answered) return;

    selIdx = idx;
    answered = true;

    if (idx === quizQuestions[currentQ].correct) {
        quizScore++;
    }

    render.quiz();
}

/**
 * Vai para a próxima pergunta do quiz
 */
function nextQ() {
    currentQ++;
    answered = false;
    selIdx = -1;
    render.quiz();
}

/**
 * Reinicia o quiz
 */
function restartQuiz() {
    currentQ = 0;
    quizScore = 0;
    answered = false;
    selIdx = -1;
    render.quiz();
    scrollTo('quiz');
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza todas as seções
    render.personagens();
    render.heists();
    render.timeline();
    render.galeria();
    render.quiz();

    // Configura o menu responsivo
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');

    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });
});

// ========== EVENT LISTENERS ==========

/**
 * Fecha modais ao clicar fora deles
 */
document.addEventListener('click', (e) => {
    if (e.target.id === 'characterModal') {
        closeModal();
    }

    if (e.target.id === 'galeriaModal') {
        closeGaleriaModal();
    }
});

/**
 * Suporte a teclado para navegação
 */
document.addEventListener('keydown', (e) => {
    const galeriaModal = document.getElementById('galeriaModal');
    
    if (galeriaModal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') previousImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') closeGaleriaModal();
    }

    if (e.key === 'Escape') closeModal();
});

