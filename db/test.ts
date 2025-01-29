import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { userProgress } from "@/db/schema";

(async () => {
    try {
        const result = await db.query.userProgress.findFirst({
            where: eq(userProgress.userId, 'your_test_user_id'), // Replace with a known user ID
            with: {
                activeCourse: true,
            },
        });
        console.log("Query result:", result);
    } catch (error) {
        console.error("Error running query:", error);
    }
})();