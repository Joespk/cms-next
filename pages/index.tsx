"use client";

import axios from "axios";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface Author {
  authorID: number;
  title: string;
  file: string;
  status: string;
}

interface User {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  authors: Author[];
}

const statuses = ["not read", "read", "pass", "fail"];

// Mock data
const mockUsers: User[] = [
  {
    userID: 1,
    firstName: "ศุภกฤต",
    lastName: "ทับแว่ว",
    email: "supakritjoe@gmail.com",
    authors: [
      {
        authorID: 1,
        title: "ล่อรุ่นใหญ่ ใจต้องแสวท",
        file: "uploads/ล่อรุ่นใหญ่ ใจต้องแสวท_ศุภกฤต -ทับแว่ว.doc",
        status: "not read",
      },
    ],
  },
  {
    userID: 2,
    firstName: "ศุภกฤต",
    lastName: "ทับแว่ว",
    email: "58120035@kmitl.ac.th",
    authors: [
      {
        authorID: 2,
        title: "เปรี้ยว รสชาติที่แสนขม",
        file: "uploads/เปรี้ยว รสชาติที่แสนขม_ศุภกฤต-ทับแว่ว.doc",
        status: "not read",
      },
    ],
  },
  {
    userID: 3,
    firstName: "Jon",
    lastName: "Doe",
    email: "Supakrit.Tha@gmm-tv.com",
    authors: [
      {
        authorID: 3,
        title: "กระดอสันตบาล",
        file: "uploads/กระดอสันตบาล_Jon-Doe.doc",
        status: "not read",
      },
    ],
  },
  {
    userID: 4,
    firstName: "Jon",
    lastName: "Doe",
    email: "check.boowork@gmail.com",
    authors: [
      {
        authorID: 4,
        title: "test",
        file: "uploads/test_Jon-Doe.doc",
        status: "not read",
      },
    ],
  },
  {
    userID: 5,
    firstName: "João",
    lastName: "Souza Silva",
    email: "joespk1730@gmail.com",
    authors: [
      {
        authorID: 5,
        title: "cocobe",
        file: "uploads/cocobe_João-Souza Silva.doc",
        status: "not read",
      },
    ],
  },
  {
    userID: 6,
    firstName: "Jon",
    lastName: "Doe",
    email: "developer.gmmtv@gmail.com",
    authors: [
      {
        authorID: 6,
        title: "Test2",
        file: "uploads/Test2_Jon-Doe.doc",
        status: "not read",
      },
    ],
  },
  {
    userID: 7,
    firstName: "ศุภกฤต",
    lastName: "henry",
    email: "luzifer_joe@hotmail.com",
    authors: [
      {
        authorID: 7,
        title: "ชาโดว ยอดขุนพลตีหม้อ",
        file: "uploads/ชาโดว ยอดขุนพลตีหม้อ_ศุภกฤต -henry.doc",
        status: "not read",
      },
    ],
  },
  {
    userID: 15,
    firstName: "João",
    lastName: "Souza Silva",
    email: "teste@exemplo.com",
    authors: [
      {
        authorID: 9,
        title: "dddd",
        file: "uploads/dddd_João-Souza Silva.doc",
        status: "not read",
      },
      {
        authorID: 10,
        title: "eeee",
        file: "uploads/eeee_João-Souza Silva.doc",
        status: "not read",
      },
    ],
  },
  {
    userID: 18,
    firstName: "João",
    lastName: "Souza Silva",
    email: "te33ste@exemplo.com",
    authors: [
      {
        authorID: 12,
        title: "dddd",
        file: "uploads/dddd_João-Souza Silva.doc",
        status: "not read",
      },
      {
        authorID: 13,
        title: "ffff",
        file: "uploads/ffff_João-Souza Silva.doc",
        status: "not read",
      },
    ],
  },
  {
    userID: 21,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    authors: [
      {
        authorID: 15,
        title: "Book 1",
        file: "uploads/Book 1_John-Doe.docx",
        status: "not read",
      },
    ],
  },
  {
    userID: 23,
    firstName: "João",
    lastName: "Souza Silva",
    email: "terrste@exemplo.us",
    authors: [
      {
        authorID: 17,
        title: "rrr",
        file: "uploads/rrr_João-Souza Silva.doc",
        status: "not read",
      },
      {
        authorID: 18,
        title: "sss",
        file: "uploads/sss_João-Souza Silva.doc",
        status: "not read",
      },
    ],
  },
  {
    userID: 25,
    firstName: "João",
    lastName: "Souza Silva",
    email: "test3e@exemplo.us",
    authors: [
      {
        authorID: 19,
        title: "3",
        file: "uploads/3_João-Souza Silva.doc",
        status: "not read",
      },
      {
        authorID: 20,
        title: "4",
        file: "uploads/4_João-Souza Silva.doc",
        status: "not read",
      },
    ],
  },
  {
    userID: 26,
    firstName: "Test",
    lastName: "User",
    email: "test.user@example.com",
    authors: [
      {
        authorID: 21,
        title: "First Story",
        file: "uploads/First_Story_Test-User.doc",
        status: "not read",
      },
      {
        authorID: 22,
        title: "Second Story",
        file: "uploads/Second_Story_Test-User.doc",
        status: "not read",
      },
    ],
  },
  {
    userID: 27,
    firstName: "New",
    lastName: "User",
    email: "new.user@example.com",
    authors: [
      {
        authorID: 23,
        title: "New Story 1",
        file: "uploads/New_Story_1_New-User.doc",
        status: "not read",
      },
      {
        authorID: 24,
        title: "New Story 2",
        file: "uploads/New_Story_2_New-User.doc",
        status: "not read",
      },
      {
        authorID: 25,
        title: "New Story 3",
        file: "uploads/New_Story_3_New-User.doc",
        status: "not read",
      },
      {
        authorID: 26,
        title: "New Story 4",
        file: "uploads/New_Story_4_New-User.doc",
        status: "not read",
      },
    ],
  },
  {
    userID: 28,
    firstName: "Another",
    lastName: "User",
    email: "another.user@example.com",
    authors: [
      {
        authorID: 27,
        title: "Another Story 1",
        file: "uploads/Another_Story_1_Another-User.doc",
        status: "not read",
      },
      {
        authorID: 28,
        title: "Another Story 2",
        file: "uploads/Another_Story_2_Another-User.doc",
        status: "not read",
      },
    ],
  },
];

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    // const fetchUsers = async () => {
    //   try {
    //     const response = await axios.get("https://cms.gmmtvyfind.com/users");
    //     const data = response.data;
    //     setUsers(data);
    //   } catch (error) {
    //     console.error("Error fetching users:", error);
    //   }
    // };

    // fetchUsers();
    setUsers(mockUsers);
  }, []);

  const handleDownload = (fileUrl: string) => {
    // Perform the file download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "file");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleStatusChange = async (authorID: number, newStatus: string) => {
    // try {
    //   // Update status on server
    //   await axios.put(`https://cms.gmmtvyfind.com/authors/${authorID}`, {
    //     status: newStatus,
    //   });

    // Update status locally
    setUsers((prevUsers) =>
      prevUsers.map((user) => ({
        ...user,
        authors: user.authors.map((author) =>
          author.authorID === authorID
            ? { ...author, status: newStatus }
            : author
        ),
      }))
    );
    // } catch (error) {
    //   console.error("Error updating status:", error);
    // }
  };

  const filteredUsers = selectedStatus
    ? users.filter((user) =>
        user.authors.some((author) => author.status === selectedStatus)
      )
    : users;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const displayedPages = Math.min(totalPages, 20);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="w-full p-4 flex justify-end">
        <div className="w-1/4">
          <h2 className="text-xl font-bold mb-4">Filter by Status</h2>
          <select
            className="border rounded px-2 py-1 w-full"
            value={selectedStatus || ""}
            onChange={(e) => setSelectedStatus(e.target.value || null)}
          >
            <option value="">All</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">File</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Details</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) =>
              user.authors.map((author) => (
                <tr key={author.authorID}>
                  <td className="py-2 px-4 border-b">{`${user.firstName} ${user.lastName}`}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{author.title}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() =>
                        handleDownload(
                          `https://cms.gmmtvyfind.com/${author.file}`
                        )
                      }
                    >
                      Download
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <select
                      className="border rounded px-2 py-1"
                      value={author.status}
                      onChange={(e) =>
                        handleStatusChange(author.authorID, e.target.value)
                      }
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Link
                      href={`user/${user.userID}`}
                      className="text-blue-500 underline"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          {Array.from({ length: displayedPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
          {totalPages > 20 && (
            <button
              onClick={() => paginate(20)}
              className={`px-4 py-2 mx-1 border rounded ${
                currentPage === 20 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              20
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
