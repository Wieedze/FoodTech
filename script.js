const buttons = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');

        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        contents.forEach(content => {
            content.classList.toggle('active', content.getAttribute('data-tab') === tabId);
        });
    });
});

const mainCourses = ["Filet de turbot de la mer Noire", "Tablier de sapeur", "Gigot d'agneau", "Faisan de forêt", "Trio de quinoa, chou kale et pousses d'épinard"];
const techniques = ["à la cocotte", "minute", "avec sa sauce hollandaise", "façon sud-ouest", "comme chez ma grand-mère", "déglacé au saké", "maturé en fût de chêne"];
const sides = ["une purée de topinambour", "ses frites truffées", "des châtaignes croustillantes", "une brunoise carotte-cèleri", "un oeuf parfait", "sa crème veloutée de fromages affinés"];
const seasonings = ["au yuzu rouge", "au poivre vert de Sichuan", "et une pointe de safran", "à l'ail noir", "et un peu de sucre en poudre"];

const getRandom = (data) => data[Math.floor(Math.random() * data.length)];

const generateMenuButton = document.getElementById('generate-menu');
const menuContainer = document.getElementById('random-menu');

function generateRandomMenu() {
    const menu = `${getRandom(mainCourses)} ${getRandom(techniques)}, avec ${getRandom(sides)} ${getRandom(seasonings)}`;
    menuContainer.textContent = menu;
}

generateRandomMenu();

generateMenuButton.addEventListener('click', generateRandomMenu);


const exitPopupOverlay = document.getElementById('exit-popup-overlay');
const exitPopupClose = document.getElementById('exit-popup-close');
const newsletterForm = document.getElementById('newsletter-form');

let exitPopupShown = false;

let exitPopupActivationTimeout = setTimeout(() => {
    document.addEventListener('mouseout', handleMouseOut);
}, 5000);

function handleMouseOut(e) {
    if (e.clientY <= 0 && !exitPopupShown) {
        showExitPopup();
        // Une fois la popup montrée, on enlève cet écouteur
        document.removeEventListener('mouseout', handleMouseOut);
    }
}

function showExitPopup() {
    exitPopupShown = true;
    exitPopupOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideExitPopup() {
    exitPopupShown = false;
    exitPopupOverlay.classList.add('hidden');
    document.body.style.overflow = '';
}

// Fermeture popup quand on clique sur la croix
exitPopupClose.addEventListener('click', (e) => {
    e.stopPropagation();
    hideExitPopup();
});

// Fermeture popup quand on clique en dehors de la popup (sur l'overlay)
exitPopupOverlay.addEventListener('click', (e) => {
    if (e.target === exitPopupOverlay) {
        hideExitPopup();
    }
});

// Soumission formulaire newsletter
newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value.trim();

    if (email) {
        alert(`Merci pour votre inscription, ${email} ! Vous recevrez bientôt nos meilleurs menus.`);
        hideExitPopup();
        emailInput.value = '';
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".photo-grid img");
    let draggedImage = null;

    images.forEach(img => {
        img.addEventListener("dragstart", e => {
            draggedImage = img;
            img.classList.add("dragging");
        });

        img.addEventListener("dragover", e => {
            e.preventDefault(); // autorise le drop
        });

        img.addEventListener("drop", e => {
            e.preventDefault();
            if (draggedImage && draggedImage !== img) {
                const parent = img.parentNode;
                const draggedNext = draggedImage.nextSibling === img ? draggedImage : draggedImage.nextSibling;
                parent.insertBefore(draggedImage, img);
                parent.insertBefore(img, draggedNext);
            }
        });

        img.addEventListener("dragend", () => {
            draggedImage.classList.remove("dragging");
            draggedImage = null;
        });
    });
});
