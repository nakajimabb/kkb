import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  paramsSerializer: (params) => {
    return qs.stringify(params, {arrayFormat: 'brackets'})
  }
});

export default instance
