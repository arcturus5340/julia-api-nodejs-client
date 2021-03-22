import axios from "axios";


class JuliaAPI {
    constructor(address = "localhost:8000", secure = true) {
        this.address = address;
        if(secure){
            this.protocol = 'https';
        }else{
            this.protocol = 'http';
        }
        this.config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }
    }

    listUsers(params) {
        let config_copy = {...this.config};
        config_copy["params"] = params;
        return axios.get(`${this.protocol}://${this.address}/api/users/`, config_copy)
        .then( response => response.data )
        .catch( error => {
            console.log(error);
        })
    }

    createUser(user) {
        return axios.post(`${this.protocol}://${this.address}/api/users/`, user, this.config)
        .then( response => response.data )
        .catch( error => {
            error = error.response;
            if (error.data){
                if (error.data.username) {
                    throw `Invalid credentials: ${error.data.username}`;
                }else if (error.data.password) {
                    throw `Invalid credentials: ${error.data.password}`;
                }else if (error.data.email){
                    throw `Invalid credentials: ${error.data.email}`;
             }
            }else{
                throw `Invalid credentials: A user with that username already exists.`;
            }
        })
    }

    updateUser(id, user) {
        return axios.put(`${this.protocol}://${this.address}/api/users/${id}/`, user, this.config)
            .then( response => ({status: response.status, data: response.data}) )
            .catch( error => ({status: error.response.status, data: error.response.data}))
    }
}

export {JuliaAPI};