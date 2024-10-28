import { EmergencyContact, User } from "@prisma/client";
import React, { useState } from "react";

type EmergencyContactInput = Omit<EmergencyContact, "userId" | "id">;

export interface ExtendedUserInput
  extends Omit<User, "id" | "createdAt" | "updatedAt"> {
  emergencyContacts: EmergencyContactInput[];
}

const UserForm = ({
  onSubmit,
}: {
  onSubmit: (userData: ExtendedUserInput) => Promise<void>;
}) => {
  const [formData, setFormData] = useState<ExtendedUserInput>({
    email: "suresh@test.com",
    password: "test@123",
    firstName: "Suresh",
    lastName: "Babu",
    address: "Wotanstr 22, 82110 Germering",
    gender: "Male",
    dateOfBirth: new Date(),
    profilePicture: "",
    bio: "",
    emergencyContacts: [],
  });

  const handleUserSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);
    e.preventDefault();
    onSubmit(Object.fromEntries(formData) as any as ExtendedUserInput);
  };

  const handleEmergencyContactChange = (
    index: number,
    e: React.FormEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.currentTarget;
    const updatedContacts = formData.emergencyContacts.map((contact, i) =>
      i === index ? { ...contact, [name]: value } : contact,
    );
    setFormData({ ...formData, emergencyContacts: updatedContacts });
  };

  return (
    <form
      onSubmit={handleUserSubmit}
      className="grid gap-4 lg:grid-cols-2 my-2"
    >
      <input
        type="email"
        name="email"
        defaultValue={formData.email}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        defaultValue={formData.password}
        placeholder="Password"
        required
      />
      <input
        type="text"
        name="firstName"
        defaultValue={formData.firstName}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        defaultValue={formData.lastName}
        placeholder="Last Name"
        required
      />
      <input
        type="text"
        name="address"
        defaultValue={formData.address}
        placeholder="Address"
        required
      />
      <select name="gender" defaultValue={formData.gender ?? ""}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Non-binary">Non-binary</option>
        <option value="Prefer not to say">Prefer not to say</option>
      </select>
      <input
        type="text"
        name="dateOfBirth"
        defaultValue={formData.dateOfBirth?.toDateString()}
        placeholder="Date of Birth"
      />
      <input
        type="text"
        name="profilePicture"
        defaultValue={formData.profilePicture!}
        placeholder="Profile Picture URL"
      />
      <textarea
        name="bio"
        defaultValue={formData.bio!}
        placeholder="Bio"
      ></textarea>
      {formData.emergencyContacts.map((contact, index) => (
        <div key={index}>
          <input
            type="text"
            name="name"
            defaultValue={contact.name}
            onChange={(e) => handleEmergencyContactChange(index, e)}
            placeholder="Contact Name"
          />
          <input
            type="text"
            name="phone"
            defaultValue={contact.phone}
            onChange={(e) => handleEmergencyContactChange(index, e)}
            placeholder="Contact Phone"
          />
          <input
            type="email"
            name="email"
            defaultValue={contact.email}
            onChange={(e) => handleEmergencyContactChange(index, e)}
            placeholder="Contact Email"
          />
        </div>
      ))}
      <button
        type="submit"
        className="rounded px-5 py-2.5 overflow-hidden bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white font-bold"
      >
        Create User
      </button>
    </form>
  );
};

export default UserForm;
