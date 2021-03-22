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
}

export {JuliaAPI};