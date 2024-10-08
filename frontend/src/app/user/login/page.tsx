"use client";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { User } from "../../types/userTypes";
import { login } from "../../api/authApi";
import Link from "next/link";

export default function LoginForm() {
  const [users, setUsers] = useState({
    password: "",
    email: "",
  });

  const router = useRouter();
  const { setUser } = useAuth();

  // 서버로부터 User 객체 그대로 받아와 처리
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data: User) => {
      alert("로그인 성공!");
      // 서버로부터 받은 User 객체를 상태로 설정 (id 포함)
      setUser(data);
      console.log(data)
      router.push("/");
    },
    onError: () => {
      alert("로그인 실패!");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate(users);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-cyan-500">로그인</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            이메일
          </label>
          <input
            id="email"
            type="text"
            name="email"
            value={users.email}
            onChange={(e) => setUsers({ ...users, email: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={users.password}
            onChange={(e) => setUsers({ ...users, password: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors"
          >
            로그인
          </button>
        </div>
        <div className="mb-4">
          <Link href={"/user/join"}>회원가입</Link>
        </div>
      </form>
    </div>
    </div>
  );
}