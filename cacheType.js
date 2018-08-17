const Benchmark = require('benchmark')
const suite = new Benchmark.Suite

// 產生長度為 <length> 的隨機字串
function getRandomString(length) {
  return String( Math.round( Math.random() * (length * 10) ) )
}

const cache = {}
const cacheLength = 10 // 假設 cache 有10筆
const testKey = 'testkey'
const cacheMap = new Map()

for (let i = 0; i <= cacheLength; i+=1) {
  //塞入 key 為 萬位數, value 千位數 的隨機字串
  cache[getRandomString(10000)] = getRandomString(1000)
  if( cacheLength === cacheLength / 2 ) {
    // 欲抓取的 key
    cache.testKey = 1111
  }
}

Object.keys(cache).forEach(key => {
  cacheMap.set(key, cache[key])
})


suite
  .add('object', () => {

    cache[testKey]
  })
  .add('map', () => {

    cacheMap.get(testKey)
  })
  .on('cycle', event => console.log(String(event.target)))
  .on('complete', () => console.log('complete'))
  .run({ 'async': true })
