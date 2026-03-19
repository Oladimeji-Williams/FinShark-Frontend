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
            {errors.root?.message && (
                <div className="mb-5 rounded-2xl border border-[var(--danger)] bg-[var(--danger-bg)] px-4 py-3 text-sm text-strong">
                    {errors.root.message}
                </div>
            )}
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
                            className="rounded-lg p-2 text-muted transition hover:bg-surface hover:text-strong dark:hover:bg-surface-soft dark:hover:text-strong"
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
                    className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-4 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? "Signing you in..." : "Sign in"}
                    <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
                <div className="rounded-2xl border px-4 py-3 text-sm text-muted">
                    This project currently keeps account data in the current browser, but the
                    validation and UX now follow a production-style flow.
                </div>
            </form>
        </AuthShell>
    )
}

export default Login
