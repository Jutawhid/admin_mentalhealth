import axios from '../BASE_API';
import AuthHeader from '../AuthHeader';




class ExpertTypeAPI {

    addExpertType: any = (data: any) => {
        return axios.post('/expert-type/add', data, { headers: AuthHeader() })
    }

    getAllActiveExpertType = () => {
        return axios.get('/expert-type/activeList', { headers: AuthHeader() })
    }

    getAllExpertTypeList: any = () => {
        return axios.get('/expert-type/list', { headers: AuthHeader() })
    }

    changeStatus: any = (id: number) => {
        return axios.put('/expert-type/changeStatus', { id: id }, { headers: AuthHeader() })
    }

    deleteExpertType: any = (id: number) => {
        //console.log("group Delete")
        return axios.delete('/expert-type/delete', {
            data: { id: id },
            headers: AuthHeader(),
        })
    }

    updateExpertType = (id: number, data: any) => {

        return axios.put('/expert-type/update',
            {
                id: id,
                title: data.title

            },
            {
                headers: AuthHeader(),
            })
    }

    getDetails = (id: number) => {
        return axios.get(`/expert-type/details/${id}`, { headers: AuthHeader() })
    }

}

export default new ExpertTypeAPI();