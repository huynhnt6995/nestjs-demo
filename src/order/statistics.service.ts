import { InjectRepository } from '@nestjs/typeorm';
import * as cron from 'cron';
import { CacheService } from 'src/shared/cache.service';
import { getDateRangeFromVnStringFormat, getRangeDateString, getVnDateFormat } from 'src/shared/utils/datetimeUtil';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

export class StatisticsService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly cacheService: CacheService

    ) {
        const CronJob = cron.CronJob;
        // run each 24h * */24 * * *
        const dailyStatictical = new CronJob(`*/1 * * * *`, async () => {
            const { revenue, totalOrder, maxSelledProduct, selledProductStatistics, key } = await this.getData(new Date())
            cacheService.save(
                key,
                JSON.stringify({ revenue, totalOrder, maxSelledProduct, selledProductStatistics }),
                31536000
            )
        }, undefined, false, "Asia/Ho_Chi_Minh", null, false);
        dailyStatictical.start();
    }

    async statistics(startDate: string, endDate: string) {
        const dates = getRangeDateString(startDate, endDate)
        const listRawData = await this.cacheService.gets(dates)

        let dateDatas: any[] = []
        let revenue = 0
        let totalOrder = 0
        let maxSelledProduct: string | undefined
        let selledProductStatistics = {}

        for (let i = 0; i < listRawData.length; i++) {
            if (listRawData[i]) {
                let data = JSON.parse(listRawData[i])
                dateDatas.push({ date: dates[i], data })
                revenue += data.revenue
                totalOrder += data.totalOrder
                for (let key of Object.keys(data.selledProductStatistics)) {
                    if (!selledProductStatistics[key]) {
                        selledProductStatistics[key] = data.selledProductStatistics[key]
                    } else {
                        selledProductStatistics[key] += data.selledProductStatistics[key]
                    }
                }
            }
        }

        for (let key of Object.keys(selledProductStatistics)) {
            if (!maxSelledProduct) {
                maxSelledProduct = key
            } else {
                if (selledProductStatistics[maxSelledProduct] < selledProductStatistics[key]) {
                    maxSelledProduct = key
                }
            }
        }

        return { dateDatas, revenue, totalOrder, maxSelledProduct, selledProductStatistics }
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

        return {
            totalOrder, selledProductStatistics, maxSelledProduct, revenue, key
        }
    }
}

