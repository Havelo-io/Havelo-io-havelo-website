
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

const url = process.env.UPSTASH_REDIS_REST_URL
const token = process.env.UPSTASH_REDIS_REST_TOKEN

if (!url || !token) {
  throw new Error('Upstash rate-limit configuration is missing.')
}

const redis = new Redis({ url, token })

const contactRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '10 m'),
  prefix: 'havelo:contact',
})

export async function checkContactRateLimit(identifier: string) {
  return contactRateLimit.limit(identifier)
}
