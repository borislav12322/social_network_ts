import axios from "axios";

const instanceAxios = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '1958feb0-1592-432d-82a1-f8d6210ec0dd',
    },
});

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instanceAxios.get(
            `users?page=${currentPage}&count=${pageSize}`)
            .then(
                response => response.data
            )
    },

    follow(userID: number) {
        return instanceAxios.post(`follow/${userID}`)
    },

    unfollow(userID: number) {
        return instanceAxios.delete(`follow/${userID}`)
    },

    authMe(){
        return instanceAxios.get(`auth/me`)
    },

    getProfileData(id: string | undefined){
        return instanceAxios.get(`profile/${id}`)
    },
}