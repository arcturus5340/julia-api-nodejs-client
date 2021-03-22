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
            .then( response => ({status: response.status, data: response.data}) )
            .catch( error => ({status: error.response.status, data: error.response.data}))
    }

    describeUsers(id) {
        return axios.get(`${this.protocol}://${this.address}/api/users/${id}`, this.config)
            .then( response => ({status: response.status, data: response.data}) )
            .catch( error => ({status: error.response.status, data: error.response.data}))
    }


    createUser(user) {
        return axios.post(`${this.protocol}://${this.address}/api/users/`, user, this.config)
            .then( response => ({status: response.status, data: response.data}) )
            .catch( error => ({status: error.response.status, data: error.response.data}))
    }

    updateUser(id, user) {
        return axios.put(`${this.protocol}://${this.address}/api/users/${id}/`, user, this.config)
            .then( response => ({status: response.status, data: response.data}) )
            .catch( error => ({status: error.response.status, data: error.response.data}))
    }

    partialUpdateUser(id, user) {
        return axios.patch(`${this.protocol}://${this.address}/api/users/${id}/`, user, this.config)
            .then( response => ({status: response.status, data: response.data}) )
            .catch( error => ({status: error.response.status, data: error.response.data}))
    }

    destroyUser(id) {
        return axios.delete(`${this.protocol}://${this.address}/api/users/${id}/`, this.config)
            .then( response => ({status: response.status, data: response.data}) )
            .catch( error => ({status: error.response.status, data: error.response.data}))
    }

    activate(id, key){
        return axios.get(`${this.protocol}://${this.address}/api/users/${id}/activation/${key}`, this.config)
            .then( response => ({status: response.status, data: response.data}) )
            .catch( error => ({status: error.response.status, data: error.response.data}))
    }
}

export {JuliaAPI};