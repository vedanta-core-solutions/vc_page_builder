"use client";

import { useState } from "react";

export default function NfcRegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    businessType: "",
    phone: "",
    whatsapp: "",
    email: "",
    website: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    address: "",
    chipId: ""
  });

  const [loading, setLoading] = useState(false);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // basic required validation
    if (
      !form.fullName ||
      !form.businessName ||
      !form.businessType ||
      !form.phone ||
      !form.email ||
      !form.address ||
      !form.chipId
    ) {
      alert("Please fill all required fields.");
      return;
    }
    try {
        const response = await fetch("http://localhost:9000/validId")
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(response);
        const isIdValid = data.some(item => item.value === form.chipId);
        if (!isIdValid) {
            return alert("Put Valid ChipId!");
        }
    } catch (error) {
        console.log("error during chidid check", error)
    }
    setLoading(true);
    const payload = {
      chipId: form.chipId,
      fullName: form.fullName,
      businessName: form.businessName,
      businessType: form.businessType,
      phone: form.phone,
      whatsapp: form.whatsapp,
      email: form.email,
      website: form.website,
      address: form.address,
      socialLinks: {
        instagram: form.instagram,
        facebook: form.facebook,
        linkedin: form.linkedin
      }
    };

    const payload2 = {
        chipId: form.chipId,
        website: form.website
    };

    try {
      await fetch("http://localhost:9000/nfcCards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      await fetch("http://localhost:9000/registeredUrl", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload2)
      })

      alert("Card Registered!");
      // reset form
      setForm({
        fullName: "",
        businessName: "",
        businessType: "",
        phone: "",
        whatsapp: "",
        email: "",
        website: "",
        instagram: "",
        facebook: "",
        linkedin: "",
        address: "",
        chipId: ""
      });
    } catch (err) {
      alert("Failed to register card.");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Register NFC Card</h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Full Name */}
        <div>
          <label className="block mb-1">Full Name *</label>
          <input
            required
            type="text"
            className="w-full p-3 border rounded"
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
          />
        </div>

        {/* Business Name */}
        <div>
          <label className="block mb-1">Business Name *</label>
          <input
            required
            type="text"
            className="w-full p-3 border rounded"
            value={form.businessName}
            onChange={(e) => updateField("businessName", e.target.value)}
          />
        </div>

        {/* Business Type */}
        <div>
          <label className="block mb-1">Business Type *</label>
          <select
            required
            className="w-full p-3 border rounded"
            value={form.businessType}
            onChange={(e) => updateField("businessType", e.target.value)}
          >
            <option value="">Select Business Type</option>
            <option value="retail">Retail</option>
            <option value="restaurant">Restaurant</option>
            <option value="farming">Farming</option>
            <option value="corporate">Corporate</option>
          </select>
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1">Phone Number *</label>
          <input
            required
            type="text"
            className="w-full p-3 border rounded"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>

        {/* WhatsApp */}
        <div>
          <label className="block mb-1">WhatsApp Number</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            value={form.whatsapp}
            onChange={(e) => updateField("whatsapp", e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email *</label>
          <input
            required
            type="email"
            className="w-full p-3 border rounded"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>

        {/* Website */}
        <div>
          <label className="block mb-1">Website URL</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            value={form.website}
            onChange={(e) => updateField("website", e.target.value)}
          />
        </div>

        {/* Social Links */}
        <div>
          <label className="block mb-1">Instagram</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            value={form.instagram}
            onChange={(e) => updateField("instagram", e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Facebook</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            value={form.facebook}
            onChange={(e) => updateField("facebook", e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">LinkedIn</label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            value={form.linkedin}
            onChange={(e) => updateField("linkedin", e.target.value)}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1">Address *</label>
          <textarea
            required
            className="w-full p-3 border rounded"
            rows="3"
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
          />
        </div>

        {/* Chip ID */}
        <div>
          <label className="block mb-1">Chip ID (32-bit unique) *</label>
          <input
            required
            type="text"
            className="w-full p-3 border rounded"
            value={form.chipId}
            onChange={(e) => updateField("chipId", e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          {loading ? "Registering..." : "Register Card"}
        </button>
      </form>
    </div>
  );
}
