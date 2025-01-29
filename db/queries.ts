
import {cache} from "react"
import db from "@/db/drizzle"
import {auth} from "@clerk/nextjs/server"
import { courses, userProgress } from "@/db/schema";
import { eq } from "drizzle-orm";


export const getUserProgress = cache (async () =>{
  
    const {userId} =  await auth();
    console.log("gigi", userId);
    if(!userId){
        console.log("No userId found in auth()");
        return null;
    }
try{
    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true
        }
    }).execute()
    return data
} catch (error){
    console.error("Error querying userProgress:", error);
    throw new Error("Database query failed");
}
})

export const getCourses = cache (async () => {
    const data = await db.query.courses.findMany()

    return data
})

export const getCourseById = cache (async (courseId: number)=> {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId)
        //TODO populate units and lessons 
    })

    return data
})