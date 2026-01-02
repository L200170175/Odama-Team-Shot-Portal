// Mock database
export const users = {
  user: 'user'
};

export const authenticateUser = (username, password) => {
  if (users[username] && users[username] === password) {
    return { success: true, username };
  }
  return { success: false, error: 'Invalid username or password' };
};
