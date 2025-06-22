import sql from '@/lib/db';

// --- Numbers Service ---

export async function getNumberPairs() {
  try {
    const numbers = await sql`SELECT id, value FROM numbers ORDER BY id ASC`;
    const pairs = [];
    for (let i = 0; i < numbers.length - 1; i++) {
      pairs.push({
        id1: numbers[i].id,
        number1: numbers[i].value,
        id2: numbers[i + 1].id,
        number2: numbers[i + 1].value,
        sum: numbers[i].value + numbers[i + 1].value,
      });
    }
    return pairs;
  } catch (error) {
    console.error('Database query failed:', error);
    // In a real app, you'd want to handle this more gracefully
    return []; // Return empty array on error
  }
}

// --- Grades Service ---

export async function getRecentGrades() {
  try {
    const grades = await sql`
      SELECT id, class_name, grade, created_at 
      FROM grades 
      ORDER BY created_at DESC 
      LIMIT 10
    `;
    return grades;
  } catch (error) {
    console.error('Database query failed:', error);
    return [];
  }
} 