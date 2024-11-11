import prisma from "../config/prismaClient.config"

const findAll = async() => {
    return prisma.blog.findMany({
        include: {
            carBlogs: {
                include: {
                    car: true
                }
            }
        }
    })
}

const findById = async(id: string) => {
    return prisma.blog.findUnique({
        where: {
            id: id
        },
        include: {
            carBlogs: {
                include: {
                    car: true
                }
            }
        }
    })
}

const SBlog = {
    findAll,
    findById
}

export default SBlog