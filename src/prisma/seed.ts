import prisma from "../config/prismaClient.config";

const main = async () => {
    // const promo = await prisma.promo.create({
    //     data: {
    //         title: 'Summer Sale',
    //     }
    // });

    // const tags = await prisma.tag.createManyAndReturn({
    //     data: [
    //         { name: 'Technology'},
    //         { name: 'Lifestyle'}
    //     ]    
    // })

    // const tag = await Promise.all([
    //     prisma.tag.create({
    //         data: {
    //             name: 'Hobby'
    //         }
    //     }),
    //     prisma.tag.create({
    //         data: {
    //             name: 'Sport'
    //         }
    //     })
    // ]);

    // const article = await prisma.article.create({
    //     data: {
    //         title: 'Getting Started with Prisma',
    //         content: 'Prisma is a database toolkit that makes databases easy.',
    //         promoId: promo.id,
    //         articleTags: {
    //             create: tags.map(tag => ({ 
    //                 tagId: tag.id 
    //             }))
    //         }
    //     }
    // })


    const iklan = await prisma.iklan.createManyAndReturn({
        data: [
            { 
                name: 'Minggu Zupper Hemat',
                content: 'Diskon 50% untuk semua mobil setiap hari minggu',
                discount: 50,
                image: 'https://img.freepik.com/free-photo/white-car-with-sun-roof_23-2149169001.jpg?w=2000'
            },
            {
                name: 'Semua Bisa Punya Mobil',
                content: 'Diskon 70% untuk mobil tertentu',
                discount: 70,
                image: 'https://img.freepik.com/free-photo/white-car-with-sun-roof_23-2149169001.jpg?w=2000'
            }
        ]
    })

    const car = await prisma.car.createManyAndReturn({
        data: [
            {
                image: 'toyota-supra.jpg',
                name: 'Toyota Supra',
                model: '2024',
                variant: 'GR',
                price: 2000000000,
                isNew: true,
                iklanId: iklan[0].id
            },
            {
                image: 'toyota-civic.jpg',
                name: 'Toyota Civic',
                model: '2023',
                variant: 'Sport',
                price: 1000000000,
                isNew: false,
                iklanId: iklan[1].id
            }
        ]
    })

    const blog = await prisma.blog.createManyAndReturn({
        data: [
            {
                title: 'Alasan harus memiliki toyota supra',
                desc: 'Kelebihan toyota supra',
                content: 'Toyota Supra adalah mobil terbaik di dunia',
                image: 'https://img.freepik.com/free-photo/white-car-with-sun-roof_23-2149169001.jpg?w=2000'
            },
            {
                title: 'Honda Civic Sport',
                desc: 'Membahas fitur terbaru dari Honda Civic Sport 2023',
                content: 'Honda Civic Sport 2023 memiliki fitur baru seperti AC dan ABS',
                image: 'https://img.freepik.com/free-photo/white-car-with-sun-roof_23-2149169001.jpg?w=2000'
            }
        ]
    })

    const carBlog = await prisma.carBlog.createManyAndReturn({
        data: [
            {
                carId: car[0].id,
                blogId: blog[0].id
            },
            {
                carId: car[1].id,
                blogId: blog[1].id
            }
        ]
    })

    console.log(iklan, car, blog, carBlog);
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})