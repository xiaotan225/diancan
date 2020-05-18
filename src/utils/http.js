import axios from 'axios'


class Http {
    constructor() {
        this.domain = 'https://order-3d91a.firebaseio.com'
    }
    request(options) {
        if (!options.api) {
            throw new Error('请输入ULR参数')
        }
        if (!options.params) {
            options.params = {}
        }
        if (!options.method) {
            options.method = "GET"
        }
        options.method = options.method.toLowerCase()
        if (options.loading) {
            if (!options.loadingViewing) {
                options.loadingViewing = true
            }
            if (!options.loadingText) {
                // options.loadingText = '加载中...'
                alert('加载中...')
            }
        }
        return new Promise((resolve, rejcet) => {
            if (options.method === 'GET') {
                axios({
                    baseURL: this.domain,
                    params: options.params,
                    url: options.api,
                    method: options.method
                }).then((result) => {
                    if (options.loading) {
                        alert('加载完成')
                    }
                    return resolve(result)
                }).catch((err) => {
                    return rejcet(err)
                });
            } else {
                axios({
                    baseURL: this.domain,
                    data: options.params,
                    url: options.api,
                    method: options.method
                }).then((result) => {
                    if (options.loading) {
                        alert('加载完成')
                    }
                    return resolve(result)
                }).catch((err) => {
                    return rejcet(err)
                });
            }
        })
    }
}




var instance = null
function getHttpInstance() {
    if(instance){
        return instance
    }
    instance = new Http()
    return instance
}


export default getHttpInstance
