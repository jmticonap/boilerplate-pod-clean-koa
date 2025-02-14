export const firstnames: string[] = [
    'Manuel',
    'Mateo',
    'Claudio',
    'Alejandro',
    'Carlos',
    'Diego',
    'Eduardo',
    'Felipe',
    'Gabriel',
    'Héctor',
    'Iván',
    'Javier',
    'Kevin',
    'Leonardo',
    'Marcos',
    'Nicolás',
    'Oscar',
    'Pablo',
    'Raúl',
    'Sergio',
    'Tomás',
    'Ulises',
    'Víctor',
    'Xavier',
    'Yahir',
    'Ana',
    'Beatriz',
    'Carmen',
    'Daniela',
    'Elena',
    'Fernanda',
    'Gabriela',
    'Helena',
    'Isabel',
    'Julia',
    'Karla',
    'Laura',
    'Marta',
    'Natalia',
    'Olivia',
    'Patricia',
    'Raquel',
    'Sara',
    'Teresa',
    'Ursula',
    'Valeria',
    'Wendy',
    'Ximena',
    'Yolanda',
    'Zoe',
];

export const randomFirstname = () => firstnames[Math.round(Math.random() * firstnames.length)];

export const lastnames: string[] = [
    'García',
    'Rodríguez',
    'Martínez',
    'Hernández',
    'López',
    'González',
    'Pérez',
    'Sánchez',
    'Ramírez',
    'Torres',
    'Flores',
    'Rivera',
    'Gómez',
    'Díaz',
    'Cruz',
    'Morales',
    'Ortiz',
    'Castillo',
    'Jiménez',
    'Reyes',
    'Vargas',
    'Guerrero',
    'Mendoza',
    'Vega',
    'Castro',
    'Smith',
    'Brown',
    'Wilson',
    'Thompson',
    'Anderson',
    'Taylor',
    'Harris',
    'Clark',
    'Lewis',
    'Robinson',
    'Walker',
    'King',
    'Scott',
    'Young',
    'Adams',
    'Baker',
    'Parker',
    'Evans',
    'Morris',
    'Turner',
    'Collins',
    'Campbell',
    'Mitchell',
    'Carter',
    'Bell',
];

export const randomLastname = () => lastnames[Math.round(Math.random() * lastnames.length)];

export const activityTags: string[] = [
    'arte',
    'ciencia',
    'religión',
    'matemática',
    'ed. física',
    'física',
    'química',
    'computación',
    'comunicación',
    'idiomas',
];

export const randomActivityTag = () => activityTags[Math.round(Math.random() * activityTags.length)];
