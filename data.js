/* ============================================
   LA CASA DE PAPEL - DADOS
   ============================================ */

// ========== PERSONAGENS ==========
const characters = [
    {
        id: '1',
        name: 'Sergio Marquina',
        codeName: 'Professor',
        actor: 'Álvaro Morte',
        description: 'O mastermind por trás de ambos os roubos. Um gênio estratégico que planeja cada detalhe meticulosamente.',
        role: 'Líder',
        image: './assets/Professor.jpg'
    },
    {
        id: '2',
        name: 'Raquel Murillo',
        codeName: 'Lisboa',
        actor: 'Itziar Ituño',
        description: 'Inspetora de polícia que se torna crucial para o sucesso do plano. Desenvolve um relacionamento complexo com o Professor.',
        role: 'Aliada/Inspetora',
        image: './assets/raquel-murilo.jpg'
    },
    {
        id: '3',
        name: 'Úrsula Corberó',
        codeName: 'Tóquio',
        actor: 'Úrsula Corberó',
        description: 'Uma criminosa experiente e impulsiva. Narra grande parte da série e é fundamental para o primeiro roubo.',
        role: 'Criminosa',
        image: './assets/Úrsula-Corberó Tokio.jpg'
    },
    {
        id: '4',
        name: 'Andrés de Fonollosa',
        codeName: 'Berlim',
        actor: 'Pedro Alonso',
        description: 'O segundo em comando. Um homem sofisticado, perigoso e com um passado misterioso. Morre no primeiro roubo.',
        role: 'Segundo Comando',
        image: './assets/Berlim.jpg'
    },
    {
        id: '5',
        name: 'Miguel Herrán',
        codeName: 'Rio',
        actor: 'Miguel Herrán',
        description: 'Um jovem criminoso apaixonado por Tóquio. Emocionalmente vulnerável mas leal ao grupo.',
        role: 'Criminoso',
        image: './assets/Rio.jpg'
    },
    {
        id: '6',
        name: 'Alba Flores',
        codeName: 'Nairóbi',
        actor: 'Alba Flores',
        description: 'Uma criminosa inteligente e estratégica. Especialista em impressoras de dinheiro. Morre no segundo roubo.',
        role: 'Criminosa',
        image: './assets/Nairóbí.jpg'
    },
    {
        id: '7',
        name: 'Jaime Lorente',
        codeName: 'Denver',
        actor: 'Jaime Lorente',
        description: 'Um jovem criminoso, filho de Moscou. Impulsivo e apaixonado por Estocolmo.',
        role: 'Criminoso',
        image: './assets/Denver.jpg'
    },
    {
        id: '8',
        name: 'Esther Acebo',
        codeName: 'Estocolmo',
        actor: 'Esther Acebo',
        description: 'Uma refém que se torna parte do grupo. Desenvolve síndrome de Estocolmo e se apaixona por Denver.',
        role: 'Refém/Aliada',
        image: './assets/estocolmoo.jpg'
    }
];

// ========== ROUBOS (HEISTS) ==========
const heists = [
    {
        id: '1',
        name: 'Roubo da Fábrica de Moeda e Timbre',
        location: 'Madri, Espanha',
        year: 2017,
        duration: '11 dias',
        target: 'Fábrica de Moeda e Timbre da Espanha',
        amount: '2,4 bilhões de euros',
        description: 'O primeiro grande roubo planejado pelo Professor. Um grupo de 8 criminosos invade a Fábrica de Moeda e Timbre para imprimir dinheiro. O plano é meticulosamente executado durante 11 dias, com negociações com a polícia e reviravoltas inesperadas.',
        seasons: '1-2',
        image: './assets/banco.jpg'
    },
    {
        id: '2',
        name: 'Roubo do Banco da Reserva Federal',
        location: 'Madrid, Espanha',
        year: 2020,
        duration: 'Indefinido',
        target: 'Banco da Reserva Federal da Espanha',
        amount: '90 bilhões de euros',
        description: 'O segundo roubo, ainda mais ambicioso. O Professor reúne uma nova equipe para roubar o Banco da Reserva Federal. Este roubo é mais perigoso, com perseguição policial intensa e consequências mais graves para o grupo.',
        seasons: '3-5',
        image: './assets/bancodaespanha.jpg'
    }
];

// ========== TIMELINE ==========
const timelineEvents = [
    {
        id: '1',
        date: 'Antes da série',
        title: 'Professor planeja o roubo',
        description: 'Sergio Marquina passa anos planejando o maior roubo da história da Espanha.',
        season: 0,
        type: 'event'
    },
    {
        id: '2',
        date: 'Episódio 1',
        title: 'Início do Roubo da Fábrica de Moeda',
        description: 'O Professor reúne sua equipe e inicia o roubo da Fábrica de Moeda e Timbre.',
        season: 1,
        type: 'heist'
    },
    {
        id: '3',
        date: 'Temporada 1',
        title: 'Morte de Berlim',
        description: 'Berlim sacrifica-se para permitir a fuga do grupo durante o primeiro roubo.',
        season: 1,
        type: 'death'
    },
    {
        id: '4',
        date: 'Temporada 2',
        title: 'Conclusão do Primeiro Roubo',
        description: 'O grupo consegue escapar com o dinheiro após negociações intensas com a polícia.',
        season: 2,
        type: 'event'
    },
    {
        id: '5',
        date: 'Temporada 3',
        title: 'Início do Segundo Roubo',
        description: 'O Professor planeja um novo roubo ainda mais ambicioso: o Banco da Reserva Federal.',
        season: 3,
        type: 'heist'
    },
    {
        id: '6',
        date: 'Temporada 4',
        title: 'Morte de Nairóbi',
        description: 'Nairóbi é morta durante o segundo roubo, deixando o grupo devastado.',
        season: 4,
        type: 'death'
    },
    {
        id: '7',
        date: 'Temporada 5',
        title: 'Confronto Final',
        description: 'O grupo enfrenta seu maior desafio na conclusão do segundo roubo.',
        season: 5,
        type: 'twist'
    }
];

// ========== QUIZ ==========
const quizQuestions = [
    {
        id: '1',
        question: 'Qual é o verdadeiro nome do Professor?',
        options: ['Sergio Marquina', 'Andrés de Fonollosa', 'Miguel Herrán', 'Jaime Lorente'],
        correct: 0,
        explanation: 'O Professor é Sergio Marquina, o mastermind por trás dos roubos.'
    },
    {
        id: '2',
        question: 'Qual é o alvo do primeiro roubo?',
        options: ['Banco Central', 'Fábrica de Moeda e Timbre', 'Banco da Reserva Federal', 'Museu do Prado'],
        correct: 1,
        explanation: 'O primeiro roubo é da Fábrica de Moeda e Timbre da Espanha.'
    },
    {
        id: '3',
        question: 'Quantos bilhões de euros são roubados no primeiro heist?',
        options: ['1,5 bilhões', '2,4 bilhões', '5 bilhões', '10 bilhões'],
        correct: 1,
        explanation: 'O primeiro roubo resulta em 2,4 bilhões de euros.'
    },
    {
        id: '4',
        question: 'Qual personagem é conhecida como "Tóquio"?',
        options: ['Raquel Murillo', 'Alba Flores', 'Úrsula Corberó', 'Esther Acebo'],
        correct: 2,
        explanation: 'Tóquio é o codinome de Úrsula Corberó, uma criminosa experiente.'
    },
    {
        id: '5',
        question: 'Quem é "Berlim"?',
        options: ['O Professor', 'Segundo em comando', 'Inspetor de polícia', 'Criminoso jovem'],
        correct: 1,
        explanation: 'Berlim (Andrés de Fonollosa) é o segundo em comando do Professor.'
    },
    {
        id: '6',
        question: 'Qual é o codinome de Raquel Murillo?',
        options: ['Moscou', 'Lisboa', 'Denver', 'Rio'],
        correct: 1,
        explanation: 'Raquel Murillo recebe o codinome "Lisboa" quando se junta ao grupo.'
    },
    {
        id: '7',
        question: 'Quantas temporadas tem La Casa de Papel?',
        options: ['3 temporadas', '4 temporadas', '5 temporadas', '6 temporadas'],
        correct: 2,
        explanation: 'La Casa de Papel tem 5 temporadas no total.'
    },
    {
        id: '8',
        question: 'Qual personagem morre no primeiro roubo?',
        options: ['Rio', 'Berlim', 'Nairóbi', 'Denver'],
        correct: 1,
        explanation: 'Berlim sacrifica-se durante o primeiro roubo para permitir a fuga do grupo.'
    }
];

// ========== GALERIA ==========
const galleryImages = [
    {
        id: '1',
        title: 'O Professor',
        category: 'personagens',
        image: './assets/Professor.jpg'
    },
    {
        id: '2',
        title: 'Tóquio e Rio',
        category: 'personagens',
        image: './assets/tokio&rio.jpg'
    },
    {
        id: '3',
        title: 'Fábrica de Moeda',
        category: 'locais',
        image: './assets/banco.jpg'
    },
    {
        id: '4',
        title: 'Equipe em Ação',
        category: 'cenas',
        image: './assets/equiepeemaçao.mp4'
    },
    {
        id: '5',
        title: 'Berlim',
        category: 'personagens',
        image: './assets/Berlim.jpg'
    },
    {
        id: '6',
        title: 'Negociações',
        category: 'cenas',
        image: './assets/negociaçao.mp4'
    },
    {
        id: '7',
        title: 'Lisboa',
        category: 'personagens',
        image: './assets/raquel-murilo.jpg'
    },
    {
        id: '8',
        title: 'Cena de Ação',
        category: 'cenas',
        image: './assets/cenadeaçao.mp4'
    }
];
