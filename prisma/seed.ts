import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function main() {
    const gameRecords = await prisma.game.findMany();
    if (gameRecords.length == 0) {
        await prisma.game.createMany({
            data: [
                {name: "PICK THE ODD ONE OUT"},
                {name: "SPOT THE MISSING PIECE"},
                {name: "FIND THE HIDDEN OBJECTS"},
                {name: "MATCH THE IMAGE"},
                {name: "DOT TO DOT"},
                {name: "DISTANCE DASH"},
                {name: "THE ARROW CHALLENGE"},
                {name: "MEMORY GAME"},
            ]
        })
        console.log("Seed Executed")
    }
}
