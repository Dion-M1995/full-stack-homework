'use server';

import sql from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addNumber(prevState: { error: string } | undefined, formData: FormData) {
  const number = formData.get('number');
  if (number) {
    try {
      await sql`INSERT INTO numbers (value) VALUES (${Number(number)})`;
      revalidatePath('/numbers');
      return;
    } catch (error) {
      console.error('Failed to insert number:', error);
      return { error: 'Failed to add number.' };
    }
  }
  return { error: 'Please provide a number.' };
}

export async function addGrade(prevState: { error: string } | undefined, formData: FormData) {
  const className = formData.get('class');
  const grade = formData.get('grade');

  if (className && grade) {
    const numericGrade = Number(grade);
    if (numericGrade >= 0 && numericGrade <= 100) {
      try {
        await sql`
          INSERT INTO grades (class_name, grade) 
          VALUES (${String(className)}, ${numericGrade})
        `;
        revalidatePath('/grades');
        return;
      } catch (error) {
        console.error('Failed to insert grade:', error);
        return { error: 'Failed to add grade.' };
      }
    } else {
      return { error: 'Validation failed: Grade must be between 0 and 100.' };
    }
  }
  return { error: 'Please provide all fields.' };
}
