import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthContext";

export default function Index() {
	const { username, refresh } = useAuth();
	const navigate = useNavigate();

	const logout = useMutation({
		mutationFn: () =>
			fetch("/api/auth/logout", { method: "POST", credentials: "include" }),
		onSuccess: () => {
			refresh();
			//navigate("/login");
		},
	});

	return (
		<div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center p-12">
			<h1 className="text-4xl font-bold text-gray-900">Welcome to the best recipe website ever</h1>
			<p className="text-gray-500 max-w-md">
				Samla dina recept, håll koll på ingredienser och kalorier — allt på ett ställe.
			</p>

			{username ? (
				<button
					onClick={() => logout.mutate()}
					className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 mt-2">
					Logout
				</button>
			) : (
				<Link to="/login"
					className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 mt-2">
					Login
				</Link>
			)}
		</div>
	);
}
