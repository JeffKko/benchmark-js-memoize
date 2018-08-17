const Benchmark = require('benchmark')
const suite = new Benchmark.Suite

// 產生長度為 <length> 的隨機字串
function getRandomString(length) {
  return String( Math.round( Math.random() * (length * 10) ) )
}

const cache = {}
const cacheLength = 1000 // 假設 cache 有1000筆
const testKey = 'testkey'

function memorizeFunc(...args) {
  let key

  if(args.length === 1 ){
    [key] = args
  } else {
    key = JSON.stringify(args)
  }

  if( key in cache ) {
    return cache[key]
  } else {
    return cache[key] = getRandomString(1000)
  }
}

for (let i = 0; i <= cacheLength; i+=1) {
  const random = Math.random()
  const randomArray = Array.from({length: random < 0.3 ? 1 : random < 0.6 ? 2 : 3 }).map(x => getRandomString(1000))

  memorizeFunc(...randomArray)

  if( cacheLength === cacheLength / 2 ) {
    // 欲抓取的 key
    memorizeFunc(testKey)
    memorizeFunc(testKey, testKey)
    memorizeFunc(testKey, testKey , testKey)
  }
}




suite
  .add('1 param', () => {

    memorizeFunc(testKey)
  })
  .add('2 params', () => {

    memorizeFunc(testKey, testKey)
  })
  .add('3 params', () => {

    memorizeFunc(testKey, testKey, testKey)
  })
  .on('cycle', event => console.log(String(event.target)))
  .on('complete', () => console.log('complete'))
  .run({ 'async': true })
