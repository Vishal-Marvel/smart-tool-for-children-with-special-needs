import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const gameRecords = await prisma.game.findMany();
    if (gameRecords.length == 0) {
        await prisma.game.createMany({
            data: [
                {
                    name: "PICK THE ODD ONE OUT",
                    description: "Visual discrimination"
                },
                {
                    name: "SPOT THE MISSING PIECE",
                    description: "Form constancy assessment"
                },
                // {name: "FIND THE HIDDEN OBJECTS"},
                {
                    name: "MATCH THE IMAGE",
                    description: "Visual Closure Assessment"
                },
                {
                    name: "DOT TO DOT",
                    description: "Allocentric visual perception Assessment"
                },
                {
                    name: "DISTANCE DASH",
                    description: "Egocentric visual perception Assessment"
                },
                {
                    name: "THE ARROW CHALLENGE",
                    description: "Motion-based dynamic visual cognitive perception"
                },
                {
                    name: "PAIR THE HIDDEN OBJECT",
                    description: "Figure Ground discrimination"
                },
            ]
        })
        console.log("Seed Executed")
    }
}

main().then(() => {
    prisma.$disconnect();
}).catch((e) => {
    console.error("SEED ERROR", e);
    prisma.$disconnect();
})
