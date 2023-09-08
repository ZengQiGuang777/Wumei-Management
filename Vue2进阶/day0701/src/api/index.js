const query = (interval = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                code: 0,
                message: 'OK'
            })
        }, interval)
    })
}

const API = {
    query
}
export default API