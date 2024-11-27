import axiosConfig from '../axiosConfig'

export const apiUserPayment = (formĐata) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            data: formĐata,
            url: '/api/v1/payment/card',
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})