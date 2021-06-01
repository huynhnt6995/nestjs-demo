import * as redis from 'redis'


export class CacheService {
    private redisClient: redis.RedisClient

    constructor() {
        this.redisClient = redis.createClient({ host: process.env.REDIS_HOST, port: 6379 })
        this.redisClient.on('error', (err) => {
            console.log("Error " + err)
        });
        this.redisClient.on('message', (chanel, message) => {
            console.log('chanel', chanel, message)
        })
    }

    save(key: string, value: string, expiredInMiliSeconds: number = 1000000 ) {
        return new Promise<string>((resolve, reject) => {
            this.redisClient.setex(key, expiredInMiliSeconds, value, (err, reply) => {
                console.log('set redis error', err)
                if (!err) resolve(reply)
                else reject(err)
            })
        })
    }

    get(key: string) {
        return new Promise<string>((resolve, reject) => {
            this.redisClient.get(key, (err, reply) => {
                console.log('get key', key)
                console.log('get data', reply)
                if (!err) resolve(reply)
                else reject(err)
            })
        })
    }
}