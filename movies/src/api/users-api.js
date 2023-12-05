export const registerUser = async (user, passwd) => {

    const response = await fetch(
        `http://localhost:8080/api/users?action=register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user, password: passwd })

    });

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data;

};

export const authenticateUser = async (user, passwd) => {

    const response = await fetch(
        `http://localhost:8080/api/users?action=authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user, password: passwd })

    });

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data;
};