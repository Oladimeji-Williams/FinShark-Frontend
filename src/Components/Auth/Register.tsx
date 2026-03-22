"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import {
    FaArrowRight,
    FaCheckCircle,
    FaEnvelope,
    FaEye,
    FaEyeSlash,
    FaLock,
    FaUser,
} from "react-icons/fa"
import { Navigate, useNavigate } from "react-router-dom"
import AuthField from "@/Components/Auth/AuthField"
import AuthShell from "@/Components/Auth/AuthShell"
import {
    getPasswordRequirementState,
    passwordRequirementLabels,
    registerSchema,
    type RegisterFormValues,
} from "@/Components/Auth/authSchemas"
import { useAuth } from "@/Components/Providers/AuthProvider"
import { useToast } from "@/Components/Toast/ToastProvider"

const Register = () => {
    const { register: registerAccount, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { showToast } = useToast()
    const {
        register,
        control,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const password = useWatch({
        control,
        name: "password",
        defaultValue: "",
    })
    const passwordChecks = getPasswordRequirementState(password)

    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }

    const onSubmit = async (values: RegisterFormValues) => {
        clearErrors("root")
        try {
            await registerAccount(values.userName, values.email, values.password)
            showToast("Account created successfully.", "success")
            window.setTimeout(() => {
                navigate("/login", { replace: true })
            }, 300)
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Registration failed. Please try again."
            setError("root", { message })
            showToast(message, "error")
        }
    }

    return (
        <AuthShell
            eyebrow="Create Account"
            title="Set up your research base."
            description="Create your account once and keep your workflow ready for company search, valuation context, and cleaner market analysis."
            footerPrompt="Already have an account?"
            footerActionLabel="Log in instead"
            footerActionTo="/login"
        >
            {errors.root?.message ? (
                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-500/30 dark:bg-red-950/20 dark:text-red-200">
                    {errors.root.message}
                </div>
            ) : null}
            <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
                <AuthField
                    label="Username"
                    icon={FaUser}
                    type="text"
                    placeholder="trader123"
                    autoComplete="username"
                    error={errors.userName?.message}
                    {...register("userName")}
                />
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
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    error={errors.password?.message}
                    hint="Use a password you would trust on a real production product."
                    endAdornment={
                        <button
                            type="button"
                            onClick={() => setShowPassword((current) => !current)}
                            className="rounded-lg p-2 text-muted transition hover:bg-surface-soft hover:text-strong"
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

                <div className="grid gap-2 sm:grid-cols-2">
                    {passwordRequirementLabels.map((label, index) => {
                        const met = passwordChecks[index]

                        return (
                            <div
                                key={label}
                                className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm ${
                                    met
                                        ? "border-emerald-200 bg-emerald-50/80 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-emerald-200"
                                        : "border-subtle bg-surface-soft text-slate-700 dark:border-subtle dark:bg-surface dark:text-zinc-200"
                                }`}
                            >
                                <FaCheckCircle className="h-3.5 w-3.5 shrink-0" />
                                <span>{label}</span>
                            </div>
                        )
                    })}
                </div>
                <AuthField
                    label="Confirm password"
                    icon={FaLock}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    error={errors.confirmPassword?.message}
                    endAdornment={
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((current) => !current)}
                            className="rounded-lg p-2 text-muted transition hover:bg-surface-soft hover:text-strong"
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                            {showConfirmPassword ? (
                                <FaEyeSlash className="h-4 w-4" />
                            ) : (
                                <FaEye className="h-4 w-4" />
                            )}
                        </button>
                    }
                    {...register("confirmPassword")}
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex w-full items-center justify-center gap-2 rounded-2xl 
                    bg-[color:var(--primary)] px-4 py-4 text-sm font-semibold text-white 
                    shadow-[0_14px_30px_rgba(34,197,94,0.25)] 
                    transition-all duration-200 
                    hover:-translate-y-0.5 
                    hover:bg-[color:var(--primary-hover)] 
                    disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? "Creating your account..." : "Create account"}
                    <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
                <div className="rounded-2xl border border-subtle bg-surface-soft px-4 py-3 text-sm leading-6 text-slate-700 dark:border-subtle dark:bg-surface dark:text-zinc-200">
                    Accounts are currently stored in this browser for the demo, but the signup flow
                    now uses production-style field validation and confirmation checks.
                </div>
            </form>
        </AuthShell>
    )
}

export default Register
