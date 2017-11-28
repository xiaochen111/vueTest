import parmes from './parmes';
import axios from 'axios';
import server from '../../../config/dev';

let listRender = function(cb){
    axios({
        method: 'post',
        url: `${server}freightfclweb/queryPage`,
        params: parmes,
    }).then((res) => {
        cb(res)
    })
}
export default listRender;