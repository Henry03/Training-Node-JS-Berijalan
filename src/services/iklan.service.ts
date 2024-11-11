import prisma from "../config/prismaClient.config"

const findAll = async() => {
    return prisma.iklan.findMany({
        include: {
            cars: true
        }
    })
}

const findById = async(id: string) => {
    return prisma.iklan.findUnique({
        where: {
            id: id
        },
        include: {
            cars: true
        }
    })
}

const SIklan = {
    findAll,
    findById
}

export default SIklan;