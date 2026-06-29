import { createContext, useContext, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { dummyBooks } from "../features/books/data/dummyBooks";
import { dummyMembers } from "../features/members/data/dummyMembers";

const defaultSettings = {
  libraryName: "Library Management",
  maxBorrowDays: 14,
  finePerDay: 5,
  emailNotifications: true,
};

const defaultTransactions = [
  {
    id: 1,
    bookId: 2,
    memberId: 1,
    issueDate: dayjs().subtract(5, "day").format("YYYY-MM-DD"),
    dueDate: dayjs().add(9, "day").format("YYYY-MM-DD"),
    returnDate: null,
    status: "Active",
    fine: 0,
  },
  {
    id: 2,
    bookId: 3,
    memberId: 3,
    issueDate: dayjs().subtract(20, "day").format("YYYY-MM-DD"),
    dueDate: dayjs().subtract(5, "day").format("YYYY-MM-DD"),
    returnDate: null,
    status: "Active",
    fine: 0,
  },
];

const LibraryContext = createContext();

function loadFromStorage(key, fallback) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fallback;
}

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState(() =>
    loadFromStorage("books", dummyBooks)
  );
  const [members, setMembers] = useState(() =>
    loadFromStorage("members", dummyMembers)
  );
  const [transactions, setTransactions] = useState(() =>
    loadFromStorage("transactions", defaultTransactions)
  );
  const [settings, setSettings] = useState(() =>
    loadFromStorage("settings", defaultSettings)
  );

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const addBook = (book) => {
    setBooks((prev) => [
      ...prev,
      { id: Date.now(), ...book, status: "Available" },
    ]);
  };

  const updateBook = (updatedBook) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const addMember = (member) => {
    setMembers((prev) => [
      ...prev,
      {
        id: Date.now(),
        joinedDate: dayjs().format("YYYY-MM-DD"),
        status: "Active",
        ...member,
      },
    ]);
  };

  const updateMember = (updatedMember) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === updatedMember.id ? updatedMember : member
      )
    );
  };

  const deleteMember = (id) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const issueBook = (bookId, memberId, dueDate) => {
    const book = books.find((b) => b.id === bookId);
    if (!book || book.status !== "Available") {
      return { success: false, message: "Book is not available" };
    }

    const member = members.find((m) => m.id === memberId);
    if (!member || member.status !== "Active") {
      return { success: false, message: "Member is not active" };
    }

    const transaction = {
      id: Date.now(),
      bookId,
      memberId,
      issueDate: dayjs().format("YYYY-MM-DD"),
      dueDate,
      returnDate: null,
      status: "Active",
      fine: 0,
    };

    setTransactions((prev) => [...prev, transaction]);
    updateBook({ ...book, status: "Issued" });

    return { success: true, message: `"${book.title}" issued to ${member.name}` };
  };

  const returnBook = (transactionId) => {
    const transaction = transactions.find((t) => t.id === transactionId);
    if (!transaction || transaction.status === "Returned") {
      return { success: false, message: "Invalid transaction" };
    }

    const book = books.find((b) => b.id === transaction.bookId);
    const today = dayjs();
    const dueDate = dayjs(transaction.dueDate);
    const daysOverdue = today.diff(dueDate, "day");
    const fine =
      daysOverdue > 0 ? daysOverdue * settings.finePerDay : 0;

    setTransactions((prev) =>
      prev.map((t) =>
        t.id === transactionId
          ? {
              ...t,
              returnDate: today.format("YYYY-MM-DD"),
              status: "Returned",
              fine,
            }
          : t
      )
    );

    if (book) {
      updateBook({ ...book, status: "Available" });
    }

    const fineMsg =
      fine > 0 ? ` Fine: ₹${fine}` : "";
    return {
      success: true,
      message: `"${book?.title || "Book"}" returned successfully.${fineMsg}`,
      fine,
    };
  };

  const updateSettings = (updates) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const resetLibraryData = () => {
    setBooks(dummyBooks);
    setMembers(dummyMembers);
    setTransactions(defaultTransactions);
    setSettings(defaultSettings);
  };

  const stats = useMemo(() => {
    const activeTransactions = transactions.filter(
      (t) => t.status === "Active"
    );
    const overdueCount = activeTransactions.filter((t) =>
      dayjs().isAfter(dayjs(t.dueDate), "day")
    ).length;

    return {
      totalBooks: books.length,
      availableBooks: books.filter((b) => b.status === "Available").length,
      issuedBooks: books.filter((b) => b.status === "Issued").length,
      totalMembers: members.length,
      activeMembers: members.filter((m) => m.status === "Active").length,
      activeIssues: activeTransactions.length,
      overdueCount,
      totalFines: transactions.reduce((sum, t) => sum + (t.fine || 0), 0),
    };
  }, [books, members, transactions]);

  const getMemberById = (id) => members.find((m) => m.id === id);
  const getBookById = (id) => books.find((b) => b.id === id);

  const activeTransactions = useMemo(
    () =>
      transactions
        .filter((t) => t.status === "Active")
        .map((t) => ({
          ...t,
          book: getBookById(t.bookId),
          member: getMemberById(t.memberId),
          isOverdue: dayjs().isAfter(dayjs(t.dueDate), "day"),
        })),
    [transactions, books, members]
  );

  const recentActivity = useMemo(() => {
    return [...transactions]
      .sort((a, b) => dayjs(b.issueDate).unix() - dayjs(a.issueDate).unix())
      .slice(0, 8)
      .map((t) => {
        const book = getBookById(t.bookId);
        const member = getMemberById(t.memberId);
        if (t.status === "Returned") {
          return `"${book?.title}" returned by ${member?.name}`;
        }
        return `"${book?.title}" issued to ${member?.name}`;
      });
  }, [transactions, books, members]);

  const value = {
    books,
    members,
    transactions,
    settings,
    stats,
    activeTransactions,
    recentActivity,
    addBook,
    updateBook,
    deleteBook,
    addMember,
    updateMember,
    deleteMember,
    issueBook,
    returnBook,
    updateSettings,
    resetLibraryData,
    getMemberById,
    getBookById,
  };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
}

export const useLibrary = () => useContext(LibraryContext);

export const useBooks = () => {
  const { books, addBook, updateBook, deleteBook } = useLibrary();
  return { books, addBook, updateBook, deleteBook };
};
