import axios from 'axios';


export default class Service {

     static async getText(){

        try {
            const response = await axios.get('https://baconipsum.com/api/?type=meat-and-filler&sentences=10')
      

            return response.data;
        } catch (error) {
            console.log(error)
        }

    }


}