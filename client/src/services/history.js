import axiosConfig from '../axiosConfig'

export const apiCreateHistory = (formĐata) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            data: formĐata,
            url: '/api/v1/history/create-history',
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetAllUserHistory = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/history/list-histories',
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})