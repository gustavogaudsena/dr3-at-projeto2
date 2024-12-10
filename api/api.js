class ApiHandler {
    constructor() {
        this.baseUrl = 'https://images-api.nasa.gov/search'
    }

    async get(astro = 'earth', page = 1) {
        return fetch(`${this.baseUrl}?q=${astro}&page=${page}`).then(resp => resp.json()).then(result => result.collection)
    }

}


const apiHandler = new ApiHandler()

export { apiHandler };