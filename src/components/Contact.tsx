import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // stop page reload

    console.log(form); // later send to API

    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-6 text-center">
      <h1 className="font-bold text-3xl mb-6">Contact Us</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center bg-fuchsia-200 p-6 rounded-lg w-4/6 m-auto shadow-lg space-y-4"
      >
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border border-black p-2 w-1/2 rounded"
          required
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border border-black p-2 w-1/2 rounded"
          required
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="border border-black p-2 w-1/2 h-32 rounded"
          required
        />

        <button
          type="submit"
          className="font-semibold bg-pink-900 text-white p-2 w-1/2 rounded hover:scale-105 transition"
        >
          Submit
        </button>

        {submitted && (
          <p className="text-green-700 font-medium">
            ✅ Message sent successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default Contact;
