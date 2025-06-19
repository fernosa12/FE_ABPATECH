import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema, registerSchema } from "@/validations/validation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader, LockKeyhole, LogIn, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { UserLogin } from "@/store/action/actionLogin";
import { useMediaQuery } from "@/hooks/hook";
import { Label } from "@/components/ui/label";
import { registerNewUser } from "@/store/action/actionRegister";

export default function AuthPages() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [seen, setSeen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(true);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors } = form.formState;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    const data = {
      email: values?.email,
      password: values?.password,
    };

    console.log(data, "ini data yang dikirim");

    try {
      const res = await dispatch(UserLogin(data));

      console.log(res, "ini response dari login");

      if (res.status == "success") {
        toast.success(res.message || "Login berhasil!");
        form.reset();
        Cookies.set("token", res?.data?.access_token, { expires: 0.5 });
        setIsLoading(false);
        navigate("/");
      } else {
        toast.error(res.message);
        throw errors;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const formRegister = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      mobile_number: "",
      foto: "",
    },
  });
  const { errors: errorRegisters } = formRegister.formState;

  const onSumbitRegister = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);

    const data = {
      email: values.email,
      password: values.password,
      confirm_password: values.confirm_password,
      mobile_number: values.mobile_number,
      foto: selectedImage,
    };

    console.log(data, "ini data yang dikirim");

    try {
      const res = await dispatch(registerNewUser(data));
      console.log(res, "ini data response auth register");

      if (res.status == "success") {
        toast.success(res.message || "Registrasi berhasil!");
        form.reset();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(res?.message || "Registrasi gagal");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error("Terjadi kesalahan saat registrasi");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-xl px-4">
        <div className="w-full bg-blue-800 py-4">
          <p className="text-white text-center">Sign in into continue.</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg py-8">
          <div className="flex justify-start border-b border-gray-200 mb-8">
            <button
              onClick={() => setIsAuth(true)}
              className={`px-6 pb-3 ${
                isAuth
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-400"
              } font-medium transition-colors -mb-[2px]`}
            >
              Log In
            </button>
            <button
              onClick={() => setIsAuth(false)}
              className={`px-6 pb-3 ${
                !isAuth
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-400"
              } font-medium transition-colors -mb-[2px]`}
            >
              Register
            </button>
          </div>

          {isAuth && (
            <div className="w-full">
              {/* Form */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2 px-6"
                >
                  {/* Email Field */}
                  <div className="w-full flex flex-col gap-y-2">
                    <Label>Email</Label>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div
                              className={`w-full flex flex-row items-center border rounded-md px-4 py-1 ${
                                errors["email"]
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            >
                              <Input
                                type="email"
                                className="w-full border-none text-base placeholder:text-gray-400 focus:outline-none"
                                placeholder="masukkan email anda"
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Password Field */}
                  <div className="w-full flex flex-col gap-y-2">
                    <Label>Password</Label>

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div
                              className={`w-full flex flex-row items-center border rounded-md px-4 py-1 ${
                                errors["password"]
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            >
                              <Input
                                type={!seen ? "text" : "password"}
                                className="w-full border-none text-base placeholder:text-gray-400 focus:outline-none"
                                placeholder="masukkan password anda"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setSeen(!seen)}
                                className="p-2 ml-2"
                              >
                                {seen ? (
                                  <EyeOff className="text-gray-400 w-5 h-5" />
                                ) : (
                                  <Eye className="text-gray-400 w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember"
                        className="ml-2 text-sm text-gray-600"
                      >
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      className="flex items-center gap-1 text-sm text-grey-200 hover:text-grey-200 hover:underline"
                    >
                      <LockKeyhole className="w-3 h-3" />
                      Forgot password
                      <span className="text-grey-100">?</span>
                    </button>
                  </div>

                  {/* Submit Button */}
                  <Button
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 w-full rounded-md text-white py-6 text-base font-medium flex items-center justify-center gap-2"
                    type="submit"
                  >
                    {isLoading ? (
                      <Loader className="animate-spin text-white w-5 h-5" />
                    ) : (
                      <>
                        Masuk
                        <LogIn className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
              {/* Register Link */}
              <p className="text-center mt-6 text-sm text-gray-600 ">
                <span className="px-4 bg-white text-gray-500 font-semibold">
                  Or Login With
                </span>
              </p>
              <div className="grid grid-cols-3 p-4">
                <button
                  type="button"
                  className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200"
                >
                  <span className="text-grey-600 text-sm">Facebook</span>
                </button>
                <button
                  type="button"
                  className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200"
                >
                  <span className="text-grey-400 text-sm">Twitter</span>
                </button>
                <button
                  type="button"
                  className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200"
                >
                  <span className="text-grey-600 text-sm">Google</span>
                </button>
              </div>
              {/* Error Messages */}
              {(errors.email || errors.password) && (
                <div className="mt-4 space-y-2">
                  {errors.email && (
                    <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
                      <p className="text-sm">{errors.email.message}</p>
                      <X className="w-4 h-4 cursor-pointer" />
                    </div>
                  )}
                  {errors.password && (
                    <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
                      <p className="text-sm">{errors.password.message}</p>
                      <X className="w-4 h-4 cursor-pointer" />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {!isAuth && (
            <Form {...formRegister}>
              <form
                onSubmit={formRegister.handleSubmit(onSumbitRegister)}
                className="space-y-2 px-6"
              >
                {/* Email Field */}
                <div className="w-full flex flex-col gap-y-2">
                  <Label>Email</Label>

                  <FormField
                    control={formRegister.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div
                            className={`w-full flex flex-row items-center border rounded-md px-4 py-1 ${
                              errorRegisters["email"]
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            <Input
                              type="email"
                              className="w-full border-none text-base placeholder:text-gray-400 focus:outline-none"
                              placeholder="Enter Email"
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                {/* Password Field */}
                <div className="w-full flex flex-col gap-y-2">
                  <Label>Password</Label>

                  <FormField
                    control={formRegister.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div
                            className={`w-full flex flex-row items-center border rounded-md px-4 py-1 ${
                              errorRegisters["password"]
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            <Input
                              type={!seen ? "text" : "password"}
                              className="w-full border-none text-base placeholder:text-gray-400 focus:outline-none"
                              placeholder="Enter Password"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setSeen(!seen)}
                              className="p-2 ml-2"
                            >
                              {seen ? (
                                <EyeOff className="text-gray-400 w-5 h-5" />
                              ) : (
                                <Eye className="text-gray-400 w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                {/* Confirm Password Field */}
                <div className="w-full flex flex-col gap-y-2">
                  <Label>Confirm Password</Label>

                  <FormField
                    control={formRegister.control}
                    name="confirm_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div
                            className={`w-full flex flex-row items-center border rounded-md px-4 py-1 ${
                              errorRegisters["password"]
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            <Input
                              type={!seen ? "text" : "password"}
                              className="w-full border-none text-base placeholder:text-gray-400 focus:outline-none"
                              placeholder="Enter Confirm Password"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setSeen(!seen)}
                              className="p-2 ml-2"
                            >
                              {seen ? (
                                <EyeOff className="text-gray-400 w-5 h-5" />
                              ) : (
                                <Eye className="text-gray-400 w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Upload Photo Field */}
                <div className="w-full flex flex-col gap-y-2">
                  <label className="text-sm font-medium">Foto</label>

                  <div className="w-full flex items-center gap-3 border border-gray-300 rounded-md px-4 py-3">
                    <label
                      htmlFor="photo-upload"
                      className="px-4 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded cursor-pointer transition-colors"
                    >
                      Choose File
                    </label>

                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    <span className="text-sm text-gray-500">
                      {selectedImage ? selectedImage.name : "No file chosen"}
                    </span>
                  </div>

                  {previewUrl && (
                    <div className="mt-2">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded-md border"
                      />
                    </div>
                  )}
                </div>
                {/* Mobile Phone Field */}
                <div className="w-full flex flex-col gap-y-2">
                  <Label>Mobile Number</Label>

                  <FormField
                    control={formRegister.control}
                    name="mobile_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div
                            className={`w-full flex flex-row items-center border rounded-md px-4 py-1 ${
                              errorRegisters["mobile_number"]
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            <Input
                              type="number"
                              className="w-full border-none text-base placeholder:text-gray-400 focus:outline-none"
                              placeholder="Enter Mobile Number"
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 text-sm text-gray-600"
                    >
                      You agree to the Dastone{" "}
                      <span className="text-blue-600 hover:text-blue-700 cursor-pointer">
                        Terms of Use
                      </span>
                    </label>
                  </div>
                </div>
                {/* Submit Button */}
                <Button
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 w-full rounded-md text-white py-6 text-base font-medium flex items-center justify-center gap-2"
                  type="submit"
                >
                  {isLoading ? (
                    <Loader className="animate-spin text-white w-5 h-5" />
                  ) : (
                    <>
                      Register
                      <LogIn className="w-5 h-5" />
                    </>
                  )}
                </Button>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <label className="ml-2 text-sm text-gray-600">
                      Already have account?{" "}
                      <span className="text-blue-600 hover:text-blue-700 cursor-pointer">
                        Log In
                      </span>
                    </label>
                  </div>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </main>
  );
}
