import axios from "axios";
import Cookies from "js-cookie";


class JuliaAPI {
    constructor(address = "localhost:8000", secure = true, cookie_expires = 3600) {
        this.address = address;
        this.secure = secure;
        axios.defaults.baseURL = `${secure?'https':'http'}://${this.address}`
        this._auto_refresh = true;
        this.cookie_expires = cookie_expires;
        this.jwt_cookie_expiration_date = new Date();
        this.source = axios.CancelToken.source();
        this.config = {
            cancelToken: this.source.token,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }
    }

    _request(method, path, options = {}) {
        if(this._auto_refresh && (path !== '/api/token-auth' && path !== '/api/token-refresh')){
            if (new Date().getTime() - this.jwt_cookie_expiration_date >= this.cookie_expires){
                Cookies.remove('JWT');
            }else{
                axios.post('/api/token-refresh', {token: Cookies.get('JWT')}, this.config).then(
                    response => {
                        this._updateToken(response.data.token);
                    }
                ).catch( error => { Cookies.remove('JWT') });
            }
        }
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

    _updateToken(token){
        this.config.headers['Authorization'] = token;
        this.jwt_cookie_expiration_date = new Date(new Date().getTime() + this.cookie_expires * 1000);
        Cookies.remove('JWT');
        Cookies.set('JWT', token, {expires: this.jwt_cookie_expiration_date, secure: this.secure});
    }

    listUser(options = {}) {
        return this._request("GET", `/api/users/`, options)
    }

    describeUser(id) {
        return this._request("GET", `/api/users/${id}/`)
    }

    createUser(username, password, email, options = new FormData()) {
        options.append('username', username);
        options.append('password', password);
        options.append('email', email);
        return this._request("POST", `/api/users/`, options)
    }

    updateUser(id, options = new FormData()) {
        return this._request("PUT", `/api/users/${id}/`, options)
    }

    partialUpdateUser(id, options = {}) {
        return this._request("PATCH", `/api/users/${id}/`, options)
    }

    destroyUser(id) {
        return this._request("DELETE", `/api/users/${id}/`)
    }

    activate(id, key) {
        return this._request("GET", `/api/users/${id}/activation/${key}/`)
    }

    resetPassword(username, email, options = new FormData()){
        if (!!username){
            options.append('username', username);
        }else if (!!email){
            options.append('email', email);
        }
        return this._request("POST", `/api/users/reset_password/`, options)
    }

    resetPasswordConfirm(id, key, new_password, options = {}){
        options.password = new_password;
        return this._request("POST", `/api/users/${id}/reset_password/${key}/confirm/`, options)
    }

    obtainToken(username, password, options = {}){
        options.username = username;
        options.password = password;
        return this._request("POST", `/api/token-auth`, options).then(
            response => {
                this._updateToken(response.data.token);
                return {status: response.status, data: response.data};
            }
        )
    }

    refreshToken(token, options = {}){
        options.token = token;
        return this._request("POST", `/api/token-refresh`, options).then(
            response => {
                this._updateToken(response.data.token);
                return {status: response.status, data: response.data};
            }
        )
    }

    login(username, password){
        let options = {username: username, password: password};
        return this._request("POST", `/api/token-auth`, options).then(
            response => {
                this._updateToken(response.data.token);
                return {status: response.status, data: response.data};
            }
        )
    }

    listTasks(options = {}){
        return this._request("GET", `/api/tasks/`, options)
    }

    describeTask(id){
        return this._request("GET", `/api/tasks/${id}/`)
    }

    createTask(title, content, contest, order, options = {}){
        options.title = title;
        options.content = content;
        options.contest = contest;
        options._order = order;
        return this._request("POST", `/api/tasks/`, options)
    }

    updateTask(id, options = {}) {
        return this._request("PUT", `/api/tasks/${id}/`, options)
    }

    partialUpdateTask(id, options = {}) {
        return this._request("PATCH", `/api/tasks/${id}/`, options)
    }

    destroyTask(id) {
        return this._request("DELETE", `/api/tasks/${id}/`)
    }

    listContests(options = {}){
        return this._request("GET", `/api/contests/`, options)
    }

    listContestResults(id){
        return this._request("GET", `/api/contests/${id}/results/`)
    }

    listContestTasks(id){
        return this._request("GET", `/api/contests/${id}/tasks/`)
    }

    describeContest(id){
        return this._request("GET", `/api/contests/${id}/`)
    }

    createContest(title, description, options = {}){
        options.title = title;
        options.description = description;
        return this._request("POST", `/api/contests/`, options)
    }

    updateContest(id, options = {}) {
        return this._request("PUT", `/api/contests/${id}/`, options)
    }

    partialUpdateContest(id, options = {}) {
        return this._request("PATCH", `/api/contests/${id}/`, options)
    }

    destroyContest(id) {
        return this._request("DELETE", `/api/contests/${id}/`)
    }

    listSolutions(options){
        return this._request("GET", `/api/solutions/`, options)
    }

    describeSolution(id){
        return this._request("GET", `/api/solutions/${id}/`)
    }

    createSolution(options = {}){
        return this._request("POST", `/api/solutions/`, options)
    }
}

export {JuliaAPI};