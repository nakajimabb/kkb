import axios from 'axios'
import qs from 'qs'

const tokenElement = document.querySelector('meta[name=csrf-token]');
const instance = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': (tokenElement) ? tokenElement.content : null
  },

  paramsSerializer: (params) => {
    return qs.stringify(params, {arrayFormat: 'brackets'})
  }
});

export default instance
