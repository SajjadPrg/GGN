<script lang="ts">
  import { Toasts, toast } from "svoast";
  import { register } from "../../../services/auth";

  const form = $state<{ username: string; email: string; password: string }>({
    username: "",
    password: "",
    email: "",
  });

  const checkForm = $state<
    {
      name: string;
      message: string;
      status: boolean;
    }[]
  >([
    { name: "email", status: false, message: "ایمیل وارد شده معتبر نیست" },
    {
      name: "password",
      status: false,
      message:
        "رمز‌عبور وارد شده معتبر نیست - رمز باید حداقل 6 حرف و شامل حروف کوچک و بزرگ انگلیسی، اعداد و علامت‌ها باشد",
    },
    {
      name: "username",
      status: false,
      message:
        "نام‌کاربری صحیح نیست - باید حداقل شامل 3 حرف و تنها می‌تواند شامل حروف و اعداد انگلیسی باشد",
    },
  ]);

  $effect(() => {
    // Reset all statuses to false initially
    checkForm.forEach((field) => (field.status = false));

    // Validate username
    if (/^[a-zA-Z0-9]{3,16}$/.test(form.username)) {
      checkForm[2].status = true; // Update username status
    }

    // Validate email
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      checkForm[0].status = true; // Update email status
    }

    // Validate password
    if (
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
        form.password
      )
    ) {
      checkForm[1].status = true; // Update password status
    }
  });

  const isFormValid = $derived(() => checkForm.every((field) => field.status));

  const registerHandler = async () => {
    try {
      const { error, result } = await register(form);
      if (error) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        console.log(result.data);
      }
    } catch (error) {
      toast.error("خطای سمت سرویس");
    }
  };
</script>

<Toasts />
<form>
  <div class="mb-4">
    <input
      type="text"
      id="name"
      required
      class="mt-1 block w-full border border-gray-300 rounded-md font-vazirmatn shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
      placeholder="نام‌کاربری"
      bind:value={form.username}
    />
  </div>

  <div class="mb-4">
    <input
      type="email"
      id="email"
      required
      class="mt-1 block w-full border border-gray-300 rounded-md font-vazirmatn shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
      placeholder="ایمیل"
      bind:value={form.email}
    />
  </div>

  <div class="mb-4">
    <input
      type="password"
      id="password"
      required
      class="mt-1 block w-full border border-gray-300 rounded-md font-vazirmatn shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
      placeholder="رمز‌عبور"
      bind:value={form.password}
    />
  </div>

  <button
    onclick={() => {
      if (isFormValid()) {
        toast.success("ثبت‌نام با موفقیت انجام شد!");
      } else {
        const errorMessages = checkForm
          .filter((field) => !field.status)
          .map((field) => field.message);
        errorMessages.forEach((message) => toast.error(message));
      }
    }}
    type="button"
    class="w-full bg-brand hover:bg-brandLite font-lalezar text-white font-bold py-2 rounded-md shadow transition duration-200"
  >
    ثبت‌نام
  </button>

  <p class="mt-4 text-center text-sm text-gray-600 font-vazirmatn">
    از قبل ثبت‌نام کردی؟
    <a href="#" class="text-blue-600 hover:underline">ورود</a>
  </p>
</form>

<style>
  input::placeholder {
    text-align: right;
    font-weight: bold;
  }
</style>
