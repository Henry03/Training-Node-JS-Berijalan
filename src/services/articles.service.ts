import { Article } from '@prisma/client'
import prisma from '../config/prismaClient.config'

const findAll = async() => {
    return prisma.article.findMany({
        include: {
            articleTags: {
                select: {
                    tag: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })
}

const findById = async (id: string) => {
    return prisma.article.findUnique({
        where: {
            id: id
        },
        include: {
            articleTags: {
                select: {
                    tag: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })
}

const create = async (data: Omit<Article, 'id'>) => {
    return prisma.article.create({
        data
    })
}

type ArticleCreateData = Article & {tagIds?: string[]};
const createWithTags = async (data: Omit<ArticleCreateData, "id">) => {
    const { tagIds, ...restData }  = data;
    return prisma.article.create({
        data: {
            ...restData,
            articleTags: {
                create: tagIds ? tagIds?.map((tagId) => ({
                    tag: { connect: { id: tagId }}
                })):[]
            }
        }
    })
}

const update = async (id: string, data: Partial<Article>) => {
    return prisma.article.update({
        where: {
            id: id
        },
        data
    })
}

const remove = async (id: string) => {
    return prisma.article.delete({
        where:{
            id: id
        }
    })
}

const SArticle = {
    findAll,
    findById,
    create,
    createWithTags,
    update,
    remove
}

export default SArticle