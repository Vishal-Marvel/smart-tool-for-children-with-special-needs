import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const gameRecords = await prisma.game.findMany();
    if (gameRecords.length == 0) {
        await prisma.game.createMany({
            data: [
                {
                    name: "PICK THE ODD ONE OUT",
                    description: "Visual discrimination",
                    graphStatement: "The time-accuracy graph of the user states that the visual discrimination attribute is satisfied with a percentage of 100. (Score varies based on the performance)"
                },
                {
                    name: "SPOT THE MISSING PIECE",
                    description: "Form constancy assessment",
                    graphStatement: "The time-accuracy graph of the user states that the Form constancy assessment attribute is satisfied with a percentage of 100. (Score varies based on the performance)"
                },
                // {name: "FIND THE HIDDEN OBJECTS"},
                {
                    name: "MATCH THE IMAGE",
                    description: "Visual Closure Assessment",
                    graphStatement: "The time-accuracy graph of the user states that the Visual closure assessment attribute is satisfied with a percentage of 100. (Score varies based on the performance)"
                },
                {
                    name: "DOT TO DOT",
                    description: "Allocentric visual perception Assessment",
                    graphStatement: "The time-accuracy graph of the user states that the Allocentric visual perception Assessment attribute is satisfied with a percentage of 100. (Score varies based on the performance)"
                },
                {
                    name: "DISTANCE DASH",
                    description: "Egocentric visual perception Assessment",
                    graphStatement: "The time-accuracy graph of the user states that the Egocentric visual perception Assessment attribute is satisfied with a percentage of 100. (Score varies based on the performance)"
                },
                {
                    name: "THE ARROW CHALLENGE",
                    description: "Motion-based dynamic visual cognitive perception",
                    graphStatement: "The time-accuracy graph of the user states that the Motion-based dynamic visual cognitive perception attribute is satisfied with a percentage of 100. (Score varies based on the performance)"
                },
                {
                    name: "PAIR THE HIDDEN OBJECT",
                    description: "Figure Ground discrimination",
                    graphStatement: "The time-accuracy graph of the user states that the figure ground discrimination attribute is satisfied with a percentage of 100. (Score varies based on the performance)"
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
