import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
 await prisma.game.createMany({
     data:[
         {name: "Memory Game"},
         {name: "tic-tac-toe"}
     ]
 })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })