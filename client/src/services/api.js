const BASE_URL = "http://localhost:8080";

async function request(path, options = {}) {
    const url = `${BASE_URL}${path}`;

    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        ...options,
    });

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await res.json() : await res.text();

    if (!res.ok) {
        const message =
            (isJson && data && data.message) ? data.message : "Request failed";
        throw new Error(message);
    }

    return data;
}

export const api = {
    get(path) {
        return request(path, { method: "GET" });
    },
    post(path, body) {
        return request(path, {
            method: "POST",
            body: JSON.stringify(body),
        });
    },
    put(path, body) {
        return request(path, {
            method: "PUT",
            body: JSON.stringify(body),
        });
    },
    del(path) {
        return request(path, { method: "DELETE" });
    },
};
