// ユーザーのメールアドレスを取得する関数
export const getUserEmail = async (uid: string): Promise<string | null> => {
  try {
    const response = await fetch('/api/userActions/getUserEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid }),
    });

    const data = await response.json();

    if (response.ok) {
      return data.email || null;
    } else {
      console.error('Error fetching email:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Request failed:', error);
    return null;
  }
};
