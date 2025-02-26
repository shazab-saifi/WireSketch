"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Input from "./Input";
import { signUpSchema } from "@lib/credentialsSchema";

const InputForm = ({ authRoute }: { authRoute: string }) => {
    const router = useRouter();
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});

    console.log(errors);

    const credentials: { email: string; name?: string; password: string } = {
        email: emailValue,
        password: passwordValue,
        ...(authRoute === "signup" && { password: passwordValue })
    };

    const signUp = async ({ email, password, name }: { email: string; password: string; name: string }) => {
        const res = await fetch(`http://localhost:4000/${authRoute}`, {
            method: "POST",
            body: JSON.stringify({ email, password, name }),
            headers: { "Content-Type": "application/json" }
        });

        return res.json();
    };

    const mutation = useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            router.push("/");
        },
        onError: (error) => console.error("Mutation error:", error)
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = signUpSchema.safeParse(credentials);

        if (!result.success) {
            console.log(result.error);

            const formattedErrors: { [key: string]: string | undefined } = {};
            result.error.issues.forEach((issue) => {
                formattedErrors[issue.path[0]!] = issue.message;
            });

            setErrors(formattedErrors);
            return;
        }

        setErrors({});
        mutation.mutate(result.data);
    };

    return (
        <div className="space-y-5">
            <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                    <Input
                        type="text"
                        placeholder="Email"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                    />
                    {errors.email && <span className="text-red-600 md:text-sm text-[12px] text-left">{errors.email}</span>}
                </div>
                <div className="flex flex-col space-y-1">
                    <Input
                        type="text"
                        placeholder="Name"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                    />
                    {errors.name && <span className="text-red-600 md:text-sm text-[12px] text-left">{errors.name}</span>}
                </div>
                <div className="flex flex-col space-y-1">
                    {authRoute === "signup" && (
                        <>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={passwordValue}
                                onChange={(e) => setPasswordValue(e.target.value)}
                            />
                            {errors.password && <span className="text-red-600 md:text-sm text-[12px] text-left">{errors.password}</span>}
                        </>
                    )}
                </div>
            </div>
            <Button text="Sign Up" className="w-full flex justify-center" onClick={handleSubmit} />
        </div>
    );
};

export default InputForm;
