import axios from 'axios'

export default class Search {
    constructor(query) {
        this.query = query
    }
    async getResults() {
        const key = '987bae9594ba77f27610e5ac5ab6af5f'
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        try {
            const result = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`)
            this.result = result.data.recipes
            // console.log(this.result)
        } catch (error) {
            alert(error)
        }
    }

}
