import React from 'react'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import CourseItem from '../components/CourseItem'
import Spinner from '../components/Spinner'
import { getCourses, reset } from '../features/courses/courseSlice'
import axios from 'axios'
import { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import SubjectData from "../components/SubjectData.json";


function ViewMyCoursesIns() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const { courses, isLoading, isError, message } = useSelector(
      (state) => state.courses
    )
    //console.log(courses)
     const[courses1 , setCourses] = useState(courses);
     //setCourses(courses)
     console.log(courses1)
     
     //console.log(courses1)

     const [subjects , setSubject] = useState(SubjectData);
     const [searchSubject, setSearchSubject] = useState();
    useEffect(() => {
      if (isError) {
        console.log(message)
      }
  
      
  
      dispatch(getCourses())
      const newCourses = courses.filter((course) => course.instructorName.includes(user.username))
      setCourses(newCourses)
      return () => {
        dispatch(reset())
      }
    }, [user, navigate, isError, message, dispatch])
  
    if (isLoading) {
      return <Spinner />
    }


    function filterContent1(courses, searchTerm){
      console.log(courses, searchTerm)
      const result = courses.filter((course) => course.title.includes(searchTerm))
      
      return setCourses(result)
      
  }

  function filterContent2(courses, searchTerm){
    console.log(courses, searchTerm)
    const result = courses.filter((course) => course.subject.includes(searchTerm))
    
    return setCourses(result)
    
}











    const  handleSearcher1 = (e) => {
      const searchTerm = e.currentTarget.value
      console.log(searchTerm)
      axios.get('/courses/').then((res) => {
        if(res.data) {
          console.log('here')
          console.log(res.data)
          filterContent1(res.data, searchTerm)
        }
      })
    }

    const  handleSearcher2 = (e) => {
      setSearchSubject(e.target.value)
      const searchTerm = e.currentTarget.value
     
      axios.get('/courses/').then((res) => {
        if(res.data) {
          
          filterContent2(res.data, searchTerm)
        }
      })
    }



  return ( 
  
  
  <>
  
      <section className='heading'>
      <h1>
        All Availble Courses
        </h1>
        
      </section>
      <div>
        Search By Title:
        <input type="text" className="form-control" id='search' name='search' placeholder='Search Courses' onChange={handleSearcher1}/>
      </div>

      <div>
      Search By Subject:
        {/* <input type="text" className="form-control" id='search' name='search' placeholder='Search Courses' onChange={handleSearcher2}/> */}
        <select className="form-control" id='subject' name='subject' onChange={handleSearcher2} value={searchSubject}>

                    <option value="" hidden>
                         Please Select Subject
                    </option>
                    {
                        subjects.map((item) => {
                        return (
                            <option key={uuidv4()} value={item.subject}>
                                {item.subject}
                    </option>
                                 );
                                                 })
                     }          
            
                     </select>
      
      </div>

      

      <section className='content'>
        {(courses1.length > 0)   ? (
          <div className='goals'>
            {courses1.map((course) => (
              <CourseItem key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className='goals'>
          {courses1.map((course) => (
            <CourseItem key={course._id} course={course} />
          ))}
        </div>
        )}
      </section>

    
    </>
  )
}

export default ViewMyCoursesIns