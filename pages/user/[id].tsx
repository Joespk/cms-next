"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  age: number;
  nationality: string;
  address: string;
  phoneNumber: string;
  line: string;
  otherContact: string;
  authors: Author[];
}

// Mock data
const mockUsers: User[] = [
  {
    userID: 1,
    firstName: "ศุภกฤต",
    lastName: "ทับแว่ว",
    email: "supakritjoe@gmail.com",
    age: 28,
    nationality: "Thai",
    address: "207/87",
    phoneNumber: "0955541509",
    line: "",
    otherContact: "",
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
    age: 28,
    nationality: "Thai",
    address: "207/87",
    phoneNumber: "0955541690",
    line: "",
    otherContact: "",
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
    age: 8,
    nationality: "Thai",
    address: "1600 Amphitheatre Parkway\r\nApartment 1",
    phoneNumber: "6019521325",
    line: "",
    otherContact: "",
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
    age: 5,
    nationality: "Thai",
    address: "1600 Amphitheatre Parkway\r\nApartment 1",
    phoneNumber: "6019521388",
    line: "",
    otherContact: "",
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
    age: 7,
    nationality: "Thai",
    address: "Av. dos Andradas, 3000\r\nAndar 2, Apartamento 1",
    phoneNumber: "5553428400",
    line: "",
    otherContact: "",
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
    age: 53,
    nationality: "Thai",
    address: "1600 Amphitheatre Parkway\r\nApartment 1",
    phoneNumber: "0865557777",
    line: "",
    otherContact: "",
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
    age: 28,
    nationality: "Thai",
    address: "s",
    phoneNumber: "0987654433",
    line: "",
    otherContact: "",
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
    age: 4,
    nationality: "Thai",
    address: "Av. dos Andradas, 3000\r\nAndar 2, Apartamento 1",
    phoneNumber: "3121286444",
    line: "",
    otherContact: "",
    authors: [
      {
        authorID: 9,
        title: "dddd",
        file: "uploads/dddd_João-Souza Silva.doc",
        status: "not read",
      },
    ],
  },
  {
    userID: 18,
    firstName: "João",
    lastName: "Souza Silva",
    email: "te33ste@exemplo.com",
    age: 4,
    nationality: "Thai",
    address: "Av. dos Andradas, 3000\r\nAndar 2, Apartamento 1",
    phoneNumber: "3121286222",
    line: "",
    otherContact: "",
    authors: [
      {
        authorID: 12,
        title: "dddd",
        file: "uploads/dddd_João-Souza Silva.doc",
        status: "not read",
      },
    ],
  },
  {
    userID: 21,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    age: 30,
    nationality: "Thai",
    address: "123 Main St, Bangkok",
    phoneNumber: "0123456789",
    line: "john",
    otherContact: "johndoe_line",
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
    age: 1,
    nationality: "Thai",
    address: "Av. dos Andradas, 3000\r\nAndar 2, Apartamento 1",
    phoneNumber: "3121284400",
    line: "",
    otherContact: "",
    authors: [
      {
        authorID: 17,
        title: "rrr",
        file: "uploads/rrr_João-Souza Silva.doc",
        status: "not read",
      },
    ],
  },
  {
    userID: 25,
    firstName: "João",
    lastName: "Souza Silva",
    email: "test3e@exemplo.us",
    age: 1,
    nationality: "Thai",
    address: "Av. dos Andradas, 3000\r\nAndar 2, Apartamento 1",
    phoneNumber: "3124486800",
    line: "",
    otherContact: "",
    authors: [
      {
        authorID: 19,
        title: "3",
        file: "uploads/3_João-Souza Silva.doc",
        status: "not read",
      },
    ],
  },
  {
    userID: 26,
    firstName: "Test",
    lastName: "User",
    email: "test.user@example.com",
    age: 35,
    nationality: "Thai",
    address: "Test Address",
    phoneNumber: "123456789",
    line: "testuser",
    otherContact: "testuser_contact",
    authors: [
      {
        authorID: 20,
        title: "First Story",
        file: "uploads/First_Story_Test-User.doc",
        status: "not read",
      },
      {
        authorID: 21,
        title: "Second Story",
        file: "uploads/Second_Story_Test-User.doc",
        status: "not read",
      },
    ],
  },
];

export default function UserDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (id) {
      const selectedUser = mockUsers.find(
        (user) => user.userID === parseInt(id as string, 10)
      );
      setUser(selectedUser || null);
    }
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Details</h1>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl mb-2">{`${user.firstName} ${user.lastName}`}</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <p>
            <strong>Nationality:</strong> {user.nationality}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <p>
            <strong>Phone Number:</strong> {user.phoneNumber}
          </p>
          <p>
            <strong>Line:</strong> {user.line}
          </p>
          <p>
            <strong>Other Contact:</strong> {user.otherContact}
          </p>
          <h3 className="text-lg mt-4">Authors:</h3>
          <ul className="list-disc pl-6">
            {user.authors.map((author) => (
              <li key={author.authorID}>
                <p>
                  <strong>Title:</strong> {author.title}
                </p>
                <p>
                  <strong>Status:</strong> {author.status}
                </p>
                <p>
                  <strong>File:</strong>{" "}
                  <a
                    href={`https://cms.gmmtvyfind.com/${author.file}`}
                    className="text-blue-500 underline"
                    download
                  >
                    Download
                  </a>
                </p>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => router.back()}
          >
            Back
          </button>
        </div>
      </div>
    </main>
  );
}
