import * as axios from 'axios'

export default class KamasutraApiServices {

    instance = axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            "API-KEY" : "e693a0df-5c0c-4795-b38c-24a6684002ce"
        }
    });
    /// auth

    getMe = async() =>{
        return this.instance.get('auth/me')
    };
    login = async(email, password, rememberMe = false) =>{

        return  this.instance.post(`auth/login`,{
            email,
            password,
            rememberMe,
        })
    };
    logout = async () =>{
        return  this.instance.delete('auth/login')
    }

    /// !auth

    ///users
    getUsers  = async (currentPage=1,pageSize=10) => {
        return   this.instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(responsive=>{
                return responsive.data
            })
    };
    ///  !users

    /// follow
    followUser = async (id) =>{
        return  this.instance.post(`follow/${id}`)

    };
    unfollowUser =  async (id) =>{
        return  this.instance.delete(`follow/${id}`)
    };


    /// ! follow

    /// profile
    getProfile = async (userId) =>{
        return  this.instance.get(`profile/${userId}`)
    };
    updateStatus = async (status) =>{
        return this.instance.put('profile/status',{
            status: status
        })
    }
    getStatus = async (userId) =>{
        return  this.instance.get('profile/status/'+ userId)
    }
    saveProfile = async (profile) =>{
        return this.instance.put('profile', profile)
    }
    changePhoto = async (file)=>{
        console.log('services',file)
        let formData = new FormData();
        formData.append("image",file);

        return  this.instance.put('profile/photo',formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    /// !profile

}
