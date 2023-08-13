import React, { useEffect, useState } from 'react'

import {getUserEnrolledCourses} from "../../../services/operations/profileAPI"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const EnrolledCourses = () => {
    // backend call

    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate();

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    useEffect(()=>{
      (async () =>{

        try{

          const res = await getUserEnrolledCourses(token)

          // const fil

          setEnrolledCourses(res);

        }catch(error)
        {

          console.log("Could not fetch enrolled courses.")

        }
      })()
    }, [])

    
  return (
    <div>
        <div className='text-richblack-5'>
         {
          !enrolledCourses ? (<div>Loading....</div>) : 
          !enrolledCourses.length ? (<p>You have not enrolled in any course yet</p>) : (

            <div>
              <div>
                <p>Course Name</p>
                <p>Duration</p>
                <p>Progress</p>
              </div>

              {
                enrolledCourses.map((course, index) =>(
                  <div>
                    <div>
                      <img src= {course.thumbnail}/>
                      <div>
                        <p>{course.courseName}</p>
                        <p>{course.description}</p>
                      </div>
                    </div>

                    <div>
                      {course?.totalDuration}
                    </div>

                    <div>
                      <p>Progress : {course.percentage || 0}</p>
                      {/* Progress Bar */}
                    </div>
                  </div>
                ))
              }
            </div>
          )
         }
        </div>
    </div>
  )
}

export default EnrolledCourses