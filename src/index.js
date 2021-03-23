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

    _request(method, path, options = {}) {
        if(method === 'GET') {
            let config_copy = {...this.config};
            config_copy["params"] = options;
            return axios.get(path, config_copy)
                .then( response => ({status: response.status, data: response.data}) )
                .catch( error => ({status: error.response.status, data: error.response.data}))
        }else if(method === "POST"){
            return axios.post(path, options, this.config)
                .then( response => ({status: response.status, data: response.data}) )
                .catch( error => ({status: error.response.status, data: error.response.data}))
        }else if(method === "PUT"){
            return axios.put(path, options, this.config)
                .then( response => ({status: response.status, data: response.data}) )
                .catch( error => ({status: error.response.status, data: error.response.data}))
        }else if(method === "PATCH"){
            return axios.patch(method, options, this.config)
                .then( response => ({status: response.status, data: response.data}) )
                .catch( error => ({status: error.response.status, data: error.response.data}))
        }else if(method === "DELETE"){
            return axios.delete(method, this.config)
                .then(response => ({status: response.status, data: response.data}))
                .catch(error => ({status: error.response.status, data: error.response.data}))
        }
    }

    listUsers(params) {
        return this._request("GET", `${this.protocol}://${this.address}/api/users/`, params)
    }

    describeUser(id) {
        return this._request("GET", `${this.protocol}://${this.address}/api/users/${id}/`)
    }

    createUser(user) {
        return this._request("POST", `${this.protocol}://${this.address}/api/users/`, user)
    }

    updateUser(id, user) {
        return this._request("PUT", `${this.protocol}://${this.address}/api/users/${id}/`, user)
    }

    partialUpdateUser(id, user) {
        return this._request("PATCH", `${this.protocol}://${this.address}/api/users/${id}/`, user)
    }

    destroyUser(id) {
        return this._request("DELETE", `${this.protocol}://${this.address}/api/users/${id}/`)
    }

    activate(id, key){
        return this._request("GET", `${this.protocol}://${this.address}/api/users/${id}/activation/${key}/`)
    }

    obtainToken(params){
        return this._request("POST", `${this.protocol}://${this.address}/api/token-auth`, params)
    }

    refreshToken(params){
        return this._request("POST", `${this.protocol}://${this.address}/api/token-refresh`, params)
    }

    listTasks(params){
        return this._request("GET", `${this.protocol}://${this.address}/api/tasks/`, params)
    }

    describeTask(id){
        return this._request("GET", `${this.protocol}://${this.address}/api/tasks/${id}/`)
    }

    createTask(task){
        return this._request("POST", `${this.protocol}://${this.address}/api/tasks/`, task)
    }

    updateTask(id, task) {
        return this._request("PUT", `${this.protocol}://${this.address}/api/tasks/${id}/`, task)
    }

    partialUpdateTask(id, task) {
        return this._request("PATCH", `${this.protocol}://${this.address}/api/tasks/${id}/`, task)
    }

    destroyTask(id) {
        return this._request("DELETE", `${this.protocol}://${this.address}/api/tasks/${id}/`)
    }

    listContests(params){
        return this._request("GET", `${this.protocol}://${this.address}/api/contests/`, params)
    }

    listContestResults(id){
        return this._request("GET", `${this.protocol}://${this.address}/api/contests/${id}/results/`)
    }

    listContestTasks(id){
        return this._request("GET", `${this.protocol}://${this.address}/api/contests/${id}/tasks/`)
    }

    describeContest(id){
        return this._request("GET", `${this.protocol}://${this.address}/api/contests/${id}/`)
    }

    createContest(contest){
        return this._request("POST", `${this.protocol}://${this.address}/api/contests/`, contest)
    }

    updateContest(id, contest) {
        return this._request("PUT", `${this.protocol}://${this.address}/api/contests/${id}/`, contest)
    }

    partialUpdateContest(id, contest) {
        return this._request("PATCH", `${this.protocol}://${this.address}/api/contests/${id}/`, contest)
    }

    destroyContest(id) {
        return this._request("DELETE", `${this.protocol}://${this.address}/api/contests/${id}/`)
    }

    listSolutions(params){
        return this._request("GET", `${this.protocol}://${this.address}/api/solutions/`, params)
    }

    describeSolution(id){
        return this._request("GET", `${this.protocol}://${this.address}/api/solutions/${id}/`)
    }

    createSolution(contest){
        return this._request("POST", `${this.protocol}://${this.address}/api/solutions/`, contest)
    }
}

export {JuliaAPI};