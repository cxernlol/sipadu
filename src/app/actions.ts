"use server";

import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';

export async function createComment(formData: FormData) {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL is not set. Skipping comment insertion.");
      return { error: "Database not configured." };
    }

    // Connect to the Neon database
    const sql = neon(process.env.DATABASE_URL);
    const comment = formData.get('comment');
    
    if (!comment || typeof comment !== 'string' || comment.trim() === '') {
      return { error: "Comment cannot be empty." };
    }

    // Insert the comment from the form into the Postgres database
    await sql('INSERT INTO comments (comment) VALUES ($1)', [comment.trim()]);
    
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to insert comment:", error);
    return { error: error.message || "Failed to insert comment." };
  }
}
