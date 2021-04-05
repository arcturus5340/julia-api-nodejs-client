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

    setAuthToken(token){
        this.config.headers['Authorization'] = `JWT ${token}`;
    }

    listUser(options = {}) {
        return this._request("GET", `${this.protocol}://${this.address}/api/users/`, options)
    }

    describeUser(id) {
        return this._request("GET", `${this.protocol}://${this.address}/api/users/${id}/`)
    }

    createUser(username, password, email, options = new FormData()) {
        options.append('username', username);
        options.append('password', password);
        options.append('email', email);
        return this._request("POST", `${this.protocol}://${this.address}/api/users/`, options)
    }

    updateUser(id, options = new FormData()) {
        return this._request("PUT", `${this.protocol}://${this.address}/api/users/${id}/`, options)
    }

    partialUpdateUser(id, options = {}) {
        return this._request("PATCH", `${this.protocol}://${this.address}/api/users/${id}/`, options)
    }

    destroyUser(id) {
        return this._request("DELETE", `${this.protocol}://${this.address}/api/users/${id}/`)
    }

    activate(id, key) {
        return this._request("GET", `${this.protocol}://${this.address}/api/users/${id}/activation/${key}/`)
    }

    resetPassword(username, email, options = new FormData()){
        if (!!username){
            options.append('username', username);
        }else if (!!email){
            options.append('email', email);
        }
        return this._request("POST", `${this.protocol}://${this.address}/api/users/reset_password/`, options)
    }

    resetPasswordConfirm(id, key, new_password, options = {}){
        options.password = new_password;
        return this._request("POST", `${this.protocol}://${this.address}/api/users/${id}/reset_password/${key}/confirm/`, options)
    }

    obtainToken(username, password, options = {}){
        options.username = username;
        options.password = password;
        return this._request("POST", `${this.protocol}://${this.address}/api/token-auth`, options)
    }

    refreshToken(token, options = {}){
        options.token = token;
        return this._request("POST", `${this.protocol}://${this.address}/api/token-refresh`, options)
    }

    listTasks(options = {}){
        return this._request("GET", `${this.protocol}://${this.address}/api/tasks/`, options)
    }

    describeTask(id){
        return this._request("GET", `${this.protocol}://${this.address}/api/tasks/${id}/`)
    }

    createTask(title, content, contest, order, options = {}){
        options.title = title;
        options.content = content;
        options.contest = contest;
        options._order = order;
        return this._request("POST", `${this.protocol}://${this.address}/api/tasks/`, options)
    }

    updateTask(id, options = {}) {
        return this._request("PUT", `${this.protocol}://${this.address}/api/tasks/${id}/`, options)
    }

    partialUpdateTask(id, options = {}) {
        return this._request("PATCH", `${this.protocol}://${this.address}/api/tasks/${id}/`, options)
    }

    destroyTask(id) {
        return this._request("DELETE", `${this.protocol}://${this.address}/api/tasks/${id}/`)
    }

    listContests(options = {}){
        return this._request("GET", `${this.protocol}://${this.address}/api/contests/`, options)
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

    createContest(title, description, options = {}){
        options.title = title;
        options.description = description;
        return this._request("POST", `${this.protocol}://${this.address}/api/contests/`, options)
    }

    updateContest(id, options = {}) {
        return this._request("PUT", `${this.protocol}://${this.address}/api/contests/${id}/`, options)
    }

    partialUpdateContest(id, options = {}) {
        return this._request("PATCH", `${this.protocol}://${this.address}/api/contests/${id}/`, options)
    }

    destroyContest(id) {
        return this._request("DELETE", `${this.protocol}://${this.address}/api/contests/${id}/`)
    }

    listSolutions(options){
        return this._request("GET", `${this.protocol}://${this.address}/api/solutions/`, options)
    }

    describeSolution(id){
        return this._request("GET", `${this.protocol}://${this.address}/api/solutions/${id}/`)
    }

    createSolution(options = {}){
        return this._request("POST", `${this.protocol}://${this.address}/api/solutions/`, options)
    }
}

export {JuliaAPI};