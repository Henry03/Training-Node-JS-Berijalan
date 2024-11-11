import { Car } from "@prisma/client"
import prisma from "../config/prismaClient.config"

const findAll = async() => {
    return prisma.car.findMany({
        include: {
            iklan: true,
            carBlog: {
                include: {
                    blog: true
                }
            }
        }
    })
}

const create = async(data: Omit<Car, 'id'>) => {
    return prisma.car.create({
        data
    })
}

const findById = async (id: string) => {
    return prisma.car.findUnique({
        where: {
            id: id
        },
        include: {
            iklan: true,
            carBlog: {
                include: {
                    blog: true
                }
            }
        }
    })
}

const SCar = {
    findAll,
    create,
    findById
}

export default SCar