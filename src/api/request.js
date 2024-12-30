import axios from 'axios';

export function get(url) {
    return function(params){
           axios.get(url)
       .then(res => {
           const {
               errno,
               data
           } = res.data;

           if(errno === 0){
               return data
           }
       })
       .catch(e => {}); 
    }

}