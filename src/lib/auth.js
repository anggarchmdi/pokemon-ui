export const getUsers = () => {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

export const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
}

export const register = ({name, email, password}) => {
    const users = getUsers();

    const exists = users.some((u) => u.email === email);
    if(exists) throw new Error("Email sudah terdaftar");

    const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    createdAt: Date.now(),
    session: false,
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const login = ({ email, password }) => {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) throw new Error("Email atau password salah");

  const updated = users.map((u) =>
    u.id === user.id ? { ...u, session: true } : { ...u, session: false }
  );

  saveUsers(updated);

  return user;
};

export const getSession = () => {
  const users = getUsers();
  return users.find((u) => u.session === true) || null;
};

export const logout = () => {
  const users = getUsers();
  const updated = users.map((u) => ({ ...u, session: false }));
  saveUsers(updated);
};