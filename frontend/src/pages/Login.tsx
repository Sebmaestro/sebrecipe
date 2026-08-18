import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const mutation = useMutation({
        mutationFn: (credentials: { username: string; password: string }) =>
            fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(credentials),
            }).then((res) => {
                if (!res.ok) throw new Error("Fel användarnamn eller lösenord");
            }),
        onSuccess: () => navigate("/recipes"),
    });

    return (
        <div className="p-12 max-w-sm mx-auto flex flex-col gap-3">
            <h1 className="text-2xl font-bold mb-2">Logga in</h1>

            <label className="flex flex-col gap-1">
                <span className="text-sm text-gray-600">Användarnamn</span>
                <input
                    className="border border-gray-300 rounded px-2 py-1"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>

            <label className="flex flex-col gap-1">
                <span className="text-sm text-gray-600">Lösenord</span>
                <input
                    className="border border-gray-300 rounded px-2 py-1"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>

            {mutation.isError && (
                <p className="text-red-600 text-sm">{mutation.error.message}</p>
            )}

            <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => mutation.mutate({ username, password })}
            >
                Logga in
            </button>

            <Link to="/register" className="text-sm text-blue-600 hover:underline">
                Skapa konto
            </Link>
        </div>
    );
}

export default Login;