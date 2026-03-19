"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaArrowRight, FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import AuthField from "@/Components/Auth/AuthField"
import AuthShell from "@/Components/Auth/AuthShell"
import { loginSchema, type LoginFormValues } from "@/Components/Auth/authSchemas"
import { useAuth } from "@/Components/Providers/AuthProvider"
import { useToast } from "@/Components/Toast/ToastProvider"

const Login = () => {
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [showPassword, setShowPassword] = useState(false)
    const { showToast } = useToast()

    const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/"
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    })

    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }

    const onSubmit = async (values: LoginFormValues) => {
        clearErrors("root")
        try {
            await login(values.email, values.password)
            showToast("Login successful.", "success")
            window.setTimeout(() => {
                navigate(from, { replace: true })
            }, 300)
        } catch (err) {
            const message = err instanceof Error ? err.message : "Login failed. Please try again."
            setError("root", { message })
            showToast(message, "error")
        }
    }

    return (
        <AuthShell
            eyebrow="Sign In"
            title="Welcome back."
            description="Access your market workspace, continue research sessions, and jump back into the dashboards that matter."
            footerPrompt="New to FinShark?"
            footerActionLabel="Create an account"
            footerActionTo="/register"
        >
            {errors.root?.message ? (
                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-500/30 dark:bg-red-950/20 dark:text-red-200">
                    {errors.root.message}
                </div>
            ) : null}
            <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
                <AuthField
                    label="Work email"
                    icon={FaEnvelope}
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    error={errors.email?.message}
                    {...register("email")}
                />
                <AuthField
                    label="Password"
                    icon={FaLock}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    error={errors.password?.message}
                    hint="Your session stays signed in on this device until you log out."
                    endAdornment={
                        <button
                            type="button"
                            onClick={() => setShowPassword((current) => !current)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:text-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <FaEyeSlash className="h-4 w-4" />
                            ) : (
                                <FaEye className="h-4 w-4" />
                            )}
                        </button>
                    }
                    {...register("password")}
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-zinc-100"
                >
                    {isSubmitting ? "Signing you in..." : "Sign in to FinShark"}
                    <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm leading-6 text-slate-600 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300">
                    This project currently keeps account data in the current browser, but the validation and UX now follow a production-style flow.
                </div>
            </form>
        </AuthShell>
    )
}

export default Login
