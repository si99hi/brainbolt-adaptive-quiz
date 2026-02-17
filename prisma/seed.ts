
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const domains = ['Science', 'History', 'Geography', 'Math', 'Tech', 'Art', 'Literature', 'Sports', 'Pop Culture', 'Nature'];

const questions = [
    // Difficulty 1
    { q: "What is 2 + 2?", o: ["3", "4", "5", "6"], c: "4", d: 1 },
    { q: "What color is the sky on a clear day?", o: ["Red", "Green", "Blue", "Yellow"], c: "Blue", d: 1 },
    { q: "How many legs does a dog have?", o: ["2", "4", "6", "8"], c: "4", d: 1 },
    { q: "What is the opposite of 'Hot'?", o: ["Cold", "Warm", "Boiling", "Freezing"], c: "Cold", d: 1 },
    { q: "Which animal says 'Meow'?", o: ["Dog", "Cat", "Cow", "Pig"], c: "Cat", d: 1 },

    // Difficulty 2
    { q: "What is the capital of France?", o: ["London", "Berlin", "Paris", "Madrid"], c: "Paris", d: 2 },
    { q: "How many days are in a week?", o: ["5", "6", "7", "8"], c: "7", d: 2 },
    { q: "Which planet is known as the Red Planet?", o: ["Earth", "Mars", "Jupiter", "Venus"], c: "Mars", d: 2 },
    { q: "What is H2O?", o: ["Salt", "Sugar", "Water", "Air"], c: "Water", d: 2 },
    { q: "Who is the main character in Mario games?", o: ["Luigi", "Mario", "Peach", "Toad"], c: "Mario", d: 2 },

    // Difficulty 3
    { q: "What is the largest mammal?", o: ["Elephant", "Blue Whale", "Giraffe", "Hippo"], c: "Blue Whale", d: 3 },
    { q: "How many continents are there?", o: ["5", "6", "7", "8"], c: "7", d: 3 },
    { q: "What gas do plants need for photosynthesis?", o: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"], c: "Carbon Dioxide", d: 3 },
    { q: "Which shape has 3 sides?", o: ["Square", "Circle", "Triangle", "Pentagon"], c: "Triangle", d: 3 },
    { q: "What is the currency of the USA?", o: ["Euro", "Yen", "Dollar", "Pound"], c: "Dollar", d: 3 },

    // Difficulty 4
    { q: "In which year did Titanic sink?", o: ["1910", "1912", "1915", "1920"], c: "1912", d: 4 },
    { q: "What is the square root of 64?", o: ["6", "7", "8", "9"], c: "8", d: 4 },
    { q: "Who painted the Mona Lisa?", o: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"], c: "Da Vinci", d: 4 },
    { q: "Which is the fastest land animal?", o: ["Lion", "Cheetah", "Horse", "Leopard"], c: "Cheetah", d: 4 },
    { q: "What is the boiling point of water in Celsius?", o: ["90", "100", "110", "120"], c: "100", d: 4 },

    // Difficulty 5
    { q: "Which element has the symbol 'O'?", o: ["Gold", "Silver", "Oxygen", "Osmium"], c: "Oxygen", d: 5 },
    { q: "Which country invented pizza?", o: ["France", "USA", "Italy", "Spain"], c: "Italy", d: 5 },
    { q: "How many players are in a soccer team?", o: ["9", "10", "11", "12"], c: "11", d: 5 },
    { q: "Which planet is closest to the sun?", o: ["Venus", "Mars", "Mercury", "Earth"], c: "Mercury", d: 5 },
    { q: "What is the hardest natural substance?", o: ["Gold", "Iron", "Diamond", "Platinum"], c: "Diamond", d: 5 },

    // Difficulty 6
    { q: "Who wrote 'Hamlet'?", o: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], c: "William Shakespeare", d: 6 },
    { q: "What is the largest ocean?", o: ["Atlantic", "Indian", "Arctic", "Pacific"], c: "Pacific", d: 6 },
    { q: "How many bones are in the adult human body?", o: ["200", "206", "210", "215"], c: "206", d: 6 },
    { q: "What is the capital of Japan?", o: ["Seoul", "Beijing", "Tokyo", "Bangkok"], c: "Tokyo", d: 6 },
    { q: "What is the chemical symbol for Gold?", o: ["Au", "Ag", "Fe", "Cu"], c: "Au", d: 6 },

    // Difficulty 7
    { q: "Which year did World War II end?", o: ["1940", "1942", "1945", "1950"], c: "1945", d: 7 },
    { q: "What is the speed of light approx?", o: ["300,000 km/s", "150,000 km/s", "1,000 km/s", "Sound speed"], c: "300,000 km/s", d: 7 },
    { q: "Who discovered Penicillin?", o: ["Marie Curie", "Alexander Fleming", "Newton", "Einstein"], c: "Alexander Fleming", d: 7 },
    { q: "What is the capital of Australia?", o: ["Sydney", "Melbourne", "Canberra", "Perth"], c: "Canberra", d: 7 },
    { q: "Which programming language is known as the backbone of the web?", o: ["Java", "Python", "JavaScript", "C++"], c: "JavaScript", d: 7 },

    // Difficulty 8
    { q: "What is the value of Pi to 2 decimal places?", o: ["3.12", "3.14", "3.16", "3.18"], c: "3.14", d: 8 },
    { q: "Which planet has the most moons?", o: ["Jupiter", "Saturn", "Uranus", "Neptune"], c: "Saturn", d: 8 }, // Saturn recently overtook Jupiter
    { q: "Who developed the Theory of Relativity?", o: ["Newton", "Einstein", "Galileo", "Hawking"], c: "Einstein", d: 8 },
    { q: "What is the powerhouse of the cell?", o: ["Nucleus", "Ribosome", "Mitochondria", "Lysosome"], c: "Mitochondria", d: 8 },
    { q: "In which year did the Berlin Wall fall?", o: ["1987", "1989", "1991", "1993"], c: "1989", d: 8 },

    // Difficulty 9
    { q: "What is the atomic number of Carbon?", o: ["6", "8", "12", "14"], c: "6", d: 9 },
    { q: "Who was the first person in space?", o: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "John Glenn"], c: "Yuri Gagarin", d: 9 },
    { q: "What is the capital of Mongolia?", o: ["Ulaanbaatar", "Astana", "Tashkent", "Bishkek"], c: "Ulaanbaatar", d: 9 },
    { q: "Which neurotransmitter is associated with pleasure?", o: ["Serotonin", "Dopamine", "Cortisol", "Adrenaline"], c: "Dopamine", d: 9 },
    { q: "What is the derivative of x^2?", o: ["x", "2x", "x^2", "2"], c: "2x", d: 9 },

    // Difficulty 10
    { q: "What is the Riemann Hypothesis related to?", o: ["Prime Numbers", "Geometry", "Physics", "Chemistry"], c: "Prime Numbers", d: 10 },
    { q: "Who wrote 'The specialized general theory of relativity'?", o: ["Einstein", "Bohr", "Planck", "Heisenberg"], c: "Einstein", d: 10 },
    { q: "What is the largest desert in the world?", o: ["Sahara", "Arabian", "Gobi", "Antarctic"], c: "Antarctic", d: 10 }, // Yes, Antarctica is a desert
    { q: "Which element is the most abundant in the universe?", o: ["Oxygen", "Carbon", "Helium", "Hydrogen"], c: "Hydrogen", d: 10 },
    { q: "What is the complexity of Binary Search?", o: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], c: "O(log n)", d: 10 },
];

async function main() {
    console.log('Seeding database...');
    for (const q of questions) {
        await prisma.question.create({
            data: {
                content: q.q,
                options: JSON.stringify(q.o),
                correctOption: q.c,
                difficulty: q.d,
            },
        });
    }
    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
