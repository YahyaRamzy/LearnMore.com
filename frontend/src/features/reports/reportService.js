import axios from 'axios'

const API_URL = '/report'


//Get All Requests
const getAll = async () => {
    const response = await axios.get(API_URL + '/')
  
  
  return response.data
  }

  const createReport = async (data) => {
    const response = await axios.post(API_URL + '/new',data)
  
  
  return response.data
  }  

  const updateStatus = async (data) => {
    const response = await axios.post(API_URL + '/updateStatus',data)
  
  
  return response.data
  } 

  const updateSeen = async () => {
    const response = await axios.get(API_URL + '/updateSeen',)
  
  
  return response.data
  } 


 

  const reportService = {
    getAll,
    createReport,
    updateStatus,
    updateSeen
   
}

export default reportService