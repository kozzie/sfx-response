// app/users/page.tsx (or pages/users/index.tsx)
"use client"; // Required for Next.js 13 App Directory
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';


export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users');
                if (!response.ok) {
                    throw new Error(`Error fetching users: ${response.status} ${response.statusText}`);

                }


                const data = await response.json();
                setUsers(data);
            } catch (err) {
                console.error("Error fetching users", err)
                setError(err);

            } finally {
                setLoading(false);
            }
        };

        fetchUsers();


    }, []);


    if (loading) return <div> <Navbar /> <p>Loading users...</p></div>;
    if (error) return <div><Navbar /> <p>Error: {error.message}</p></div>;

    return (
        <div>
            <Navbar />
            <h1 className="text-2xl font-bold mb-4">Users</h1>

            {/* Table to display users */}
            <table className="min-w-full border border-collapse">
                <thead>
                    <tr className="bg-gray-100"> {/* Improved table header styling */}

                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Username</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">First Name</th>
                        <th className="border px-4 py-2">Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (

                        <tr key={user._id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{user._id}</td> {/* Assuming _id is a string */}
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.firstName}</td>
                            <td className="border px-4 py-2">{user.lastName}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}