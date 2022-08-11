const MyPromise = require('./promise')
const promise = new MyPromise((resolve,reject) => {
	resolve('success1')
	reject('err')
})

promise.then(value => {
	console.log('resolve',value);
},
reason => {
	console.log('reject',reason);
}
)