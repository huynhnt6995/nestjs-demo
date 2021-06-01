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

    save(key: string, value: string, expiredInSeconds: number = 1000000 ) {
        console.log('saving redis: ', key, value)
        return new Promise<string>((resolve, reject) => {
            this.redisClient.setex(key, expiredInSeconds, value, (err, reply) => {
                console.log('set redis error', err)
                if (!err) resolve(reply)
                else reject(err)
            })
        })
    }

    get(key: string) {
        return new Promise<string>((resolve, reject) => {
            this.redisClient.get(key, (err, reply) => {
                if (!err) resolve(reply)
                else reject(err)
            })
        })
    }

    gets(keys: string[]) {
        return new Promise<string[]>((resolve, reject) => {
            this.redisClient.mget(keys, (err, reply) => {
                if (!err) resolve(reply)
                else reject(err)
            })
        })
    }
}