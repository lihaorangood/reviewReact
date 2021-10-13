export default {
    login(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username && password) {
                    resolve({token: username + Date.now()})
                }else{
                    reject('用户名和密码为必填项')
                }
            }, 1000)
        })
    }
}