import { InjectRepository } from '@nestjs/typeorm';
import * as cron from 'cron';
import { CacheService } from 'src/shared/cache.service';
import { getDateRangeFromVnStringFormat, getVnDateFormat } from 'src/shared/utils/datetimeUtil';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

export class StatisticsService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly cacheService: CacheService

    ) {
        const CronJob = cron.CronJob;
        const dailyStatictical = new CronJob(`*/1 * * * *`, async () => {
            const { revenue, totalOrder, maxSelledProduct, selledProductStatistics, key } = await this.getData(new Date())
            cacheService.save(key, JSON.stringify({ revenue, totalOrder, maxSelledProduct, selledProductStatistics }))
        }, undefined, false, "Asia/Ho_Chi_Minh", null, false);
        dailyStatictical.start();
    }

    async statistics(date: string) {
        const data = await this.cacheService.get(date)
        console.log('data', data)
        if(data) return JSON.parse(data)
        return
    }

    private async getData(date: Date) {
        const key = getVnDateFormat(date)
        const { startDate, endDate } = getDateRangeFromVnStringFormat(key)
        
        const orders = await this.orderRepository.createQueryBuilder('order')
            .where('order.createdAt >= :startDate and order.createdAt <= :endDate', { startDate, endDate })
            .getMany()

        const totalOrder = orders.length

        let revenue = 0
        let selledProducts: string[] = []
        let selledProductStatistics = {}
        let maxSelledProduct = ''

        orders.forEach(order => {
            revenue += order.totalPrice
            selledProducts.push(...order.products)
        })

        if (selledProducts.length == 0) {
            return { totalOrder: 0, revenue, selledProductStatistics, maxSelledProduct, key }
        }

        selledProducts = selledProducts.sort()

        let i = 0;
        let j = 1

        selledProductStatistics[`${selledProducts[i]}`] = 1
        maxSelledProduct = selledProducts[i]

        while (j < selledProducts.length) {
            if (selledProducts[j] === selledProducts[i]) {
                selledProductStatistics[`${selledProducts[i]}`] += 1

            } else {
                if (selledProductStatistics[maxSelledProduct] < selledProductStatistics[`${selledProducts[i]}`]) {
                    maxSelledProduct = selledProducts[i]
                }
                i = j
                selledProductStatistics[`${selledProducts[i]}`] = 1
            }
            j++;
        }
        if (selledProductStatistics[maxSelledProduct] < selledProductStatistics[`${selledProducts[i]}`]) {
            maxSelledProduct = selledProducts[i]
        }

        console.log('selledProductStatistics', selledProductStatistics)
        console.log('maxSelledProduct', maxSelledProduct)

        return {
            totalOrder, selledProductStatistics, maxSelledProduct, revenue, key
        }
    }
}

