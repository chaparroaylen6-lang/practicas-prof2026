/// Base de datos de áreas y carreras
const careersData = {
    arte: {
        nombre: "Creatividad y Arte",
        profesorados: ["Profesorado de Artes Visuales", "Profesorado de Música", "Profesorado de Teatro"],
        tecnicaturas: ["Tecnicatura en Diseño Gráfico", "Tecnicatura en Animación 3D", "Tecnicatura en Fotografía"],
        universitarias: ["Licenciatura en Diseño Industrial", "Arquitectura", "Licenciatura en Bellas Artes"]
    },
    exactas: {
        nombre: "Ciencias Exactas",
        profesorados: ["Profesorado de Matemáticas", "Profesorado de Física"],
        tecnicaturas: ["Tecnicatura en Análisis de Datos", "Tecnicatura en Estadística"],
        universitarias: ["Licenciatura en Matemáticas", "Ingeniería Civil", "Astronomía"]
    },
    tecnologia: {
        nombre: "Tecnología",
        profesorados: ["Profesorado en Informática", "Profesorado en Educación Tecnológica"],
        tecnicaturas: ["Tecnicatura en Programación", "Desarrollo Web", "Soporte de Infraestructura"],
        universitarias: ["Ingeniería en Sistemas", "Ciencias de la Computación", "Ingeniería Electrónica"]
    },
    salud: {
        nombre: "Salud",
        profesorados: ["Profesorado de Biología", "Profesorado de Educación Física"],
        tecnicaturas: ["Enfermería", "Tecnicatura en Laboratorio", "Acompañamiento Terapéutico"],
        universitarias: ["Medicina", "Psicología", "Odontología"]
    },
    negocios: {
        nombre: "Administración y Negocios",
        profesorados: ["Profesorado en Economía"],
        tecnicaturas: ["Tecnicatura en Administración de Empresas", "Tecnicatura en Marketing", "Recursos Humanos"],
        universitarias: ["Contador Público", "Licenciatura en Administración", "Comercio Internacional"]
    }
};

const questions = [
    {
        text: "¿Qué actividad disfrutas más en tu tiempo libre?",
        options: [
            { text: "Dibujar, pintar o crear contenido visual.", category: "arte" },
            { text: "Resolver acertijos, rompecabezas o juegos de lógica.", category: "exactas" },
            { text: "Aprender sobre nuevos programas, apps o código.", category: "tecnologia" },
            { text: "Investigar sobre el cuerpo humano o leer sobre bienestar.", category: "salud" }
        ]
    },
    {
        text: "Si tuvieras que liderar un proyecto, ¿de qué te encargarías?",
        options: [
            { text: "De organizar el presupuesto y los recursos.", category: "negocios" },
            { text: "Del diseño visual y la estética del proyecto.", category: "arte" },
            { text: "Del desarrollo técnico y las herramientas digitales.", category: "tecnologia" },
            { text: "De asegurar que el ambiente de trabajo sea saludable.", category: "salud" }
        ]
    },
    {
        text: "¿Qué materias te resultaban o te resultan más interesantes?",
        options: [
            { text: "Matemáticas y Física.", category: "exactas" },
            { text: "Biología y Química.", category: "salud" },
            { text: "Informática y Computación.", category: "tecnologia" },
            { text: "Economía y Contabilidad.", category: "negocios" }
        ]
    },
    {
        text: "¿Cómo prefieres resolver un problema complejo?",
        options: [
            { text: "Aplicando fórmulas y pensamiento lógico.", category: "exactas" },
            { text: "Buscando una solución creativa y fuera de lo común.", category: "arte" },
            { text: "Investigando en internet y usando herramientas digitales.", category: "tecnologia" },
            { text: "Analizando costos y beneficios para tomar la mejor decisión.", category: "negocios" }
        ]
    },
    {
        text: "¿En qué ambiente te imaginas trabajando en el futuro?",
        options: [
            { text: "En un laboratorio o clínica.", category: "salud" },
            { text: "En un estudio de diseño o taller.", category: "arte" },
            { text: "En una oficina corporativa o dirigiendo mi empresa.", category: "negocios" },
            { text: "En una empresa tecnológica trabajando con computadoras.", category: "tecnologia" }
        ]
    },
    {
        text: "¿Qué tipo de documentales o noticias te llaman más la atención?",
        options: [
            { text: "Nuevos descubrimientos médicos o psicológicos.", category: "salud" },
            { text: "Avances en inteligencia artificial y robótica.", category: "tecnologia" },
            { text: "El estado de los mercados financieros globales.", category: "negocios" },
            { text: "Exposiciones de arte, cine o música.", category: "arte" }
        ]
    },
    {
        text: "Cuando usas tu computadora o celular, ¿qué sueles hacer más?",
        options: [
            { text: "Configurar funciones, curiosear cómo funciona o programar.", category: "tecnologia" },
            { text: "Usar programas de edición de fotos, video o diseño.", category: "arte" },
            { text: "Llevar un control de mis gastos o leer sobre emprendimientos.", category: "negocios" },
            { text: "Buscar información sobre dietas, ejercicios o ciencia.", category: "salud" }
        ]
    },
    {
        text: "¿Qué habilidad crees que es tu punto fuerte?",
        options: [
            { text: "El cálculo mental y el razonamiento abstracto.", category: "exactas" },
            { text: "La empatía y la capacidad de ayudar a otros.", category: "salud" },
            { text: "La imaginación y la innovación estética.", category: "arte" },
            { text: "La organización y el liderazgo.", category: "negocios" }
        ]
    },
    {
        text: "Si pudieras inventar algo, sería...",
        options: [
            { text: "Un nuevo software que facilite la vida diaria.", category: "tecnologia" },
            { text: "Una cura para una enfermedad.", category: "salud" },
            { text: "Un modelo de negocio súper rentable y novedoso.", category: "negocios" },
            { text: "Un sistema matemático infalible.", category: "exactas" }
        ]
    },
    {
        text: "¿Qué te genera más satisfacción al terminar el día?",
        options: [
            { text: "Haber creado algo hermoso y expresivo.", category: "arte" },
            { text: "Haber resuelto un error de código o un problema técnico.", category: "tecnologia" },
            { text: "Saber que ayudé a alguien a sentirse mejor.", category: "salud" },
            { text: "Haber tomado decisiones que optimizaron mis recursos.", category: "negocios" }
        ]
    }
];

let currentQuestionIndex = 0;
let scores = {};
let historyStack = [];

// Elementos del DOM
const welcomeScreen = document.getElementById('welcome-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressFill = document.getElementById('progress-fill');
const backBtn = document.getElementById('back-btn');

// Elementos de fondo
const bgMenu = document.getElementById('bg-menu');
const bgQuestions = document.getElementById('bg-questions');

document.getElementById('start-btn').addEventListener('click', startTest);
document.getElementById('restart-btn').addEventListener('click', restartTest);
backBtn.addEventListener('click', goBack);

function startTest() {
    welcomeScreen.classList.remove('active');
    questionScreen.classList.add('active');
    
    // Cambiar fondo suavemente al de preguntas
    bgMenu.classList.remove('active');
    bgQuestions.classList.add('active');

    currentQuestionIndex = 0;
    scores = {};
    historyStack = [];
    showQuestion();
}

function showQuestion() {
    const container = document.getElementById('question-container');
    container.classList.remove('slide-in');
    void container.offsetWidth; // Trigger reflow para reiniciar animación
    container.classList.add('slide-in');

    if (currentQuestionIndex > 0) {
        backBtn.classList.remove('hidden');
    } else {
        backBtn.classList.add('hidden');
    }

    const progressPercentage = (currentQuestionIndex / questions.length) * 100;
    progressFill.style.width = `${progressPercentage}%`;

    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.text}`;
    
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        button.addEventListener('click', () => selectOption(option.category));
        optionsContainer.appendChild(button);
    });
}

function selectOption(category) {
    historyStack.push(category);
    scores[category] = (scores[category] || 0) + 1;
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        calculateResult();
    }
}

function goBack() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        const lastCategory = historyStack.pop();
        if (scores[lastCategory]) {
            scores[lastCategory]--;
        }
        showQuestion();
    }
}

function calculateResult() {
    questionScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    // Cambiar fondo suavemente de vuelta al de menú/resultados
    bgQuestions.classList.remove('active');
    bgMenu.classList.add('active');
    
    let dominantCategory = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    let resultData = careersData[dominantCategory];
    
    document.getElementById('dominant-area').textContent = resultData.nombre;
    
    const fillList = (listId, array) => {
        const ul = document.getElementById(listId);
        ul.innerHTML = '';
        array.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `• ${item}`;
            ul.appendChild(li);
        });
    };

    fillList('list-profesorados', resultData.profesorados);
    fillList('list-tecnicaturas', resultData.tecnicaturas);
    fillList('list-universitarias', resultData.universitarias);
}

function restartTest() {
    resultScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
    // El fondo ya está en bgMenu por la pantalla de resultados, garantizamos que se mantenga activo
    bgQuestions.classList.remove('active');
    bgMenu.classList.add('active');
}